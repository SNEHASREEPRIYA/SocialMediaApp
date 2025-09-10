import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBars from '../components/SideBars';
// import Post from './components/Post';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PostListProvider from '../store/post-list-store';

function App() {

  const [selectedTab, setSelectedTab] = useState("Home");
  // Hardcoded userId for demo; replace with actual logged-in user logic if needed
  const myUserId = "1";

  return (
    <PostListProvider>
      <div className="app-container">
        <SideBars selectedTab={selectedTab} setSelectedTab={setSelectedTab}></SideBars>
        <div className='content'>
          <Header></Header>

          <Outlet />
          {/* {
            selectedTab === "Home" ?
              (
                <PostList />
              )
              : selectedTab === "My Posts" ?
                (
                  <PostList showOnlyMyPosts={true} myUserId={myUserId} />
                )
                : (
                  <CreatePost />
                )
          } */}
          <Footer></Footer>
        </div>
      </div>
    </PostListProvider>
  )
}

export default App;
