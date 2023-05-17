import { useState } from "react";
import twitterLogo from "../assets/twitter_logo-icon.svg"
import { Link } from "react-router-dom"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username, email, password)
    }
    return (
        <div className="bg-[#00000066] w-full h-screen flex justify-center items-center">
            <div className="bg-white w-1/4 h-3/5 rounded-xl ">
                <form onSubmit={ handleSubmit } className="flex justify-center items-center flex-col relative">
                    <img src={ twitterLogo } alt="twitter logo" className="mt-4"/>
                    <h3 className="text-3xl font-semibold mt-10 font-Helvetica Neue">Create a new account</h3>

                    
                    <input 
                    type="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className= {(error === "Username is required" || error ==="Username already exist") ? "border  mt-7 h-10 w-80 px-3 rounded-md border-[#f13232] outline-none" : "border-2  mt-7 h-10 w-80 px-3 rounded-md outline-[#49a3e3]"}
                    placeholder="Username"
                    />
                    {(error === "Username is required" || error ==="Username already exist") ? (<h6 className="absolute text-xs text-red-600 left-[111px] bottom-[225px]">{error}</h6>) : null}

                    <input 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className= {(error === "Email is required" || error ==="Email already exist") ? "border  mt-7 h-10 w-80 px-3 rounded-md border-[#f13232] outline-none" : "border-2  mt-7 h-10 w-80 px-3 rounded-md outline-[#49a3e3]"}
                        placeholder="Email address"
                    />
                    {(error === "Email is required" || error ==="Email already exist") ? (<h6 className="absolute text-xs text-red-600 left-[111px] bottom-[158px]">{error}</h6>) : null}


                
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className= {(error === "Password is required" || error === "Password should contain at least one lower case letter, one upper case letter and one numeric digit") ? "border  mt-7 h-10 w-80 px-3 rounded-md border-[#f13232] outline-none" : "border-2  mt-7 h-10 w-80 px-3 rounded-md outline-[#49a3e3]"}
                        placeholder="Password"
                    />
                
                    {error === "Password is required" ? (<h6 className="absolute text-xs text-red-600 left-[111px] bottom-[89px]">{error}</h6>) : null}
                    {error === "Password should contain at least one lower case letter, one upper case letter and one numeric digit"? (<div className="absolute text-xs text-red-600 left-[111px] top-[345px] w-[300px]">{error}</div>) : null}



                    <button type="submit"  disabled={isLoading} className="w-80 h-9 bg-black text-white mt-8 rounded-lg ">Sign up</button>
                    
                         
                    <Link to='/login'>
                        <h5 className="text-[#49a3e3] px-1 mt-5">Already have an account?</h5>
                    </Link>
                </form>
            </div>
        </div>

        
    )
}

export default Signup