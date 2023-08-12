

function CommentForm({addComment, removeCommnet, comment, setComment}) {
  return (
    <form onSubmit={addComment}>
    <input type="text" className="form-control" placeholder="write your comment..." value={comment} onChange={(e) => setComment(e.target.value)}></input>
    <button  className=" mt-3 btn btn-success float-end">Post</button>
  </form>
  )
}

export default CommentForm