// import React from 'react'
import { Avatar, Card, List } from "antd"
import moment from "moment"
import { useRouter } from "next/router"
import { userContext } from "../../../context"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"






function UserProfile() {
    



    const [state,setState] = useContext(userContext)
    const [user, setUser] = useState({})

    const router = useRouter()


    useEffect(()=>{
        if(router.query.name){
            getUser();
            console.log(state);
        }
    },[router.query.name])

    // console.log(state);

    const sourceFunc = (user) =>{
        if(user.image){
            return user.image
        }
        else{
            return "/images/avatarDefault.png"
        }
    }

    

    const getUser = async()=>{
        try {
            const {data} = await axios.get(`/user/${router.query.name}`)
            console.log(data);
            setUser(data)
        } catch (error) {
            console.log(error);
        }
    }
    

    // const handleUnFollow = async(user) =>{

    //     try {
    //         const {data} = await axios.put("/user-unfollow", {_id: user._id})

    //         let auth = JSON.parse(localStorage.getItem('auth'));

    //         auth.user = data;
      
    //         localStorage.setItem('auth', JSON.stringify(auth))
      
    //         setState({...state, user:data})
    //         toast.success(`Unfollowing ${user.name}`)
      
    //         let filtered = people.filter((person) => (person._id !== user._id))
    //         console.log(filtered);
    //         setPeople(filtered)
           
    //         getPost()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

  return (
 
    <div className="mt-5 row col-md-6 offset-md-3">
{/* 
    <pre>{JSON.stringify(user,null, 4)}</pre> */}
   <div>
   <Card hoverable cover={<img src={sourceFunc(user)} />}>
        <Card.Meta title={user.name} description={user.description} />

        <p className="pt-2 text-muted">Accout created {moment(user.createdAt).fromNow()}</p>

        <div className="d-flex justify-content-between">
            <span className="btn btn-sm"> 
            {user.followers && user.followers.length}  Followers
            </span>
            <span className="btn btn-sm"> 
             {user.following && user.following.length} Following
            </span>
        </div>
    </Card>
        

   </div>
        

<Link legacyBehavior href={`/user/dashboard`}><a className=" mt-5 btn btn-info d-flex justify-content-center h6 text-decoration-none">Go to Dashboard</a></Link>

    </div>
  )
}
 
export default UserProfile