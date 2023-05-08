import { injectStyle } from "react-toastify/dist/inject-style";
import { toast, ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { useEffect } from "react";

export default function Toastify() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            injectStyle();
        }
    }, []);

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}

Toastify.propTypes = {
    message: PropTypes.string,
};

export const toastAction = toast;
