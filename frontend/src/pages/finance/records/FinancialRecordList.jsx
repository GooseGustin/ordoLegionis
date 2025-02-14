import axios from 'axios';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom'
// import { getObjectKeys } from '../../works/worklist/WorkListEdit';

const BASEURL = "http://127.0.0.1:8000/api/"; 

const FinancialRecordList = () => {
    const [finRecList, errStatus] = useLoaderData();
    const [financialRecordsList, setFinancialRecordsList] = useState(finRecList);


    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view financialRecords.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }

    return (
        <div className="financialRecord-list">
            {financialRecordsList.map(financialRecord => 
                (
                    <Link to={financialRecord.id.toString()} key={financialRecord.id}>
                        Financial Record of Meeting ID {financialRecord.meeting}<br />
                    </Link>
                )  
            )}  
        </div>
    )
}

export default FinancialRecordList

export const financialRecordsListLoader = async () => {
    const loc = 'In financialRecords list loader'; 
    console.log(loc); 
    let financialRecordsList = []; 
    let errorStatus = null; 
    
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the financialRecords');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const response = await axios.get(BASEURL+"finance/records", config); 
            // console.log('FinancialRecord response', response.data)
            financialRecordsList = response.data; 
        } else {
            console.log("Sign in to get financialRecords")
            throw new Error("The session is expired, login again")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view financialRecords")
            // setErrStatus(401); 
        } else {
            console.error("Error fetching financialRecords:", err);                    
        }
        errorStatus = err.status; 
    } finally {
        return [financialRecordsList, errorStatus]
    }
}