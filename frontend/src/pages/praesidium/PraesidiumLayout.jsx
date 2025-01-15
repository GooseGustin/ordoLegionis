import { Outlet, NavLink } from 'react-router-dom'

const PraesidiumLayout = () => {
    return (
        <div>
            <h2>Praesidium</h2>
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

export default PraesidiumLayout
