import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'

const BASEURL = 'http://localhost:8000/api/';

const FinancialRecordForm = (props) => {
    const loc = "In financial record form";
    const [obj, meetings] = useLoaderData();
    const { method } = props;
    console.log(loc, obj, method)
    console.log('Meetings', meetings)

    const navigate = useNavigate();

    const defaultMeeting = obj ? obj.meeting : meetings[0].id;

    const defaultAcctStatement = obj ? obj.acct_statement : {
        acf: 0, sbc: 0, balance: 0
    };
    const defaultStatementAcf = obj ? obj.acct_statement.acf : 0;
    const defaultStatementSbc = obj ? obj.acct_statement.sbc : 0;
    const defaultStatementBalance = obj ? obj.acct_statement.balance : 0;

    const defaultExpenses = obj ? obj.acct_statement.expenses : {
        extension: 0, remittance: 0, stationery: 0, altar: 0,
        bouquet: 0, others: {}
    };
    const defaultExpenseExtension = obj ? obj.acct_statement.expenses.extension : 0;
    const defaultExpenseRemittance = obj ? obj.acct_statement.expenses.remittance : 0;
    const defaultExpenseStationery = obj ? obj.acct_statement.expenses.stationery : 0;
    const defaultExpenseAltar = obj ? obj.acct_statement.expenses.altar : 0;
    const defaultExpenseBouquet = obj ? obj.acct_statement.expenses.bouquet : 0;
    const defaultExpenseOthers = obj ? obj.acct_statement.expenses.others : {};

    const defaultAcctAnnouncement = obj ? obj.acct_announcement : {
        sbc: 0, collection_1: 0, collection_2: 0
    };
    const defaultAnnouncementSbc = obj ? obj.acct_announcement.sbc : 0;
    const defaultAnnouncementCol1 = obj ? obj.acct_announcement.collection_1 : 0;
    const defaultAnnouncementCol2 = obj ? obj.acct_announcement.collection_2 : 0;

    const [financialRecord, setFinancialRecord] = useState({
        meeting: defaultMeeting,
        acct_statement: defaultAcctStatement,
        acct_announcement: defaultAcctAnnouncement
    })
    const handleRecordChange = (e) => {
        setFinancialRecord({
            ...financialRecord,
            [e.target.name]: e.target.value * 1
        });
        console.log("handled records", financialRecord)
    }

    const [acctStatement, setAcctStatement] = useState(defaultAcctStatement);
    const handleStatementChange = (e) => {
        setAcctStatement({
            ...acctStatement,
            [e.target.name]: e.target.value * 1
        });
        console.log("handled statement", acctStatement);
    }

    const [acctAnnouncement, setAcctAnnouncement] = useState(defaultAcctAnnouncement);
    const handleAnnouncementChange = (e) => {
        setAcctAnnouncement({
            ...acctAnnouncement,
            [e.target.name]: e.target.value * 1
        });
        console.log('handled announcement', acctAnnouncement);
    }

    const [expenses, setExpenses] = useState(defaultExpenses);
    const handleExpensesChange = (e) => {
        setExpenses({
            ...expenses,
            [e.target.name]: e.target.value * 1
        });
        console.log("handled expenses", expenses, e)
    }

    const submitFinancialRecord = async (e) => {
        e.preventDefault();
        const loc = "In submission";
        try {
            console.log('Trying to send', financialRecord);
            const token = localStorage.getItem('accessToken');
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };

                // Create expense
                console.log(loc, expenses);
                // setAcctStatement({
                //     ...acctStatement,
                //     expenses: expenses // Response.data 
                // })
                const acctStatementCopy = {
                    ...acctStatement,
                    expenses: expenses
                }

                setFinancialRecord({
                    ...financialRecord,
                    acct_statement: acctStatementCopy, // statementResponse.data, 
                    acct_announcement: acctAnnouncement // announcementResponse.data 
                })
                const financialRecordCopy = {
                    ...financialRecord, 
                    acct_statement: acctStatementCopy, 
                    acct_announcement: acctAnnouncement 
                };
                console.log(loc, financialRecord);
                if (method==='create') {
                    const recordResponse = await axios.post(BASEURL + "finance/records/", financialRecordCopy, config);
                    console.log("FinancialRecord created!", recordResponse.data);
                } else {
                    const recordResponse = await axios.put(BASEURL + `finance/records/${obj.id}/`, financialRecordCopy, config);
                    console.log("FinancialRecord edited!", recordResponse.data);
                    
                }
                obj ? navigate(`/records/${obj.id}`) : navigate('/records')
                // }
            } else {
                console.log("Sign in to operate on financialRecords")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on financialRecords")
            } else {
                console.log("Error during operation", err)
            }
        }
    }

    const pageTitle = method == 'create' ? "Create a Financial Record" : "Edit your Financial Record";
    const btnTitle = method == 'create' ? "Create" : "Edit";

    return (
        <div className='financialRecord-form'>
            <h2>{pageTitle}</h2>
            <hr />
            <form onSubmit={submitFinancialRecord}>

                <label htmlFor="meeting">
                    Meeting no.:
                    <select name="meeting" id="meeting"
                        onChange={handleRecordChange}>
                        {meetings.map(meeting =>
                            obj
                                ? (
                                    <option
                                        value={meeting.id}
                                        key={meeting.id}
                                        selected={meeting.id == obj.meeting ? true : false}
                                    >{meeting.meeting_no}</option>
                                )
                                : (
                                    <option
                                        value={meeting.id}
                                        key={meeting.id}
                                    >{meeting.meeting_no}</option>
                                ))}
                    </select>
                </label><br /><br />

                {/* Acct Statement */}
                <fieldset>
                    <div className="acct-statement">
                        <h2>Account Statement</h2>
                        <label htmlFor="acf">ACF:
                            <input type="number" name="acf" id=""
                                onChange={handleStatementChange} 
                                defaultValue={defaultStatementAcf}/>
                        </label><br />
                        <label htmlFor="sbc">SBC:
                            <input type="number" name="sbc" id=""
                                onChange={handleStatementChange} 
                                defaultValue={defaultStatementSbc}/>
                        </label><br />
                        <label htmlFor="balance">Balance:
                            <input type="number" name="balance" id=""
                                onChange={handleStatementChange} 
                                defaultValue={defaultStatementBalance}/>
                        </label><br />
                    </div>
                </fieldset>

                {/* Expenses */}
                <fieldset>
                    <div className="expenses">
                        <h2>Expenses</h2>
                        <label htmlFor="extension">Extension:
                            <input type="number" name="extension" id=""
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseExtension}/>
                        </label><br />
                        <label htmlFor="remittance">Remittance:
                            <input type="number" name="remittance" id=""
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseRemittance} />
                        </label><br />
                        <label htmlFor="stationery">Stationery:
                            <input type="number" name="stationery" id=""
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseStationery} />
                        </label><br />
                        <label htmlFor="altar">Altar:
                            <input type="number" name="altar" id=""
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseAltar} />
                        </label><br />
                        <label htmlFor="bouquet">Bouquet
                            <input type="number" name="bouquet" id=""
                                onChange={handleExpensesChange} 
                                defaultValue={defaultExpenseBouquet} />
                        </label><br />
                        {/* <label htmlFor="others"><input type="number" name="" id="" /></label> */}
                    </div>
                </fieldset>

                {/* Acct Announcement */}
                <fieldset>
                    <div className="acct-announcement">
                        <h2>Account Announcement</h2>
                        <label htmlFor="sbc">SBC:
                            <input type="number" name="sbc" id=""
                                onChange={handleAnnouncementChange}
                                defaultValue={defaultAnnouncementSbc} />
                        </label><br />
                        <label htmlFor="collection_1">Collection 1:
                            <input type="number" name="collection_1" id=""
                                onChange={handleAnnouncementChange}
                                defaultValue={defaultAnnouncementCol1} />
                        </label><br />
                        <label htmlFor="collection_2">Collection 2:
                            <input type="number" name="collection_2" id=""
                                onChange={handleAnnouncementChange}
                                defaultValue={defaultAnnouncementCol2} />
                        </label><br />
                    </div>
                </fieldset>

                <hr />
                <button type="submit">{btnTitle}</button>
                <Link to='../'>Cancel</Link>
            </form>
        </div>
    )
}


export default FinancialRecordForm

export const financialRecordsFormLoader = async () => {
    console.log("In financialRecords form loader");
    let meetingData = [];
    let errorStatus = null;
    try {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const response = await axios.get("http://127.0.0.1:8000/api/meetings/meetings", config);
            meetingData = response.data;
        } else {
            console.log("Sign in to get meetings paradisei")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view meetings")
            // setErrStatus(401); 
        } else {
            console.error("Error fetching meetings:", err);
        }
        errorStatus = err.status;
    } finally {
        return [null, meetingData]
    }

}

