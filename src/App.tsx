
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import ProtectedRoute from "./context/protected/ProtectedRoute";
import PublicRoute from "./context/protected/PublicRoute";
import Home from "./pages/home";
import Layout from "./components/layout/Layout";
import Chat from "./pages/chat";

function App() {
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
                            <Route path="/chat/:id" element={<Chat />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
