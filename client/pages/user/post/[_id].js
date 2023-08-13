
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import userRoute from "../../../components/routes/userRoute"
import { toast } from 'react-toastify'
import Post from "../../../components/Post";
import Link from "next/link";
import { Modal } from "antd";
import CommentForm from "../../../components/CommentForm";

const PostComments = () => {

    const [post, setPost] = useState({})
    const router = useRouter()
    const _id = router.query._id
    const [comment, setComment] = useState('')
    const [visible,setVisible] = useState(false)
    const [currentPost, setCurrentPost] = useState({})
    const handleComment = async (post) => {
        setCurrentPost(post)
        setVisible(true)
    }

    const addComment = async (e) => {

        e.preventDefault()
        // console.log(comment);
        // console.log(currentPost._id);

        try {
            const { data } = await axios.put("/add-comment", { postId: currentPost._id, comment })
            console.log(data);
            toast.success("Comment is posted")
            setComment("")
            setVisible(false)
            getPost()
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {

        if (_id) getPost()

    }, [_id])


    const getPost = async () => {
        try {

            const { data } = await axios.get(`/user-post/${_id}`)
            setPost(data)

        } catch (error) {
            console.log(error);
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
        <>

            <div className="row col-md-8 offset-md-2 mt-5">
                <Post setPost={setPost} post={post} count={100} handleCommentDelete={handleCommentDelete} handleComment={handleComment} />
                <Link legacyBehavior href={`/user/dashboard`}><a className=" mt-2 btn btn-info d-flex justify-content-center h6 text-decoration-none">Dashboard</a></Link>
            </div>

            <Modal

                open={visible}
                onCancel={() => setVisible(false)}
                title="comment"
                footer={null}
            >
                <CommentForm addComment={addComment}  comment={comment} setComment={setComment} />
            </Modal>


        </>
    )
}


export default PostComments;