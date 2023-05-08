import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout";

export default function AuthGuard({ children }) {
    const { user } = useSelector((state) => state.user);
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsChecking(false);

        if (!user) {
            navigate('/login');
        }
    }, [user]);

    if (isChecking) {
        return <></>
    }

    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}