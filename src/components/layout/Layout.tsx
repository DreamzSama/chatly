import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import ContactModal from "../ContactModal";
import { useAuth } from "../../context/AuthContext";
import pb from "../../pocketbase";

export default function Layout() {
    const [openMenu, setOpenMenu] = useState(true);
    const [showModal, setShowModal] = useState(false); // Zustand für das Modal
    const [contacts, setContacts] = useState<any>([]); // Kontakte für das Modal
    const { user } = useAuth();


    const createChat = async (selectedUserId: string) => {
        const record = await pb.collection("chat").create({
            users: [user?.id, selectedUserId],
            messages: [""],
        });
        console.log(record);
    }

    const handleUserSelect = (selectedUserId: string) => {
        createChat(selectedUserId);
        setShowModal(false);
    }
    

    return (
        <div className="flex bg-mainBg h-screen max-w-screen overflow-hidden">
            {/* Sidebar bekommt die Funktion zum Öffnen des Modals */}
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} openModal={() => setShowModal(true)} setContacts={setContacts} />

            <div className="w-full flex-1 max-w-full overflow-y-auto">
                <Outlet context={{ openMenu, setOpenMenu, showModal, setShowModal, contacts, setContacts }} />
            </div>

            {/* ContactModal jetzt im Layout-Komponentenbereich für Fullscreen */}
            <ContactModal
                onUserSelect={handleUserSelect} // Füge hier deine Logik zum Erstellen des Chats ein
                showModal={showModal}
                setShowModal={setShowModal}
                user={contacts}
            />
        </div>
    );
}
