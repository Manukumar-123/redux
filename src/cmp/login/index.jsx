import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserLogin, UserLogout} from '../../redux/slices/login';
const Login = () => {
const dispatch = useDispatch();

const allData = {
    email : '',
    password : ''
}
const [data,setData] = useState(allData);
const [islogin,setLogin] = useState(false);
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
        const response = await axios.post(`${url}/login`,data);
        
        //login btn desabled
        isDesabled(true);

        // token save in localstorage
        localStorage.setItem("token",response.data.token);
        console.log(response.data);

        //dispatch 
        dispatch(UserLogin(response.data));
    }
    catch(error)
    {   
        isDesabled(false)
        dispatch(UserLogout());
        setLogin(true);
    }

}

    return(
        <>
            <div className="p-10 bg-[#37517E]">
                <h1 className="text-white text-5xl text-center">Log in</h1>
                <div className="grid pt-10 items-center justify-center flex ">
                    <div className="w-96 h-full">
                                <form onSubmit={register}>
                                <input type="email" placeholder="Enter Your Email" name="email" onChange={storeData} className="px-4 mb-4 p-2 w-full outline-0 border duration-700 hover:duration-700 hover:border-black-700 rounded-lg" />
                                <input type="password" placeholder="Enter Your Password" name="password" onChange={storeData} className="px-4 mb-4 p-2 w-full outline-0 border duration-700 hover:duration-700 hover:border-cyan-700 rounded-lg" />
                                
                                {
                                    desabled ? 
                                <button className="border border-cyan-500 text-white hover:bg-cyan-500 duration-500 hover:duration-500 p-2 px-4 rounded-lg hover:rounded-lg">
                                Loading...
                                </button>
                                 :
                               <button className="border border-cyan-500 text-white hover:bg-cyan-500 duration-500 hover:duration-500 p-2 px-4 rounded-lg hover:rounded-lg">
                                    Login
                                </button> 
                                }

                                {
                                    islogin ?
                                <h4 className="mb-3">login failed</h4> : null
                                }
                                <Link to="/forgot-password" className=" mx-4 text-blue-500 hover:underline">forgot password</Link>

                            </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;