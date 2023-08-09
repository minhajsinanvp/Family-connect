import { useContext, useEffect, useState } from "react"
import { userContext } from "../../context";
import UserRoute from "../../components/routes/userRoute";
import CreatePost from "../../components/CreatePost";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import { Form } from "antd";
import PostList from "../../components/PostList";




function dashboard() {


  const [state, setState] = useContext(userContext)

  const [content, setContent] = useState("")
  const [imageDetails, setImageDetails] = useState({})

  const [imageUploading, setImageUploading] = useState(false)

  const [post, setPost] = useState([])

  useEffect(() => {

    if(state && state.token)
    { getPost()}

  }, [state && state.token])

  const router = useRouter()


  const getPost = async () => {

    try {
      const response = await axios.get("/get-post");
      // console.log(response.data);
      setPost(response.data)
    } catch (error) {
      console.log(error);
    }
  }


  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/create-post", {
        content,
        imageDetails
      });

      setImageDetails({})



      // Handle the response or navigate to another page if needed
      if (response.data.error) {
        toast.error(response.data.error)
      }
      else {
        getPost();
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
    // console.log([...formData]);

    try {
      setImageUploading(true)
      const response = await axios.post("/image-upload", formData)



      setImageDetails({
        url: response.data.url,
        public_id: response.data.public_id
      })

      // console.log(imageDetails);


      // console.log(response.data);
      setImageUploading(false)
    } catch (error) {
      console.log(error);
      setImageUploading(false)
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
              imageUploading={imageUploading}
              imageDetails={imageDetails}

            />
          <PostList
          postList = {post}
           />
          </div>
          {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
          <div className="col-md-4">sidebar</div>
        </div>
      </div>
    </UserRoute>



  )
}

export default dashboard