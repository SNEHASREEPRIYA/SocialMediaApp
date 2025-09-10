import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './routes/App.jsx';
import CreatePost from './components/CreatePost.jsx';
import PostList from './components/PostList';
import PostListProvider from './store/post-list-store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // layout route
    children: [
      {
        path: '',
        element: <PostList />, // Home at '/'
      },
      {
        path: 'home',
        element: <PostList />, // Optional: Home at '/home'
      },
      {
        path: 'create-post',
        element: <CreatePost />
      },
      {
        path: 'my-posts',
        element: <PostList showOnlyMyPosts={true} myUserId={"1"} />
      }
    ]
  },
  {
    path: '*',
    element: <div>404 Not Found</div>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
