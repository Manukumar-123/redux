import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ConfirmPassword from "../confirm-password";


const Otp = () => {

const [otp,setOtp] = useState(null);
const [error,setError] = useState(null); 
const [confirm,setConfirm] = useState(false);

const myOtp = (e) => {
    setOtp( e.target.value);
}

const ForgotPassword = async (e) => {
    e.preventDefault();
    try{
        const url = 'http://localhost:8080/user';
        const token = Cookies.get('token');
        const {data} = await axios.post(`${url}/verifyotp`,{otp,token});
        data.verified ? setConfirm(true) : setConfirm(false);
    }
    catch(error)
    { 
        if((error.response.status===404)){
            setError(error.response.data.message)
        }
    }
}

// const restPassword = async (e) => {
//     e.preventDefault();
//     try{
//         const url = 'http://localhost:8080/user';
//         const token = Cookies.get('token');
//         const {data} = await axios.put(`${url}/reset`,{token});
//         if(data.verified){
//             window.location.href='';
//         }
//     }
//     catch(error)
//     { 
//         if((error.response.status===404)){
//             setError(error.response.data.message)
//         }
//     }
// }

  
    return(
        confirm ? <ConfirmPassword /> :
        <>
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="w-96 border bg-blue-200 rounded-lg p-8">
                    <h1 className="text-center font-bold text-2xl mb-2">OTP</h1>
                    {
                        error && <p>{error}</p>
                    }
                    <div className="flex mb-8 items-center justify-center">
                        <div className="border w-20 h-0 border-orange-400"></div>
                        <div className="border w-14 h-8 rounded-full bg-white flex items-center justify-center text-orange-400">OR</div>
                        <div className="border w-20 h-0 border-orange-400"></div>
                    </div>
                    <form className="grid gap-y-3" onSubmit={ForgotPassword}>
                        <h4 className="font-semibold text-center">Enter Your Otp</h4>
                        <div className="flex justify-center gap-x-4">
                        </div>
                        <input type="text" placeholder="1234" name="otp" onChange={myOtp} className="h-12 p-3 outline-none border border-blue-500 rounded-lg" />
                        <button type="submit" className="bg-blue-500 text-white font-semibold rounded-lg py-3">verify</button>
                        <p className="font-semibold underline hover:cursor-pointer">resend</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Otp;