import React from 'react'
import Sidebar from './Sidebar'

const PageLayout = ({ element }) => {
    return (
        <div className='container-fluid row g-0 h-100'>
            <div className='col-12 col-sm-3 position-fixed d-sm-none z-3 top-0' style={{ borderRight: "1px solid black", backgroundColor: "white", height: "85px" }}>
                <Sidebar />
            </div>
            <div className='col-12 col-sm-3 z-3 d-none d-sm-block position-relative z-0' style={{ borderRight: "1px solid black", backgroundColor: "white" }}>
                <div className="position-fixed top-0 bottom-0" style={{ width: "inherit" }}>
                    <Sidebar />
                </div>
            </div>
            <div className='col-12 col-sm-7 z-0 mt-5 pt-5 pt-sm-0 mt-sm-0' style={{ borderRight: "1px solid black" }}>
                {element}
            </div>
        </div>
    )
}

export default PageLayout