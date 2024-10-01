import { useEffect, useState } from "react";
import "./App.css";
import PocketBase from "pocketbase";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import ProtectedRoute from "./context/protected/ProtectedRoute";
import PublicRoute from "./context/protected/PublicRoute";
import Home from "./pages/home";
import Layout from "./components/layout/Layout";
import Chat from "./pages/chat";

function App() {
    const pb = new PocketBase("http://127.0.0.1:8090/");

    const [messages, setMessages] = useState<any>([]);

    const getMessagesFromChat = async () => {
        const record = await pb.collection("message").getFullList({
            filter: "chat = 'sss5pg596yxktx0'",
        });

        console.log(record);

        setMessages(record);
    };

    useEffect(() => {
        getMessagesFromChat();
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/auth" element={<Auth />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/chat" element={<Chat />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
