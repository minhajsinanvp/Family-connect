import { LoadingOutlined } from "@ant-design/icons"

const PasswordRestForm = ({
    handleSubmit,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    secret,
    setSecret,
    loading,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            

            <div className="form-group p-2">
                <label htmlFor="" className="text-muted">Email address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group p-2">
                <label htmlFor="" className="text-muted">Set New Password</label>
                <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="text" className="form-control" placeholder="Enter new password" />
            </div>
            

            

            <> <div className="form-group p-2">
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
            
            

            <div className="form-group p-2">
                <button disabled={!email || !newPassword ||  !secret} style={{ color: "black", fontSize: "larger" }} className="btn btn-outline-primary w-100">
                {loading ? <LoadingOutlined spin /> : "Submit"}
                
                </button>

            </div>
        </form>
    )
}

export default PasswordRestForm;