import { Link, NavLink, useLoaderData, useNavigate } from 'react-router-dom'

const ReminderDetail = () => {
    const [reminderObj, _] = useLoaderData();
    console.log("in reminder detail")

    const reminderDeadline = reminderObj.deadline
        ? new Date(reminderObj.deadline.split('-')).toDateString()
        : null

    return (
        <div>

            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='edit'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Edit</span>
                    </NavLink>
                    <NavLink className="nav-link" to='../../'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Praesidium</span>
                    </NavLink>
                    <NavLink className="nav-link" to='../create'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">New reminder</span>
                    </NavLink>
                    <NavLink className="nav-link" to='../'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Reminders</span>
                    </NavLink>

                    {/* settings  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Help</span>
                    </NavLink>

                    {/* contact  */}
                    <NavLink className="nav-link" to=''>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i> 
                        </span>
                        <span className="description">Contact</span>
                    </NavLink>
                </nav>
            </div>


            {/* main-content */}
            <main className="main-content text-dark">
                <div className="row my-2 text-start">
                    <div className="col-lg-8">
                    Reminder by <span className='text-info'>{reminderObj.creator_name} Praesidium</span>
                    </div>
                </div>
                

                <div className="row p-2">
                    {
                    reminderDeadline 
                    ?   (<div className="col border border-info rounded rounded-5 ms-3">
                            <span className="fw-bold">Deadline:</span> {reminderDeadline}
                        </div>)
                    :   (<></>)
                    }
                </div>

                <div className="row p-3">
                    {reminderObj.content}
                </div>
            </main>
        </div>
    )
}

export default ReminderDetail
