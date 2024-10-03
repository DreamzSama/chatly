import { useParams } from "react-router-dom";
import pb from "../pocketbase";
import { CSSProperties, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { PaperClipIcon } from "@heroicons/react/16/solid";

export default function Chat() {
    const [messages, setMessages] = useState<any[]>([]);
    const [sendMessage, setSendMessage] = useState("");
    const { id } = useParams();
    const { user } = useAuth();

    const messageStyle: { [key: string]: CSSProperties } = {
        otherUser: {
            backgroundColor: "#6E54B5",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "5px",
            textAlign: "left",
            color: "white",
            maxWidth: "80%",
        },
        me: {
            backgroundColor: "#2B2638",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "5px",
            textAlign: "right",
            color: "white",
            maxWidth: "80%",
        },
    };

    const getMessageData = async (id: string) => {
        try {
            const record = await pb.collection("message").getFullList({
                filter: `chat = "${id}"`,
                sort: "-created",
                $autoCancel: false,
                expand: "user, chat",
            });
            setMessages(record);
        } catch (error) {
            console.error("Fehler beim Abrufen der Chat-Daten:", error);
        }
    };

    const sendMessageData = async (id: any) => {
        try {
            const newMessage = await pb.collection("message").create({
                message: sendMessage,
                user: user?.id,
                chat: id,
            });

            setMessages((prevMessages) => [newMessage, ...prevMessages]);

            setSendMessage("");
            console.log("Nachricht gesendet und Chat aktualisiert");
        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
        }
    };

    
    
    useEffect(() => {
        if (id) {
            // Nachrichten abrufen
            getMessageData(id);

            // Echtzeit-Abonnement auf Nachrichten
            pb.realtime.subscribe("message", (e) => {
                console.log("Neue Echtzeit-Nachricht:", e.record);
                if (e.record.chat === id) {
                    setMessages((prevMessages) => [e.record, ...prevMessages]); // Nur wenn die Nachricht zu diesem Chat gehört
                }
            });
        }

        return () => {
            console.log("WebSocket wird geschlossen...");
            pb.realtime.unsubscribe("message"); // Echtzeit-Abonnement beenden
        };
    }, [id]);
    
    

    return (
        <div className="text-white h-full flex flex-col justify-between">
            <div className="p-3 bg-bgDark">
                <h1 className="text-3xl p-3">Chat</h1>
            </div>
            <div className="flex-grow overflow-auto p-4 flex flex-col-reverse space-y-reverse space-y-3">
                {messages.length > 0 ? (
                    messages.map((message: any) => (
                        <div
                            className={`flex ${
                                message.user === user?.id
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                            key={message.id}
                        >
                            <div
                                style={
                                    message.user === user?.id
                                        ? messageStyle.me
                                        : messageStyle.otherUser
                                }
                            >
                                <h1>{message.message}</h1>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Keine Nachrichten vorhanden.</p>
                )}
            </div>

            {/* Eingabebereich unten fixiert */}
            <div className="flex items-start space-x-3 p-3">
                <PaperClipIcon className="h-10 w-10 bg-bgDark p-1 rounded-full cursor-pointer" />
                <input
                    onChange={(e) => setSendMessage(e.target.value)}
                    className="w-full h-full outline-none rounded-lg focus:outline-primary p-2 bg-bgDark"
                    type="text"
                    placeholder="Schreiben..."
                />
                <button
                    onClick={() => sendMessageData(id)}
                    className="p-3 rounded-lg bg-primary text-white font-semibold"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
