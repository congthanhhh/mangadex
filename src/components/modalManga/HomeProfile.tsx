import { Button, Card, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserInfo } from "../../store/slice/authSlice";
import { axiosInstance } from "../../utils/axiosInstance";

export default function HomeProfile() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
    const [password, setPassword] = useState("");

    const addPassword = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.post("/users/create-password", {
                password: password
            });

            if (response.data.code === 1000) {
                message.success("Password set successfully");
                // Refresh user info
                dispatch(getUserInfo());
            } else {
                message.error(response.data.message || "Failed to set password");
            }
        } catch (error: any) {
            message.error(error.message || "An error occurred");
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        // Fetch user info if not available
        if (!user) {
            dispatch(getUserInfo());
        }
    }, [isAuthenticated, navigate, user, dispatch]);

    // Show error if any
    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading user information..." />
            </div>
        );
    }

    return (
        <>
            {user ? (
                <div className="max-w-4xl mx-auto p-4">
                    <Card className="mb-6 shadow-md">
                        <div className="flex flex-col md:flex-row items-center">
                            {user.avatarUrl && (
                                <img
                                    src={user.avatarUrl}
                                    alt="User avatar"
                                    className="w-24 h-24 rounded-full object-cover mr-6 mb-4 md:mb-0"
                                />
                            )}
                            <div>
                                <p className="text-gray-600">Welcome back,</p>
                                <h1 className="text-2xl font-bold">{user.displayName || user.username}</h1>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>
                    </Card>

                    {user.role && (
                        <Card className="mb-6 shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Role</h2>
                            <p>{user.role}</p>
                        </Card>
                    )}

                    {/* Add password form if needed */}
                    {user.noPassword && (
                        <Card className="shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Set Password</h2>
                            <Form layout="vertical">
                                <Form.Item label="Password">
                                    <Input.Password
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mb-4"
                                    />
                                    <Button type="primary" onClick={addPassword}>
                                        Set Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    )}
                </div>
            ) : (
                <div className="text-center p-8">
                    <p>No user information available.</p>
                </div>
            )}
        </>
    );
}