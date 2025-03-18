import { useState } from 'react'
import { 
    BrowserRouter, 
    Routes, 
    Route, 
    createBrowserRouter, 
    createRoutesFromElements, 
    RouterProvider
} from 'react-router-dom'

import './App.css'
import Login from './site/pages/account/Login'
import Register from './site/pages/account/Register'
import HomePage, { homeLoader } from './site/pages/home/HomePage'
import NotFound from './site/pages/NotFound'
import SiteLayout from './site/components/SiteLayout'

import PraesidiaList, { praesidiaListLoader } from './site/pages/praesidium/PraesidiaList'
import PraesidiumDetail, { praesidiumLoader } from './site/pages/praesidium/PraesidiumDetail'
import MeetingForm, { meetingFormLoader } from './site/pages/praesidium/meeting/MeetingForm'
import MeetingList, { meetingListLoader } from './site/pages/praesidium/meeting/MeetingList'
import WorkListForm, { workListFormLoader } from './site/pages/praesidium/worklist/WorkListForm'
import WorkCreate from './site/pages/praesidium/worklist/WorkCreate'
import PraesidiumForm, { praesidiumFormLoader } from './site/pages/praesidium/PraesidiumForm'
import CuriaForm, { curiaFormLoader } from './site/pages/praesidium/curia/CuriaForm'
import CuriaDetail, { curiaDetailLoader } from './site/pages/praesidium/curia/CuriaDetail'
import ReportList, { reportListLoader } from './site/pages/praesidium/report/ReportList'
import ReportForm, { reportFormLoader } from './site/pages/praesidium/report/ReportForm'

