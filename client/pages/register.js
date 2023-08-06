import { useContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Modal } from "antd"
import Link from "next/link";
import AuthenForm from "../components/AuthenForm";
import { useRouter } from "next/router";
import { userContext } from "../context";



const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            const response = await axios.post(`/register`, {
                name,
                email,
                password,
                secret
            })

            setEmail("");
            setName("");
            setPassword("");
            setSecret("");
            setOk(response.data.ok)
            setLoading(false)
            // redirect("/login")


        } catch (error) {

            setLoading(false)
            toast.error(error.response.data);
        }

    }

    return (
        <div className="container-fluid bg-image">
            <div className="row py-5 ">
                <div className="col text-center">
                    <h1>Register</h1>
                </div>
            </div>



            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <AuthenForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
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

                        <p>You sucessfully registered</p>
                        <Link href="/login" className="btn btn-primary btn-sm">Login</Link>

                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="text-center">Already registered? <Link href="/login">Login</Link></div>
                </div>
            </div>
        </div>
    )
}


export default Register;