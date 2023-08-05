import { useContext } from "react"
import { userContext } from "../context";
import UserRoute from "../components/routes/userRoute";




function dashboard() {


  return (

    <UserRoute>
       <div className="container ">
        <div className="row">
          <div className="col display-1 text-center">
            Dashboard page
          </div>
        </div>
      </div>
    </UserRoute>

     

  )
}

export default dashboard