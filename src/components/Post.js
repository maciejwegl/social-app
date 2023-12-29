import './Post.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';



const Post = (props) => {

    const [likesCount, setLikesCount] = useState(props.post.likes.length);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [doesUserLike, setDoesUserLike] = useState(props.post.likes.filter(like=>like.username === props.user?.username).length !== 0);

    const deletePost = (id) => {
        axios.post('https://akademia108.pl/api/social-app/post/delete', {
            post_id: id,
        })
        .then((res) => {
            props.setPosts((posts) => {
                return posts.filter((post) => post.id !== res.data.post_id)
            })
        })
    }

    const likePost = (id, isLiked) => {
        axios.post('https://akademia108.pl/api/social-app/post/'+ (isLiked ? 'dislike' : 'like'), {
            post_id: id
        }).then(()=> {
            setLikesCount(likesCount + (isLiked? -1 : 1));
            setDoesUserLike(!isLiked)
        })

    }

    const unfollow = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/disfollow', {
            leader_id: id
        })
        .then(()=> {
            props.getLatestPosts();
        })
        .catch((error)=> {
            console.error(error);
        });
    }

    return (
        <div className="post">
            <div className="avatar">
                <img src={props.post.user.avatar_url} alt={props.post.user.username} />
            </div> 
            <div className="postData">
                <div className="postMeta">
                    <div className="author">{props.post.user.username}</div>
                    <div className="date">{props.post.user.created_at.substring(0, 10)}</div>
                </div>
                <div className="postContent">{props.post.content}</div>
                <div className="likes">
                    {props.user && props.user.username !== props.post.user.username && (<button className='btn btnUnfollow' onClick={()=> unfollow(props.post.user.id)}>Unfollow</button>)}

                    {props.user?.username === props.post.user.username && (<button className='btn btnDeletePost' onClick={()=>setDeleteVisible(true)}>Delete</button>)}
                    
                    {props.user && <button className={doesUserLike? 'btnLike dislike' : 'btnLike like'} onClick={()=> likePost(props.post.id, doesUserLike)}>
                        {<FontAwesomeIcon icon={doesUserLike? faThumbsDown : faThumbsUp } className='likeIcon'/>}
                    </button>}
                    
                    {likesCount}
                </div>
            </div>

            {deleteVisible && (<div className='deleteMessage'>
                <h4>Do you really want to delete your post?</h4>
                <button className='btn btnDeletePost yes'onClick={()=>deletePost(props.post.id)}>Yes</button>
                <button className='btn btnDeletePost no' onClick={()=>setDeleteVisible(false)}>No, wait</button>
            </div>)}
        </div>
    )
};

export default Post;