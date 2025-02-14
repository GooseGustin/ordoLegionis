import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'

const BASEURL = 'http://localhost:8000/api/';

const WorkForm = (props) => {
    const loc = "In financial record form";
    const [obj, meetings] = useLoaderData(); // obj, meeting, praesidium, worklist
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

    const [work, setWork] = useState({
        meeting: defaultMeeting,
        acct_statement: defaultAcctStatement,
        acct_announcement: defaultAcctAnnouncement
    })
    const handleRecordChange = (e) => {
        setWork({
            ...work,
            [e.target.name]: e.target.value * 1
        });
        console.log("handled records", work)
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

    const submitWork = async (e) => {
        e.preventDefault();
        const loc = "In submission";
        try {
            console.log('Trying to send', work);
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

                setWork({
                    ...work,
                    acct_statement: acctStatementCopy, // statementResponse.data, 
                    acct_announcement: acctAnnouncement // announcementResponse.data 
                })
                const workCopy = {
                    ...work, 
                    acct_statement: acctStatementCopy, 
                    acct_announcement: acctAnnouncement 
                };
                console.log(loc, work);
                if (method==='create') {
                    const recordResponse = await axios.post(BASEURL + "finance/records/", workCopy, config);
                    console.log("Work created!", recordResponse.data);
                } else {
                    const recordResponse = await axios.put(BASEURL + `finance/records/${obj.id}/`, workCopy, config);
                    console.log("Work edited!", recordResponse.data);
                    
                }
                obj ? navigate(`/records/${obj.id}`) : navigate('/records')
                // }
            } else {
                console.log("Sign in to operate on works")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on works")
            } else {
                console.log("Error during operation", err)
            }
        }
    }

    const pageTitle = method == 'create' ? "Create a Financial Record" : "Edit your Financial Record";
    const btnTitle = method == 'create' ? "Create" : "Edit";

    return (
        <>
        <h2>Record Work</h2>
        </>
    )
}


export default WorkForm

export const worksFormLoader = async (params) => {
    // return the work object, meeting, praesidium, worklist
    const { id } = params; 
    console.log("In works form loader");
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

