import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='mt-5'>
            <h2 className='display-3 text-info bg-dark p-3 mx-4'>404, Page not found</h2>
            <div className="text-center mx-auto fs-3">
            <p>What do you seek? The page you're looking for doesn't exist.</p>
            
            <p>Go back to the <Link to='/'>homepage</Link></p>
            </div>
        </div>
    )
}

export default NotFound
