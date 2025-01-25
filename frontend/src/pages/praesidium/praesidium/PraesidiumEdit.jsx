import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import PraesidiumForm from './PraesidiumForm';

const PraesidiumEdit = () => {    
    const praesidium = useLoaderData();
    console.log('In praesidium edit', praesidium); 

    return (
        <PraesidiumForm obj={praesidium} method='edit' />
    )
}

export default PraesidiumEdit
