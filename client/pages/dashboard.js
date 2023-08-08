import { useContext, useState } from "react"
import { userContext } from "../context";
import UserRoute from "../components/routes/userRoute";
import CreatePost from "../components/CreatePost";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';




function dashboard() {


  const [state, setState] = useContext(userContext)

  const [content, setContent] = useState("")

  const router = useRouter()
  


  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/create-post", {
        content,
      });

      
      // Handle the response or navigate to another page if needed
      if(response.data.error){
        toast.error(response.data.error)
      }
      else{
        toast.success(response.data.success)
      }

      // Clear the content after successful post submission
      setContent("");
    } catch (error) {
      // Handle the error
      if (error.response) {
        console.log("Request error:", error.response.data);
      } else {
        console.log("Network error:", error.message);
      }
    }
  };



  return (

    <UserRoute>
      <div className="container-fluid ">
        <div className="row">
          <div className="col display-1 text-center">
            Dashboard page
          </div>
        </div>

        <div className="row py-5">
          <div className="col-md-8">
            <CreatePost
              handlePostSubmit={handlePostSubmit}
              content={content}
              setContent={setContent}
            />
          </div>
          <div className="col-md-4">sidebar</div>
        </div>
      </div>
    </UserRoute>



  )
}

export default dashboard