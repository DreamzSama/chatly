import { useEffect, useState } from "react";
import pb from "../pocketbase"
import ContactModal from "../components/ContactModal";
import { useAuth } from "../context/AuthContext";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { useOutletContext } from "react-router-dom";


interface MenuContext {
    openMenu: boolean;
    setOpenMenu: (value: boolean) => void;
}

export default function Home() {
    const [contacts, setContacts] = useState<any>({});
    const [showModal, setShowModal] = useState(false);
    const [chats, setChats] = useState<any>([]);
    const {user} = useAuth();
    const {openMenu, setOpenMenu} = useOutletContext<MenuContext>();

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
        <div className="text-white flex justify-center items-center p-6 h-screen w-full bg-mainBg">
            {/* <button onClick={openModal} className="bg-primary p-3 rounded-lg hover:bg-purple-900 font-medium">
                Chat starten
            </button> */}
            <div onClick={() => setOpenMenu(!openMenu)}>
                <Bars3Icon className="h-6 w-6 cursor-pointer text-white" />
            </div>
            {/* <ContactModal onUserSelect={handleUserSelect} showModal={showModal} setShowModal={setShowModal} user={contacts} /> */}
        </div>
    );
}
