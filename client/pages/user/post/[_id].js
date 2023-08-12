
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import userRoute from "../../../components/routes/userRoute"
import { toast } from 'react-toastify'

const PostComments = () => {

    const [post, setPost] = useState({})
    const router = useRouter()
    const _id = router.query._id


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


    return (
        <>
            


        </>
    )
}


export default PostComments;