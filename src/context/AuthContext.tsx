// AuthContext.tsx

import { createContext, useState, useEffect, useContext } from "react";
import PocketBase from 'pocketbase';
import pb from "../pocketbase";

type User = {
    id: string;
    username: string;
    // Add other user properties as needed
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
                id: authData.record.id, // Map required fields
                username: authData.record.username // Map required fields
            }
    
            setAuthenticated(true);
            setUser(user); // No type error now, as it's of type User
            localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
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
        // Remove user data from localStorage
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
