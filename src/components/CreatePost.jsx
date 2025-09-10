import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PostList } from "../store/post-list-store";

const CreatePost = () => {

    const { addPost } = useContext(PostList);

    const navigate = useNavigate();

    const userIDElement = useRef();
    const validUserIdMin = 1;
    const validUserIdMax = 208;
    const postTitleElement = useRef();
    const postBodyElement = useRef();
    const postLikeReactionsElement = useRef();
    const postUnlikeReactionsElement = useRef();
    const postTagsElement = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        const userId = userIDElement.current.value.trim();
        if (!userId || isNaN(userId)) {
            alert("Please enter a valid numeric User ID.");
            return;
        }
        if (Number(userId) < validUserIdMin || Number(userId) > validUserIdMax) {
            alert(`Please enter a valid User ID between ${validUserIdMin} and ${validUserIdMax}.`);
            return;
        }
        const postTitle = postTitleElement.current.value;
        const postBody = postBodyElement.current.value;
        const postLikeReactions = Number(postLikeReactionsElement.current.value) || 0;
        const postUnlikeReactions = Number(postUnlikeReactionsElement.current.value) || 0;
        const tags = postTagsElement.current.value.split(" ");

        userIDElement.current.value = "";
        postTitleElement.current.value = "";
        postBodyElement.current.value = "";
        postLikeReactionsElement.current.value = "";
        postUnlikeReactionsElement.current.value = "";
        postTagsElement.current.value = "";

        console.log("Sending post to server");

        fetch("https://dummyjson.com/posts/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: postTitle,
                body: postBody,
                reactions: {
                    likes: postLikeReactions,
                    dislikes: postUnlikeReactions
                },
                userId: userId,
                tags: tags,
            }),
        })
            .then((res) => res.json())
            .then(post => {
                console.log("Got response from server", post);
                addPost(post);
                alert("Post added successfully!");
                navigate("/");
            });



        // addPost(userId, postTitle, postBody, postLikeReactions, postUnlikeReactions, tags);
    };

    return (
        <form className="create-post-form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="user_id" className="form-label">User ID</label>
                <input type="text" ref={userIDElement} placeholder="Enter user ID" className="form-control" id="user_id" />
                <div className="form-text">Valid User IDs: {validUserIdMin} to {validUserIdMax}</div>
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Post Title</label>
                <input type="text" ref={postTitleElement} placeholder="Enter post title" className="form-control" id="title" />
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
                <label htmlFor="body" className="form-label">Post Body</label>
                <textarea ref={postBodyElement} placeholder="Enter post body" rows="5" className="form-control" id="body" />
            </div>
            <div className="mb-3">
                <label htmlFor="likereactions" className="form-label">Post Like Reactions</label>
                <input ref={postLikeReactionsElement} placeholder="No of post like reactions" type="text" className="form-control" id="reactions" />
            </div>
            <div className="mb-3">
                <label htmlFor="unlikereactions" className="form-label">Post Dislike Reactions</label>
                <input ref={postUnlikeReactionsElement} placeholder="No of post unlike reactions" type="text" className="form-control" id="reactions" />
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Post Tags</label>
                <input type="text" ref={postTagsElement} placeholder="Enter post tags(seperated with space)" className="form-control" id="tags" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default CreatePost;