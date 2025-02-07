import { GoogleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd'

interface ModelLoginProps {
    isOpenLogin: boolean;
    handleCancel: () => void;
}
const Login = (props: ModelLoginProps) => {
    const { isOpenLogin, handleCancel } = props;
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
                        <Button icon={<GoogleOutlined />} size='large' color='primary' variant='solid'>
                            Đăng nhập với Google
                        </Button>
                    </div>
                    <div className='mt-1 text-red-600 underline'>
                        <a>Privacy Policy</a>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default Login