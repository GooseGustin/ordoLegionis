import axios from 'axios';
import { useLoaderData } from 'react-router-dom'
import ExpenseForm from './ExpenseForm';


const BASEURL = "http://localhost:8000/api/";

const ExpenseEdit = () => {    
    const expense = useLoaderData();
    console.log('In post edit', expense); 

    return (
        <ExpenseForm obj={expense} method='edit' />
    )
}

export default ExpenseEdit

export const expensesEditLoader = async ({ params }) => {
    const {id} = params; 
    const loc = 'In expense edit loader'; 
    console.log(loc); 
    let expenseObj = null; 
    // let errorStatus = null; 
    
    try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            console.log('Get the expense object');
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            }; 
            const response = await axios.get(BASEURL+"finance/expenses/"+id, config); 
            // console.log('Expense response', response.data)
            expenseObj = response.data; 
        } else {
            console.log("Sign in to get expense object")
            throw new Error("The session is expired, login again")
        }
    } catch (err) {
        if (err.status === 401) {
            console.log("The session is expired. Please sign in again to view expenses")
            // setErrStatus(401); 
        } else {
            console.error("Error fetching expenses:", err);                    
        }
        // errorStatus = err.status; 
    } finally {
        return expenseObj
    }
}