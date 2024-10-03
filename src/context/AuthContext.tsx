// AuthContext.tsx

import { createContext, useState, useEffect, useContext } from "react";
import PocketBase from 'pocketbase';
import pb from "../pocketbase";

type User = {
    id: string;
    username: string;
    // TODO: add maybe other user properties as needed
};

type IAuthContext = {
    authenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<User | null>;
    register: (username: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Load user data from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const authData = await pb.collection('users').authWithPassword(username, password);
    
            const user: User = {
                id: authData.record.id,
                username: authData.record.username
            }
    
            setAuthenticated(true);
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            console.error("Login failed:", error);
            return null;
        }
    };
    

    const register = async (username: string, password: string) => {
        try {
            await pb.collection('users').create({
                username,
                password,
                passwordConfirm: password
            });
            await login(username, password);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const logout = () => {
        pb.authStore.clear();
        setAuthenticated(false);
        setUser(null);
        // remove user data from localStorage
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ authenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
