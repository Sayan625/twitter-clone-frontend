import React, { useEffect, useRef, useState } from 'react'
import Tweet from '../components/Tweet'
import axios from 'axios'
import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
    const [tweetImg, setTweetImg] = useState()
    const [newTweet, setNewTweet] = useState("")
    const [tweets, setTweets] = useState([])
    const ref = useRef();
    const user = useSelector((state) => state.user.current)


    const customHeader = {
        'access_token': `${user?.token}`
    }

    useEffect(() => {
        GetData()
    }, [])

    useEffect(() => {

    }, [tweetImg])

    async function GetData() {
        try {
            setNewTweet("")
            ref.current.value = ""
            const resp = await axios.get('http://localhost:5000/api/tweet/', {
                headers: customHeader
            })
            setTweets(() => resp.data)
        } catch (error) {
            console.log(error)
        }

    }
    async function HandleSubmit(e) {
        e.preventDefault()
        try {
            let imgurl = ""
            if (tweetImg) {
                const formData = new FormData()
                formData.append('file', tweetImg)
                const resp = await axios.post(`http://localhost:5000/api/tweet/upload`, formData, { headers: customHeader })
                imgurl = resp.data
            }
            await axios.post('http://localhost:5000/api/tweet/', { 'content': newTweet, 'image': imgurl }, { headers: customHeader })
            await GetData()
            ref.current.value = ""
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <div className="container-fluid p-sm-4">
            <div className="card p-2">
                <h5 className="card-title">{JSON.parse(localStorage.getItem("user")).name}</h5>
                <Link to="/profile">
                    <p>@{JSON.parse(localStorage.getItem("user")).username}</p>
                </Link>
                <form onSubmit={(e) => HandleSubmit(e)}>
                    <input type="text" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} className='form-control' />
                    <div className="row g-0">
                        <label for="formFileSm" class="form-label">Upload image</label>
                        <input ref={ref} onChange={(e) => setTweetImg(e.target.files[0])} className="col-4 form-control form-control-sm" type="file" name='file' id="formFile" />
                        {/* <button  className='col-6 btn btn-primary btn-sm mt-2'><i className="fa-solid fa-upload"></i></button> */}
                        <button type="submit" class="btn btn-primary mt-2">Tweet</button>
                    </div>
                </form>
            </div>
            {tweets?.map((item, index) => {
                if (item.retweetedFrom != null)
                    return <Tweet data={item} key={index} callback={null} type={'retweet'} />
                else
                    return <Tweet data={item} key={index} type={'tweet'} callback={null} />
            })}
        </div>

    )
}

export default Home