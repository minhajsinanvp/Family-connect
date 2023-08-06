import { useContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Modal } from "antd"
import Link from "next/link";
import PasswordRestForm from "../components/PassworRestForm";


import { useRouter } from "next/router";
import { userContext } from "../context";



const ForgotPassword = () => {


    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(userContext);
    const router = useRouter()

    if (state && state.token) {
        router.push("/")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setLoading(true)
            const response = await axios.post(`/forgotpassword`, {

                email,
                newPassword,
                secret
            })

            
            if(response.data.sucess){
                
                toast.success(response.data.sucess)
                setLoading(false)
                setEmail("")
                setNewPassword("")
                setSecret("")
                router.push("/login")


            }

            else{
                toast.error(response.data.error)
            }
            setLoading(false)


            // redirect("/login")


        } catch (error) {

            setLoading(false)
            toast.error(error.response);
        }

    }

    return (
        <div className="container-fluid bg-image">
            <div className="row py-5 ">
                <div className="col text-center">
                    <h1>Password Resetting</h1>
                </div>
            </div>



            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <PasswordRestForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        secret={secret}
                        setSecret={setSecret}
                        loading={loading}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Modal
                        title="User Created Sucessfully"
                        open={ok}
                        onCancel={() => setOk(false)}
                        footer={null}>

                        <p>You sucessfully password changed</p>
                        <Link href="/login" className="btn btn-primary btn-sm">Login</Link>

                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="text-center">new user? <Link href="/register">Register</Link></div>
                </div>
            </div>
        </div>
    )
}


export default ForgotPassword;