import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './routes/App.jsx';
import CreatePost from './components/CreatePost.jsx';
import PostList from './components/PostList';
import PostListProvider from './store/post-list-store';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { AuthProvider } from './store/auth-context.jsx';
import Profile from './components/Profile.jsx';

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
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  },
  {
    path: '*',
    element: <div>404 Not Found</div>
  }
]);

// Redirect to login page on refresh if not logged in

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
