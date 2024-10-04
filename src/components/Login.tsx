import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setUserData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrorMessage("");
        await login(email, password);
        if (user) {
            toast.success("Erfolgreich angemeldet");
            // navigate("/");
        } else {
            setErrorMessage("Falsche Email oder Passwort. Bitte versuche es erneut.");
            setPassword("");
        }
    };

    useEffect(() => {
        if (user) {
            console.log("User data after login:", user);
            setUserData(user);
        }
    }, [user]);

    return (
        <div className="text-white p-3">
            <div>
                <div>
                    <h2 className="text-3xl">
                        Melde dich mit deinem Account an
                    </h2>
                    <p className="mt-3 text-[#8994AE]">
                        Noch keinen Account?{" "}
                        <span className="text-primary font-semibold">Registriere dich!</span>
                    </p>
                </div>
                <div className="flex flex-col space-y-4 mt-8">
                    <input onChange={(e) => setEmail(e.target.value)} className="p-3 w-full bg-[#3B364C] rounded-lg focus:outline-primary outline-none" type="text" placeholder="Username" />
                    <input onChange={(e) => setPassword(e.target.value)} className="p-3 w-full bg-[#3B364C] rounded-lg focus:outline-primary outline-none" type="password" placeholder="Password" />
                </div>
                <p className="text-red-500 mt-2">{errorMessage}</p>
                <div className="mt-4">
                    <button onClick={handleLogin} className="w-full bg-primary p-3 text-white rounded-lg">Anmelden</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
