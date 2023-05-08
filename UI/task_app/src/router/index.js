import { map } from 'lodash';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '../component/Loader';
import MainLayout from '../component/MainLayout';

const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Home = lazy(() => import('../pages/home/Home'));
const Profile = lazy(() => import('../pages/user/Profile'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));

const UnProtectedRoutes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/sign-up', name: 'Register', component: Register },
];

const ProtectedRoutes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/profile', name: 'Profile', component: Profile },
];

const HybridRoutes = [
    { path: '*', name: 'Page Not Found', component: PageNotFound },
];

export default function PageRoutes() {
    const { user } = useSelector((state) => state.user);

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {
                    map(UnProtectedRoutes, (route, index) => {
                        const { component: Component } = route;
                        return <Route key={`UnProtectedRoute${index}`}
                            path={route.path}
                            element={user ? <Navigate to='/' /> : <Component />} />;
                    })
                }
                {
                    map(ProtectedRoutes, (route, index) => {
                        const { component: Component } = route;
                        return (
                            <Route key={`ProtectedRoute${index}`} path={route.path}
                                element={user ? <MainLayout><Component /></MainLayout>
                                    : <Navigate to='/login' />}
                            />);
                    })
                }
                {
                    map(HybridRoutes, (route, index) => {
                        const { component: Component } = route;
                        return (
                            <Route key={`HybridRoute${index}`} path={route.path}
                                element={<Component />}
                            />);
                    })
                }
            </Routes>
        </Suspense>
    );
}
