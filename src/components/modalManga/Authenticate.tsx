import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { googleAuthenticate, getUserInfo } from "../../store/slice/authSlice";

const Authenticate = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);

        if (isMatch) {
            const authCode = isMatch[1];
            dispatch(googleAuthenticate(authCode));
        }
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (isAuthenticated) {
            // dispatch(getUserInfo());
            navigate("/trang-chu");
        }
    }, [isAuthenticated, navigate, dispatch]); return (
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