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
import QuestionList from './pages/social/questions/QuestionList'
import QuestionDetails, { questionDetailsLoader } from './pages/social/questions/QuestionDetails'
import QuestionEdit from './pages/social/questions/QuestionEdit'
import QuestionForm from './pages/social/questions/QuestionForm'
import PostList from './pages/social/posts/PostList'
import PostForm from './pages/social/posts/PostForm'
import PostDetails, { postDetailsLoader } from './pages/social/posts/PostDetails'
import PostEdit from './pages/social/posts/PostEdit'
import CuriaList from './pages/curia/curia/CuriaList'
import CuriaDetails, { curiaDetailsLoader } from './pages/curia/curia/CuriaDetails'
import CuriaForm from './pages/curia/curia/CuriaForm'
import CuriaEdit from './pages/curia/curia/CuriaEdit'
import AnnouncementList from './pages/curia/announcements/AnnouncementList'
import AnnouncementDetails, { announcementDetailsLoader } from './pages/curia/announcements/AnnouncementDetails'
import AnnouncementForm from './pages/curia/announcements/AnnouncementForm'
import AnnouncementEdit from './pages/curia/announcements/AnnouncementEdit'
import PraesidiumList from './pages/praesidium/praesidium/PraesidiumList'
import PraesidiumDetails, { praesidiumDetailsLoader } from './pages/praesidium/praesidium/PraesidiumDetails'
import PraesidiumEdit from './pages/praesidium/praesidium/PraesidiumEdit'
import PraesidiumForm from './pages/praesidium/praesidium/PraesidiumForm'
import ReminderList from './pages/praesidium/reminder/ReminderList'
import ReminderDetails, { reminderDetailsLoader } from './pages/praesidium/reminder/ReminderDetails'
import ReminderForm from './pages/praesidium/reminder/ReminderForm'
import ReminderEdit from './pages/praesidium/reminder/ReminderEdit'
import MeetingList, { meetingsLoader } from './pages/meetings/MeetingList'
import MeetingDetails, { meetingDetailsLoader } from './pages/meetings/MeetingDetails'
import MeetingForm from './pages/meetings/MeetingForm'
import MeetingEdit from './pages/meetings/MeetingEdit'
import WorkList from './pages/works/work/WorkList'
import WorkDetails, { workDetailsLoader } from './pages/works/work/WorkDetails'
import WorkListList, { workListListsLoader } from './pages/works/worklist/WorkListList'
import WorkListDetails, { workListDetailsLoader } from './pages/works/worklist/WorkListDetails'
import WorkListForm, { workTypesLoader } from './pages/works/worklist/WorkListForm'
import WorkListEdit, { workEditLoader } from './pages/works/worklist/WorkListEdit'
import PageLayout from './pages/PageLayout'
import ExpenseList, { expensesListLoader } from './pages/finance/expenses/ExpenseList'
import ExpenseForm from './pages/finance/expenses/ExpenseForm'
import ExpenseEdit, { expensesEditLoader } from './pages/finance/expenses/ExpenseEdit'

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='questions' element={<PageLayout pageName="Questions" />}>
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
                <Route path='posts' element={<PageLayout pageName="Posts" />}>
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
                <Route path='curia' element={<PageLayout pageName="Curia" />}>
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
                <Route path='announcements' element={<PageLayout pageName="Announcements" />}>
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
                <Route path='praesidium' element={<PageLayout pageName="Praesidium" />}>
                    <Route index element={<PraesidiumList />} />
                    <Route path='create' element={<PraesidiumForm method='create' />} />
                    <Route path=":id">
                        <Route 
                            index
                            element={<PraesidiumDetails />} 
                            loader={praesidiumDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<PraesidiumEdit />} 
                            method='edit'
                            loader={praesidiumDetailsLoader}
                        />
                    </Route>
                </Route>
                <Route path='reminders' element={<PageLayout pageName="Reminders" />}>
                    <Route index element={<ReminderList />} />
                    <Route path='create' element={<ReminderForm method='create' />} />
                    <Route path=":id">
                        <Route 
                            index
                            element={<ReminderDetails />} 
                            loader={reminderDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<ReminderEdit />} 
                            method='edit'
                            loader={reminderDetailsLoader}
                        />
                    </Route>
                </Route>
                <Route path='meetings' element={<PageLayout pageName="Meetings" />}>
                    <Route 
                        index 
                        element={<MeetingList />} 
                        loader={meetingsLoader}
                    />
                    <Route path='create' element={<MeetingForm method='create' />} />
                    <Route path=":id">
                        <Route 
                            index
                            element={<MeetingDetails />} 
                            loader={meetingDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<MeetingEdit />} 
                            method='edit'
                            loader={meetingDetailsLoader}
                        />
                    </Route>
                </Route>
                <Route path='works' element={<PageLayout pageName="Works" />}>
                    <Route index element={<WorkList />} />
                    <Route path='create' element={<MeetingForm method='create' />} />
                    <Route path=":id">
                        <Route 
                            index
                            element={<WorkDetails />} 
                            loader={workDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<MeetingEdit />} 
                            method='edit'
                            loader={meetingDetailsLoader}
                        />
                    </Route>
                </Route>
                <Route path='worklists' element={<PageLayout pageName="WorkLists" />}>
                    <Route 
                        index 
                        element={<WorkListList />} 
                        loader={workListListsLoader}
                    />
                    <Route 
                        path='create' 
                        element={<WorkListForm method='create' />} 
                        loader={workTypesLoader}
                    />
                    <Route path=":id">
                        <Route 
                            index
                            element={<WorkListDetails />} 
                            loader={workListDetailsLoader}
                        />
                        <Route 
                            path='edit' 
                            element={<WorkListEdit />} 
                            method='edit'
                            loader={workEditLoader}
                        />
                    </Route>
                </Route>
                <Route path='expenses' element={<PageLayout pageName="Expenses" />}>
                    <Route 
                        index 
                        element={<ExpenseList />} 
                        loader={expensesListLoader}
                    />
                    <Route 
                        path='create' 
                        element={<ExpenseForm method='create' />} 
                        // loader={workTypesLoader}
                    />
                    <Route path=":id">
                        {/* <Route 
                            index
                            element={<WorkListDetails />} 
                            loader={workListDetailsLoader}
                        /> */}
                        <Route 
                            path='edit' 
                            element={<ExpenseEdit />} 
                            method='edit'
                            loader={expensesEditLoader}
                        />
                    </Route>

                <Route path='*' element={<NotFound />} />
            </Route>
        </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    )
}



export default App
