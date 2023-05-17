import { useState } from "react";
import twitterLogo from "../assets/twitter_logo-icon.svg"
import { Link } from "react-router-dom"
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password )
    }
    return (
        <div className="bg-[#00000066] w-full h-screen flex justify-center items-center">
            <div className="bg-white w-1/4 h-3/5 rounded-xl ">
                <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col relative">
                    <img src={ twitterLogo } alt="twitter logo" className="mt-4"/>
                    <h3 className="text-4xl font-semibold mt-10 Helvetica Neue font-Helvetica Neue">Sign in to Twitter</h3>

                    <input 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className= {(error === "Email is required" || error ==="Incorrect email") ? "border  mt-7 h-10 w-80 px-3 rounded-md border-[#f13232] outline-none" : "border-2  mt-7 h-10 w-80 px-3 rounded-md outline-[#49a3e3]"}
                        placeholder="Email address"
                    />
                    {(error === "Email is required" || error ==="Incorrect email") ? (<h6 className="absolute text-xs text-red-600 left-[111px] bottom-[178px]">{error}</h6>) : null}

                
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className= {(error === "Password is required" || error === "Incorrect password") ? "border  mt-7 h-10 w-80 px-3 rounded-md border-[#f13232] outline-none" : "border-2  mt-7 h-10 w-80 px-3 rounded-md outline-[#49a3e3]"}
                        placeholder="Password"
                    />
                    {(error === "Password is required" || error === "Incorrect password") ? (<h6 className="absolute text-xs text-red-600 left-[111px] bottom-[108px]">{error}</h6>) : null}


                    <button disabled={isLoading} type="submit" className="w-80 h-9 bg-black text-white mt-8 rounded-lg ">Log in</button>

                    <div className="flex mt-10">
                        <h6>Don't have an account?</h6>                
                        <Link to='/signup'>
                            <h6 className="text-[#49a3e3] px-1">Signup</h6>
                        </Link>
                    </div>
                </form>
            </div>
        </div>

        
    )
}

export default Login