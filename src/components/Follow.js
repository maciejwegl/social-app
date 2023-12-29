import { useEffect, useState } from 'react';
import './Follow.css';
import axios from 'axios';


const Follow = (props) => {
    const [recommendations, setRecommendations] = useState([]);

    const getRecommendations = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
        .then((res)=> {
            setRecommendations(res.data);
        })
        .catch((error)=> {
            console.error(error);
        })
    }

    useEffect(()=> {
        getRecommendations()
    }, [props.posts])

    const follow = (id) => {
        axios.post('https://akademia108.pl/api/social-app/follows/follow', {
            leader_id: id
        })
        .then(()=> {
            props.getLatestPosts();
        })
        .catch((error)=> {
            console.error(error);
        });
    }

    console.log(recommendations);

    return (
        <div className="followed">
            {/* <div className='followedHeader'>
                <h4 className='recommedationsHeader'>More recommendations</h4>
                <h4 className='followingHeader'>Followed</h4> 
            </div> */}
            
            <div className='recommendationBar'>
                {recommendations.map(recommendation=> {
                    return (
                        <div className='recommendations' key={recommendation.id} >
                            <div className='recommendationAvatar'>
                                <img src={recommendation.avatar_url} alt={recommendation.username} />
                            </div>
                                        
                            <p>{recommendation.username}</p>
                            <button className='btn btnFollow' onClick={()=> follow(recommendation.id)}>Follow</button>
                        </div>
                    )
                })}
            </div>
            

        </div>

    )
}

export default Follow;