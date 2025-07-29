import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEND_TWO_FACTOR_OTP_REQUEST, SEND_TWO_FACTOR_OTP_SUCCESS, SEND_TWO_FACTOR_OTP_FAILURE, VERIFY_TWO_FACTOR_OTP_REQUEST, VERIFY_TWO_FACTOR_OTP_SUCCESS, VERIFY_TWO_FACTOR_OTP_FAILURE, UPDATE_USER_PROFILE, LOGIN_2FA_REQUIRED, VERIFY_LOGIN_2FA_REQUEST, VERIFY_LOGIN_2FA_SUCCESS, VERIFY_LOGIN_2FA_FAILURE, SEND_ACCOUNT_VERIFICATION_OTP_REQUEST, SEND_ACCOUNT_VERIFICATION_OTP_SUCCESS, SEND_ACCOUNT_VERIFICATION_OTP_FAILURE, VERIFY_ACCOUNT_OTP_REQUEST, VERIFY_ACCOUNT_OTP_SUCCESS, VERIFY_ACCOUNT_OTP_FAILURE, DISABLE_TWO_FACTOR_OTP_REQUEST, DISABLE_TWO_FACTOR_OTP_SUCCESS, DISABLE_TWO_FACTOR_OTP_FAILURE, SEND_FORGOT_PASSWORD_OTP_REQUEST, SEND_FORGOT_PASSWORD_OTP_SUCCESS, SEND_FORGOT_PASSWORD_OTP_FAILURE, VERIFY_FORGOT_PASSWORD_OTP_REQUEST, VERIFY_FORGOT_PASSWORD_OTP_SUCCESS, VERIFY_FORGOT_PASSWORD_OTP_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from "./ActionConstants";

const initialState = {
    user: null,
    error: null,
    isLoading: false,
    jwt: null,
    // Two Factor Authentication states
    isTwoFactorLoading: false,
    twoFactorError: null,
    isOtpSent: false,
    isTwoFactorEnabled: false,
    twoFactorOtp: null, // Store OTP for display
    // Login 2FA states
    isLogin2FARequired: false,
    login2FASession: null,
    isLogin2FALoading: false,
    login2FAError: null,
    // Account Verification states
    isAccountVerificationLoading: false,
    accountVerificationError: null,
    isAccountVerificationOtpSent: false,
    isAccountVerified: false,
    accountVerificationOtp: null, // Store OTP for display
    // Disable Two Factor Authentication states
    isDisableTwoFactorLoading: false,
    disableTwoFactorError: null,
    // Forgot Password states
    isForgotPasswordLoading: false,
    forgotPasswordError: null,
    isForgotPasswordOtpSent: false,
    isForgotPasswordOtpVerified: false,
    forgotPasswordSessionId: null,
    forgotPasswordOtp: null, // Store OTP for display
    // Reset Password states
    isResetPasswordLoading: false,
    resetPasswordError: null,
    isResetPasswordSuccess: false
}

