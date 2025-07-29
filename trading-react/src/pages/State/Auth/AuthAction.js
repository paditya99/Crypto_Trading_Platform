import axios from "axios";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEND_TWO_FACTOR_OTP_REQUEST, SEND_TWO_FACTOR_OTP_SUCCESS, SEND_TWO_FACTOR_OTP_FAILURE, VERIFY_TWO_FACTOR_OTP_REQUEST, VERIFY_TWO_FACTOR_OTP_SUCCESS, VERIFY_TWO_FACTOR_OTP_FAILURE, UPDATE_USER_PROFILE, LOGIN_2FA_REQUIRED, VERIFY_LOGIN_2FA_REQUEST, VERIFY_LOGIN_2FA_SUCCESS, VERIFY_LOGIN_2FA_FAILURE, SEND_ACCOUNT_VERIFICATION_OTP_REQUEST, SEND_ACCOUNT_VERIFICATION_OTP_SUCCESS, SEND_ACCOUNT_VERIFICATION_OTP_FAILURE, VERIFY_ACCOUNT_OTP_REQUEST, VERIFY_ACCOUNT_OTP_SUCCESS, VERIFY_ACCOUNT_OTP_FAILURE, DISABLE_TWO_FACTOR_OTP_REQUEST, DISABLE_TWO_FACTOR_OTP_SUCCESS, DISABLE_TWO_FACTOR_OTP_FAILURE, SEND_FORGOT_PASSWORD_OTP_REQUEST, SEND_FORGOT_PASSWORD_OTP_SUCCESS, SEND_FORGOT_PASSWORD_OTP_FAILURE, VERIFY_FORGOT_PASSWORD_OTP_REQUEST, VERIFY_FORGOT_PASSWORD_OTP_SUCCESS, VERIFY_FORGOT_PASSWORD_OTP_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from "./ActionConstants";

export const registerUser = (userData) => async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: REGISTER_REQUEST});
        const response = await axios.post(`${baseUrl}/auth/register`, userData);
        const user = response.data;
        console.log("############# user---"+user.user);
        dispatch({type: REGISTER_SUCCESS, payload: user.jwt});
        localStorage.setItem('jwt', user.jwt);
    }catch(error){
        console.log("Registration error:", error);
        let errorMessage = "Registration failed. Please try again.";
        
        // Handle network errors
        if (!error.response) {
            errorMessage = "Network error. Please check your internet connection and try again.";
        }
        // Handle specific HTTP status codes
        else if (error.response?.status === 400) {
            errorMessage = "Invalid registration data. Please check your information.";
        } else if (error.response?.status === 409) {
            errorMessage = "Email already exists. Please use a different email address.";
        } else if (error.response?.status === 403) {
            errorMessage = "Registration not allowed. Please contact support.";
        } else if (error.response?.status === 500) {
            errorMessage = "Server error. Please try again later.";
        } else if (error.response?.data?.message) {
            // Use backend message if available
            errorMessage = error.response.data.message;
        } else if (error.message) {
            // Use axios error message as fallback
            errorMessage = error.message;
        }
        
        dispatch({type: REGISTER_FAILURE, payload: errorMessage});
    }
}

export const loginUser = (userData) => async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: LOGIN_REQUEST});
        const response = await axios.post(`${baseUrl}/auth/login`, userData);
        const user = response.data;
        console.log("Login response:", user);
        
        // Check if 2FA is required
        if (user.twoFactorAuthEnabled) {
            console.log("2FA required for login");
            dispatch({type: LOGIN_2FA_REQUIRED, payload: {
                session: user.session,
                jwt: user.jwt
            }});
        } else {
            console.log("Login successful without 2FA");
            dispatch({type: LOGIN_SUCCESS, payload: user.jwt});
            localStorage.setItem('jwt', user.jwt);
        }
    }catch(error){
        console.log("Login error:", error);
        let errorMessage = "Login failed. Please check your credentials and try again.";
        
        // Handle network errors
        if (!error.response) {
            errorMessage = "Network error. Please check your internet connection and try again.";
        }
        // Handle specific HTTP status codes
        else if (error.response?.status === 403) {
            errorMessage = "Login failed. Please enter correct email and password.";
        } else if (error.response?.status === 401) {
            errorMessage = "Invalid credentials. Please check your email and password.";
        } else if (error.response?.status === 404) {
            errorMessage = "User not found. Please check your email address.";
        } else if (error.response?.status === 500) {
            errorMessage = "Server error. Please try again later.";
        } else if (error.response?.data?.message) {
            // Use backend message if available
            errorMessage = error.response.data.message;
        } else if (error.message) {
            // Use axios error message as fallback
            errorMessage = error.message;
        }
        
        dispatch({type: LOGIN_FAILURE, payload: errorMessage});
    }
}

export const verifyLogin2FA = (otp, sessionId) => async(dispatch) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    
    try{
        dispatch({type: VERIFY_LOGIN_2FA_REQUEST});
        const response = await axios.post(`${baseUrl}/auth/two-factor/otp/${otp}?id=${sessionId}`);
        console.log("Login 2FA verification successful:", response.data);
        dispatch({type: VERIFY_LOGIN_2FA_SUCCESS, payload: response.data.jwt});
        localStorage.setItem('jwt', response.data.jwt);
    }catch(error){
        console.log("Error verifying login 2FA:", error);
        const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to verify OTP";
        dispatch({type: VERIFY_LOGIN_2FA_FAILURE, payload: errorMessage});
    }
}

export const getUser = (jwt) => async(dispatch)=>{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: GET_USER_REQUEST});
        const response = await axios.get(`${baseUrl}/api/users/profile`, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        );
        const user = response.data;
        console.log(user);
        dispatch({type: GET_USER_SUCCESS, payload: user});
    }catch(error){
        dispatch({type: GET_USER_FAILURE, payload: error.message});
        console.log(error);
    }
}

export const logout = () => async(dispatch) => {
    try{
        localStorage.removeItem('jwt');
        dispatch({type: LOGOUT_SUCCESS})
    }
    catch(error){
        console.log(error);
    }
}

// Two Factor Authentication Actions
export const sendTwoFactorOTP = (verificationType) => async(dispatch) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const jwt = localStorage.getItem('jwt');
    
    if (!jwt) {
        dispatch({type: SEND_TWO_FACTOR_OTP_FAILURE, payload: "No authentication token found"});
        return;
    }
    
    try{
        dispatch({type: SEND_TWO_FACTOR_OTP_REQUEST});
        const response = await axios.post(`${baseUrl}/api/users/verification/${verificationType}/send-otp`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("OTP sent successfully:", response.data);
        // Extract OTP from response message
        const otpMatch = response.data.match(/OTP: (\d+)/);
        const otp = otpMatch ? otpMatch[1] : null;
        dispatch({type: SEND_TWO_FACTOR_OTP_SUCCESS, payload: { otp }});
    }catch(error){
        console.log("Error sending OTP:", error);
        const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to send OTP";
        dispatch({type: SEND_TWO_FACTOR_OTP_FAILURE, payload: errorMessage});
    }
}

export const verifyTwoFactorOTP = (otp) => async(dispatch) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const jwt = localStorage.getItem('jwt');
    
    if (!jwt) {
        dispatch({type: VERIFY_TWO_FACTOR_OTP_FAILURE, payload: "No authentication token found"});
        return;
    }
    
    if (!otp || otp.length !== 6) {
        dispatch({type: VERIFY_TWO_FACTOR_OTP_FAILURE, payload: "Please enter a valid 6-digit OTP"});
        return;
    }
    
    try{
        dispatch({type: VERIFY_TWO_FACTOR_OTP_REQUEST});
        const response = await axios.post(`${baseUrl}/api/users/enable-two-factor/verify-otp/${otp}`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("Two Factor Authentication enabled successfully:", response.data);
        dispatch({type: VERIFY_TWO_FACTOR_OTP_SUCCESS, payload: response.data});
        dispatch({type: UPDATE_USER_PROFILE, payload: response.data});
    }catch(error){
        console.log("Error verifying OTP:", error);
        const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to verify OTP";
        dispatch({type: VERIFY_TWO_FACTOR_OTP_FAILURE, payload: errorMessage});
    }
}

// Account Verification Actions
export const sendAccountVerificationOTP = (verificationType) => async(dispatch) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const jwt = localStorage.getItem('jwt');
    
    if (!jwt) {
        dispatch({type: SEND_ACCOUNT_VERIFICATION_OTP_FAILURE, payload: "No authentication token found"});
        return;
    }
    
    try{
        dispatch({type: SEND_ACCOUNT_VERIFICATION_OTP_REQUEST});
        const response = await axios.post(`${baseUrl}/api/users/verification/${verificationType}/send-otp`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("Account verification OTP sent successfully:", response.data);
        // Extract OTP from response message
        const otpMatch = response.data.match(/OTP: (\d+)/);
        const otp = otpMatch ? otpMatch[1] : null;
        dispatch({type: SEND_ACCOUNT_VERIFICATION_OTP_SUCCESS, payload: { otp }});
    }catch(error){
        console.log("Error sending account verification OTP:", error);
        const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to send OTP";
        dispatch({type: SEND_ACCOUNT_VERIFICATION_OTP_FAILURE, payload: errorMessage});
    }
}

