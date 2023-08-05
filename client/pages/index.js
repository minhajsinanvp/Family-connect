import{useContext} from "react"
import {userContext} from "../context/"

const Home = () => {
    const [state,setState] = useContext(userContext)
    return (
        <div className="continer">
            <div className="row">
                <div className="col">
                    <h1 className="display-1 text-center py-5">Connet You</h1>
                    {/* {JSON.stringify(state)} */}
                    <img src="/images/bird.jpg" alt="" />
                </div>
            </div>

        </div>
    )
}


export default Home;