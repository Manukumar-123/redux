import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UserLogin, UserLogout} from '../../redux/slices/login';
import {Navigate} from 'react-router-dom';
const Homepage = () => {
const dispatch = useDispatch();

const allData = {
    name : '',
    email : '',
    password : '',
    mobile : ''
}
const [data,setData] = useState(allData);
const [login,setLogin] = useState(false);
const [desabled,isDesabled] = useState(false);

const storeData = (e) => {
   const  key = e.target.name;
    let value = e.target.value;
    setData({...data,[key] : value});
}

const register = async (e) =>{
    e.preventDefault();
    const url = 'http://localhost:8080/user';
    try{
        const response = await axios.post(`${url}/register`,data);
        // login button desabled
        isDesabled(true);
        
        //token save in localstorage
        localStorage.setItem("token",response.data.token);
        console.log(response.data);

        //check success response in impliment in ui
        setLogin(true);
        dispatch(UserLogin(response.data));
    }
    catch(error)
    {
        isDesabled(false);
        dispatch(UserLogout());
        console.log(error.response);
    }
}

   if(login)
   return <Navigate to="/profile" />

    return(
        <>
            <div className="p-10 bg-[#37517E]">
                <h1 className="text-white text-5xl text-center">Sign Up</h1>
                <div className="grid gap-4 md:grid-cols-2 pt-10 ">
                    <div className="w-full h-full items-center justify-center flex">
                        <img src="https://www.prabhatwebtechnologies.com/assets/images/hero-img.png"
                           width="480"
                           height="300"  />
                    </div>
                    <div className="w-full h-full items-center justify-center flex">
                        <div className=" w-4/5">
                                <form onSubmit={register}>
                                <input type="text" placeholder="Enter Name" name="name" onChange={storeData} className="px-4 mb-4 p-2 w-full outline-0 border duration-700 hover:duration-700 hover:border-blue-700 rounded-lg" />
                                <input type="email" placeholder="Enter Your Email" name="email" onChange={storeData} className="px-4 mb-4 p-2 w-full outline-0 border duration-700 hover:duration-700 hover:border-black-700 rounded-lg" />
                                <input type="password" placeholder="Enter Your Password" name="password" onChange={storeData} className="px-4 mb-4 p-2 w-full outline-0 border duration-700 hover:duration-700 hover:border-cyan-700 rounded-lg" />
                                <input type="number" placeholder="Enter Your Number" name="mobile" onChange={storeData} className="px-4 mb-4 p-2 w-full outline-0 border duration-700 hover:duration-700 hover:border-green-700 rounded-lg" />
                               { 
                                 desabled ? 
                                 <button className="bg-gray-400 cursor-none text-white p-2 px-4 rounded-lg">
                                    Loading...
                                </button>
                                 :
                                <button className="border border-cyan-500 text-white hover:bg-cyan-500 duration-500 hover:duration-500 p-2 px-4 rounded-lg hover:rounded-lg">
                                    sign up
                                </button>
                                
                               }
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage;