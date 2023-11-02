import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await axios.post("http://localhost:5000/api/auth/signin", formData)
            const user = await resp.data;
            console.log(resp.data)
            localStorage.setItem('user', JSON.stringify(user))
             navigate("/")
            navigate(0)
        } catch (error) {
            console.log(error)

        }

    };


    return (
        <div className='container-fluid h-100 d-flex justify-content-center align-items-center'>
            <div className="card mb-3" style={{ maxWidth: '576px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://picsum.photos/800" style={{ 'height': '100%' }} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <h5 className="card-header text-center">Sign In</h5>
                        <div className="card-body">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                                </div>
                                <div className="">
                                    <label htmlFor="InputPassword" className="form-label">Password</label>
                                    <input type="password" value={formData.password} onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} className="form-control" id="InputPassword" />
                                </div>
                                <button type="submit" className="w-100 rounded-0 btn btn-primary mt-3">Sign In</button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <span className='me-2'>
                                Not Registered
                            </span>
                            <Link to='/signup'>
                                SignUp
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn