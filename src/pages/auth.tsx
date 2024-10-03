import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {

  const [registerForm, setRegisterForm] = useState(false);

  return (
    <div className="flex justify-center items-center p-6 h-screen w-screen bg-bgDark">
      {registerForm ? <Register setRegisterForm={setRegisterForm} /> : <Login setRegisterForm={setRegisterForm} />}

    </div>
  )
}


interface AuthModalProps {
    setRegisterForm: (value: boolean) => void;
}

export const Login: React.FC<AuthModalProps> = ({ setRegisterForm }) => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setUserData] = useState<any>(null);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login(email, password);
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
                        <span onClick={() => setRegisterForm(true)} className="text-primary font-semibold cursor-pointer">Registriere dich!</span>
                    </p>
                </div>
                <div className="flex flex-col space-y-4 mt-8">
                    <input onChange={(e) => setEmail(e.target.value)} className="p-3 w-full bg-[#3B364C] rounded-lg focus:outline-primary outline-none" type="text" placeholder="Username" />
                    <input onChange={(e) => setPassword(e.target.value)} className="p-3 w-full bg-[#3B364C] rounded-lg focus:outline-primary outline-none" type="text" placeholder="Password" />
                </div>
                <div className="mt-4">
                    <button onClick={handleLogin} className="w-full bg-primary p-3 text-white rounded-lg">Anmelden</button>
                </div>
            </div>
        </div>
    );
};



export const Register: React.FC<AuthModalProps> = ({setRegisterForm}) => {
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
                        Du hast schon einen Account?{" "}
                        <span onClick={() => setRegisterForm(false)} className="text-primary font-semibold cursor-pointer">Hier anmelden!</span>
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

