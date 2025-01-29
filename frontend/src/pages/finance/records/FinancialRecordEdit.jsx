import { useLoaderData } from 'react-router-dom'
import FinancialRecordForm from './FinancialRecordForm';

const FinancialRecordEdit = () => {    
    const [financialRecord, _] = useLoaderData();
    console.log('In financialRecord edit', financialRecord); 

    return (
        <FinancialRecordForm method='edit' />
    )
}

export default FinancialRecordEdit
