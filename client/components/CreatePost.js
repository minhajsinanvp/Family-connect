import { Avatar } from 'antd';
import dynamic from 'next/dynamic';

import { FileImageOutlined } from '@ant-design/icons';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

require('react-quill/dist/quill.snow.css');

function CreatePost({
    handlePostSubmit,
    content,
    setContent,
    handleImage 
}) {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mt-5 shadow">
                        <div className="card-body">
                            <h1 className="card-title">Create a Post</h1>
                            <form onSubmit={handlePostSubmit} className="d-flex flex-column">
                                <div className="form-group mb-3 h-25">
                                    <ReactQuill
                                        theme="snow"
                                        value={content}
                                        
                                        onChange={e => setContent(e)}
                                        placeholder='Write something...'
                                        className="post-content"
                                    />
                                </div>
                                <label className="mb-3 ">
                                    <span className="btn btn-secondary w-25">
                                    <FileImageOutlined />
                                        <input onChange={handleImage}  hidden type="file" accept='images/*' name="" id="" />
                                    </span>
                                </label>
                                <button disabled={!content.length} type="submit" className="btn btn-primary align-self-end">
                                    Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
