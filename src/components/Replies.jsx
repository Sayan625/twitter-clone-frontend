import React from 'react'

const Replies = ({data}) => {

    const imgStyle = {
        maxWidth: "50px",
        maxHeight: "50px",
        borderRadius: "50%",
        margin: "0",
        width: "auto",
        height: "auto"
    }

    return (
        <div className="card d-flex flex-row mb-1" style={{ width: '100%' }}>
            <div className="pt-2 ps-2">
                <img src="https://picsum.photos/800" className='' style={imgStyle} alt="..." />
            </div>
            <div className="card-body p-3">
                <h5 className="card-title ">{data.tweetedBy.name}</h5>
                <p className="card-title text-disabled">@{data.tweetedBy.username}</p>
                <p className="card-text">{data.content}</p>
                <img src="https://picsum.photos/800" className="img-fluid " style={{ 'width': '100%', 'height': '250px' }} alt="..." />
            </div>
        </div>
    )
}

export default Replies