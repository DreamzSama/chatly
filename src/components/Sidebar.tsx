import { useEffect, useState } from "react";
import pb from "../pocketbase";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftEndOnRectangleIcon, Bars3Icon } from "@heroicons/react/16/solid";

export default function Sidebar({ openMenu, setOpenMenu, openModal, setContacts }: any) {
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
        } catch (error) {
            console.error("Fehler beim Abrufen der Chats:", error);
        }
    };

    useEffect(() => {
        getChats(user?.id);
        getContacts(); // Kontakte abrufen

        pb.realtime.subscribe("chat", async (e) => {
            console.log(e);
            if (e.record.users.includes(user?.id)) {
                setChats((prevChats: any) => [e.record, ...prevChats]);
            }
        });
    }, [user?.id]);

    return (
        <div
            style={{ display: openMenu ? "block" : "none" }}
            className="max-w-[350px] transition transform flex flex-col justify-between p-4 text-white w-full bg-bgDark"
        >
            <div>
                <div className="flex justify-between flex-row items-center">
                    <h1 className="text-3xl font-medium">Chats</h1>
                    <Bars3Icon
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
                        className="w-full mt-3 p-2 rounded-lg bg-primary"
                        onClick={openModal} // Öffnet das Modal beim Klicken
                    >
                        Create Chat
                    </button>
                </div>
            </div>
            <div className="mt-3 overflow-y-auto flex-grow h-full">
                {chats.length > 0 ? (
                    chats.map((chat: any) => (
                        <Link key={chat.id} to={`/chat/${chat.id}`}>
                            <div className="flex cursor-pointer p-3 hover:bg-mainBg rounded-lg items-center mt-3">
                                <img className="w-14 h-14 rounded-full" src="https://picsum.photos/200" alt="" />
                                <div className="ml-3">
                                    <h2 className="text-lg font-medium">
                                        {chat.expand?.users.map(
                                            (u: any) =>
                                                u.id !== user?.id && u.username
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
                    ))
                ) : (
                    <p>No chats available</p>
                )}
            </div>
            <div
                onClick={logout}
                className="mt-3 cursor-pointer p-3 bg-mainBg rounded-lg flex flex-row items-center justify-between space-x-3"
            >
                <h2>Logout</h2>
                <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
            </div>
        </div>
    );
}
