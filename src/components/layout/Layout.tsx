import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import ContactModal from "../ContactModal";
import { useAuth } from "../../context/AuthContext";
import pb from "../../pocketbase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Stelle sicher, dass dies hinzugefügt ist

export default function Layout() {
    const [openMenu, setOpenMenu] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [contacts, setContacts] = useState<any>([]);
    const { user } = useAuth();

    const getContacts = async () => {
        const contactData = await pb.collection("users").getFullList({
            sort: "-created",
        });
        setContacts(contactData);
    };

    const createChat = async (selectedUserId: string) => {
        const record = await pb.collection("chat").create({
            users: [user?.id, selectedUserId],
            messages: [""],
        });
        toast.success("🪄Neuen Chat erstellt!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        console.log(record);
    };

    const handleUserSelect = (selectedUserId: string) => {
        createChat(selectedUserId);
        setShowModal(false);
    };

    useEffect(() => {
        getContacts();
    }, []);

    return (
        <div className="flex bg-mainBg h-screen max-w-screen overflow-hidden">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Sidebar
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                openModal={() => setShowModal(true)}
                setContacts={setContacts}
            />

            <div className="w-full flex-1 max-w-full overflow-y-auto">
                <Outlet
                    context={{
                        openMenu,
                        setOpenMenu,
                        showModal,
                        setShowModal,
                        contacts,
                        setContacts,
                    }}
                />
            </div>

            <ContactModal
                onUserSelect={handleUserSelect}
                showModal={showModal}
                setShowModal={setShowModal}
                user={contacts}
            />
        </div>
    );
}
