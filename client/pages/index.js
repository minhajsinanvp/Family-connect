import{useContext} from "react"
import {userContext} from "../context/"

const Home = () => {
    const [state,setState] = useContext(userContext)
    return (
        <div className="continer">
            <div className="row">
                <div className="col">
                    <h1 className="display-1 text-center py-5">Family Connect</h1>
                   
                    
                </div>
            </div>
 
        </div>
    )
}


export default Home;