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
// import QuestionList from './pages/social/questions/QuestionList'
// import QuestionDetails, { questionDetailsLoader } from './pages/social/questions/QuestionDetails'
// import QuestionEdit from './pages/social/questions/QuestionEdit'
// import QuestionForm from './pages/social/questions/QuestionForm'
// import PostList from './pages/social/posts/PostList'
// import PostForm from './pages/social/posts/PostForm'
// import PostDetails, { postDetailsLoader } from './pages/social/posts/PostDetails'
// import PostEdit from './pages/social/posts/PostEdit'
// import CuriaList from './pages/curia/curia/CuriaList'
// import CuriaDetails, { curiaDetailsLoader } from './pages/curia/curia/CuriaDetails'
// import CuriaForm from './pages/curia/curia/CuriaForm'
// import CuriaEdit from './pages/curia/curia/CuriaEdit'
// import AnnouncementList from './pages/curia/announcements/AnnouncementList'
// import AnnouncementDetails, { announcementDetailsLoader } from './pages/curia/announcements/AnnouncementDetails'
// import AnnouncementForm from './pages/curia/announcements/AnnouncementForm'
// import AnnouncementEdit from './pages/curia/announcements/AnnouncementEdit'
// import PraesidiumList from './pages/praesidium/praesidium/PraesidiumList'
// import PraesidiumDetails, { praesidiumDetailsLoader } from './pages/praesidium/praesidium/PraesidiumDetails'
// import PraesidiumEdit from './pages/praesidium/praesidium/PraesidiumEdit'
// import PraesidiumForm from './pages/praesidium/praesidium/PraesidiumForm'
// import ReminderList from './pages/praesidium/reminder/ReminderList'
// import ReminderDetails, { reminderDetailsLoader } from './pages/praesidium/reminder/ReminderDetails'
// import ReminderForm from './pages/praesidium/reminder/ReminderForm'
// import ReminderEdit from './pages/praesidium/reminder/ReminderEdit'
// import MeetingList, { meetingsLoader } from './pages/meetings/MeetingList'
// import MeetingDetails, { meetingDetailsLoader } from './pages/meetings/MeetingDetails'
// import MeetingForm from './pages/meetings/MeetingForm'
// import MeetingEdit from './pages/meetings/MeetingEdit'
// import WorkList, { worksListLoader } from './pages/works/work/WorkList'
// import WorkDetails, { workDetailsLoader } from './pages/works/work/WorkDetails'
// import WorkListList, { workListListsLoader } from './pages/works/worklist/WorkListList'
// import WorkListDetails, { workListDetailsLoader } from './pages/works/worklist/WorkListDetails'
// import WorkListForm, { workListFormLoader } from './pages/works/worklist/WorkListForm'
// import PageLayout from './pages/PageLayout'
// import FinancialRecordList, { financialRecordsListLoader } from './pages/finance/records/FinancialRecordList'
// import FinancialRecordDetails, { financialRecordDetailsLoader } from './pages/finance/records/FinancialRecordDetails'
// import FinancialRecordForm, { financialRecordsFormLoader } from './pages/finance/records/FinancialRecordForm'
// import ReportList, { reportsListLoader } from './pages/reports/ReportList'
// import ReportForm, { reportFormLoader } from './pages/reports/ReportForm'
// import WorkForm, { worksFormLoader } from './pages/works/work/WorkForm'

// Site page imports
import HomePage, { homeLoader } from './site/pages/home/HomePage'
import SiteLayout from './site/components/SiteLayout'
import PraesidiaList, { praesidiaListLoader } from './site/pages/praesidium/PraesidiaList'
import PraesidiumDetail, { praesidiumLoader } from './site/pages/praesidium/PraesidiumDetail'
import MeetingForm, { meetingFormLoader } from './site/pages/praesidium/meeting/MeetingForm'

