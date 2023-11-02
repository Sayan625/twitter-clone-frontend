import axios from 'axios'
import React, {  useState } from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TweetOptions = ({ likes, replies, retweets, id, tweetedBy, updateTweetData }) => {
    const navigate = useNavigate()
    const [reply, setReply] = useState('')
    const [retweet, setRetweet] = useState('')
    const [replyToggle, setReplyToggle] = useState(false)
    const [retweetToggle, setRetweetToggle] = useState(false)

    const user = useSelector((state) => state.user.current)
    const customHeader = {
        'access_token': `${user?.token}`
    }

    async function HandleDelete() {
        await axios.delete(`http://localhost:5000/api/tweet/${id}`, { headers: customHeader })
        updateTweetData()
        navigate(0)

    }

    async function HandleLike() {

        const resp = await axios.get(`http://localhost:5000/api/tweet/${id}`, { headers: customHeader })
        const hasliked = resp.data.likes.filter((item) => { return (item._id === JSON.parse(localStorage.getItem("user"))._id) })

        if (hasliked.length > 0) {
            const resp = await axios.put(`http://localhost:5000/api/tweet/${id}/dislike`, {}, { headers: customHeader })
            console.log(resp)
        } else {
            const resp = await axios.put(`http://localhost:5000/api/tweet/${id}/like`, {}, { headers: customHeader })
            console.log(resp)
        }
        await updateTweetData()

    }

    async function HandleRetweet() {
        await axios.put(`http://localhost:5000/api/tweet/${id}/retweet`, { 'content': `${retweet}` }, { headers: customHeader })
        setRetweetToggle(false)
        navigate(0)

    }

    async function HandleReply() {

        try {
            console.log(reply)
            const resp = await axios.put(`http://localhost:5000/api/tweet/${id}/reply`, { 'content': `${reply}` }, { headers: customHeader })
            console.log(resp.data)
            // dispatch(addOne(data))
            setReply('')
            await updateTweetData()

        } catch (error) {
            console.log(error)
        }
        setReplyToggle(false)

    }

    return (
        <div className="pt-3 mt-2" style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
            <div className="row g-0">
                <div className="col text-center">
                    <button
                        className='btn btn-sm btn-outline-dark'
                        onClick={() => HandleLike()}>
                        <i className="fa-solid fa-heart"></i>
                    </button>
                    <p>{likes}</p>
                </div>
                <div className="col text-center">
                    <button
                        className='btn btn-sm btn-success'
                        disabled={tweetedBy === user?._id ? true : false}
                        onClick={() => {
                            setRetweetToggle(false)
                            setReplyToggle(!replyToggle)
                        }}>
                        <i className="fa-regular fa-comment"></i>
                    </button>
                    <p>{replies}</p>
                </div>

                <div className="col text-center">
                    <button
                        disabled={tweetedBy === user?._id ? true : false}
                        onClick={() => {
                            setReplyToggle(false)
                            setRetweetToggle(!retweetToggle)
                        }}
                        className="btn btn-sm btn-info text-white">
                        <i className="fa-solid fa-retweet"></i>
                    </button>
                    <p>{retweets}</p>
                </div>
                {
                    tweetedBy === user?._id &&
                    <div className="col text-center">
                        <button className='btn btn-sm btn-danger' onClick={() => HandleDelete()}>
                            <i role='button' className="fa-solid fa-trash align-self-center m-1"></i>
                        </button>
                    </div>
                }
            </div>
            {
                (replyToggle || retweetToggle) && <div className="row g-0 p-3">
                    {replyToggle &&
                        <div className="row g-0">
                            <div className="col-md-10">
                                <textarea value={reply} onChange={(e) => setReply(e.target.value)} className='form-control'></textarea>
                            </div>
                            <div className="col-md-2 mt-2">
                                <button className='btn btn-primary ms-2' onClick={() => HandleReply()}>Reply</button>
                            </div>
                        </div>

                    }
                    {retweetToggle &&
                        <div className="row g-0">
                            <div className="col-md-10">
                                <textarea value={retweet} onChange={(e) => setRetweet(e.target.value)} className='form-control'></textarea>
                            </div>
                            <div className="col-md-2 mt-2">
                                <button className='btn btn-primary ms-2' onClick={() => HandleRetweet()}>ReTweet</button>
                            </div>
                        </div>
                    }
                </div>
            }

        </div>
    )
}

export default TweetOptions