// import React from 'react'
import { Avatar, List } from "antd"
import moment from "moment"
import { useRouter } from "next/router"
import { userContext } from "../context"
import { useContext } from "react"
import { sourceFunc } from "../functions/reuseFun"
import Link from "next/link"






function SideBar({ peopleData, handleFollow, handleUnFollow }) {
  // console.log("users =>>" ,peopleData);

  const [state, setState] = useContext(userContext)

  console.log(peopleData);
  return (

    <div className="mt-5">
      <List itemLayout="horizontal" dataSource={peopleData} renderItem={(user) => (
        <List.Item>
          <List.Item.Meta

            avatar={<Avatar size={40} src={sourceFunc(user)} className="d-flex justify-content-center " />}

            title={<div className="d-flex justify-content-between align-item sidebarcontent">
            <Link href={`/user/profile/${user.name}`}>{user.name}</Link>

              {state && state.user && state.user.following
                .includes(user._id) ?

                <span onClick={() => { handleUnFollow(user) }} className="tex-primary btn btn-outline-info">Unfollow</span> :
                <span onClick={() => { handleFollow(user) }} className="tex-primary btn btn-outline-info">Follow</span>}

            </div>}



          />

        </List.Item>
      )} />
    </div>
  )
}

export default SideBar