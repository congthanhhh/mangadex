import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
function NavHeader() {
    let Links = [
        { name: "TRANG CHỦ", link: "/" },
        { name: "DANH SÁCH", link: "/" },
        { name: "LIÊN HỆ", link: "/" },
    ];
    let [open, setOpen] = useState(false);
    return (
        <div className='shadow-md w-full  top-0 left-0'>
            <div className='md:flex items-center  bg-white py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center justify-center text-gray-800'>
                    <span className='text-3xl text-indigo-600 mr-1'>
                        <a href="/home">MANGA</a>
                    </span>
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute left-8 top-6 cursor-pointer md:hidden'>
                    <MenuOutlined name={open ? 'close' : 'menu'} />
                </div>
                <div className='text-3xl absolute xl:right-96 top-4 cursor-pointer sm:right-4'>
                    <SearchOutlined name={open ? 'close' : 'menu'} />
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-10 left-0 
                    w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16 ' : 'top-[-490px]'}`}>
                    {
                        Links.map((link) => (
                            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavHeader;