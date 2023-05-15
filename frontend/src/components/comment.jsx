
const Comment = ({data}) => {
    const {username, newComment} = data
    
    return (
        <div className=" flex-col h-20 border border-neutral-800 border-1">
            <p className="ml-3">{username}</p>
            <p className="ml-3 mt-2">{newComment}</p>
        </div>
    )
}

export default Comment