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

import Link from 'next/link';
import Post from './Post';
import { diffIndexes } from '../../server/models/userSchema';



function PostList({ postList, handleLike, handleUnLike, handleComment, setPost,   handleCommentDelete}) {
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
        {postList[0] &&
          postList.map((post) => (
           <Post  count={6} handleCommentDelete={handleCommentDelete} key={post._id} count={2} setPost={setPost} post ={post} handleLike={handleLike} handleUnLike={handleUnLike} handleComment={handleComment} showModal={showModal} deletPostHandler={deletPostHandler}  />
          ))}

       

        {/* <pre>{JSON.stringify(postList, null , 4)}</pre> */}
      </div>
    </div>
  );
}

export default PostList;
