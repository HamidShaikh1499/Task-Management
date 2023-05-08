import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GuestGuard({ children }) {
    const { user } = useSelector((state) => state.user);
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsChecking(false);

        if (user) {
            navigate('/task');
        }
    }, []);

    if (isChecking) {
        return <></>
    }

    return (
        <>
            {children}
        </>
    )
}