import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";
import './Home.css';
import AddPost from "../components/AddPost";
import Follow from "../components/Follow";

const Home = (props) => {

    const [posts, setPosts] = useState([]);
    
    const getLatestPosts = () => {
        axios
        .post('https://akademia108.pl/api/social-app/post/latest')
        .then((res)=> {
            setPosts(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const getNextPosts = () => {
        axios
        .post('https://akademia108.pl/api/social-app/post/older-then', {
            date: posts[posts.length - 1].created_at
        })
        .then((res) => {
            setPosts(posts.concat(res.data));
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const getNewPosts = () => {
        axios
        .post('https://akademia108.pl/api/social-app/post/newer-then', {
            date: posts[0].created_at
        })
        .then((res) => {
            setPosts(res.data.concat(posts));
        })
        .catch((error) => {
            console.error(error);
        });
    };


    useEffect(() => {
        getLatestPosts();
    }, [props.user]);

    console.log(posts);

    return (
        <div className="home">
            {props.user && <AddPost getNewPosts={getNewPosts} />}
            {props.user && <Follow posts={posts} user={props.user} getLatestPosts={getLatestPosts}/>}
            <div className="postList">
                {posts.map((post) => {
                    return <Post key={post.id} post={post} user={props.user} setPosts={setPosts} getLatestPosts={getLatestPosts}/>
                })}
                <button className="btn" onClick={getNextPosts}>Load more</button>
            </div>
        </div>
    )
};

export default Home;