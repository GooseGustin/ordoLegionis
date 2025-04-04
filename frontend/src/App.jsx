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
import ErrorElement from './site/pages/ErrorElement'

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<SiteLayout />}>
                {/* <Route 
                    index 
                    element={<HomePage />} 
                    loader={homeLoader}
                    errorElement={<ErrorElement action={'view'} obj={'posts, questions, or prayer requests'}/>}
                /> */}
                <Route 
                    index 
                    element={<PraesidiaList />} 
                    loader={praesidiaListLoader}
                    errorElement={<ErrorElement action={'view'} obj={'praesidia'}/>}
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
                    <Route path='post' errorElement={<ErrorElement action={'posts'}/>}>
                        <Route 
                            index 
                            element={<PostList />} 
                            loader={postListLoader} 
                            errorElement={<ErrorElement action={'view'} obj={'posts'}/>}
                        />
                        <Route 
                            path='create'
                            element={<PostForm method='create' />} 
                            loader={postFormLoader} 
                            errorElement={<ErrorElement action={'create'} obj={'posts'}/>}
                        />
                        <Route path=':id'>
                            <Route 
                                index 
                                element={<PostDetail />}
                                loader={postDetailLoader}                                 
                                errorElement={<ErrorElement action={'view'} obj={'post'}/>}
                            />
                            <Route 
                                path="edit"
                                element={<PostForm method='edit' />}
                                loader={postFormLoader} 
                                errorElement={<ErrorElement action={'edit'} obj={'post'}/>}
                            />
                        </Route>
                    </Route>
                    <Route path='question'>
                        <Route 
                            index 
                            element={<QuestionList />}
                            loader={questionListLoader} 
                            errorElement={<ErrorElement action={'view'} obj={'questions'}/>}
                        />
                        <Route 
                            path='create'
                            element={<QuestionForm method='create' />} 
                            loader={questionFormLoader} 
                            errorElement={<ErrorElement action={'create'} obj={'questions'}/>}
                        />
                        <Route path=':id'>
                            <Route 
                                index 
                                element={<QuestionDetail />}
                                loader={questionDetailLoader} 
                                errorElement={<ErrorElement action={'view'} obj={'question'}/>}
                            />
                            <Route 
                                path="edit"
                                element={<QuestionForm method='edit' />}
                                loader={questionFormLoader} 
                                errorElement={<ErrorElement action={'edit'} obj={'question'}/>}
                            />
                        </Route>
                    </Route>
                    <Route path='request'>
                        <Route 
                            index 
                            element={<NotFound />}
                        />
                        <Route 
                            path='create'
                            element={<RequestForm method='create' />} 
                            loader={requestFormLoader} 
                            errorElement={<ErrorElement action={'create'} obj={'prayer requests'}/>}
                        />
                        <Route path=':id'>
                            <Route 
                                index 
                                element={<QuestionDetail />}
                                loader={requestFormLoader} 
                                errorElement={<ErrorElement action={'view'} obj={'prayer request'}/>}
                            />
                            <Route 
                                path="edit"
                                element={<RequestForm method='edit' />}
                                loader={requestFormLoader} 
                                errorElement={<ErrorElement action={'edit'} obj={'prayer request'}/>}
                            />
                        </Route>
                    </Route>
                </Route>
                
                <Route path="praesidium">
                    <Route 
                        index 
                        element={<PraesidiaList />} 
                        loader={praesidiaListLoader}
                        errorElement={<ErrorElement action={'view'} obj={'praesidia'}/>}
                    />
                    <Route 
                        path="create"
                        element={<PraesidiumForm method='create' />} 
                        loader={praesidiumFormLoader}
                        errorElement={<ErrorElement action={'create'} obj={'praesidia'}/>}
                    />
                    <Route path=':pid' >
                        <Route  // Praedidium details 
                            index
                            element={<PraesidiumDetail />} 
                            loader={praesidiumLoader}
                            errorElement={<ErrorElement action={'view'} obj={'this praesidium'}/>}
                        />
                        <Route 
                            path="edit"
                            element={<PraesidiumForm method='edit' />} 
                            loader={praesidiumFormLoader}
                            errorElement={<ErrorElement action={'edit'} obj={'this praesidium'}/>}
                        />
                        {/* Meeting(s) of the praedidium */}
                        <Route path='meeting'>
                            <Route 
                                index 
                                element={<MeetingList />}
                                loader={meetingListLoader}
                                errorElement={<ErrorElement action={'view'} obj={'meetings'}/>}
                            />
                            {/* Create and edit meeting */}
                            <Route 
                                path='create' 
                                element={<MeetingForm method='create'/>} 
                                loader={meetingFormLoader} 
                                errorElement={<ErrorElement action={'create'} obj={'meetings'}/>}
                            />
                            <Route 
                                path=':mid' 
                                element={<MeetingForm method='edit'/>} 
                                loader={meetingFormLoader} 
                                errorElement={<ErrorElement action={'edit'} obj={'this meeting'}/>}
                            />
                            {/* Meeting edit (and details) */}
                            {/* <Route path='edit' element={<MeetingForm method='edit' />} /> */}
                           
                        </Route>

                        {/* Reminders */}
                        <Route path='reminder'>
                            <Route
                                index 
                                element={<ReminderList />}
                                loader={reminderListLoader}
                                errorElement={<ErrorElement action={'view'} obj={'reminders'}/>}
                            />
                            <Route 
                                path='create'
                                element={<ReminderForm method='create' />}
                                loader={reminderFormLoader}
                                errorElement={<ErrorElement action={'create'} obj={'reminders'}/>}
                            />
                            <Route path=':id'>
                                <Route 
                                    index
                                    element={<ReminderDetail />}
                                    loader={reminderFormLoader}
                                    errorElement={<ErrorElement action={'view'} obj={'this reminder'}/>}
                                />
                                <Route 
                                    path='edit'
                                    element={<ReminderForm method='edit' />}
                                    loader={reminderFormLoader}
                                    errorElement={<ErrorElement action={'edit'} obj={'this reminder'}/>}
                                />
                            </Route>
                        </Route>

                        {/* report */}
                        <Route path='report'>
                            <Route 
                                index 
                                element={<ReportList />}
                                loader={reportListLoader}
                                errorElement={<ErrorElement action={'view'} obj={'reports'}/>}
                                />
                            <Route 
                                path='create' 
                                element={<ReportForm method='create' />}
                                loader={reportFormLoader}
                                errorElement={<ErrorElement action={'create'} obj={'reports'}/>}
                                />
                            <Route path=":rid">
                                <Route 
                                    index 
                                    element={<ReportForm method='edit' />}
                                    loader={reportFormLoader}
                                    errorElement={<ErrorElement action={'edit'} obj={'this report'}/>}
                                />
                                <Route 
                                    path="preview"
                                    element={<Preview />}
                                    loader={reportPreviewLoader}
                                    errorElement={<ErrorElement action={'view'} obj={'this report preview'}/>}
                                />
                            </Route>
                        </Route>

                        {/* Create and edit worklist */}
                        <Route 
                            path='worklist' 
                            element={<WorkListForm method='edit' />} 
                            loader={workListFormLoader}
                            errorElement={<ErrorElement action={'view'} obj={'worklists'}/>}
                        />
                        <Route
                            path='create_work'
                            element={<WorkCreate />}
                            loader={workListFormLoader}
                            errorElement={<ErrorElement action={'create'} obj={'works'}/>}
                        />
                    </Route>
                </Route>

                <Route path="curia">
                    <Route  // create curia
                        path="create"
                        element={<CuriaForm method='create' />}
                        loader={curiaFormLoader}
                        errorElement={<ErrorElement action={'create'} obj={'curiae'}/>}
                    />
                    <Route path=":cid" > // curia detail and edit
                        <Route 
                            index // curia detail
                            element={<CuriaDetail />}
                            loader={curiaDetailLoader}
                            errorElement={<ErrorElement action={'view'} obj={'this curia'}/>}
                        />
                        <Route  // curia edit
                            path="edit"
                            element={<CuriaForm method='edit' />}
                            loader={curiaFormLoader}
                            errorElement={<ErrorElement action={'edit'} obj={'this curia'}/>}
                        />
                        <Route path='announcement'>
                            <Route
                                index 
                                element={<AnnouncementList />}
                                loader={announcementListLoader}
                            errorElement={<ErrorElement action={'view'} obj={'announcements'}/>}
                            />
                            <Route 
                                path='create'
                                element={<AnnouncementForm method='create' />} 
                                loader={announcementFormLoader} 
                                errorElement={<ErrorElement action={'create'} obj={'announcements'}/>}
                            />
                            <Route path=':id'>
                                <Route 
                                    index 
                                    element={<AnnouncementDetail />}
                                    loader={announcementFormLoader} 
                                    errorElement={<ErrorElement action={'view'} obj={'this announcement'}/>}
                                />
                                <Route 
                                    path="edit"
                                    element={<AnnouncementForm method='edit' />}
                                    loader={announcementFormLoader} 
                                    errorElement={<ErrorElement action={'edit'} obj={'this announcement'}/>}
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
                        errorElement={<ErrorElement action={'create'} obj={'resources'}/>}
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
