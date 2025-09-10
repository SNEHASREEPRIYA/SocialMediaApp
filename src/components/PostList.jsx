import { useState, useContext, useEffect } from "react";
import Post from "./Post";
import WelcomeMsg from "./welcomeMsg";
import { PostList as PostListData } from "../store/post-list-store";
import LoadingSpinner from "./LoadingSpinner";


const PostList = (props) => {
    const { postList, fetching, sessionPosts } = useContext(PostListData);
    const showOnlyMyPosts = props?.showOnlyMyPosts;
    const myUserId = props?.myUserId;

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

    let filteredPosts = postList;
    if (showOnlyMyPosts) {
        filteredPosts = sessionPosts;
    }
    return (
        <>
            {fetching && <LoadingSpinner />}
            {
                !fetching && filteredPosts.length === 0 && (
                    <WelcomeMsg />
                )
            }
            {!fetching && filteredPosts.length > 0 && filteredPosts.map((post, index) => (
                <Post key={post.id || index} post={post} />
            ))}
        </>
    );
};

// export const postLoader = () => {
//     return fetch('http://dummyjson.com/posts', { signal })
//         .then(response => response.json())
//         .then(data => {
//             addInitialPosts(data.posts);
//             return data;
//             // setFetching(false);
//             console.log("fetch returned");
//             // Here you would typically update the state with the fetched posts
//         })
//         .catch(error => {
//             console.error('Error fetching posts:', error);
//         });
// }

export default PostList;