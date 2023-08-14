// import React from 'react'
import React, { useContext, useState } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { Avatar, Modal, Button } from 'antd';
import {
  HeartOutlined,
  CommentOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { userContext } from '../context';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { sourceFunc } from '../functions/reuseFun';




function PostHome({ post, handleComment, handleLike, handleUnLike, count = 5, handleCommentDelete, user = true }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [state, setState] = useContext(userContext)

  


  // console.log(postList[0]);
  // console.log(state);

  const router = useRouter()





  return (
    <>
      {post && post.userId && <div key={post._id} className="post-card">
        <div className="post-header">
          <Avatar className="d-flex justify-content-center" size={40} src={sourceFunc(post.userId)}></Avatar>
          <div className="post-header-info">
            <span className="post-user-name">{post.userId.name}</span>
            <span className="post-created-at mx-2">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          
        </div>
        <div className="post-content">{renderHTML(post.content)}</div>
        {post.image && (
          <div
            className="post-image d-flex justify-content-center"
            style={{ backgroundImage: `url(${post.image.url})`, display: "flex", justifyContent: "center" }}
          />
        )}
        <div className="post-footer">
          <div className="post-interactions">
            {post.likes.includes(state && state.user._id) ? (<>
              <HeartFilled style={{ fontSize: '30px' }}  className="interaction-icon heart-icon" />
              <span className="interaction-count" >{post.likes.length} Likes</span>
            </>) : (<> <HeartOutlined style={{ fontSize: '30px' }}  className="interaction-icon heart-icon" />
              <span className="interaction-count" >{post.likes.length > 0 && post.likes.length} Likes</span></>)}
            <CommentOutlined style={{ fontSize: '30px' }} className="interaction-icon comment-icon" />

              
            
          </div>
        </div>

        {post.comments && post.comments.length > 0 && (
          <ol className='list-group mt-1'>
            {post.comments.slice(0, count).map(comment => (
              <li key={comment._id} className='list-group-item d-flex justify-content-between align-item-start'>
                <div className='ms-2 me-auto'>
                  <div className='d-flex'>
                    <Avatar className="d-flex justify-content-center text-muted" size={40} src={sourceFunc(comment.userId)}> </Avatar>

                    <span className='mx-2 font-weight-bold'>{comment.userId.name}</span>

                  </div>
                  <div className='d-flex mt-1 mx-5 justify-content-center'>{comment.text}</div>

                </div>
                <span className='d-flex badge rounded-pill text-muted'>
                  {moment(comment.created).fromNow()} {state && state.user._id == comment.userId._id && (
                    <div className='d-flex ml-auto mx-2 '>
                    
                    </div>
                  )}
                </span>
              </li>
            ))}
          </ol>
        )}

      </div>}

    </>
  )
}

export default PostHome;