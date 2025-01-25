import { useLoaderData } from 'react-router-dom'
import MeetingForm from './MeetingForm';

const MeetingEdit = () => {    
    const meeting = useLoaderData();
    console.log('In meeting edit', meeting); 

    return (
        <MeetingForm obj={meeting} method='edit' />
    )
}

export default MeetingEdit
