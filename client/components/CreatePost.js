import { Avatar } from 'antd';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})  // dynamic import    

require('react-quill/dist/quill.snow.css');

function CreatePost({
    handlePostSubmit,
    content,
    setContent
}){ 
    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-8 col-md-offset-2">

                    <h1>Make a post</h1>

                    <form action="" onSubmit={handlePostSubmit}>



                    <div className="form-group">
    {/* <label for="description" className='post-heading'>Description</label> */}
    <ReactQuill
        theme="snow"
        value={content} 
        onChange={e => setContent(e)}
        rows={10} /* Set the number of rows to 10 */
        placeholder='Write something...' 
        style={{ 
            resize: "none",
            height: "200px",
            border: "none", // Remove the border
            outline: "none", // Adjust the height as needed
        }}
        className="form-control post-content w-100 react-quill" 
        name="description"
    />
</div>




                        <div className="form-group post-btn mt-2">
                            <button disabled={!content.length && true} type="submit" className=" btn btn-dark w-100">
                                Post
                            </button>
                            {/* <button className="btn btn-danger mx-5">
    		            Cancel
    		        </button> */}
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default CreatePost