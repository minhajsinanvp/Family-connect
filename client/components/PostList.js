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
import Link from 'next/link';



function PostList({ postList, handleLike, handleUnLike, handleComment}) {
  // console.log(postList);


  const [modalVisible, setModalVisible] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [state, setState] = useContext(userContext)


  // console.log(postList[0]);
  // console.log(state);

  const router = useRouter()


  const deletPostHandler = async (id) => {

    try {


      const { data } = await axios.delete(`/delete-post/${id}`)

      if (data.ok) {
        toast.success("Post is deleted")

        window.location.reload();
      }

    } catch (error) {
      console.log(error);
    }
  }

  const showModal = (id) => {
    setModalVisible(true);
    setPostIdToDelete(id);
  };

  const closeModal = () => {
    setModalVisible(false);
    setPostIdToDelete(null);
  };

  const confirmDelete = () => {
    if (postIdToDelete) {
      deletPostHandler(postIdToDelete);
      closeModal();
    }
  };
  


  return (

    <div className="post-list-container">
      <div className="container">
        {postList &&
          postList.map((post, index) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <Avatar className="d-flex justify-content-center" size={40} src= {sourceFunc(post.userId)}></Avatar>
                <div className="post-header-info">
                  <span className="post-user-name">{post.userId.name}</span>
                  <span className="post-created-at mx-2">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
                <div className="post-actions">

                  {(state && state.user._id) === post.userId._id && <>
                    <EditOutlined onClick={() => router.push(`/user/${post._id}`)} className="action-icon edit-icon" />
                    <DeleteOutlined onClick={() => {
                      showModal(post._id)
                    }} className="action-icon delete-icon" />
                  </>}

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
                  {post.likes.includes(state && state.user._id) ?( <>
                    <HeartFilled onClick={() => handleUnLike(post._id)} className="interaction-icon heart-icon" />
                    <span className="interaction-count" >{post.likes.length} Likes</span>
                  </>) : (<> <HeartOutlined onClick={() => handleLike(post._id)} className="interaction-icon heart-icon" />
                    <span className="interaction-count" >{post.likes.length>0 && post.likes.length} Likes</span></>)}
                  <CommentOutlined onClick={()=> handleComment(post)} className="interaction-icon comment-icon" />
                  <Link  href={`/user/post/${post._id})`} legacyBehavior >
                    <a className='text-decoration-none'>
                    <span className="interaction-count">{post.comments&& post.comments.length>0 && post.comments.length} Comments</span>
                    </a>
                  </Link>
                </div>
              </div>

              {post.comments && post.comments.length>0 &&  (
                <ol className='list-group mt-1'>
                 { post.comments.slice(0,2).map(comment =>(
                  <li className='list-group-item d-flex justify-content-between align-item-start'>
                  <div className='ms-2 me-auto'>
                    <div className='d-flex'>
                <Avatar className="d-flex justify-content-center text-muted" size={40} src= {sourceFunc(comment.userId)}> </Avatar>
               
                <span className='mx-2 font-weight-bold'>{comment.userId.name}</span>

                    </div>
                    <div className='d-flex mt-1 mx-5 justify-content-center'>{comment.text}</div>

                  </div>
                  <span className='badge rounded-pill text-muted'>{moment(comment.created).fromNow()}</span>
                  </li>
                 ))}
                </ol>
              )}

            </div>
          ))}

        <Modal
          title="Confirm Delete"
          open={modalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="back" onClick={closeModal}>
              Cancel
            </Button>,
            <Button key="submit" type="danger" onClick={confirmDelete}>
              Delete
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this post?</p>
        </Modal>

        {/* <pre>{JSON.stringify(postList, null , 4)}</pre> */}
      </div>
    </div>
  );
}

export default PostList;
