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
import QuestionLayout from './pages/social/questions/QuestionLayout'
import QuestionList from './pages/social/questions/QuestionList'
import QuestionDetails, { questionDetailsLoader } from './pages/social/questions/QuestionDetails'
import QuestionEdit from './pages/social/questions/QuestionEdit'
import QuestionForm from './pages/social/questions/QuestionForm'
import PostList from './pages/social/posts/PostList'
import PostLayout from './pages/social/posts/PostLayout'
import PostForm from './pages/social/posts/PostForm'
import PostDetails, { postDetailsLoader } from './pages/social/posts/PostDetails'
import PostEdit from './pages/social/posts/PostEdit'
import CuriaLayout from './pages/curia/curia/CuriaLayout'
import CuriaList from './pages/curia/curia/CuriaList'
import CuriaDetails, { curiaDetailsLoader } from './pages/curia/curia/CuriaDetails'
import CuriaForm from './pages/curia/curia/CuriaForm'
import CuriaEdit from './pages/curia/curia/CuriaEdit'
import AnnouncementLayout from './pages/curia/announcements/AnnouncementLayout'
import AnnouncementList from './pages/curia/announcements/AnnouncementList'
import AnnouncementDetails, { announcementDetailsLoader } from './pages/curia/announcements/AnnouncementDetails'
import AnnouncementForm from './pages/curia/announcements/AnnouncementForm'
import AnnouncementEdit from './pages/curia/announcements/AnnouncementEdit'
import PraesidiumLayout from './pages/praesidium/PraesidiumLayout'
import PraesidiumList from './pages/praesidium/PraesidiumList'

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
                <Route path='posts' element={<PostLayout />}>
                    <Route index element={<PostList />} />
                    <Route path='create' element={<PostForm method='create' />} />
                    <Route path=":id">
                        <Route 
                            index
                            element={<PostDetails />} 
                            loader={postDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<PostEdit />} 
                            method='edit'
                            loader={postDetailsLoader}
                        />
                    </Route>
                </Route>
                <Route path='curia' element={<CuriaLayout />}>
                    <Route index element={<CuriaList />} />
                    <Route path='create' element={<CuriaForm method='create' />} />
                    <Route path=":id">
                        <Route 
                            index
                            element={<CuriaDetails />} 
                            loader={curiaDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<CuriaEdit />} 
                            method='edit'
                            loader={curiaDetailsLoader}
                        />
                    </Route>
                </Route>
                <Route path='announcements' element={<AnnouncementLayout />}>
                    <Route index element={<AnnouncementList />} />
                    <Route path='create' element={<AnnouncementForm method='create' />} />
                    <Route path=":id">
                        <Route 
                            index
                            element={<AnnouncementDetails />} 
                            loader={announcementDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<AnnouncementEdit />} 
                            method='edit'
                            loader={announcementDetailsLoader}
                        />
                    </Route>
                </Route>
                <Route path='praesidium' element={<PraesidiumLayout />}>
                    <Route index element={<PraesidiumList />} />
                    <Route path='create' element={<AnnouncementForm method='create' />} />
                    <Route path=":id">
                        <Route 
                            index
                            element={<AnnouncementDetails />} 
                            loader={announcementDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<AnnouncementEdit />} 
                            method='edit'
                            loader={announcementDetailsLoader}
                        />
                    </Route>
                </Route>

                <Route path='*' element={<NotFound />} />
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    )
}



export default App
