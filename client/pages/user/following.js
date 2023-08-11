// import React from 'react'
import { Avatar, List } from "antd"
import moment from "moment"
import { useRouter } from "next/router"
import { userContext } from "../../context"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"






function following() {
    



    const [state,setState] = useContext(userContext)
    const [peopleData, setPeopleData] = useState([])

    useEffect(()=>{
        if(state && state.user){
            getFollower();
            console.log(state);
        }
    },[state && state.user])

    // console.log(state);

    const sourceFunc = (user) =>{
        if(user.image){
            return user.image
        }
        else{
            return "/images/avatarDefault.png"
        }
    }

    

    const getFollower = async()=>{
        try {
            const {data} = await axios.get("/following-list")
            console.log(data);
            setPeopleData(data)
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
            toast.success(`Following ${user.name}`)
      
            let filtered = people.filter((person) => (person._id !== user._id))
            console.log(filtered);
            setPeople(filtered)
           
            getPost()
        } catch (error) {
            console.log(error);
        }
    }

  return (
 
    <div className="mt-5 row col-md-6 offset-md-3">
        <List itemLayout="horizontal" dataSource={peopleData} renderItem={(user)=> (
            <List.Item>
            <List.Item.Meta

            avatar={<Avatar size={40} src={sourceFunc(user)} className="d-flex justify-content-center " />}
            
            title = {<div className="d-flex justify-content-between align-item sidebarcontent">{user.name} <span onClick={()=>{handleUnFollow(user)}} className="tex-primary btn btn-outline-info">Unfollow</span>  </div>}
            
            
            
             />

            </List.Item>
        )} />

<Link legacyBehavior href={`/user/dashboard`}><a className=" mt-2 btn btn-info d-flex justify-content-center h6 text-decoration-none">Dashboard</a></Link>

    </div>
  )
}

export default following