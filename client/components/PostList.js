import React, { useContext } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { Avatar } from 'antd';
import {
  HeartOutlined,
  CommentOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { userContext } from '../context';
import { useRouter } from 'next/router';


function PostList({ postList }) {
  // console.log(postList);

  

  const [state, setState] = useContext(userContext)

  // console.log(postList[0]);
  // console.log(state);

  const router = useRouter()
  return (
    <div className="post-list-container">
      <div className="container">
        {postList &&
          postList.map((post, index) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <Avatar size={40}>{post.userId.name[0]}</Avatar>
                <div className="post-header-info">
                  <span className="post-user-name">{post.userId.name}</span>
                  <span className="post-created-at mx-2">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
                <div className="post-actions">

              {(state.user && state.user._id) === post.userId._id && <>
                <EditOutlined onClick={() => router.push(`/user/${post._id}`)} className="action-icon edit-icon" />
                  <DeleteOutlined className="action-icon delete-icon" />
              </>}

                </div>
              </div>
              <div className="post-content">{renderHTML(post.content)}</div>
              {post.image && (
                <div
                  className="post-image"
                  style={{ backgroundImage: `url(${post.image.url})` }}
                />
              )}
              <div className="post-footer">
                <div className="post-interactions">
                  <HeartOutlined className="interaction-icon heart-icon" />
                  <span className="interaction-count">1000 Likes</span>
                  <CommentOutlined className="interaction-icon comment-icon" />
                  <span className="interaction-count">50 k Comments</span>
                </div>
              </div>
              
            </div>
          ))}

          {/* <pre>{JSON.stringify(postList, null , 4)}</pre> */}
      </div>
    </div>
  );
}

export default PostList;
