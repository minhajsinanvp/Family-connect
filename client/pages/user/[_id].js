import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userContext } from "../../context";
import userRoute from "../../components/routes/userRoute";
import CreatePost from "../../components/CreatePost";
import PostList from "../../components/PostList";



const EditPost = () => {
    const [content, setContent] = useState("")
    const [imageDetails, setImageDetails] = useState({})

    const [imageUploading, setImageUploading] = useState(false)
    const [post, setPost] = useState({})
    const router = useRouter()
    // console.log("Router : ",router);
    const id = router.query._id


    useEffect(() => {
        if (id) {

            editPost()
        }
    }, [id])


    const editPost = async () => {
        try {
            
            const {data} = await axios.put(`/edit-post/${id}`,{
                content,
                imageDetails
            })
            setPost(data);
            console.log(data.content);
            setContent(data.content)
            setImageDetails(data.image)
        } catch (error) {
            console.log(error);
        }
    }


    const handlePostSubmit = async(e) => {
        e.preventDefault();
       const response = await axios.post(`/update-post/${id}`) 
    }


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

        <userRoute>
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
                       
                        
                    </div>
                    <pre>{JSON.stringify(post, null, 4)}</pre>
                  
                </div>
            </div>
        </userRoute>


    )
}

export default EditPost;