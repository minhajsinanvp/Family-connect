import { useContext, useEffect, useState } from "react"
import { userContext } from "../../context";
import UserRoute from "../../components/routes/userRoute";
import CreatePost from "../../components/CreatePost";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import { Form, Modal, Pagination } from "antd";
import PostList from "../../components/PostList";
import SideBar from "../../components/SideBar";
import Link from "next/link";
import CommentForm from "../../components/CommentForm";
import Search from "../../components/Search";





function dashboard() {


  const [state, setState] = useContext(userContext)

  const [content, setContent] = useState("")
  const [imageDetails, setImageDetails] = useState({})

  const [imageUploading, setImageUploading] = useState(false)

  const [post, setPost] = useState([])

  const [people, setPeople] = useState([])

  const [comment,setComment]= useState('')
  const [visible,setVisible] = useState(false)
  const [currentPost, setCurrentPost] = useState({})
  const [totalPosts,setTotalPosts] = useState(0)
  const [page, setPage] = useState(1)


  useEffect(() => {

    if(state && state.token)
    { 
      getPost()
      getPeople()
      totalPost()
    
    }

    
    

  }, [state && state.token, page])




  const router = useRouter()


  const getPost = async () => {

    try {
      const response = await axios.get(`/get-post/${page}`);
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
      setPage(1)



      // Handle the response or navigate to another page if needed
      if (response.data.error) {
        toast.error(response.data.error)
      }
      else {
        
        toast.success(response.data.success)
        getPost()
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

  const getPeople = async() =>{
    try {
      const {data} = await axios.get("/find-people")
      // console.log(data);
      setPeople(data)
    } catch (error) {
      console.log(error);
    }
  }


  const handleFollow = async(user)=>{
    try {
      

      const {data} = await axios.put("/follow-request", {_id : user._id})

      let auth = JSON.parse(localStorage.getItem('auth'));

      auth.user = data;

      localStorage.setItem('auth', JSON.stringify(auth))

      setState({...state, user:data})
      toast.success(`Following ${user.name}`)

      let filtered = people.filter((person) => (person._id !== user._id))
      console.log(filtered);
      setPeople(filtered)
     
      getPost()
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleUnFollow = async(user) =>{

    try {
        const {data} = await axios.put("/user-unfollow", {_id: user._id})

        let auth = JSON.parse(localStorage.getItem('auth'));

        auth.user = data;
  
        localStorage.setItem('auth', JSON.stringify(auth))
  
        setState({...state, user:data})
        toast.success(`Unfollowing ${user.name}`)
  
        let filtered = people.filter((person) => (person._id !== user._id))
        console.log(filtered);
        setPeople(filtered)
       
        getPost()
    } catch (error) {
        console.log(error);
    }
}
  const handleLike = async(id)=> {
    try {
      // console.log("Post id ==>", _id);
      const {data} = await axios.put("/like-post", {_id: id})
      console.log(data);
      
      getPost()
      
    } catch (error) {
      console.log(error);
    }
  }

    const handleUnLike = async(id)=> {
    try {
      // console.log("Post id ==>", _id);
      const {data} = await axios.put("/unlike-post", {_id: id})
      console.log("User unliked the post");
      
      getPost()
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleComment = async(post) =>{
    setCurrentPost(post)
    setVisible(true)
  }
  
  const addComment = async(e)=>{

    e.preventDefault()
    // console.log(comment);
    // console.log(currentPost._id);

    try {
      const {data} = await axios.put("/add-comment",{postId : currentPost._id, comment})
      console.log(data);
      toast.success("Comment is posted")
      setComment("")
      setVisible(false)
      getPost()
    } catch (error) {
      console.log(error);
    }

  }

  const removeComment = async()=>{

  }


  const totalPost = async()=>{
    try {
      const {data} = await axios.get("/total-post")
      console.log(data);

      setTotalPosts(data)

    } catch (error) {
      
    }
  }
  

  const handleCommentDelete = async (postId, comment) => {

    try {
        console.log(postId, comment);


        const { data } = await axios.put("/delete-comment", { postId, comment })
        
        setPost(data)
        getPost()
     
    } catch (error) {

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
          handleLike = {handleLike}
          handleUnLike = {handleUnLike}
          peopleData={people}
          visibile = {visible}
          handleComment = {handleComment}
          setPost = {setPost}
          handleCommentDelete = {handleCommentDelete}
 
           /> 
           <Pagination className="mt-5 w-100 col-md-4 offset-md-4" current={page} total={(totalPosts /5 ) * 10} onChange={(value) => setPage(value)}/>
          </div>
          {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
          <div className="col-md-4 sidebar ">
          <Search />
          {state && state.user.following && <Link legacyBehavior href={`/user/following`}><a className=" text-info mt-2  h6 text-decoration-none">{state.user.following.length} Following</a></Link>}
            <SideBar peopleData={people} handleUnFollow={handleUnFollow} handleFollow={handleFollow} />
          </div>
        </div>
        <Modal 

          open={visible}
          onCancel={()=> setVisible(false)}
          title = "comment"
          footer= {null}
        >
         <CommentForm addComment={addComment} removeComment={removeComment} comment={comment} setComment={setComment} />
        </Modal>

       
      </div>
    </UserRoute>



  ) 
}

export default dashboard