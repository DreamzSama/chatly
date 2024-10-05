import { useEffect, useState } from "react";
import pb from "../pocketbase";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeftEndOnRectangleIcon,
    Bars3Icon,
    EllipsisVerticalIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Sidebar({
    openMenu,
    setOpenMenu,
    openModal,
    setContacts,
}: any) {
    const [chats, setChats] = useState<any>([]);
    const { user, logout } = useAuth();
    let navigate = useNavigate();

    // Abrufen der Kontakte
    const getContacts = async () => {
        const contactData = await pb.collection("users").getFullList({
            sort: "-created",
        });
        setContacts(contactData); // Kontakte in den Zustand setzen
    };

    const getChats = async (userId: string | undefined) => {
        if (!userId) return;

        try {
            const records = await pb.collection("chat").getFullList({
                filter: `users ?~ "${userId}"`,
                expand: "users, messages",
                $autoCancel: false,
            });
            setChats(records);

            if (records.length === 0) {
                navigate("/");
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Chats:", error);
        }
    };

    const deleteChat = async (id: string) => {
        try {
            await pb.collection("chat").delete(id);
            getChats(user?.id);

            toast.success('🪄Chat gelöscht', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        } catch (error) {
            console.error("Fehler beim Löschen des Chats:", error);
        }
    };

    useEffect(() => {
        getChats(user?.id);
        getContacts(); // Kontakte abrufen

        pb.realtime.subscribe("chat", async (e) => {
            console.log(e);
            if (e.record.users.includes(user?.id)) {
                getChats(user?.id);
            }
        });
    }, [user?.id]);

    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: openMenu ? 0 : "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 max-w-[350px] flex flex-col justify-between p-4 text-white w-full bg-bgDark h-full z-50"
        >
            <div>
                <div className="flex justify-between flex-row items-center">
                    <h1 className="text-3xl font-medium">Chats</h1>
                    <XMarkIcon
                        onClick={() => setOpenMenu(!openMenu)}
                        className="w-8 h-8 cursor-pointer"
                    />
                </div>
                <div className="mt-3">
                    <input
                        className="w-full outline-none focus:outline-primary p-2 rounded-lg bg-mainBg"
                        type="text"
                        placeholder="Suchen..."
                    />
                </div>
                {/* Button to open modal */}
                <div>
                    <button
                        className="w-full hover:bg-primary/70 mt-3 p-2 rounded-lg bg-primary"
                        onClick={openModal} // Öffnet das Modal beim Klicken
                    >
                        Chat starten
                    </button>
                </div>
            </div>

            {/* Chat-Liste, mit flex-grow, damit es den Platz korrekt einnimmt */}
            <div className="mt-3 overflow-y-auto flex-grow">
                {chats.length > 0 ? (
                    chats.map((chat: any) => (
                        <div
                            key={chat.id}
                            className="flex cursor-pointer p-3 hover:bg-mainBg justify-between rounded-lg items-center mt-3"
                        >
                            <Link
                                onClick={() => setOpenMenu(!openMenu)}
                                to={`/chat/${chat.id}`}
                            >
                                <div className="flex">
                                    <img
                                        className="w-14 h-14 rounded-full"
                                        src="https://avatar.iran.liara.run/public"
                                        alt=""
                                    />
                                    <div className="ml-3">
                                        <h2 className="text-lg font-medium">
                                            {chat.expand?.users.map(
                                                (u: any) =>
                                                    u.id !== user?.id &&
                                                    u.username
                                            )}
                                        </h2>
                                        <p className="text-pColor">
                                            {chat.expand?.messages?.[
                                                chat.expand.messages.length - 1
                                            ]?.message || "Keine Nachricht"}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <div
                                onClick={() => deleteChat(chat.id)}
                                className="hover:bg-red-600 cursor-pointer rounded-lg p-3"
                            >
                                <TrashIcon className="w-6 h-6" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Keine offenen Chats.😢</p>
                )}
            </div>

            {/* Logout-Bereich, fixiert am unteren Ende */}
            <div
                onClick={logout}
                className="mt-3 cursor-pointer p-3 bg-mainBg rounded-lg flex flex-row items-center justify-between space-x-3"
            >
                <h2>Logout</h2>
                <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
            </div>
        </motion.div>
    );
}
