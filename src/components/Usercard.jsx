import React from 'react'
import { Link } from 'react-router-dom'

const Usercard = ({ otheruser }) => {
    const imgStyle = {
        maxWidth: "40px",
        maxHeight: "40px",
        borderRadius: "50%",
        margin: "0",
        width: "auto",
        height: "auto"
    }


    return (
        <div>
            <Link to={`/profile/${otheruser?._id}`} style={{textDecoration: 'none'}}>
                <div className="card mt-3 rounded-0 mb-1 mx-auto" style={{maxWidth:"250px"}} >
                    <div className="row g-0 p-2 pb-0"  >
                        <div className="col d-flex" >
                            <div className="pt-2">
                                {
                                    otheruser?.profile_pic ?
                                        <img src={otheruser?.profile_pic} className='' style={imgStyle} alt="..." /> :
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png' className='' style={imgStyle} alt="..." />
                                }
                            </div>
                            <div className="card-body p-3 " >
                                <h5 className=" ms-2 card-title d-inline">
                                    {otheruser?.name}
                                </h5>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default Usercard