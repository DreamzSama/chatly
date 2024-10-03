import { useEffect, useState } from "react";
import pb from "../pocketbase"
import ContactModal from "../components/ContactModal";
import { useAuth } from "../context/AuthContext";


export default function Home() {
    const [contacts, setContacts] = useState<any>({});
    const [showModal, setShowModal] = useState(false);
    const [chats, setChats] = useState<any>([]);
    const {user} = useAuth();

    const openModal = () => {
        setShowModal(true);
    }

    const getContacts = async () => {
        const contactData = await pb.collection('users').getFullList({
            sort: '-created',
        });
        console.log(contactData);

        setContacts(contactData);
    }

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


    

    useEffect(() => {
        
        getContacts();
    }, [])

    return (
        <div className="text-white relative flex justify-center items-center p-6 h-screen w-full bg-mainBg">
            <button onClick={openModal} className="bg-primary p-3 rounded-lg hover:bg-purple-900 font-medium">
                Chat starten
            </button>
            <ContactModal onUserSelect={handleUserSelect} showModal={showModal} setShowModal={setShowModal} user={contacts} />
        </div>
    );
}
