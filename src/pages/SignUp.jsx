import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'


const SignUp = () => {
const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name:"",
        username:"",
        email:"",
        password:""
    })

    async function HandleSubmit(e) {
        e.preventDefault()
        try {
            console.log(formData)
            const resp = await axios.post('http://localhost:5000/api/auth/signup', formData)
            navigate('/signin')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container-fluid h-100 d-flex justify-content-center align-items-center'>
            <div className="card mb-3" style={{ 'max-width': '576px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://picsum.photos/800" style={{ 'height': '100%' }} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <h5 className="card-header text-center">Sign Up</h5>
                        <div className="card-body">
                            <form onSubmit={(e) => HandleSubmit(e)}>
                                <div classNameName="mb-3">
                                    <label for="exampleInputName1" className="form-label">Full Name</label>
                                    <input value={formData.name}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, 'name': e.target.value }))}
                                        type="text" className="form-control" id="exampleInputName1" />
                                </div>
                                <div classNameName="mb-3">
                                    <label for="exampleInputName2" className="form-label">Username</label>
                                    <input value={formData.username}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, 'username': e.target.value }))}
                                        type="text" className="form-control" id="exampleInputName2" />
                                </div>
                                <div classNameName="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input value={formData.email}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, 'email': e.target.value }))}
                                        type="email" className="form-control" id="exampleInputEmail1" />
                                </div>
                                <div classNameName="">
                                    <label for="exampleInputPassword1" classNameName="form-label">Password</label>
                                    <input value={formData.password}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, 'password': e.target.value }))}
                                        type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <button type="submit" className=" w-100 rounded-0 btn btn-primary mt-3">Submit</button>
                            </form>
                        </div>
                        <div className="card-footer">
                            <span className='me-2'>
                                Already Registered
                            </span>
                            <Link to='/signin'>
                                SignIn
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp