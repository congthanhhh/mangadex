import { GoogleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, message } from 'antd'
import { ModelLoginProps } from '../../types/AuthTypes';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserInfo, login } from '../../store/slice/authSlice';
import { OAuthConfig } from '../../utils/tokenUtils';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login = (props: ModelLoginProps) => {
    const { isOpenLogin, handleCancel } = props;
    const dispatch = useAppDispatch();
    const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

    // Form state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");    // Check if user is authenticated and redirect if needed
    useEffect(() => {
        if (isAuthenticated) {
            // Fetch user information after successful login
            dispatch(getUserInfo());
            handleCancel();
        }
    }, [isAuthenticated, handleCancel, dispatch]);

    const handleContinueGoogle = () => {
        const { clientId, redirectUri, authUri } = OAuthConfig;
        const targetUrl = `${authUri}?redirect_uri=${encodeURIComponent(
            redirectUri
        )}&response_type=code&client_id=${clientId}&scope=openid%20email%20profile`;

        window.location.href = targetUrl;
    };

    // Handle login with Redux
    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!username || !password) {
            message.error('Please enter both username and password');
            return;
        }

        dispatch(login({ username, password }));
    };

    // Show error message if login fails
    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    return (
        <Modal width={{
            xs: '70%',
            sm: '40%',
            md: '35%',
            lg: '30%',
            xl: '20%',
        }} open={isOpenLogin} onCancel={handleCancel} footer={null}>
            <div className='px-8'>
                <div className='mt-5'>
                    <Button
                        icon={<GoogleOutlined />}
                        htmlType="button"
                        className='bg-slate-200 text-slate-800 w-full h-10 hover:opacity-50'
                        variant='solid' onClick={handleContinueGoogle}>
                        Tiếp tục với Google
                    </Button>
                </div>
                <div className='flex items-center gap-3 my-5'>
                    <hr className='w-full border-t-2 border-gray-300' />
                    <div className='text-gray-500'>Hoặc</div>
                    <hr className='w-full border-t-2 border-gray-300' />
                </div>
                <Form
                    name="basic"
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>>

                        <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType>>

                        <Input.Password placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                    >
                        <div className='flex justify-between'>
                            <Checkbox className='mb-0'>Lưu mật khẩu</Checkbox>
                            <a className='ml-auto text-blue-600' href="">Quên mật khẩu?</a>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full h-10 bg-sky-500"
                            onClick={handleLogin} loading={loading}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <div className='text-center mt-2'>
                        <div>Chưa có tài khoản?
                            <a href="#" className='text-blue-600 ml-1 hover:text-red-700'>
                                Đăng ký
                            </a>
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default Login