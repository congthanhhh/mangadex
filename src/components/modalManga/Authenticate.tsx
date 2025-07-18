import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { googleAuthenticate, getUserInfo } from "../../store/slice/authSlice";

const Authenticate = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
    const [hasShownSuccessMessage, setHasShownSuccessMessage] = useState(false);
    const [isProcessingAuth, setIsProcessingAuth] = useState(false);

    useEffect(() => {
        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);

        if (isMatch && !isProcessingAuth) {
            const authCode = isMatch[1];
            setIsProcessingAuth(true);
            dispatch(googleAuthenticate(authCode));
        }
    }, [dispatch, isProcessingAuth]);

    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (isAuthenticated && !hasShownSuccessMessage && isProcessingAuth) {
            message.success('Đăng nhập thành công!');
            setHasShownSuccessMessage(true);
            setIsProcessingAuth(false);

            // Fetch user info after successful Google login
            dispatch(getUserInfo());

            navigate("/trang-chu");
        }
    }, [isAuthenticated, navigate, dispatch, hasShownSuccessMessage, isProcessingAuth]); return (
        <div>
            {loading && (
                <Spin
                    tip="Authenticating..."
                    size="large"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
        </div>
    )
}

export default Authenticate