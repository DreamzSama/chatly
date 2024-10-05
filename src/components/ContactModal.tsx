import { XCircleIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";

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
        //     <div
        //     style={{ display: showModal ? "block" : "none" }}
        //     className="fixed h-full inset-0 text-white bg-black/50 z-50 flex justify-center items-center"
        // >
        //     <div className="bg-bgDark max-w-xl w-full p-3 rounded-lg relative transform">
        //         <div className="absolute top-2 right-2">
        //             <XCircleIcon
        //                 className="h-6 w-6 cursor-pointer"
        //                 onClick={() => setShowModal(false)}
        //                 aria-hidden="true"
        //             />
        //         </div>
        //         <h2 className="text-3xl text-center mb-4">Kontakte</h2>
        //         {user.length > 0 ? (
        //             user.map((u) => (
        //                 <div key={u.id}>
        //                     <p
        //                         onClick={() => onUserSelect(u.id)}
        //                         className="hover:bg-mainBg cursor-pointer transition-all ease-in duration-100 rounded-lg p-3 text-center"
        //                     >
        //                         {u.username}
        //                     </p>
        //                 </div>
        //             ))
        //         ) : (
        //             <p className="text-center">No users available</p>
        //         )}
        //     </div>
        // </div>

        <div
            className="w-full z-50 bg-black/50 h-full"
            style={{ display: showModal ? "block" : "none" }}
        >
            {/* Modal content */}
            <div className="flex justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: 300 }}
                    animate={{ opacity: showModal ? 1 : 0, y: showModal ? 0 : 300 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-mainBg text-white text-left max-w-md mt-[20rem] h-[100dvh] p-3 rounded-t-lg w-full"
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl text-white font-medium">
                            Kontakte
                        </h2>
                        <XCircleIcon
                            onClick={() => setShowModal(false)}
                            className="w-6 h-6 cursor-pointer"
                        />
                    </div>
                    <div>
                        {user.length > 0 ? (
                            user.map((u) => (
                                <div className="mt-3" key={u.id}>
                                    <p
                                        onClick={() => onUserSelect(u.id)}
                                        className="hover:bg-primary cursor-pointer transition-all ease-in duration-100 rounded-lg p-3"
                                    >
                                        {u.username}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No users available</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
