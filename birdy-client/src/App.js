import React, { lazy, Suspense } from "react";
import { 
    BrowserRouter as Router, 
    Routes,
    Route,
} from "react-router-dom";

import * as ROUTES from "./constants/routes.js";

import Loading from "./atomComponents/Loading.js";

const Dashboard = lazy(() => import ('./pages/Dashboard.js'));
const Login = lazy(() => import ('./pages/Login.js'));
const Signup = lazy(() => import ('./pages/Signup.js'));
const Profile = lazy(() => import ('./pages/Profile.js'));
const NotFound = lazy(() => import ('./pages/Not-found.js'));

export default function App(){
    return(
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.SIGN_UP} element={<Signup />} />
                    <Route path={ROUTES.PROFILE} element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    )
};