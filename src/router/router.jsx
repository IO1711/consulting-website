import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppLayout";
import NotFound from "../utility/NotFound";
import Opportunities from "../components/opportunities/Opportunities";
import Home from "../components/Home";
import AboutPage from "../components/about/AboutPage";
import Login from "../auth/Login";
import Services from "../components/services/Services";
import ProtectedRoute from "../auth/ProtectedRoute";
import UserPage from "../auth/UserPage";
import MyCourses from "../auth/MyCourses";
import MyRequests from "../auth/MyRequests";
import Consulting from "../components/services/Consulting";
import CheckDocs from "../components/services/CheckDocs";
import VisaHelp from "../components/services/VisaHelp";
import CoursePage from "../components/services/CoursePage";
import Overview from "../components/services/coursePageChildren/Overview";
import Recordings from "../components/services/coursePageChildren/Recordings";
import Resources from "../components/services/coursePageChildren/Resources";
import AdminPage from "../adminTools/AdminPage";
import AddOpportunity from "../adminTools/AddOpportunity";
import AddCourse from "../adminTools/AddCourse";
import EditCourse from "../adminTools/EditCourse";
import VisaRequests from "../adminTools/VisaRequests";
import DocRequests from "../adminTools/DocRequests";
import EditCourseChild from "../adminTools/EditCourseChild";
import DocRequestChild from "../adminTools/DocRequestChild";
import RegisterPage from "../auth/RegisterPage";
import RequestPage from "../auth/RequestPage";
import AddLearners from "../adminTools/AddLearners";
import JoinCourseRequestForm from "../components/services/coursePageChildren/JoinCourseRequestForm";
import ManageJoinRequests from "../adminTools/ManageJoinRequests";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children : [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/opportunities",
                element: <Opportunities/>
            },
            {
                path: "/services",
                element: <Services/>
            },
            {
                path: "/services/consulting",
                element: <Consulting/>
            },
            {
                path: "/services/consulting/course/:courseId",
                element: <CoursePage/>,
                children: [
                    {
                        index: true,
                        element: <Overview/>
                    },
                    {
                        element: <ProtectedRoute/>,
                        children: [
                            {
                                path: "/services/consulting/course/:courseId/recordings",
                                element: <Recordings/>
                            },
                            {
                                path: "/services/consulting/course/:courseId/resources",
                                element: <Resources/>
                            }
                        ]
                    }
                ]
            },
            {
                path: "/services/checkdocs",
                element: <CheckDocs/>
            },
            {
                path: "/services/visahelp",
                element: <VisaHelp/>
            },
            {
                path: "/services/joinCourse/:courseId",
                element: <JoinCourseRequestForm/>
            },
            {
                path:"/about",
                element: <AboutPage/>
            },
            {
                path: "/userpage",
                element: <ProtectedRoute/>,
                children: [
                    {
                        element: <UserPage/>,
                        children: [
                            {
                                index: true,
                                element: <MyCourses/>
                            },
                            {
                                path: "/userpage/requests",
                                element: <MyRequests/>
                            },
                            {
                                path: "/userpage/requests/:requestId",
                                element: <RequestPage/>
                            }
                        ]
                    }
                ]
            },
            {
                path: "/adminPage",
                element: <ProtectedRoute/>,
                children: [
                    {
                        element: <AdminPage/>,
                        children: [
                            {
                                index: true,
                                element: <AddOpportunity/>
                            },
                            {
                                path: "/adminPage/addCourse",
                                element: <AddCourse/>
                            },
                            {
                                path: "/adminPage/editCourse",
                                element: <EditCourse/>,
                                children : [
                                    
                                ]
                            },
                            {
                                path: "/adminPage/editCourse/:courseId",
                                element: <EditCourseChild/>
                            },
                            {
                                path: "/adminPage/addLearners/:courseId",
                                element: <AddLearners/>
                            },
                            {
                                path: "/adminPage/manageJoinRequests/:courseId",
                                element: <ManageJoinRequests/>
                            },
                            {
                                path: "/adminPage/visaRequests",
                                element: <VisaRequests/>
                            },
                            {
                                path: "/adminPage/docRequests",
                                element: <DocRequests/>
                            },
                            {
                                path: "/adminPage/docRequests/:requestId",
                                element: <DocRequestChild/>
                            }
                        ]
                    }
                ]
            }
        ],
        errorElement: <NotFound/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    }
])