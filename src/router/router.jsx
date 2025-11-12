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
                path: "/services/consulting/course",
                element: <CoursePage/>,
                children: [
                    {
                        index: true,
                        element: <Overview/>
                    },
                    {
                        path: "/services/consulting/course/recordings",
                        element: <Recordings/>
                    },
                    {
                        path: "/services/consulting/course/resources",
                        element: <Resources/>
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
                path:"/about",
                element: <ProtectedRoute/>,
                children: [
                    {
                        index: true,
                        element: <AboutPage/>
                    }
                ]
            },
            {
                path: "/userpage",
                element: <UserPage/>,
                children: [
                    {
                        index: true,
                        element: <MyCourses/>
                    },
                    {
                        path: "/userpage/requests",
                        element: <MyRequests/>
                    }
                ]
            },
            {
                path: "/adminPage",
                element: <AdminPage/>
            }
        ],
        errorElement: <NotFound/>
    },
    {
        path: "/login",
        element: <Login/>
    }
])