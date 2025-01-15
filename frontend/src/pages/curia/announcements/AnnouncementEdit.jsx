import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import AnnouncementForm from './AnnouncementForm';

const AnnouncementEdit = () => {    
    const announcement = useLoaderData();
    console.log('In announcement edit', announcement); 

    return (
        <AnnouncementForm obj={announcement} method='edit' />
    )
}

export default AnnouncementEdit
