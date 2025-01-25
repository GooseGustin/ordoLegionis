import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import ReminderForm from './ReminderForm';

const ReminderEdit = () => {    
    const reminder = useLoaderData();
    console.log('In reminder edit', reminder); 

    return (
        <ReminderForm obj={reminder} method='edit' />
    )
}

export default ReminderEdit
