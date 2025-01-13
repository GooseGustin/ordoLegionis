import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios';
import QuestionForm from './QuestionForm';

const QuestionEdit = () => {    
    const question = useLoaderData();
    console.log('In question edit', question); 

    return (
        <QuestionForm obj={question} method='edit' />
    )
}

export default QuestionEdit
