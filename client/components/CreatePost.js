import React from 'react';
import dynamic from 'next/dynamic';
import { CameraOutlined, FileImageOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function CreatePost({
  handlePostSubmit,
  content,
  setContent,
  handleImage,
  imageDetails,
  imageUploading,
}) {
  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-12">
            <div className="card  shadow">
              <div className="card-body" style={{ padding: 10 }}>
                <h1 className="card-title">Create a Post</h1>
                <form onSubmit={handlePostSubmit} className="d-flex flex-column">
                  <div className="form-group mb-3">
                    <div style={{ margin: '0', padding: '0' }}>
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={(e) => setContent(e)}
                        placeholder="Write something..."
                        className="post-content"
                      />
                    </div>
                  </div>
                  <label className="mb-3 position-relative d-flex">
                    <span className="btn btn-secondary w-25 h-25">
                      {imageUploading ? <LoadingOutlined /> : <FileImageOutlined />}
                      <input onChange={handleImage} hidden type="file" accept="images/*" name="" id="" />
                    </span>
                    {/* Position the avatar on the right end side of the button */}
                    {imageDetails && imageDetails.url &&
                        <Avatar size={40} src={imageDetails.url} className='d-flex justify-content-center position-absolute end-0 mb-5' />
                    }
                  </label>
                  <button  type="submit" className="btn btn-primary align-self-end">
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
