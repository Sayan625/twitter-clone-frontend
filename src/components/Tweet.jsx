import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TweetOptions from './TweetOptions'
import { Link } from 'react-router-dom'


const Tweet = ({ data, type, callback }) => {
    const [tweet, setTweet] = useState(data)
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.current)
    const imgStyle = {
        maxWidth: "40px",
        maxHeight: "40px",
        borderRadius: "50%",
        margin: "0",
        width: "auto",
        height: "auto"
    }

    const customHeader = {
        'access_token': `${user?.token}`
    }


    function HandleOnClick() {
        console.log(tweet._id)
        navigate(`/tweets/${tweet._id}`, { replce: true });

    }

    
    const UpdateTweetData = async () => {
        if (callback) {
            callback()
            return
        }
        const resp = await axios.get(`http://localhost:5000/api/tweet/${tweet._id}`, { headers: customHeader })
        const data = await resp.data
        setTweet(data)
        
    }

    useEffect(() => {
        setTweet(data)
    }, [data])
    
    return (
        <div className="card mt-3 rounded-0 mb-3" >
            <div className="row g-0 p-2 pb-0"  >
                <div className="col d-flex" >
                    <div className="pt-2">
                        {
                            tweet?.tweetedBy?.profile_pic ?
                                <img src={tweet?.tweetedBy?.profile_pic} className='' style={imgStyle} alt="..." /> :
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png' className='' style={imgStyle} alt="..." />
                        }
                    </div>
                    <div className="card-body p-3 " >
                        {type == 'reply' && <span><i className="fa-regular fa-comment"></i>  Replied By</span>}
                        {type == 'retweet' && <span><i className="fa-solid fa-retweet"></i> Retweeted By</span>}
                        <h5 className=" ms-2 card-title d-inline">
                            {tweet?.tweetedBy?.name}
                        </h5>
                        <Link to={`/profile/${tweet?.tweetedBy?._id}`}>
                            <p className="card-title text-disabled">@{tweet?.tweetedBy?.username}</p>
                        </Link>
                        <div className="" role='button' onClick={() => HandleOnClick()}>
                            <p className="card-text">{tweet?.content}</p>{
                                tweet?.image &&
                                <img src={tweet.image} className="img-fluid " style={{width: '100%', maxHeight:"400px" }} alt="..." />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                type == 'retweet' &&
                <div className="row g-0 px-2">
                    {
                        <Tweet data={tweet?.retweetedFrom} type={null} callback={null} />
                    }
                </div>
            }
            <TweetOptions
                likes={tweet?.likes?.length}
                replies={tweet?.replies?.length}
                retweets={tweet?.retweetedBy?.length}
                id={tweet?._id}
                tweetedBy={tweet?.tweetedBy?._id}
                updateTweetData={UpdateTweetData}
            />{
                type == 'tweet' &&
                <div className="row g-0 px-2">
                    {
                        tweet?.replies?.map((item) => <Tweet data={item} type={'reply'} callback={null} />)
                    }
                </div>
            }
        </div>
    )
}

export default Tweet