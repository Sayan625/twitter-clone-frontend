import React, { useEffect, useState } from 'react'
import Tweet from '../components/Tweet'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Usercard from '../components/Usercard';
import { useSelector } from 'react-redux';

const TweetDetails = () => {
    const { id } = useParams()
    const [currentTweet, setCurrentTweet] = useState({})
    const [activeTab, setActiveTab] = useState('tab1');
    const user = useSelector((state) => state.user.current)
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabs = [
        { id: 'tab1', label: 'Replies' },
        { id: 'tab2', label: 'Retweeted BY' },
        { id: 'tab3', label: 'Likes' },
    ];

    const customHeader = {
        'access_token': `${user?.token}`
    }

    useEffect(() => {
        UpdateTweet()
    }, [id])

    async function UpdateTweet() {
        try {
            const resp = await axios.get(`http://localhost:5000/api/tweet/${id}`, { headers: customHeader })
            const data = await resp.data
            setCurrentTweet(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='container-fluid p-1'>
            <Tweet data={currentTweet} type={currentTweet.retweetedFrom ? 'retweet' : ''} callback={UpdateTweet} />
            <div className="container-fluid mt-2">
                <div className="nav nav-tabs row g-0" style={{ width: '100%' }}>
                    {tabs.map((tab) => (
                        <div className="nav-item col" key={tab.id}>
                            <button
                                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab.id)} style={{ width: '100%' }}
                            >
                                {tab.label}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="tab-content mt-4">
                    <div className={`tab-pane ${activeTab === 'tab1' ? 'show active' : ''}`}>
                        {currentTweet.replies?.map((item) => <Tweet data={item} type='reply' />)}
                    </div>
                    <div className={`tab-pane ${activeTab === 'tab2' ? 'show active' : ''}`}>
                        {currentTweet.retweetedBy?.map((item) => <Usercard otheruser={item} />)}
                    </div>
                    <div className={`tab-pane ${activeTab === 'tab3' ? 'show active' : ''}`}>
                        {currentTweet.likes?.map((item) => <Usercard otheruser={item} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetDetails