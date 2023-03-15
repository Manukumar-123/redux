import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserLogout } from "../../redux/slices/login";
import { useState } from "react";
const Navbar = () => {
const [toggle,setToggle] = useState(false);
const dispatch = useDispatch();
const {login} = useSelector(response=>response);

return(
    <>
            <nav className="border p-4 px-8 flex item-center justify-between shadow">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 border rounded-full flex items-center justify-center relative bg-red-500">
                    <div className="w-5 h-5 border rounded-full bg-red-500 animate-ping absolute"></div>
                    </div>
                </div>
                <div className="flex gap-x-4">
                    <Link to="/">
                        <button className="bg-indigo-900 hover:bg-indigo-700 text-white hover:duration-300 p-1 px-4 rounded duration-300 ">
                            Home
                        </button>
                    </Link>

                    <Link to="/login">
                        <button className="bg-indigo-900 hover:bg-indigo-700 text-white hover:duration-300 p-1 px-4 rounded duration-300 ">
                            Login
                        </button>
                    </Link>
         
                        {
                            login.user &&
                        <div className="relative">
                            <div onClick={ ()=>setToggle(!toggle)} className="w-8 h-8 bg-red-700  border rounded-full flex hover:cursor-pointer items-center justify-center">
                                <p className="text-white font-bold p-0 m-0 capitalize">{login.user.name[0]}</p>
                            </div>
                           { toggle &&
                            <ul className="flex flex-col w-60 hover:cursor-pointer gap-y-1 rounded-lg absolute -right-6 top-12 font-semibold bg-white border shadow-lg">
                                <li className="capitalize hover:bg-gray-100 p-2">{login.user.name}</li>
                                <li className="hover:bg-gray-100 p-2">{login.user.email}</li>
                                <hr />
                                <li onClick={ ()=>dispatch(UserLogout())} className="hover:bg-gray-100 p-2">Log Out</li>
                            </ul>  }
                        </div>                        
                        }
                </div>
            </nav>
        </>
    )
}
export default Navbar;