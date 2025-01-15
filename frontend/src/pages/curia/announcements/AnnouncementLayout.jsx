import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AnnouncementLayout = () => {
    return (
        <div>
            <h2>Announcements</h2>
            <nav className="question-nav">
                <ul>
                    <li>
                        <NavLink to="">List</NavLink>
                    </li>
                    <li>
                        <NavLink to="create">Create</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default AnnouncementLayout