const authReducer = (state=initialState, action)=>{
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                jwt: action.payload,
                isLogin2FARequired: false,
                login2FASession: null
            }

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                user: action.payload,
                isTwoFactorEnabled: action.payload.twofactorauth?.enabled || false,
                isAccountVerified: action.payload.isAccountVerified || false
            }

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case LOGOUT_SUCCESS:
            return initialState;

        // Login 2FA cases
        case LOGIN_2FA_REQUIRED:
            return {
                ...state,
                isLoading: false,
                error: null,
                isLogin2FARequired: true,
                login2FASession: action.payload.session,
                jwt: action.payload.jwt
            }

        case VERIFY_LOGIN_2FA_REQUEST:
            return {
                ...state,
                isLogin2FALoading: true,
                login2FAError: null
            }

        case VERIFY_LOGIN_2FA_SUCCESS:
            return {
                ...state,
                isLogin2FALoading: false,
                login2FAError: null,
                isLogin2FARequired: false,
                login2FASession: null,
                jwt: action.payload
            }

        case VERIFY_LOGIN_2FA_FAILURE:
            return {
                ...state,
                isLogin2FALoading: false,
                login2FAError: action.payload
            }

        // Account Verification cases
        case SEND_ACCOUNT_VERIFICATION_OTP_REQUEST:
            return {
                ...state,
                isAccountVerificationLoading: true,
                accountVerificationError: null
            }

        case SEND_ACCOUNT_VERIFICATION_OTP_SUCCESS:
            return {
                ...state,
                isAccountVerificationLoading: false,
                accountVerificationError: null,
                isAccountVerificationOtpSent: true,
                accountVerificationOtp: action.payload.otp
            }

        case SEND_ACCOUNT_VERIFICATION_OTP_FAILURE:
            return {
                ...state,
                isAccountVerificationLoading: false,
                accountVerificationError: action.payload,
                isAccountVerificationOtpSent: false,
                accountVerificationOtp: null
            }

        case VERIFY_ACCOUNT_OTP_REQUEST:
            return {
                ...state,
                isAccountVerificationLoading: true,
                accountVerificationError: null
            }

        case VERIFY_ACCOUNT_OTP_SUCCESS:
            return {
                ...state,
                isAccountVerificationLoading: false,
                accountVerificationError: null,
                isAccountVerificationOtpSent: false,
                isAccountVerified: true,
                user: action.payload
            }

        case VERIFY_ACCOUNT_OTP_FAILURE:
            return {
                ...state,
                isAccountVerificationLoading: false,
                accountVerificationError: action.payload
            }

        // Two Factor Authentication cases
        case SEND_TWO_FACTOR_OTP_REQUEST:
            return {
                ...state,
                isTwoFactorLoading: true,
                twoFactorError: null
            }

        case SEND_TWO_FACTOR_OTP_SUCCESS:
            return {
                ...state,
                isTwoFactorLoading: false,
                twoFactorError: null,
                isOtpSent: true,
                twoFactorOtp: action.payload.otp
            }

        case SEND_TWO_FACTOR_OTP_FAILURE:
            return {
                ...state,
                isTwoFactorLoading: false,
                twoFactorError: action.payload,
                isOtpSent: false,
                twoFactorOtp: null
            }

        case VERIFY_TWO_FACTOR_OTP_REQUEST:
            return {
                ...state,
                isTwoFactorLoading: true,
                twoFactorError: null
            }

        case VERIFY_TWO_FACTOR_OTP_SUCCESS:
            return {
                ...state,
                isTwoFactorLoading: false,
                twoFactorError: null,
                isOtpSent: false,
                isTwoFactorEnabled: true,
                user: action.payload
            }

        case VERIFY_TWO_FACTOR_OTP_FAILURE:
            return {
                ...state,
                isTwoFactorLoading: false,
                twoFactorError: action.payload
            }

        // Disable Two Factor Authentication cases
        case DISABLE_TWO_FACTOR_OTP_REQUEST:
            return {
                ...state,
                isDisableTwoFactorLoading: true,
                disableTwoFactorError: null
            }

        case DISABLE_TWO_FACTOR_OTP_SUCCESS:
            return {
                ...state,
                isDisableTwoFactorLoading: false,
                disableTwoFactorError: null,
                isTwoFactorEnabled: false
            }

        case DISABLE_TWO_FACTOR_OTP_FAILURE:
            return {
                ...state,
                isDisableTwoFactorLoading: false,
                disableTwoFactorError: action.payload
            }

        // Forgot Password cases
        case SEND_FORGOT_PASSWORD_OTP_REQUEST:
        case VERIFY_FORGOT_PASSWORD_OTP_REQUEST:
            return {
                ...state,
                isForgotPasswordLoading: true,
                forgotPasswordError: null
            }
            
        case SEND_FORGOT_PASSWORD_OTP_SUCCESS:
            return {
                ...state,
                isForgotPasswordLoading: false,
                forgotPasswordError: null,
                isForgotPasswordOtpSent: true,
                forgotPasswordSessionId: action.payload.sessionId,
                forgotPasswordOtp: action.payload.otp
            }

        case SEND_FORGOT_PASSWORD_OTP_FAILURE:
            return {
                ...state,
                isForgotPasswordLoading: false,
                forgotPasswordError: action.payload,
                isForgotPasswordOtpSent: false,
                forgotPasswordOtp: null
            }

        // Verify Forgot Password OTP cases
        case VERIFY_FORGOT_PASSWORD_OTP_SUCCESS:
            return {
                ...state,
                isForgotPasswordLoading: false,
                forgotPasswordError: null,
                isForgotPasswordOtpVerified: true
            }

        case VERIFY_FORGOT_PASSWORD_OTP_FAILURE:
            return {
                ...state,
                isForgotPasswordLoading: false,
                forgotPasswordError: action.payload,
                isForgotPasswordOtpVerified: false
            }

        // Reset Password cases
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isResetPasswordLoading: true,
                resetPasswordError: null
            }
            
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetPasswordLoading: false,
                resetPasswordError: null,
                isResetPasswordSuccess: true
            }

        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isResetPasswordLoading: false,
                resetPasswordError: action.payload,
                isResetPasswordSuccess: false
            }
            
        case 'CLEAR_FORGOT_PASSWORD_SESSION':
            return {
                ...state,
                forgotPasswordSessionId: null,
                forgotPasswordOtp: null
            }
            
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            }
            
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                user: action.payload,
                isTwoFactorEnabled: action.payload.twofactorauth?.enabled || false,
                isAccountVerified: action.payload.isAccountVerified || false
            }

        default:
            return state;
    }
}


export default authReducer;