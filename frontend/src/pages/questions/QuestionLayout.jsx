import { Outlet, NavLink } from 'react-router-dom'

const QuestionLayout = () => {
    return (
        <div className='question-layout'>
            <h2>Questions</h2>
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

export default QuestionLayout
