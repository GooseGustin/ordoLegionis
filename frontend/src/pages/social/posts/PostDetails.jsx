import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const PostDetails = () => {
    const post = useLoaderData(); 
    console.log("in details", post)
    const legUsername = post.legionaryDetails.user.username; 

    const navigate = useNavigate(); 

    const deletePost = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the post');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/social/posts/"+post.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the post")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this post")
            } else {
                console.error("Error deleting the post:", err);
            }
        }
    }
    
    if (!post) {
        return (
            <div>
                You are logged out. Please sign in to view this content.
                <br />
                <Link to="../../login">Login</Link>
            </div>
        )
    } 

    return (
        <div>
            <div className="post-details">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>{post.date}</p>
                <p>Flags: {post.flags.length}</p>
                <p>Posted by: {legUsername}</p>
            </div>
            <nav className="navbar">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    <li><a onClick={deletePost}>Delete</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default PostDetails

// loader function 
export const postDetailsLoader = async ({ params }) => {
    const { id } = params;     

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the post');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const postResponse = await axios.get("http://127.0.0.1:8000/api/social/posts/" + id, config); 
            const postData = postResponse.data;
            console.log('Question response:', postData);

            // Extract the legionary ID from the post data
            const legionaryId = postData.legionary;

            // Fetch the legionary details using the ID
            if (legionaryId) {
                console.log('Fetching legionary details...');
                const legionaryResponse = await axios.get(`http://127.0.0.1:8000/api/accounts/legionary/${legionaryId}`, config);
                const legionaryData = legionaryResponse.data;
                console.log('Legionary response:', legionaryData);

                // Add the legionary details to the post data
                postData.legionaryDetails = legionaryData;
                return postData; 
            } else {
                console.warn('No legionary ID found in the post data');
            }
        } else {
            console.log("Sign in to get the post")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on posts")
        } else {
            console.error("Error fetching the post:", err);          
        }
    }
}