import PostForm, { postFormLoader } from './site/pages/social/post/PostForm'
import PostDetail, { postDetailLoader } from './site/pages/social/post/PostDetail'
import QuestionForm, { questionFormLoader } from './site/pages/social/question/QuestionForm'
import QuestionDetail, { questionDetailLoader } from './site/pages/social/question/QuestionDetail'
import RequestForm, { requestFormLoader } from './site/pages/social/request/RequestForm'
import AnnouncementForm, { announcementFormLoader } from './site/pages/praesidium/curia/AnnouncementForm'
import AnnouncementDetail from './site/pages/praesidium/curia/AnnouncementDetail'
import AnnouncementList, { announcementListLoader } from './site/pages/praesidium/curia/AnnouncementList'
import PostList, { postListLoader } from './site/pages/social/post/PostList'
import QuestionList, { questionListLoader } from './site/pages/social/question/QuestionList'
import ReminderForm, { reminderFormLoader } from './site/pages/praesidium/reminder/ReminderForm'
import ReminderList, { reminderListLoader } from './site/pages/praesidium/reminder/ReminderList'
import ReminderDetail from './site/pages/praesidium/reminder/ReminderDetail'
import Preview, { reportPreviewLoader } from './site/pages/praesidium/report/Preview'

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<SiteLayout />}>
                <Route 
                    index 
                    element={<HomePage />} 
                    loader={homeLoader}
                />

                <Route path='account'>
                    <Route 
                        path='login'
                        element={<Login />}
                    />
                    <Route  
                        path='register'
                        element={<Register />}
                    />
                </Route>
                
                <Route path="social">
                    <Route path='post'>
                        <Route 
                            index 
                            element={<PostList />} 
                            loader={postListLoader} 
                        />
                        <Route 
                            path='create'
                            element={<PostForm method='create' />} 
                            loader={postFormLoader} 
                        />
                        <Route path=':id'>
                            <Route 
                                index 
                                element={<PostDetail />}
                                loader={postDetailLoader} 
                            />
                            <Route 
                                path="edit"
                                element={<PostForm method='edit' />}
                                loader={postFormLoader} 
                            />
                        </Route>
                    </Route>
                    <Route path='question'>
                        <Route 
                            index 
                            element={<QuestionList />}
                            loader={questionListLoader} 
                        />
                        <Route 
                            path='create'
                            element={<QuestionForm method='create' />} 
                            loader={questionFormLoader} 
                        />
                        <Route path=':id'>
                            <Route 
                                index 
                                element={<QuestionDetail />}
                                loader={questionDetailLoader} 
                            />
                            <Route 
                                path="edit"
                                element={<QuestionForm method='edit' />}
                                loader={questionFormLoader} 
                            />
                        </Route>
                    </Route>
                    <Route path='request'>
                        <Route 
                            path='create'
                            element={<RequestForm method='create' />} 
                            loader={requestFormLoader} 
                        />
                        <Route path=':id'>
                            <Route 
                                index 
                                element={<QuestionDetail />}
                                loader={requestFormLoader} 
                            />
                            <Route 
                                path="edit"
                                element={<RequestForm method='edit' />}
                                loader={requestFormLoader} 
                            />
                        </Route>
                    </Route>
                </Route>
                
                <Route path="praesidium">
                    <Route 
                        index 
                        element={<PraesidiaList />} 
                        loader={praesidiaListLoader}
                    />
                    <Route 
                        path="create"
                        element={<PraesidiumForm method='create' />} 
                        loader={praesidiumFormLoader}
                    />
                    <Route path=':pid' >
                        <Route  // Praedidium details 
                            index
                            element={<PraesidiumDetail />} 
                            loader={praesidiumLoader}
                        />
                        <Route 
                            path="edit"
                            element={<PraesidiumForm method='edit' />} 
                            loader={praesidiumFormLoader}
                        />
                        {/* Meeting(s) of the praedidium */}
                        <Route path='meeting'>
                            <Route 
                                index 
                                element={<MeetingList />}
                                loader={meetingListLoader}
                            />
                            {/* Create and edit meeting */}
                            <Route 
                                path='create' 
                                element={<MeetingForm method='create'/>} 
                                loader={meetingFormLoader} 
                            />
                            <Route 
                                path=':mid' 
                                element={<MeetingForm method='edit'/>} 
                                loader={meetingFormLoader} 
                            />
                            {/* Meeting edit (and details) */}
                            <Route path='edit' element={<MeetingForm method='edit' />} />
                           
                        </Route>

                        {/* Reminders */}
                        <Route path='reminder'>
                            <Route
                                index 
                                element={<ReminderList />}
                                loader={reminderListLoader}
                            />
                            <Route 
                                path='create'
                                element={<ReminderForm method='create' />}
                                loader={reminderFormLoader}
                            />
                            <Route path=':id'>
                                <Route 
                                    index
                                    element={<ReminderDetail />}
                                    loader={reminderFormLoader}
                                />
                                <Route 
                                    path='edit'
                                    element={<ReminderForm method='edit' />}
                                    loader={reminderFormLoader}
                                />
                            </Route>
                        </Route>

                        {/* report */}
                        <Route path='report'>
                            <Route 
                                index 
                                element={<ReportList />}
                                loader={reportListLoader}
                            />
                            <Route 
                                path='create' 
                                element={<ReportForm method='create' />}
                                loader={reportFormLoader}
                            />
                            <Route path=":rid">
                                <Route 
                                    index 
                                    element={<ReportForm method='edit' />}
                                    loader={reportFormLoader}
                                />
                                <Route 
                                    path="preview"
                                    element={<Preview />}
                                    loader={reportPreviewLoader}
                                />
                            </Route>
                        </Route>

                        {/* Create and edit worklist */}
                        <Route 
                            path='worklist' 
                            element={<WorkListForm method='edit' />} 
                            loader={workListFormLoader}
                        />
                        <Route
                            path='create_work'
                            element={<WorkCreate />}
                            loader={workListFormLoader}
                        />
                    </Route>
                </Route>

                <Route path="curia">
                    <Route  // create curia
                        path="create"
                        element={<CuriaForm method='create' />}
                        loader={curiaFormLoader}
                    />
                    <Route path=":cid" > // curia detail and edit
                        <Route 
                            index // curia detail
                            element={<CuriaDetail />}
                            loader={curiaDetailLoader}
                        />
                        <Route  // curia edit
                            path="edit"
                            element={<CuriaForm method='edit' />}
                            loader={curiaFormLoader}
                        />
                        <Route path='announcement'>
                            <Route
                                index 
                                element={<AnnouncementList />}
                                loader={announcementListLoader}
                            />
                            <Route 
                                path='create'
                                element={<AnnouncementForm method='create' />} 
                                loader={announcementFormLoader} 
                            />
                            <Route path=':id'>
                                <Route 
                                    index 
                                    element={<AnnouncementDetail />}
                                    loader={announcementFormLoader} 
                                />
                                <Route 
                                    path="edit"
                                    element={<AnnouncementForm method='edit' />}
                                    loader={announcementFormLoader} 
                                />
                            </Route>
                        </Route>
                    </Route>
                    
                </Route>

                <Route path="resources">
                    <Route 
                        index 
                        element={<PraesidiaList />} 
                        loader={praesidiaListLoader}
                    />
                </Route>
                
                <Route path="store">
                    <Route 
                        index 
                        element={<PraesidiaList />} 
                        loader={praesidiaListLoader}
                    />
                </Route>
                
                <Route path="pricing">
                    <Route 
                        index 
                        element={<PraesidiaList />} 
                        loader={praesidiaListLoader}
                    />
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
