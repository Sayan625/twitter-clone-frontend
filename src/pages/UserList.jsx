import React, { useState } from 'react'
import Usercard from '../components/Usercard'
import { useSelector } from 'react-redux'
import axios from 'axios'

const UserList = ({ type }) => {
    const user = useSelector((state) => state.user.current)
    const [username, setUsername] = useState('')
    const [userList, setUserList] = useState([])
    const [message, setMessage] = useState('')
    const customHeader = {
        'access_token': `${user?.token}`
    }

    async function HandleSubmit(e) {
        e.preventDefault()
        try {
            const resp = await axios.get(`http://localhost:5000/api/user/search?name=${username}`, {
                headers: customHeader
            })
            console.log(resp)
            if (resp.status == 200 && Array.isArray(resp.data) && resp.data.length > 0) {
                setUserList(() => resp.data)
                setMessage("")

                return
            } else {
                setMessage("not found")
                setUsername('')
                setUserList([])
            }
        } catch (error) {
            setMessage("not found")
            setUsername('')
            setUserList([])


        }


    }


    return (
        <div className='p-2'>
            {!type &&
                <div className="card p-2">
                    <p className="card-title">Search by user name</p>
                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" className='form-control' />
                        <button disabled={username ? false : true} type="submit" class="btn btn-primary mt-2">Search</button>
                    </form>
                </div>
            }

            <div className="px-3">
                {type == 'followers' && <>
                    {
                        user?.followers?.length > 0 ?
                            user?.followers?.map((item) => <Usercard otheruser={item} />) :
                            "You are following no one"
                    }
                </>}
                {type == 'following' && <>
                    {
                        user?.following?.length > 0 ?
                            user?.following?.map((item) => <Usercard otheruser={item} />) :
                            "no one is following you"
                    }
                </>}
                {!type && userList?.map((item) => <Usercard otheruser={item} />)}
                {message && <p>{message}</p>}

            </div>
        </div>
    )
}

export default UserList