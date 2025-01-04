import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <h2>404, Page not found</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ea a dignissimos nulla aperiam cupiditate natus similique quasi illo dolore atque eligendi laborum beatae voluptates accusamus eos corrupti quos reiciendis?</p>

            <p>Return to the <Link to='/'>homepage</Link></p>
        </div>
    )
}

export default NotFound