export const verifyAccountOTP = (otp) => async(dispatch) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const jwt = localStorage.getItem('jwt');
    
    if (!jwt) {
        dispatch({type: VERIFY_ACCOUNT_OTP_FAILURE, payload: "No authentication token found"});
        return;
    }
    
    if (!otp || otp.length !== 6) {
        dispatch({type: VERIFY_ACCOUNT_OTP_FAILURE, payload: "Please enter a valid 6-digit OTP"});
        return;
    }
    
    try{
        dispatch({type: VERIFY_ACCOUNT_OTP_REQUEST});
        // For now, we'll use the same endpoint as 2FA verification but with a different purpose
        // In a real implementation, you might have a separate endpoint for account verification
        const response = await axios.post(`${baseUrl}/api/users/enable-two-factor/verify-otp/${otp}`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("Account verification successful:", response.data);
        // Update the user object to mark account as verified
        const updatedUser = { ...response.data, isAccountVerified: true };
        dispatch({type: VERIFY_ACCOUNT_OTP_SUCCESS, payload: updatedUser});
        dispatch({type: UPDATE_USER_PROFILE, payload: updatedUser});
    }catch(error){
        console.log("Error verifying account OTP:", error);
        const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to verify OTP";
        dispatch({type: VERIFY_ACCOUNT_OTP_FAILURE, payload: errorMessage});
    }
}

// Disable Two Factor Authentication Actions
export const disableTwoFactorOTP = () => async(dispatch) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const jwt = localStorage.getItem('jwt');
    
    try{
        dispatch({type: DISABLE_TWO_FACTOR_OTP_REQUEST});
        const response = await axios.post(`${baseUrl}/api/users/disable-two-factor`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("Two Factor Authentication disabled successfully:", response.data);
        dispatch({type: DISABLE_TWO_FACTOR_OTP_SUCCESS, payload: response.data});
        dispatch({type: UPDATE_USER_PROFILE, payload: response.data});
    }catch(error){
        console.log("Error disabling two factor authentication:", error);
        const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to disable two factor authentication";
        dispatch({type: DISABLE_TWO_FACTOR_OTP_FAILURE, payload: errorMessage});
}



}

//Forgot Password Actions
export const sendForgotPasswordOTP = (email, verificationType) => async(dispatch) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: SEND_FORGOT_PASSWORD_OTP_REQUEST});
        
        const requestData = {
            sendTo: email,
            verificationType: verificationType
        };
        
        const response = await axios.post(`${baseUrl}/auth/users/forgot-password/send-otp`, requestData);
        console.log("Forgot password OTP sent successfully:", response.data);
        dispatch({type: SEND_FORGOT_PASSWORD_OTP_SUCCESS, payload: { 
            sessionId: response.data.session,
            otp: response.data.otp // Include OTP for display
        }});
    }catch(error){
        console.log("Error sending forgot password OTP:", error);
        const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to send OTP";
        dispatch({type: SEND_FORGOT_PASSWORD_OTP_FAILURE, payload: errorMessage});
    }
}

export const verifyForgotPasswordOTP = (otp, sessionId) => async(dispatch) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: VERIFY_FORGOT_PASSWORD_OTP_REQUEST});
        
        // For verification, we just need to check if OTP is valid
        // The actual verification happens in the reset password step
        // This action is mainly for UI state management
        console.log("Verifying forgot password OTP:", otp, "Session:", sessionId);
        dispatch({type: VERIFY_FORGOT_PASSWORD_OTP_SUCCESS, payload: { otp, sessionId }});
    }catch(error){
        console.log("Error verifying forgot password OTP:", error);
        const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to verify OTP";
        dispatch({type: VERIFY_FORGOT_PASSWORD_OTP_FAILURE, payload: errorMessage});
    }
}

export const resetPassword = (otp, newPassword, sessionId) => async(dispatch) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    try{
        dispatch({type: RESET_PASSWORD_REQUEST});
        
        const requestData = {
            otp: otp,
            newPassword: newPassword
        };
        
        const response = await axios.post(`${baseUrl}/auth/users/reset-password/verify-otp?id=${sessionId}`, requestData);
        console.log("Password reset successfully:", response.data);
        dispatch({type: RESET_PASSWORD_SUCCESS, payload: response.data});
    }catch(error){
        console.log("Error resetting password:", error);
        const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Failed to reset password";
        dispatch({type: RESET_PASSWORD_FAILURE, payload: errorMessage});
    }
}

