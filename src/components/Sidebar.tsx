export default function Sidebar() {
    return (
        <div className="max-w-[350px] p-4 text-white w-full bg-bgDark">
            <div>
                <h1 className="text-3xl font-medium">Chats</h1>
            </div>
            <div className="mt-3">
                <input className="w-full outline-none focus:outline-primary p-2 rounded-lg bg-mainBg" type="text" placeholder="Suchen..." />
            </div>
            <div className="flex cursor-pointer p-3 hover:bg-mainBg rounded-lg items-center mt-3">
                <img className="w-14 h-14 rounded-full " src="https://picsum.photos/200" alt="" />
                <div className="ml-3">
                    <h2 className="text-lg font-medium">Firstname Lastname</h2>
                    <p className="text-pColor">Hey ich hab da etw...</p>
                </div>
            </div>
        </div>
    );
}
