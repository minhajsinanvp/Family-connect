import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Modal } from "antd"
import Link from "next/link";
import { useContext } from "react"; 
import AuthenForm from "../components/AuthenForm";
import {useRouter} from "next/router"
import { userContext } from "../context";




const Login = () => {

   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const [state, setState] = useContext(userContext)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setLoading(true)
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
    
                email,
                password,
                
            })

            // console.log(data);
            
            setState({
                user: data.user,
                token: data.token
            })

            //saving in local storage


            window.localStorage.setItem('auth', JSON.stringify(data))
            
            toast.success("User logged in")
            setLoading(false)
            // console.log(state);
            router.push("/")
       


        } catch (error) {

            setLoading(false)
            toast.error(error.response.data);
        }

    }

    return (
        <div className="container-fluid bg-image">
            <div className="row py-5 ">
                <div className="col text-center">
                    <h1>Login</h1>
                </div>
            </div>



            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <AuthenForm
                        handleSubmit={handleSubmit}
                       
                      
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        loading = {loading}
                        page = "login"
                    />
                </div>
            </div>
            
            <div className="row">
                <div className="col">
                    <div className="text-center"> New user? <Link href="/register">Register here</Link></div>
                </div>
            </div>
        </div>
    )
}


export default Login;