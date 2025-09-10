import { createContext, useCallback, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
    postList: [],
    fetching: false,
    addPost: () => { },
    // addInitialPosts: () => { },
    deletePost: () => { }
});

const postListReducer = (currPostList, action) => {
    console.log(action);
    console.log(currPostList);
    let updatedPostList = currPostList;
    if (action.type === "DELETE_POST") {
        updatedPostList = currPostList.filter(post => post.id !== action.payload.postId);
    }
    else if (action.type === "ADD_POST") {
        updatedPostList = [action.payload, ...currPostList];
    }
    else if (action.type === "ADD_INITIAL_POST") {
        updatedPostList = action.payload.posts;
    }
    return updatedPostList;
};

const PostListProvider = ({ children }) => {
    const [postList, dispatchPostList] = useReducer(postListReducer, []);
    const [fetching, setFetching] = useState(false);
    // Track posts created in this session
    const [sessionPosts, setSessionPosts] = useState([]);

    const addPost = (post) => {
        console.log("Add post cslled", post);
        // alert("Post added successfully!");
        setSessionPosts(prev => [post, ...prev]);
        dispatchPostList({
            type: "ADD_POST",
            payload: post
        });
    }


    const addInitialPosts = (posts) => {
        // console.log(`${userId}, ${postTitle}, ${postBody}, ${postReactions}, ${tags}`);

        // alert("Post fetched successfully!");
        dispatchPostList({
            type: "ADD_INITIAL_POST",
            payload: {
                posts
            }
        });
    }

    const deletePost = useCallback((postId) => {
        console.log("Delete post", postId);
        dispatchPostList({
            type: "DELETE_POST",
            payload: {
                postId,
            }
        });
        setSessionPosts(prev => prev.filter(post => post.id !== postId));
    }, [dispatchPostList]);

    useEffect(() => {
        setFetching(true);
        const controller = new AbortController();
        const signal = controller.signal;

        console.log("fetch started");
        console.log("Fetching posts from the server...");
        fetch('http://dummyjson.com/posts', { signal })
            .then(response => response.json())
            .then(data => {
                addInitialPosts(data.posts);
                console.log(data);
                setFetching(false);
                console.log("fetch returned");
                // Here you would typically update the state with the fetched posts
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
        console.log("fetch ended");

        return () => {
            console.log("Cleaning up useEffect");
            // controller.abort();
        };
    }, []);

    return <PostList.Provider value={{
        postList,
        fetching,
        addPost,
        sessionPosts,
        // addInitialPosts,
        deletePost
    }}>
        {children}
    </PostList.Provider >;
};

// const DEFAULT_POST_LIST = [
//     {
//         id: 'p1',
//         title: 'First Post',
//         body: 'This is the content of the first post.',
//         reactions: 0,
//         userId: 'u1',
//         tags: ['post', 'first']

//     },
//     {
//         id: 'p2',
//         title: 'vacation to US',
//         body: 'On a vacation to US',
//         reactions: 0,
//         userId: 'u2',
//         tags: ['post', 'vacation', 'US']

//     },
//     {
//         id: 'p3',
//         title: 'B.tech graduation',
//         body: 'This is a B.tech graduation post.',
//         reactions: 0,
//         userId: 'u3',
//         tags: ['post', 'graduation', 'B.tech']

//     }
// ];

export default PostListProvider;