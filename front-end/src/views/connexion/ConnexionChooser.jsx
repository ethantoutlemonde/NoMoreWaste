import { Link } from "react-router-dom";

export default function ConnexionChooser() {
    return (
        <div className="container-80 flex justify-center">
            <div className="bg-gray-50 w-96 p-14 rounded-2xl mt-14 shadow-md">
                <h1 className="text-2xl font-semibold">Would you want to</h1>
                <div className="flex flex-col gap-4 mt-4">
                    <Link to="login" className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">
                        Login
                    </Link>
                    Or
                    <Link to="register" className="bg-blue-400 text-white p-2 rounded-lg border shadow hover:bg-blue-500 hover:shadow-md duration-100">
                        Register
                    </Link>
                </div>

            </div>
        </div>
    )
}