function App() {
    // const router2 = createBrowserRouter(
    //     createRoutesFromElements(
    //         <Route path='/' element={<Layout />}>
    //             <Route index element={<Home />} />
    //             <Route path='login' element={<Login />} />
    //             <Route path='register' element={<Register />} />
    //             <Route path='questions' element={<PageLayout pageName="Questions" />}>
    //                 <Route index element={<QuestionList />} />
    //                 <Route path='create' element={<QuestionForm method='create' />} />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<QuestionDetails />} 
    //                         loader={questionDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<QuestionEdit />} 
    //                         method='edit'
    //                         loader={questionDetailsLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='posts' element={<PageLayout pageName="Posts" />}>
    //                 <Route index element={<PostList />} />
    //                 <Route path='create' element={<PostForm method='create' />} />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<PostDetails />} 
    //                         loader={postDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<PostEdit />} 
    //                         method='edit'
    //                         loader={postDetailsLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='curia' element={<PageLayout pageName="Curia" />}>
    //                 <Route index element={<CuriaList />} />
    //                 <Route path='create' element={<CuriaForm method='create' />} />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<CuriaDetails />} 
    //                         loader={curiaDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<CuriaEdit />} 
    //                         method='edit'
    //                         loader={curiaDetailsLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='announcements' element={<PageLayout pageName="Announcements" />}>
    //                 <Route index element={<AnnouncementList />} />
    //                 <Route path='create' element={<AnnouncementForm method='create' />} />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<AnnouncementDetails />} 
    //                         loader={announcementDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<AnnouncementEdit />} 
    //                         method='edit'
    //                         loader={announcementDetailsLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='praesidium' element={<PageLayout pageName="Praesidium" />}>
    //                 <Route index element={<PraesidiumList />} />
    //                 <Route path='create' element={<PraesidiumForm method='create' />} />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<PraesidiumDetails />} 
    //                         loader={praesidiumDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<PraesidiumEdit />} 
    //                         method='edit'
    //                         loader={praesidiumDetailsLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='reminders' element={<PageLayout pageName="Reminders" />}>
    //                 <Route index element={<ReminderList />} />
    //                 <Route path='create' element={<ReminderForm method='create' />} />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<ReminderDetails />} 
    //                         loader={reminderDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<ReminderEdit />} 
    //                         method='edit'
    //                         loader={reminderDetailsLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='meetings' element={<PageLayout pageName="Meetings" />}>
    //                 <Route 
    //                     index 
    //                     element={<MeetingList />} 
    //                     loader={meetingsLoader}
    //                 />
    //                 <Route path='create' element={<MeetingForm method='create' />} />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<MeetingDetails />} 
    //                         loader={meetingDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<MeetingEdit />} 
    //                         method='edit'
    //                         loader={meetingDetailsLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='works' element={<PageLayout pageName="Works" />}>
    //                 <Route index element={<WorkList />} loader={worksListLoader} />
    //                 <Route 
    //                     path='create' 
    //                     element={<WorkForm method='create' />} 
    //                     loader={worksFormLoader} />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<WorkDetails />} 
    //                         loader={workDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<WorkForm method='edit' />} 
    //                         loader={worksFormLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='worklists' element={<PageLayout pageName="WorkLists" />}>
    //                 <Route 
    //                     index 
    //                     element={<WorkListList />} 
    //                     loader={workListListsLoader}
    //                 />
    //                 <Route 
    //                     path='create' 
    //                     element={<WorkListForm method='create' />} 
    //                     loader={workListFormLoader}
    //                 />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<WorkListDetails />} 
    //                         loader={workListDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<WorkListForm method='edit' />} 
    //                         loader={workListFormLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='records' element={<PageLayout pageName="Financial Records" />}>
    //                 <Route 
    //                     index 
    //                     element={<FinancialRecordList />} 
    //                     loader={financialRecordsListLoader}
    //                 />
    //                 <Route 
    //                     path='create' 
    //                     element={<FinancialRecordForm method='create' />} 
    //                     loader={financialRecordsFormLoader}
    //                 />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<FinancialRecordDetails />} 
    //                         loader={financialRecordDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<FinancialRecordForm method='edit' />} 
    //                         method='edit'
    //                         loader={financialRecordDetailsLoader}
    //                     />
    //                 </Route>
    //             </Route>
                
    //             <Route path='reports' element={<PageLayout pageName="Reports" />}>
    //                 <Route 
    //                     index 
    //                     element={<ReportList />} 
    //                     loader={reportsListLoader}
    //                 />
    //                 <Route 
    //                     path='create' 
    //                     element={<ReportForm method='create' />} 
    //                     loader={reportFormLoader}
    //                 />
    //                 <Route path=":id">
    //                     <Route 
    //                         index
    //                         element={<FinancialRecordDetails />} 
    //                         loader={financialRecordDetailsLoader}
    //                     />
    //                     <Route 
    //                         path='edit' 
    //                         element={<ReportForm method='edit' />} 
    //                         method='edit'
    //                         loader={reportFormLoader}
    //                     />
    //                 </Route>
    //             </Route>
    //             <Route path='*' element={<NotFound />} />
    //         </Route>
    //     )
    // )

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<SiteLayout />}>
                <Route 
                    index 
                    element={<HomePage />} 
                    loader={homeLoader}
                />
                
                <Route path="social/">
                    <Route 
                        path='question'
                        element={<PraesidiaList />} 
                        loader={praesidiaListLoader}
                    >
                        <Route 
                            path='create' 
                            element={<PraesidiaList />} 
                            loader={praesidiaListLoader}
                        />
                    </Route>
                </Route>
                
                <Route path="praesidium">
                    <Route 
                        index 
                        element={<PraesidiaList />} 
                        loader={praesidiaListLoader}
                    />
                    <Route path=':pid' >
                        <Route  // Praedidium details 
                            index
                            element={<PraesidiumDetail />} 
                            loader={praesidiumLoader}
                        />
                        {/* Meeting(s) of the praedidium */}
                        <Route path='meeting'>
                            {/* Create meeting */}
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
                        {/* Meeting list (accessible from praesidium details) */}
                        {/* <Route path='list' element={} /> */}
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
