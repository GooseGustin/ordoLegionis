import { useState } from 'react'
import { 
    BrowserRouter, 
    Routes, 
    Route, 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider
} from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import './App.css'
import QuestionLayout from './pages/questions/QuestionLayout'
import QuestionList from './pages/questions/QuestionList'
import QuestionDetails, { questionDetailsLoader } from './pages/questions/QuestionDetails'
import QuestionEdit from './pages/questions/QuestionEdit'
import QuestionForm from './pages/questions/QuestionForm'

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='questions' element={<QuestionLayout />}>
                    <Route index element={<QuestionList />} />
                    <Route path='create' element={<QuestionForm method='create' />} />
                    <Route path=":id">
                        <Route 
                            index
                            element={<QuestionDetails />} 
                            loader={questionDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<QuestionEdit />} 
                            method='edit'
                            loader={questionDetailsLoader}
                        />
                    </Route>
                </Route>

                <Route path='*' element={<NotFound />} />
            </Route>
        )
    )

    // return (
    //     <BrowserRouter>
    //         <Routes>
    //             <Route path='/' element={<Layout />}>
    //                 <Route index element={<Home />} />
    //                 <Route path="login" element={<Login />} />
    //                 <Route path="register" element={<Register />} />
    //             </Route>
    //         </Routes>
    //     </BrowserRouter>
    // )
    return (
        <RouterProvider router={router} />
    )
}



export default App
