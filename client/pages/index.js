import { useContext, useState, useEffect } from "react";
import { userContext } from "../context/";
import Parallax from "../components/Parallax";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import PostHome from "../components/PostHome";
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO,{
    reconnection: true
})

const Home = ({ posts }) => {
    const [state, setState] = useContext(userContext);
    const [user, setUser] = useState(false);
    const [newPost, setNewPost] = useState([])


    // useEffect(()=>{
    //     socket.on('recieve-message',(newMessage)=>{
    //         alert(newMessage)
    //     })
    // },[])


    useEffect(()=>{
        socket.on("new-post",(newPost)=>{

            setNewPost([newPost,...posts])

        })
    })

    const collection = newPost.length >0 ? newPost : posts

    return (
        <>
            <Head>
                <title>Family Connect - Social network platform</title>
                <meta name="description" content="To connect with your close ones" />

                <meta property="og:description" content="A social network for connecting close ones" />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Family-Connect" />
                <meta property="og:url" content="http://family-connect.com" />
                <meta property="og:image:secure_url" content="http://family-connect.com/images/home.png" />
            </Head>
            <Parallax url="/images/home.png" />
            <div className="container mt-5">
           
                <div className="row">
                    {collection.map((post) => (
                        <div className="col-md-6" key={post._id}>
                            <Link  href={`/post/${post._id}`} legacyBehavior>
                                
                                    <a className="text-decoration-none">
                                    <PostHome user={user} post={post} />
                                    </a>
                              
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps() {
    try {
        const { data } = await axios.get("/home-posts");
        console.log(data);

        return {
            props: {
                posts: data,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                posts: [],
            },
        };
    }
}

export default Home;
