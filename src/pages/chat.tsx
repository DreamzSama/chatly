
export default function Chat() {

    return (
        <div className="text-white h-full">
            <div className="flex flex-col h-full justify-between">
                <div>
                    <h1>User</h1>
                </div>
                <div>
                    <h1>Chat</h1>
                </div>
                <div>
                    <input
                        className="w-full outline-none focus:outline-primary p-2 rounded-lg bg-bgDark"
                        type="text"
                        placeholder="Schreiben..."
                    />
                </div>
            </div>
        </div>
    );
}
