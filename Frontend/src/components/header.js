import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { Link, useNavigate } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
const HeaderComponent = () => {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const logout = () => {
        setToken("");
        navigate("/login");
    };

    return (
        <header className="bg-slate-400/50 w-[60%] h-[10%] rounded-3xl flex flex-row items-center justify-between gap-10 px-5">
            <div
                className="text-[30px] font-bold text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text"
                onClick={() => navigate("/dashboard")}
                style={{ cursor: "pointer" }}
            >
                LogoName
            </div>
            <nav className="w-full">
                <ul className="flex flex-row items-center justify-evenly text-black font-semibold text-sm">
                    <li>
                        <Link to="/dashboard" className="hover:cursor-pointer hover:text-blue-700">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/create" className="hover:cursor-pointer hover:text-blue-700">
                            Create
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/select" className="hover:cursor-pointer hover:text-blue-700">
                            Select
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/contact" className="hover:cursor-pointer hover:text-blue-700">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
            <div>
                <button
                    className="text-white bg-black px-5 py-2 rounded-2xl hover:bg-slate-700 hover:text-slate-300"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default HeaderComponent;
