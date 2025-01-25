import axios from 'axios';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom'
import { getObjectKeys } from '../../works/worklist/WorkListEdit';

const BASEURL = "http://127.0.0.1:8000/api/"; 

const ExpenseList = () => {
    const [expList, errStatus] = useLoaderData();
    const [expensesList, setExpensesList] = useState(expList);

    // const navigate = useNavigate(); 

    const deleteExpense = async (id) => {
        try {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                console.log('Get the workList');
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    }
                }; 
                const res = await axios.delete(BASEURL+"finance/expenses/"+id+"/", config); 
                console.log("Successfully deleted"); 
                // navigate("../")
                const updatedExpensesList = expensesList.filter(function (exp) {
                    return exp.id !== id;
                })
                setExpensesList(updatedExpensesList);
            }  else {
                console.log("Sign in to delete the workList")
            }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to delete this workList")
            } else {
                console.error("Error deleting the workList:", err);
            }
        }
    }

    if (errStatus === 401) {
        return (
            <div>
                <p>You are logged out. Please sign in again to view expenses.</p>
                <p><Link to='../login'>Login</Link></p>
            </div>
        )
    }

    return (
        <div className="expense-list">
            {expensesList.map(expense => {
                const others = expense.others; 
                const othersKeys = getObjectKeys(others); 
                return (
                    <span key={expense.id}> 
                        <hr />
                        <p>Extension: {expense.extension}</p>
                        <p>Remittance: {expense.remittance}</p>
                        <p>Stationery: {expense.stationery}</p>
                        <p>Altar: {expense.altar}</p>
                        <p>Bouquet: {expense.bouquet}</p>
                        {othersKeys.map(key => (
                            <p key={key}>{key}: {others[key]}</p>
                        ))}
                        <nav className="navbar">
                            <ul>
                                <li><Link to={expense.id.toString()+'/edit'}>Edit</Link></li>
                                <li><a onClick={() => {
                                    deleteExpense(expense.id)
                                    }}>Delete</a></li>
                            </ul>
                        </nav>
                    </span>
                )
            }
            )}  
        </div>
    )
}

export default ExpenseList

export const expensesListLoader = async () => {
    const loc = 'In expenses list loader'; 
    console.log(loc); 
    let expensesList = []; 
    let errorStatus = null; 
    
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the expenses');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const response = await axios.get(BASEURL+"finance/expenses", config); 
            // console.log('Expense response', response.data)
            expensesList = response.data; 
        } else {
            console.log("Sign in to get expenses")
            throw new Error("The session is expired, login again")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view expenses")
            // setErrStatus(401); 
        } else {
            console.error("Error fetching expenses:", err);                    
        }
        errorStatus = err.status; 
    } finally {
        return [expensesList, errorStatus]
    }
}