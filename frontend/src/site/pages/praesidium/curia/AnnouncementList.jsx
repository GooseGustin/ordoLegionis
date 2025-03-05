import axios from "axios"
import { useLoaderData, useNavigate } from "react-router-dom"
import { NavLink, Link } from "react-router-dom";

const BASEURL = "http://localhost:8000/api/";

const AnnouncementList = () => {
    const announcements = useLoaderData();
    console.log('announcements', announcements);

    return (
        <div>

            {/* sidebar */}
            <div className="sidebar">
                <nav className="nav flex-column">
                    <NavLink className="nav-link" to='../'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        </span>
                        <span className="description">Curia</span>
                    </NavLink>
                    <NavLink className="nav-link" to='create'>
                        <span className="icon">
                            <i className="fa-solid fa-right-from-bracket fa-lg"></i>
                        </span>
                        <span className="description">New announcement</span>
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

            {/* main  */}
            <main className="main-content">
                
                <div className="">
                    {announcements.map(item => {
                        return (
                            <div className="card my-2 border-0" key={item.id}>

                                <div className="card-header">
                                    <Link className='text-dark text-decoration-none' to={item.id.toString()}>
                                        <span className="fs-5">{item.title} | </span>
                                        <span className="text-info fs-6">Announcement </span>
                                    </Link>
                                </div>

                                <Link className='text-dark text-decoration-none' to={item.id.toString()}>
                                    <div className="card-body post rounded border border-3 border-dark">
                                        {item.content.slice(0, 120)}
                                        {item.content.length > 120 ? <>...</> : <></>}
                                    </div>
                                </Link>

                            </div>
                        );
                    }
                    )}
                </div>
            </main>
        </div>
    )
}

export default AnnouncementList

export const announcementListLoader = async ({ params }) => {
    const { cid } = params;
    let announcements;

    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const annResponse = await axios.get(`${BASEURL}curia/announcements/?cid=${cid}`, config);
            announcements = annResponse.data;
        } else {
            console.log('Sign in to access announcememnts')

        }
    } catch (err) {
        console.log("Error", err)
    } finally {
        return announcements
    }

}