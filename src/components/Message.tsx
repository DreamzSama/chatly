import pb from "../pocketbase";

export default function Message() {

    const createMessage = async () => {
        const record = await pb.collection("message").create({
            message: "ich bins udo",
            user: "xkwk281u1o5t1kf",
            chat: "sss5pg596yxktx0",
        });
        console.log(record);
    };

    return (
        <div>
            <button className="button" onClick={createMessage}>
                Create Message
            </button>
        </div>
    );
}
