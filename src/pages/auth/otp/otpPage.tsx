import OtpInput from 'react-otp-input';
import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingState } from '../../../types';
import Loader from '../../../components/customSpinner';
import { handleApiError, showToast } from '../../../helpers';
import { adminLogin, sendOtp } from '../../../services/auth';

export default function OtpPage() {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(90);
    const [loading, setLoading] = useState<LoadingState>("idle");
    const navigate = useNavigate();
    const location = useLocation();
    const { email, password } = location.state || {};
    console.log("email", email, "password", password)

    const handleResendOtp = async () => {
        try {
            setLoading("loading");
            await sendOtp(email, password);
            setLoading("idle");
            setTimer(90);
            showToast('success', 'OTP sent successfully');
        } catch (error) {
            setLoading("error");
            handleApiError(error, "")
        }
    }

    const handleOtpVerification = async (otp: string) => {
        console.log("otp", typeof otp, otp)
        try {
            if (!email || !password) {
                showToast("error", "Missing credentials. Please login again.");
                return navigate("/login");
            }

            if (!/^\d+$/.test(otp)) {
                return showToast("error", "OTP must be a number");
            }

            setLoading("loading");
            const response = await adminLogin(email, password, otp);
            showToast('success', response.data.message);
            const role = response.data?.data?.role?.role;
            sessionStorage.setItem("kno-access", JSON.stringify(role));
            if (role === "admin") navigate("/admin");
            else navigate("/citizen");
            setLoading("idle");
        } catch (error) {
            setLoading("error");
            handleApiError(error, "Otp verification failed");
        }
    };

    useEffect(() => {
        if (otp.toString().length !== 6) return;
        handleOtpVerification(otp);
    }, [otp]);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer(prevSeconds => {
                if (prevSeconds > 0) return prevSeconds - 1;
                clearInterval(timerId);
                return 0;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [timer]);

    if (loading === "loading") return <Loader />

    return (
        <>
            <OtpInput
                value={otp}
                inputType='password'
                onChange={setOtp}
                numInputs={6}
                containerStyle={{ justifyContent: "center" }}
                renderInput={(props) => <CustomInput  {...props} className='otpBox' />}
            />
            <p className={`flex-center mt-4 ${timer === 0 ? 'hidden' : ''}`}>{timer} sec remaining</p>
            <CustomButton onClick={handleResendOtp} disabled={timer !== 0} type='button' className='w-100' style={{ marginTop: "1rem" }}>
                Resend
            </CustomButton>
            <Link to='/login' onClick={() => navigate("/login")} className="dmsans-bold flex-center mt-4 color-primary" style={{ fontSize: '0.96rem' }}>
                Back to login
            </Link>
        </>
    )
}
