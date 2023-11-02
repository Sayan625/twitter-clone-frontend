import React, { useEffect, useState, useRef } from 'react'
import Tweet from '../components/Tweet'
import axios from 'axios'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Profile = () => {

  var { id } = useParams()
  const [profileId, setProfileId] = useState(id)
  const [profilePic, setprofilePic] = useState()
  const [userTweets, setUserTweets] = useState([])
  const [editForm, setEditForm] = useState(false)
  const [activeTab, setActiveTab] = useState('tab1');
  const ref = useRef();
  const [user, setUser] = useState({
    _id: JSON.parse(localStorage.getItem('user'))._id,
    profile_pic: "",
    token: JSON.parse(localStorage.getItem('user')).token
  })
  const customHeader = {
    'access_token': `${user.token}`
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: 'tab1', label: 'Tweets' },
    { id: 'tab2', label: 'Retweets' },
    { id: 'tab3', label: 'Replied To' },
  ];

  useEffect(() => {
    if (!id) {
      id = user._id
      setProfileId(() => user._id)
    }
    GetUser()
    GetUserTweets()


  }, [id])

  async function GetUser() {
    try {
      console.log("user", id)
      const resp = await axios.get(`http://localhost:5000/api/user/${id}`, {
        headers: {
          access_token: user.token,
        }
      })

      const data = await resp.data
      console.log(data)
      const { _id, ...others } = data
      setUser((prev) => ({ ...prev, ...others }))
    } catch (error) {
      console.log(error)
    }
  }


  async function GetUserTweets() {
    try {
      console.log("tweet", id)
      const resp = await axios.get(`http://localhost:5000/api/user/${id}/tweet`, {
        headers: customHeader
      })

      const data = await resp.data
      setUserTweets(data)
    } catch (error) {
      console.log(error)
    }
  }

  function HandleEditForm(e) {
    e.preventDefault()
    setEditForm(() => !editForm)
  }

  async function HandleSubmit(e) {
    e.preventDefault()
    try {
      const resp = await axios.put(`http://localhost:5000/api/user/${user._id}/update`, user,
        { headers: customHeader })
      setEditForm(false)
    } catch (error) {
      console.log(error)

    }
  }

  const imgStyle = {
    minWidth: "70px",
    width: "110px",
    borderRadius: "50%",
    border: "5px solid white",
    transform: 'translateY(-50%)',
    backgroundColor: "white"


  }

  async function ChangeProfilePic() {
    try {
      const formData = new FormData()
      formData.append('file', profilePic)
      const resp = await axios.post(`http://localhost:5000/api/user/upload`, formData, { headers: customHeader })
      const imgUrl = await resp.data
      await axios.put(`http://localhost:5000/api/user/${user._id}/update`, { 'profile_pic': imgUrl },
        { headers: customHeader })

      setUser((prev) => ({ ...prev, profile_pic: imgUrl }))
      ref.current.value = null
    } catch (error) {
      console.log(error)
    }


  }


  async function HandleFollow() {
    try {
      const resp = await axios.put(`http://localhost:5000/api/user/${user._id}/follow`, {
        userToFollowId: id

      }, { headers: customHeader })
      console.log(resp.data)
      GetUser()
    } catch (error) {
      console.log(error)
    }
  }

  async function HandleUnFollow() {
    try {
      const resp = await axios.put(`http://localhost:5000/api/user/${user._id}/unfollow`, {
        userToUnFollowId: id

      }, { headers: customHeader })
      console.log(resp.data)
      GetUser()
    } catch (error) {
      console.log(error)
    }
  }

  function CheckFollowing(id) {

    let following = false;

    user.followers?.forEach((item) => {
      if (item._id === id)
        following = true
    })
    return following
  }



  return (
    <div >
      <div className="container-fluid p-4 d-flex flex-column">
        <div className="cover" style={{ backgroundColor: "cyan", height: "200px" }}>
        </div>
        <div className="prifile_body ">
          <div className="row " >
            <div className="col-12 text-center" style={{ height: "7disabled={false}5px" }} >
              {
                user.profile_pic ?
                  <img src={user.profile_pic} className='' style={imgStyle} alt="..." /> :
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png' className='' style={imgStyle} alt="..." />

              }
            </div>
            {
              (id && id !== user._id) &&
              <div className="col-12 text-center">
                {CheckFollowing(user._id) ?
                  <button className='btn btn-primary me-3' onClick={() => HandleUnFollow()}>Unfollow</button> :
                  <button className='btn btn-primary ' onClick={() => HandleFollow()}>Follow</button>
                }
              </div>
            }
          </div>
          <div className="details px-1 my-3">
            <form className="container p-0" onSubmit={(e) => HandleSubmit(e)}>
              <div className="row g-2 mb-3">
                <div className="col-md-3">
                  <label htmlFor="inputName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="inputName" onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))} value={user.name} disabled={!editForm} />
                </div>
                <div className="col-md-3">
                  <label htmlFor="inputUserName" className="form-label">Username</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" value={user.username} disabled readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">Email</label>
                  <input type="email" className="form-control" id="inputEmail4" value={user.email} disabled readOnly />
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-12">
                  <label htmlFor="inputName" className="form-label">About</label>
                  <textarea className="form-control" style={{ height: "100px" }} value={user.about} disabled={!editForm} onChange={(e) => setUser((prev) => ({ ...prev, about: e.target.value }))} ></textarea>
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label d-block">Date of Birth</label>
                  <Datepicker showYearDropdown disabled={!editForm} selected={user.dateOfBirth ? new Date(user.dateOfBirth) : ""} dateFormat="dd-MM-yyyy" maxDate={new Date(Date.now())} onChange={(date) => setUser((prev) => ({ ...prev, dateOfBirth: date }))} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputUserName" className="form-label">Location</label>
                  <input type="text" className="form-control" value={user.location} onChange={(e) => setUser((prev) => ({ ...prev, location: e.target.value }))} disabled={!editForm} />
                </div>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <Link className='btn btn-sm btn-outline-secondary rounded-0 my-3 px-1' to="/following">Following</Link>
                  <span className='ms-2 fs-6'>{user.following?.length}</span>
                </div>
                <div className="col-md-6">
                <Link className='btn btn-sm btn-outline-secondary my-3 rounded-0 px-1' to="/followers">Followers</Link>
                <span className='ms-2 fs-6'>{user.followers?.length}</span>
                </div>
              </div>
              {profileId === user._id &&
                <div className="row g-0 mb-3 align-items-center justify-content-between">
                  <div className="col-12 col-md-6">
                    <div className="row g-0">
                      <label for="formFileSm" class="form-label">Change profile picture</label>
                      <input ref={ref} onChange={(e) => setprofilePic(e.target.files[0])} className="col-4 form-control form-control-sm" type="file" name='file' id="formFile" />
                      <button onClick={() => ChangeProfilePic()} className='col-6 btn btn-primary btn-sm mt-2'><i className="fa-solid fa-upload"></i></button>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 text-end">
                    <button type="button" onClick={(e) => HandleEditForm(e)} className="btn btn-primary mx-2">Edit</button>
                    <button type="submit" className="btn btn-primary mx-2" disabled={!editForm}>Save</button>
                  </div>
                </div>
              }
            </form>
          </div>
          <div className="">
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
                  {userTweets?.map((item, index) => {
                    if (item.retweetedFrom == null && item.repliedTo == null)
                      return <Tweet data={item} key={index + Date.now()} type={'tweet'} />

                  })}
                </div>
                <div className={`tab-pane ${activeTab === 'tab2' ? 'show active' : ''}`}>
                  {userTweets?.map((item, index) => {
                    if (item.retweetedFrom != null && item.repliedTo == null)
                      return <Tweet data={item} key={index + Date.now()} type={'retweet'} />

                  })}
                </div>
                <div className={`tab-pane ${activeTab === 'tab3' ? 'show active' : ''}`}>
                  {userTweets?.map((item, index) => {
                    if (item.repliedTo != null) {
                      return <Tweet data={item.repliedTo} key={index + Date.now()} type={null} />
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile