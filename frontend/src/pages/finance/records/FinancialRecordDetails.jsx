import { useNavigate, useLoaderData, Link } from 'react-router-dom'
import axios from 'axios'

const FinancialRecordDetails = () => {
    const [financialRecord, _] = useLoaderData(); 
    console.log("in details", financialRecord)
    // const meetingName = financialRecord.meetingDetails.name; 

    const navigate = useNavigate(); 

    const deleteFinancialRecord = async () => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the financialRecord');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete("http://localhost:8000/api/finance/records/"+financialRecord.id+"/", config); 
                console.log("Successfully deleted"); 
                navigate("../")
            }  else {
                console.log("Sign in to delete the financialRecord")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this financialRecord")
            } else {
                console.error("Error deleting the financialRecord:", err);
            }
        }
    }
    
    if (!financialRecord) {
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
            <div className="financial-record-details">
                <p>Record ID: {financialRecord.id}</p>                
                <p>Meeting No.: {financialRecord.meetingDetails.meeting_no}</p>
                <hr />
                <div className="acct-statement">
                    <h2>Account Statement</h2>
                    <p>ACF: {financialRecord.acct_statement.acf}</p>
                    <p>SBC (previous): {financialRecord.acct_statement.sbc}</p>
                    <p>Balance: {financialRecord.acct_statement.balance}</p>
                </div><hr />
                <div className="expenses">
                    <h2>Expenses</h2>
                    <p>Extension: {financialRecord.acct_statement.expenses.extension}</p>
                    <p>Remittance: {financialRecord.acct_statement.expenses.remittance}</p>
                    <p>Stationery: {financialRecord.acct_statement.expenses.stationery}</p>
                    <p>Altar: {financialRecord.acct_statement.expenses.altar}</p>
                    <p>Bouquet: {financialRecord.acct_statement.expenses.bouquet}</p>
                </div><hr />
                <div className="acct-announcement">
                    <h2>Account Announcement</h2>
                    <p>SBC (today): {financialRecord.acct_announcement.sbc}</p>
                    <p>Collection 1: {financialRecord.acct_announcement.collection_1}</p>
                    <p>Collection 2: {financialRecord.acct_announcement.collection_2}</p>
                </div>
            </div> 
            
            <nav className="navbar">
                <ul>
                    <li><Link to={'edit'}>Edit</Link></li>
                    {/* <li><a onClick={deleteFinancialRecord}>Delete</a></li> */}
                </ul>
            </nav>
        </div>
    )
}

export default FinancialRecordDetails

// loader function 
export const financialRecordDetailsLoader = async ({ params }) => {
    const { id } = params;     
    
    // let errorStatus = null;
    let allMeetings = []; 

    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the financialRecord');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const financialRecordResponse = await axios.get("http://127.0.0.1:8000/api/finance/records/" + id, config); 
            const financialRecordData = financialRecordResponse.data;

            // Extract the meeting ID from the financialRecord data
            const meetingId = financialRecordData.meeting;

            // Fetch the meeting details using the ID
            if (meetingId) {
                const meetingResponse = await axios.get(`http://127.0.0.1:8000/api/meetings/meetings/${meetingId}`, config);
                const meetingData = meetingResponse.data;
                const allMeetingsResponse = await axios.get(`http://127.0.0.1:8000/api/meetings/meetings/`, config);
                const allMeetings = allMeetingsResponse.data;

                // Add the meeting details to the financialRecord data
                financialRecordData.meetingDetails = meetingData;
                return [financialRecordData, allMeetings]; 
            } else {
                console.warn('No meeting ID found in the financialRecord data');
            }
            return [financialRecordData, allMeetings]; 
        } else {
            console.log("Sign in to get the financialRecord")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to operate on financialRecords")
        } else {
            console.error("Error fetching the financialRecord:", err);          
        }
    }
}

                    
                    