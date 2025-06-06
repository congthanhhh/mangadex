import {
    CaretLeftOutlined,
    EditOutlined,
    HomeOutlined,
    LogoutOutlined,
    MailOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    UnorderedListOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Collapse, CollapseProps, Modal, Spin } from 'antd'
import { NavLink } from 'react-router-dom';
import Login from './Login';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slice/authSlice';

interface ModelInfoProps {
    isOpenUserInfo: boolean;
    isOpenLogin: boolean;
    handleCancel: () => void;
    handleCancelLogin: () => void;
    showModalLogin: () => void;

}
const UserInfo = (props: ModelInfoProps) => {
    const { isOpenUserInfo, isOpenLogin, handleCancel, handleCancelLogin, showModalLogin } = props;
    const dispatch = useAppDispatch();
    const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        handleCancel();
    };

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: (
                <div className='hover:bg-red-100 hover:rounded p-1 flex'>
                    <SettingOutlined style={{ fontSize: 22, color: 'GrayText' }} />
                    <span className='text-base ml-2 font-semibold text-gray-500'>thông tin tài khoản</span>
                </div>
            ),
            children: (
                <div style={{ paddingInlineStart: 33 }} className='hover:bg-red-100 hover:rounded  p-1 flex'>
                    <EditOutlined style={{ fontSize: 22, color: 'GrayText' }} />
                    <span className='text-base ml-2 font-semibold text-gray-500'>đổi tên hiển thị</span>
                </div>
            ),
            styles: ({ header: { padding: 0 }, body: { padding: 0 } })
        }]
    return (
        <>
            <Modal
                style={{ top: 68 }}
                width={{
                    xs: '80%',
                    sm: '50%',
                    md: '40%',
                    lg: '30%',
                    xl: '25%',
                }}
                title={<div className='text-xl shadow-md p-1'>Thông Tin Tài Khoản</div>}
                open={isOpenUserInfo} onCancel={handleCancel} footer={null}>                <div className='capitalize'>
                    {!isAuthenticated ? (
                        <div onClick={() => showModalLogin()} className='cursor-pointer p-1 mb-2 flex hover:bg-red-100 hover:rounded'>
                            <UserOutlined style={{ fontSize: 22, color: 'GrayText' }} />
                            <span className='text-base ml-2 font-semibold text-gray-500'> đăng nhập</span>
                        </div>
                    ) : loading ? (
                        <div className='p-4 flex justify-center'>
                            <Spin tip="Loading user info..." />
                        </div>
                    ) : (
                        <>
                            <div className='cursor-pointer p-1 mb-2 flex hover:bg-red-100 hover:rounded'>
                                <UserOutlined style={{ fontSize: 22, color: 'GrayText' }} />
                                <span className='text-base ml-2 font-semibold text-gray-500'>{user?.username || 'User'}</span>
                            </div>
                            {user?.email && (
                                <div className='cursor-pointer p-1 mb-2 flex hover:bg-red-100 hover:rounded'>
                                    <MailOutlined style={{ fontSize: 22, color: 'GrayText' }} />
                                    <span className='text-base ml-2 font-semibold text-gray-500'>{user.email}</span>
                                </div>
                            )}
                        </>
                    )}

                    <hr className='h-1 my-2 bg-gray-400 opacity-50' />
                    <div className='cursor-pointer mb-2 flex'>
                        <Collapse
                            items={items}
                            bordered={false}
                            ghost
                            expandIcon={({ isActive }) => <CaretLeftOutlined rotate={isActive ? -90 : 0} />}
                            expandIconPosition='end'
                            className='w-full'
                        />
                    </div>
                    <hr className='h-1 my-2 bg-gray-400 opacity-50' />
                    <div className='cursor-pointer p-1 mb-2 hover:bg-red-100 hover:rounded'>
                        <NavLink to="/trang-chu" className="flex">
                            <HomeOutlined style={{ fontSize: 22, color: 'GrayText' }} />
                            <span className='text-base ml-2 font-semibold text-gray-500'>trang chủ</span>
                        </NavLink>
                    </div>
                    <div className='cursor-pointer p-1 mb-2 hover:bg-red-100 hover:rounded'>
                        <NavLink to="/danh-sach" className="flex">
                            <UnorderedListOutlined style={{ fontSize: 22, color: 'GrayText' }} />
                            <span className='text-base ml-2 font-semibold text-gray-500'>danh sách</span>
                        </NavLink>
                    </div>
                    <div className='cursor-pointer p-1 mb-2 hover:bg-red-100 hover:rounded'>
                        <NavLink to="/lien-he" className="flex">
                            <QuestionCircleOutlined style={{ fontSize: 22, color: 'GrayText' }} />
                            <span className='text-base ml-2 font-semibold text-gray-500'>liên hệ</span>
                        </NavLink>
                    </div>                    <hr className='h-1 my-2 bg-gray-400 opacity-50' />
                    {isAuthenticated && (
                        <div onClick={handleLogout} className='cursor-pointer p-1 mb-2 flex hover:bg-red-100 hover:rounded'>
                            <LogoutOutlined style={{ fontSize: 22, color: 'GrayText' }} />
                            <span className='text-base ml-2 font-semibold text-gray-500'>đăng xuất</span>
                        </div>
                    )}
                </div>
            </Modal>
            <Login isOpenLogin={isOpenLogin} handleCancel={handleCancelLogin} />
        </>
    )
}

export default UserInfo