// const WelcomeMsg = ({ onGetPostsClick}) => {
const WelcomeMsg = () => {

    return <center>
        <h1 className="welcome">There are no posts</h1>
        {/* <button onClick={onGetPostsClick} type="button" className="btn btn-primary">Get Posts from server</button> */}
        <button type="button" className="btn btn-primary">Get Posts from server</button>
    </center>

};

export default WelcomeMsg;