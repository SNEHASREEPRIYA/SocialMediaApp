import { useState, useContext, useEffect } from "react";
import Post from "./Post";
import WelcomeMsg from "./welcomeMsg";
import { PostList as PostListData } from "../store/post-list-store";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {

    const { postList, fetching } = useContext(PostListData);

    // const [fetching, setFetching] = useState(false);

    // useEffect(() => {
    //     setFetching(true);

    //     // const controller = new AbortController();
    //     // const signal = controller.signal;

    //     console.log("fetch started");
    //     console.log("Fetching posts from the server...");
    //     fetch('http://dummyjson.com/posts', { signal })
    //         .then(response => response.json())
    //         .then(data => {
    //             addInitialPosts(data.posts);
    //             console.log(data);
    //             setFetching(false);
    //             console.log("fetch returned");
    //             // Here you would typically update the state with the fetched posts
    //         })
    //         .catch(error => {
    //             console.error('Error fetching posts:', error);
    //         });
    //     console.log("fetch ended");

    //     return () => {

    //         console.log("Cleaning up useEffect");
    //         // controller.abort();

    //     };

    // }, []);

    // const [dataFetched, setDataFetched] = useState(false);

    // if (!dataFetched) {
    //     // Logic to fetch posts from the server
    // console.log("Fetching posts from the server...");
    // fetch('http://dummyjson.com/posts')
    //     .then(response => response.json())
    //     .then(data => {
    //         addInitialPosts(data.posts);
    //         console.log(data);
    //         // Here you would typically update the state with the fetched posts
    //     })
    //     .catch(error => {
    //         console.error('Error fetching posts:', error);
    //     });
    // setDataFetched(true);
    // }

    // const handleGetPostsClick = () => {
    //     // Logic to fetch posts from the server
    //     console.log("Fetching posts from the server...");
    //     fetch('https://dummyjson.com/posts')
    //         .then(response => response.json())
    //         .then(data => {
    //             addInitialPosts(data.posts);
    //             console.log(data);
    //             // Here you would typically update the state with the fetched posts
    //         })
    //         .catch(error => {
    //             console.error('Error fetching posts:', error);
    //         });
    // }

    return (
        <>
            {fetching && <LoadingSpinner />}
            {
                // postList.length === 0 && <WelcomeMsg onGetPostsClick={handleGetPostsClick} />
                !fetching && postList.length === 0 && <WelcomeMsg />
            }
            {!fetching && postList.map((post, index) => (
                <Post key={post.id || index} post={post} />
            ))}
        </>
    );
};

export default PostList;