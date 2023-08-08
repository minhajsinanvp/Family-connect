import { useContext, useState } from "react"
import { userContext } from "../context";
import UserRoute from "../components/routes/userRoute";
import CreatePost from "../components/CreatePost";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import { Form } from "antd";




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
      if (response.data.error) {
        toast.error(response.data.error)
      }
      else {
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


  const handleImage = async (e) => {

    const file = e.target.files[0];

    let formData = new FormData()
    formData.append("image", file)
    console.log([...formData]);

    try {
      const response = await axios.post("/image-upload", formData)
    } catch (error) {
      console.log(error);
    }

  }


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
              handleImage={handleImage}
            />
          </div>
          <div className="col-md-4">sidebar</div>
        </div>
      </div>
    </UserRoute>



  )
}

export default dashboard