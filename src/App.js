import React, { lazy, Suspense } from "react";
import { 
    BrowserRouter as Router, 
    Routes,
    Route,
} from "react-router-dom";

import * as ROUTES from "./constants/routes.js";

const Dashboard = lazy(() => import ('./pages/dashboard.js'));
const Login = lazy(() => import ('./pages/login.js'));
const Signup = lazy(() => import ('./pages/signup.js'));
const Profile = lazy(() => import ('./pages/profile.js'));
const NotFound = lazy(() => import ('./pages/not-found.js'));

export default function App(){
    return(
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.SIGN_UP} element={<Signup />} />
                    <Route path={ROUTES.PROFILE} element={<Profile />} />
                    <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    )
};