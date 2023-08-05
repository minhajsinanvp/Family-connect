import { LoadingOutlined } from "@ant-design/icons"

const AuthenForm = ({
    handleSubmit, name, setName,
    email,
    setEmail,
    password,
    setPassword,
    secret,
    setSecret,
    loading,
    page
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {page !== "login" && 
            <div className="form-group p-2">
                <label htmlFor="" className="text-muted">Your name</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Enter name" />
            </div>
            }

            <div className="form-group p-2">
                <label htmlFor="" className="text-muted">Email address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group p-2">
                <label htmlFor="" className="text-muted">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" />

            </div>

            {page !== "login" && <> <div className="form-group p-2">
                <label htmlFor="" className="text-muted">Pick a question</label>

                <select className="form-control mb-1" name="" id="">
                    <option value="">What is your pet name ?</option>
                    <option value="">What is your best teacher name ?</option>
                    <option value="">What is favourite color</option>
                </select>


            </div>

            <div className="form-group p-2">
                <input placeholder="Enter your secret" value={secret} onChange={e => setSecret(e.target.value)} type="text" className="form-control" />
            </div>
            </>
            
            }

            <div className="form-group p-2">
                <button disabled={page !=="login" ? !name || !email || !password || !secret: !email || !password} style={{ color: "black", fontSize: "larger" }} className="btn btn-outline-primary w-100">
                {loading ? <LoadingOutlined spin /> : (page !== "login" ? "Register" : "Login")}
                
                </button>

            </div>
        </form>
    )
}

export default AuthenForm