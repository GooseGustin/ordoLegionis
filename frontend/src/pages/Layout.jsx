import { Outlet, NavLink } from "react-router-dom"

export default function Layout() {
  return (
    <>
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/questions'>Questions</NavLink>
                </li>
                <li>
                    <NavLink to='/posts'>Posts</NavLink>
                </li>
                <li>
                    <NavLink to='/curia'>Curia</NavLink>
                </li>
                <li>
                    <NavLink to='/profile'>Profile</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                    <NavLink to='/register'>Register</NavLink>
                </li>
            </ul>
        </nav>
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to='/announcements'>Announcements</NavLink>
                </li>
                <li>
                    <NavLink to='/praesidium'>Praesidium</NavLink>
                </li>
                <li>
                    <NavLink to='/reminders'>Reminder</NavLink>
                </li>
                <li>
                    <NavLink to='/meetings'>Meetings</NavLink>
                </li>
                <li>
                    <NavLink to='/works'>Works</NavLink>
                </li>
                <li>
                    <NavLink to='/worklists'>Worklists</NavLink>
                </li>
            </ul>
        </nav>
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to='/expenses'>Expenses</NavLink>
                </li>
                <li>
                    <NavLink></NavLink>
                </li>
                <li>
                    <NavLink></NavLink>
                </li>
                <li>
                    <NavLink></NavLink>
                </li>
                <li>
                    <NavLink></NavLink>
                </li>
                <li>
                    <NavLink></NavLink>
                </li>
            </ul>
        </nav>
        
        <Outlet />
    </>
  )
}
