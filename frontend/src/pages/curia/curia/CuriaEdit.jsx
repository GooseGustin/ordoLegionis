import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
// import axios from 'axios';
import CuriaForm from './CuriaForm';

const CuriaEdit = () => {    
    const curia = useLoaderData();
    console.log('In curia edit', curia); 

    return (
        <CuriaForm obj={curia} method='edit' />
    )
}

export default CuriaEdit
