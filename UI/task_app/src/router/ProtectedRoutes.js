import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import React from 'react';
import Profile from '../pages/user/Profile';

export default function PageRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}
