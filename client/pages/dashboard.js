import { useContext } from "react"
import { userContext } from "../context"


function dashboard() {

    const [state,setState] = useContext(userContext)
  return (
    <div className="container ">
        <div className="row">
            <div className="col display-1 text-center">
                Dashboard page
            </div>
        </div>
    </div>
  )
}

export default dashboard