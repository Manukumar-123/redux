import { useState } from "react";
import Cookies from 'js-cookie';

import axios from "axios";
import Otp from "../otp";
const ForgotPassword = () => {

const [showBox,setShowBox] = useState(true);
const [forgot,setForgot] = useState({email:''});

const forgotEmail = (e) => {
    setForgot({[e.target.name] : e.target.value});
}

const ForgotPassword = async (e) => {
    e.preventDefault();
    try{
        const url = 'http://localhost:8080/user';
        const {data} = await axios.post(`${url}/forgotPassword`,forgot);
        Cookies.set('token', data.token, { expires: 480 });
        data.token ? setShowBox(false) : setShowBox(true);

    }
    catch(error)
    {
        console.log(error);
    }
}

    return(
        <>
        {
            showBox ? 
       
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="w-96 border bg-gray-50 rounded-lg p-8">
                    <h1 className="text-center font-bold text-2xl mb-2">Forgot Password</h1>
                    <div className="flex mb-8 items-center justify-center">
                        <div className="border w-20 h-0 border-orange-400"></div>
                        <div className="border w-14 h-8 rounded-full bg-white flex items-center justify-center text-orange-400">OR</div>
                        <div className="border w-20 h-0 border-orange-400"></div>
                    </div>
                    <form className="grid gap-y-3" onSubmit={ForgotPassword}>
                        <h4 className="font-semibold">Enter Your Email</h4>
                        <input type="email" placeholder="example@gmail.com" name="email" onChange={forgotEmail} className="h-12 p-3 outline-none border border-blue-500 rounded-lg" />
                        <button type="submit" className="bg-blue-500 text-white font-semibold rounded-lg py-3">verify</button>
                    </form>
                </div>
            </div> :
            <Otp /> 
        }
        </>
    )
}

export default ForgotPassword;