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

export default function ContactModal({
    user,
    onUserSelect,
    showModal,
    setShowModal,
}: ModalProps) {
    return (
        <div
        style={{ display: showModal ? "block" : "none" }}
        className="fixed h-full inset-0 text-white bg-black/50 z-50 flex justify-center items-center"
    >
        <div className="bg-bgDark max-w-xl w-full p-3 rounded-lg relative transform">
            <div className="absolute top-2 right-2">
                <XCircleIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => setShowModal(false)}
                    aria-hidden="true"
                />
            </div>
            <h2 className="text-3xl text-center mb-4">Kontakte</h2>
            {user.length > 0 ? (
                user.map((u) => (
                    <div key={u.id}>
                        <p
                            onClick={() => onUserSelect(u.id)}
                            className="hover:bg-mainBg cursor-pointer transition-all ease-in duration-100 rounded-lg p-3 text-center"
                        >
                            {u.username}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-center">No users available</p>
            )}
        </div>
    </div>
    
    );
}
