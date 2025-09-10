import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';
import SideBars from './components/SideBars';
// import Post from './components/Post';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import { useState } from 'react';
import PostListProvider from './store/post-list-store';
import { Outlet } from 'react-router-dom';

function App() {

    const [selectedTab, setSelectedTab] = useState("Home");
    // Hardcoded userId for demo; replace with actual logged-in user logic if needed
    const myUserId = "1";

    return (
        <PostListProvider>
            <div className="app-container">
                <SideBars selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <div className='content'>
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </PostListProvider>
    );
}

export default App;
