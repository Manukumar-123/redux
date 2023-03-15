import { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const ConfirmPassword = () => {

const [pass,setPass] = useState(null);
const [conPass,setConPass] = useState(null);
const navigate = useNavigate();

const firstPassword = (e) => {
    setPass(e.target.value);
}

const confirmPassword = (e) => {
    setConPass(e.target.value);
}

const updatePassword = async (e) => {
    e.preventDefault();
    if(pass === conPass)
    {
        try{
            const url = 'http://localhost:8080/user';
            const token = Cookies.get('token');
            const {data} = await axios({
                method : 'put',
                url : `${url}/reset/password`,
                data : {pass},
                headers : {
                    Authorization : token
                }
            });
            if(data.reset){
                navigate('/login');
                // window.location.href='/login';
            }
    
        }
        catch(error)
        {
            console.log(error);
        }
    }
    else{
        alert('please right same to password');
    }
    
}

    return(
        <>
        {                     
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="w-96 border bg-gray-50 rounded-lg p-8">
                    <h1 className="text-center font-bold text-2xl mb-2">Password</h1>
                    <div className="flex mb-8 items-center justify-center">
                        <div className="border w-20 h-0 border-orange-400"></div>
                        <div className="border w-14 h-8 rounded-full bg-white flex items-center justify-center text-orange-400">OR</div>
                        <div className="border w-20 h-0 border-orange-400"></div>
                    </div>
                    <form className="grid gap-y-3" onSubmit={updatePassword}>
                        <h4 className="font-semibold">Enter Your Password</h4>
                        <input type="text" placeholder="password" name="password" onChange={firstPassword} className="h-12 p-3 outline-none border border-blue-500 rounded-lg" />
                        <input type="text" placeholder="confirm password" name="confirmPassword" onChange={confirmPassword} className="h-12 p-3 outline-none border border-blue-500 rounded-lg" />
                       
                        <button type="submit" className="bg-blue-500 text-white font-semibold rounded-lg py-3">Update</button>
                    </form>
                </div>
            </div> 
            
        }
        </>
    )
}

export default ConfirmPassword;