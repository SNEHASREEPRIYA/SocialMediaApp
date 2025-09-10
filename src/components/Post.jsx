import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/post-list-store";


const Post = ({ post }) => {

    const { deletePost } = useContext(PostList);
    return (
        <div className="card post-card">
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
                <h5 className="card-title">{post.title}
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        onClick={() => deletePost(post.id)}>
                        <MdDelete />
                        {/* <span className="visually-hidden">unread messages</span> */}
                    </span>
                </h5>
                <p className="card-text">{post.body}</p>
                {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                    <span className="badge text-bg-primary hashtag" key={index}>#{tag}</span>
                ))}
                <div className="alert alert-success reactions" role="alert">
                    {typeof post.reactions === "object"
                        ? `Likes: ${post.reactions.likes}, Dislikes: ${post.reactions.dislikes}`
                        : `This post has ${post.like_reactions} like reactions and ${post.unlike_reactions} unlike reactions.`}
                </div>

                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    );
};

export default Post;
