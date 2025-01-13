import { Outlet, NavLink } from 'react-router-dom'

const CuriaLayout = () => {
    return (
        <div>
            <h2>Curia</h2>
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

export default CuriaLayout
