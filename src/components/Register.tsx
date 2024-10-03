import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [, setUserData] = useState<any>(null);
    const { register, user } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async () => {
        await register(email, password);
        if (user) {
            navigate("/");
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
                    <input onChange={(e) => setPassword(e.target.value)} className="p-3 w-full bg-[#3B364C] rounded-lg focus:outline-primary outline-none" type="text" placeholder="Password" />
                    <input onChange={(e) => setPasswordConfirm(e.target.value)} className="p-3 w-full bg-[#3B364C] rounded-lg focus:outline-primary outline-none" type="text" placeholder="Confirm Password" />

                    {passwordConfirm !== password && <h1>Password does not match</h1>}
                </div>
                <div className="mt-4">
                    <button onClick={handleRegister} className="w-full bg-primary p-3 text-white rounded-lg">Anmelden</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
