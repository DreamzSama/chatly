import { XCircleIcon } from "@heroicons/react/16/solid";

type User = {
    id: string;
    username: string;
};

interface ModalProps {
    user: User[];
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    onUserSelect: (userId: string) => void;
}

export default function ContactModal({ user, onUserSelect, showModal, setShowModal }: ModalProps) {

    
    return (
        <div style={{ display: showModal ? "block" : "none" }} className="bg-bgDark container mx-auto max-w-xl absolute left-0 right-0 w-full p-3 rounded-lg">
            <div className="flex justify-end mb-4">
                <XCircleIcon className="h-6 w-6 cursor-pointer" onClick={() => setShowModal(false)} aria-hidden="true" />
            </div>
            {user.length > 0 ? (  // Only map if user array has elements
                user.map((u) => (
                    <div key={u.id}>
                        <p onClick={() => onUserSelect(u.id)} className="hover:bg-mainBg cursor-pointer transition-all ease-in duration-100 rounded-lg p-3">
                            {u.username}
                        </p>
                    </div>
                ))
            ) : (
                <p>No users available</p>  // Show fallback message if no users are passed
            )}
        </div>
    );
}
