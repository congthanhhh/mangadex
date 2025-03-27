import { GoogleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { ModelLoginProps } from '../../types/AuthTypes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props: ModelLoginProps) => {
    const { isOpenLogin, handleCancel } = props;
    //--------------------------------------------------------------------------- 
    const KEY_TOKEN = "accessToken";
    const setToken = (token: any) => { localStorage.setItem(KEY_TOKEN, token); };
    const getToken = () => { return localStorage.getItem(KEY_TOKEN); };
    const removeToken = () => { return localStorage.removeItem(KEY_TOKEN); };
    // ---------------------------------------------------------------------------

    const handleContinueGoogle = () => {
        const callbackUrl = "http://localhost:5173/authenticate";
        const authUrl = "https://accounts.google.com/o/oauth2/auth";
        const googleClientId = "285017198166-v3bg04pi6vb53fve3homa4o6le3taskd.apps.googleusercontent.com";

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

        console.log(targetUrl);

        window.location.href = targetUrl;
    };

    // -----------------Login-----------------------
    const navigate = useNavigate();
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };
    interface LoginData {
        username: string;
        password: string;
    }
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    interface LoginResponse {
        result?: {
            token?: string;
        };
    }
    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const data: LoginData = {
            username: username,
            password: password,
        };

        fetch(`http://localhost:8080/comic/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response): Promise<LoginResponse> => {
                return response.json();
            })
            .then((data: LoginResponse) => {
                console.log(data);
                setToken(data.result?.token);
            });
    };

    useEffect(() => {
        const accessToken = getToken();

        if (accessToken) {
            navigate("/home-profile");
        }
    }, [navigate]);
    //------------------------------------------------ 

    return (
        <>
            <Modal style={{ top: 60 }}
                width={{
                    xs: '70%',
                    sm: '40%',
                    md: '35%',
                    lg: '30%',
                    xl: '20%',
                }}
                title={<div className='text-xl shadow-md p-1'>Đăng Nhập</div>}
                open={isOpenLogin} onCancel={handleCancel} footer={null}>
                <div className='flex flex-col items-center'>
                    <div className='mt-1'>
                        <Button icon={<GoogleOutlined />}
                            size='large' color='primary'
                            variant='solid' onClick={handleContinueGoogle}>
                            Đăng nhập với Google
                        </Button>
                    </div>

                    <div className='mt-1 text-red-600 underline'>
                        <a>Privacy Policy</a>
                    </div>

                </div>
                {/* -----------------Login----------------------- */}
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" onClick={handleLogin}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                {/* login-------------------------------------- */}
            </Modal>
        </>
    )
}

export default Login