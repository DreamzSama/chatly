import { useEffect, useState } from "react";
import pb from "../pocketbase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [chats, setChats] = useState<any>([]);
    const { user } = useAuth();

    const getChats = async (userId: string | undefined) => {
        if (!userId) return;

        try {
            const records = await pb.collection("chat").getFullList({
                filter: `users ?~ "${userId}"`,
                expand: "users",
                $autoCancel: false,
            });

            setChats(records);
            console.log(records);
        } catch (error) {
            console.error("Fehler beim Abrufen der Chats:", error);
        }
    };

    useEffect(() => {
        getChats(user?.id);
    }, [user?.id]);

    return (
        <div className="max-w-[350px] p-4 text-white w-full bg-bgDark">
            <div>
                <h1 className="text-3xl font-medium">Chats</h1>
            </div>
            <div className="mt-3">
                <input
                    className="w-full outline-none focus:outline-primary p-2 rounded-lg bg-mainBg"
                    type="text"
                    placeholder="Suchen..."
                />
            </div>
            {chats.length > 0 ? (
                chats.map((chat: any) => (
                    <Link key={chat.id} to={`/chat/${chat.id}`}>
                        <div className="flex cursor-pointer p-3 hover:bg-mainBg rounded-lg items-center mt-3">
                            <img
                                className="w-14 h-14 rounded-full "
                                src="https://picsum.photos/200"
                                alt=""
                            />
                            <div className="ml-3">
                                <h2 className="text-lg font-medium">
                                    {chat.expand?.users.map(
                                        (u: any) =>
                                            u.id !== user?.id && u.username
                                    )}
                                </h2>
                                <p className="text-pColor">
                                    Hey ich hab da etw...
                                </p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No chats available</p>
            )}
        </div>
    );
}
