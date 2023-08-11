// import React from 'react'
import { Avatar, List } from "antd"
import moment from "moment"
import { useRouter } from "next/router"
import { userContext } from "../context"
import { useContext } from "react"






function SideBar({peopleData, handleFollow}) {
    console.log("users =>>" ,peopleData);

    const [state,setState] = useContext(userContext)

    const sourceFunc = (user) =>{
        if(user.image){
            return user.image
        }
        else{
            return "/images/avatarDefault.png"
        }
    }
  return (
 
    <div className="mt-5">
        <List itemLayout="horizontal" dataSource={peopleData} renderItem={(user)=> (
            <List.Item>
            <List.Item.Meta

            avatar={<Avatar size={40} src={sourceFunc(user)} className="d-flex justify-content-center " />}
            
            title = {<div className="d-flex justify-content-between align-item sidebarcontent">{user.name} <span onClick={()=>{handleFollow(user)}} className="tex-primary btn btn-outline-info">Follow</span>  </div>}
            
            
            
             />

            </List.Item>
        )} />
    </div>
  )
}

export default SideBar