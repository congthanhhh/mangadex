import { MenuOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import Search from "../modalManga/Search";
import UserInfo from "../modalManga/UserInfo";
function NavHeader() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const showModal = () => {
        setIsOpenUserInfo(true)
    }
    const handleCancel = () => {
        setIsOpenUserInfo(false)
    }
    const showModalSearch = () => {
        setIsOpenSearch(true)
    }
    const handleCancelSearch = () => {
        setIsOpenSearch(false)
    }

    const Links = [
        { name: 'Trang chủ', link: '/trang-chu' },
        { name: 'Danh sách', link: '/danh-sach' },
        { name: 'Liên hệ', link: '/lien-he' },
    ];

    return (
        <div className='shadow-md w-full bg-white top-0 left-0 mb-1'>
            <div className="max-w-screen-xl m-auto">
                <div className='md:flex items-center py-4 md:px-1 px-7'>
                    <div className='font-bold text-2xl cursor-pointer flex items-center justify-center text-gray-800'>
                        <span className='text-3xl text-indigo-600 mr-1'>
                            <a href="/home">MANGA</a>
                        </span>
                    </div>

                    <div onClick={() => setOpen(!open)} className='text-3xl absolute left-8 top-6 cursor-pointer md:hidden'>
                        <MenuOutlined name={open ? 'close' : 'menu'} />
                    </div>
                    <div className='text-3xl absolute xl:right-36 top-4 cursor-pointer right-0 sm:right-0'>
                        <Button
                            onClick={showModalSearch}
                            style={{ fontSize: 22, marginRight: 12 }}
                            size="large"
                            shape="circle"
                            color="default"
                            variant="text"
                            icon={<SearchOutlined name={open ? 'close' : 'menu'} />}
                        />
                        <Button
                            onClick={showModal}
                            style={{ fontSize: 22, marginRight: 12 }}
                            size="large"
                            shape="circle"
                            color="default"
                            variant="filled"
                            icon={<UserOutlined name={open ? 'close' : 'menu'} />}
                        />
                    </div>

                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-10 left-0 
                    w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16 ' : 'top-[-490px]'}`}>
                        {
                            Links.map((item) => (
                                <li key={item.name}
                                    className='md:ml-8 md:my-0 my-7 text-sm flex flex-col items-center'>
                                    <NavLink to={item.link}
                                        className={`${location.pathname === item.link ? 'text-slate-700' : 'text-gray-500'}
                                        uppercase font-sans font-medium text-gray-500 hover:text-gray-400 duration-500`}>
                                        {item.name}
                                    </NavLink>
                                    <div
                                        className={`relative top-2 w-1/2 h-1 rounded transition-all duration-500 ease-in-out 
                                            ${location.pathname === item.link ? 'bg-blue-500 scale-x-100' : 'bg-transparent scale-x-0'}`}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <UserInfo
                isOpenUserInfo={isOpenUserInfo}
                handleCancel={handleCancel} />

            <Search
                isOpenSearch={isOpenSearch}
                handleCancel={handleCancelSearch} />
        </div>

    )
}

export default NavHeader;