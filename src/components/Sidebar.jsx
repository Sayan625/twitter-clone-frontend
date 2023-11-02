import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {clearUser} from '../redux/userSlice'

const Sidebar = () => {

    const dispatch=useDispatch()

    function handleLogout(){
        localStorage.clear()
        dispatch(clearUser)
    }

    return (
        <div className='container text-center d-flex flex-row justify-content-between flex-sm-column'>
            <Link className='btn btn-sm btn-outline-secondary rounded-0 my-3 px-1' to="/">Home</Link>
            <Link className='btn btn-sm btn-outline-secondary rounded-0 my-3 px-1' to="/profile">Profile</Link>
            <Link className='btn btn-sm btn-outline-secondary rounded-0 my-3 px-1'  to="/users">Find others</Link>
            <Link className='btn btn-sm btn-outline-secondary rounded-0 my-3 px-1' onClick={()=>handleLogout()} to="/signin">Logout</Link>
        </div>
    )
}

export default Sidebar