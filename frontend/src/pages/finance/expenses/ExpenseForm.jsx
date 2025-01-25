import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const BASEURL = "http://localhost:8000/api/";

const ExpenseForm = (props) => {
    const navigate = useNavigate(); 
    const { obj, method } = props; 

    console.log(obj, method)
    const defaultExtension = obj? obj.extension:0;
    const defaultRemittance = obj? obj.remittance : 0;
    const defaultStationery = obj? obj.stationery : 0;
    const defaultAltar = obj? obj.altar : 0;
    const defaultBouquet = obj? obj.bouquet : 0;
    const defaultOthers = obj? obj.others : {};

    const [formData, setFormData] = useState({
        extension: defaultExtension, 
        remittance: defaultRemittance, 
        stationery: defaultStationery,
        altar: defaultAltar, 
        bouquet: defaultBouquet, 
        others: defaultOthers
    })


    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        }); 
    }

    const submitExpense = async (e) => {
        e.preventDefault();

        try {
            console.log('Trying to send', formData); 
            const token = localStorage.getItem('accessToken'); 
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}` 
                        }
                    }; 

                    if (method==='create') {
                        const response = await axios.post(BASEURL + "finance/expenses/", formData, config);
                        console.log("Success!", response) 
                    } else if (method==='edit') {
                        const response = await axios.put(BASEURL + "finance/expenses/" + obj.id + "/", formData, config);
                        console.log("Success!", response) 
                    } 
                    console.log("Expense Operation Successful!"); 
                    navigate('/expenses')
                    
                } else {
                    console.log("Sign in to operate on expenses")
                }
        } catch (err) {
            if (err.status === 401) {
                console.log("The session is expired. Please sign in again to operate on expenses")
            } else {
                console.log("Error during operation", err)              
            }
            
        } // finally {
        //     setIsLoading(false);
        // }
    } 
        
    const pageTitle = method=='create' ? "Create an expense": "Edit your expense"; 
    const btnTitle = method=='create' ? "Create": "Edit"; 

    return (
        <div className='expense-form'>
            <h2>{pageTitle}</h2>
            <hr />
            <form onSubmit={submitExpense}>

                <label htmlFor="extension">
                    Extension: <input 
                        type="number" name="extension" id=""
                        onChange={handleChange}
                        defaultValue={defaultExtension} />
                </label><br /><br />
                <label htmlFor="remittance">
                    Remittance: <input 
                        type="number" name="remittance" id=""
                        onChange={handleChange}
                        defaultValue={defaultRemittance} />
                </label><br /><br />
                <label htmlFor="stationery">
                    Stationery: <input 
                        type="number" name="stationery" id=""
                        onChange={handleChange}
                        defaultValue={defaultStationery} />
                </label><br /><br />
                <label htmlFor="altar">
                    Altar: <input 
                        type="number" name="altar" id=""
                        onChange={handleChange}
                        defaultValue={defaultAltar} />
                </label><br /><br />
                <label htmlFor="bouquet">
                    Bouquet: <input 
                        type="number" name="bouquet" id=""
                        onChange={handleChange}
                        defaultValue={defaultBouquet} />
                </label><br /><br />
                
                <hr />
                <button type="submit">{btnTitle}</button> 
                <Link to='../'>Cancel</Link>
            </form>
        </div>
    )
}

export default ExpenseForm
