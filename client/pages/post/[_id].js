
import Parallax from "../../components/Parallax"
import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import PostHome from "../../components/PostHome"
import { useRouter } from "next/router"

const SelectedPost = ({ post }) => {
    
    const router = useRouter()
    // const [user, setUser] = useState(false)
    // if(state && state.token && state.user) setUser(true)
    const sourceFunc = () =>{
        if(post.image){
            return post.image.url
        }
        else{
            return "/images/avatarDefault.png"
        }
    }
    return (
        <>
            <Head>
                <title>Family Connect - Socail network platform </title>
                <meta name="description" content={post.content} />

                <meta property="og:description" content="A social network for conecting close ones" />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Family-Connect" />
                <meta property="og:url" content={`http://family-connect.com/post/${post._id}`} />
                <meta property="og:image:secure_url" content={sourceFunc(post)} />


            </Head>

            <Parallax url="/images/home.png"></Parallax>
            {/* 
             */} 

            <div className="container mt-5 h-100">
                <div className="row">
                 
                        <div className="col-md-12 ">
                      
                                
                        <PostHome  key={post._id} post={post} />
                                
                           
                   
                        </div>
                   
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(context) {

    const { data } = await axios.get(`/post/${context.params._id}`)
    console.log(data);

    return {
        props: {
            post: data
        }
    }
}

export default SelectedPost;