import { useNavigate } from "react-router-dom";

export default function Button() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (

        <div>
            <button className="bg-blue-500 text-white w-30 p-2 rounded-md hover:bg-blue-600 italic"
            onClick={handleLogout}
            >
                Logout
            </button>
        </div>


    )
}

