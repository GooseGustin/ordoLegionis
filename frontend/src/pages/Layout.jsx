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
            </ul>
        </nav>
        
        <Outlet />
    </>
  )
}
