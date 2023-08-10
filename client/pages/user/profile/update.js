import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Modal } from "antd"
import Link from "next/link";
import AuthenForm from "../../../components/AuthenForm";
import { useRouter } from "next/router";
import { userContext } from "../../../context";



const ProfileUpdate = () => {
    const [state, setState] = useContext(userContext);
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setuserName] = useState("")
    const [about, setAbout] = useState("")



    useEffect(() => {
        if (state && state.user) {
            console.log(state.user);
            setuserName(state.user.userName)
            setName(state.user.name)
            setEmail(state.user.email)
            setPassword(state.user.password)
            setSecret(state.user.secret)

        }

    }, [state && state.user])

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setLoading(true)
            const { data } = await axios.post(`/profile-update`, {
                name,
                username,
                about,
                password,
                secret
            })
            // console.log(data);
            if (data.error) {
                setLoading(false)
                toast.error(data.error)
            }


            else {
               
                setOk(true)

                let auth =JSON.parse(localStorage.getItem("auth"))

                // console.log(auth);

                auth.user = data

                // console.log(auth);

                localStorage.setItem("auth",JSON.stringify(auth));
                setState({...state,user: data})
                setLoading(false)
                toast.success("Profile is update sucessfully")

                // auth.user = 

            }
            // redirect("/login")


        } catch (error) {

            setLoading(false)
            console.log(error);

        }

    }

    return (
        <div className="container-fluid bg-image">
            <div className="row py-5 ">
                <div className="col text-center">
                    <h1>Profile Update</h1>
                </div>
            </div>



            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <AuthenForm
                        profileUpdate={true}
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        email={email}
                        username={username}
                        setuserName={setuserName}
                        about={about}
                        setAbout={setAbout}
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
                        open={false}
                        onCancel={() => setOk(false)}
                        footer={null}>
                        <p>Profile sucessfully updated</p>
                        <Link href="/" className="btn btn-primary btn-sm">ok</Link>

                    </Modal>
                </div>
            </div>

        </div>
    )
}


export default ProfileUpdate;