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
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
        >
            <div className="bg-bgDark max-w-xl w-full p-3 rounded-lg relative transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2">
                <div className="flex justify-end mb-4">
                    <XCircleIcon
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => setShowModal(false)}
                        aria-hidden="true"
                    />
                </div>
                {user.length > 0 ? (
                    user.map((u) => (
                        <div key={u.id}>
                            <p
                                onClick={() => onUserSelect(u.id)}
                                className="hover:bg-mainBg cursor-pointer transition-all ease-in duration-100 rounded-lg p-3"
                            >
                                {u.username}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No users available</p>
                )}
            </div>
        </div>
    );
}
