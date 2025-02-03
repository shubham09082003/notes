import Button from "./LogoutButton";


export default function NavBar() {
    return (
        <div className="flex justify-between items-center p-4 rounded-lg border-b-2 ">
            <div className="text-2xl font-bold text-black italic">
                Ai Notes
            </div>

            <div>
                <Button />
            </div>
        </div>
    )
}
