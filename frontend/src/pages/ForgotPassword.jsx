import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);

        // Send OTP

        const sendOTP = async () => {

            if (!email) {

                alert("Enter Registered Email");
            
                return;
            
            }
    
            try {
    
                setLoading(true);
    
                await axios.post(
    
                    `${process.env.REACT_APP_API_URL}/customers/forgot-password/send-otp`,
    
                    {
                        email
                    }
    
                );
    
                alert("OTP sent successfully.\n\nPlease check your Inbox or Spam folder.");
    
                setStep(2);
    
            }
    
            catch (err) {
    
                alert(
    
                    err.response?.data?.message ||
    
                    "Unable to Send OTP"
    
                );
    
            }
    
            finally {
    
                setLoading(false);
    
            }
    
        };

            // Verify OTP

    const verifyOTP = async () => {

        if (!otp) {

            alert("Enter OTP");

            return;

        }

        try {

            await axios.post(

                `${process.env.REACT_APP_API_URL}/customers/forgot-password/verify-otp`,

                {
                    email,
                    otp
                }

            );

            alert("OTP Verified");

            setStep(3);

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Invalid OTP"

            );

        }

    };

        // Reset Password

        const resetPassword = async () => {

            if (newPassword !== confirmPassword) {
    
                alert("Passwords do not match");
    
                return;
    
            }
    
            try {
    
                await axios.post(
    
                    `${process.env.REACT_APP_API_URL}/customers/reset-password`,
    
                    {
                        email,
                        password:newPassword
                    }
    
                );
    
                alert("Password Updated Successfully");
    
                navigate("/login");
    
            }
    
            catch (err) {
    
                alert(
    
                    err.response?.data?.message ||
    
                    "Unable to Reset Password"
    
                );
    
            }
    
        };

        return (

            <div className="container mt-5" style={{maxWidth:"450px"}}>
            
            <div className="card shadow p-4">
            
            <h2 className="text-center mb-4">
            
            Forgot Password
            
            </h2>
            
            {
            step===1 &&
            
            <>
            
            <input
            
            className="form-control mb-3"
            
            placeholder="Enter Registered Email"
            
            value={email}
            
            onChange={(e)=>setEmail(e.target.value)}
            />
            
            <button
            
            className="btn btn-primary w-100"
            
            onClick={sendOTP}
            
            >
            
            Send OTP
            
            </button>
            
            </>
            
            }
            
            {
            step===2 &&
            
            <>
            
            <input
            
            className="form-control mb-3"
            
            placeholder="Enter OTP"
            
            value={otp}
            
            onChange={(e)=>setOtp(e.target.value)}
            
            />
            
            <button
            
            className="btn btn-warning w-100"
            
            onClick={verifyOTP}
            
            >
            
            Verify OTP
            
            </button>
            
            </>
            
            }
            
            {
            step===3 &&
            
            <>
            
            <input
            
            type="password"
            
            className="form-control mb-3"
            
            placeholder="New Password"
            
            value={newPassword}
            
            onChange={(e)=>setNewPassword(e.target.value)}
            
            />
            
            <input
            
            type="password"
            
            className="form-control mb-3"
            
            placeholder="Confirm Password"
            
            value={confirmPassword}
            
            onChange={(e)=>setConfirmPassword(e.target.value)}
            
            />
            
            <button
            
            className="btn btn-success w-100"
            
            onClick={resetPassword}
            
            >
            
            Reset Password
            
            </button>
            
            </>
            
            }
            
            </div>
            
            </div>
            
            );
            
            }
            
            export default ForgotPassword;