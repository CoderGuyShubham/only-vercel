import React, { useContext,useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const { token, backendUrl, loadCreditsData } = useContext(AppContext);
    const success = searchParams.get("success");
    const transactionId = searchParams.get("transactionId");
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const { data } = await axios.post(backendUrl + "/api/user/verify-stripe", { transactionId, success }, { headers: { token } });
        if (data.success) {
            toast.success("Payment succcess");
            loadCreditsData();
            navigate("/");
        } else {
            toast.error("Payment failed");
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className='w-full min-h-[60vh] flex items-center justify-center'>
            loading...
        </div>
    )
}

export default Verify