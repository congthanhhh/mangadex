import { Layout } from "antd";
import {
    FacebookOutlined,
    TwitterOutlined,
    YoutubeOutlined,
    GithubOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;

const Footer = () => {
    return (
        <AntFooter className="bg-gray-900 text-white mt-8">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Description */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold mb-4 text-orange-400">MangaDex</h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Nền tảng đọc truyện tranh trực tuyến hàng đầu với hàng ngàn bộ truyện
                            từ khắp nơi trên thế giới. Trải nghiệm đọc truyện tuyệt vời với chất lượng hình ảnh cao.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                                <FacebookOutlined className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                                <TwitterOutlined className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">
                                <YoutubeOutlined className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                                <GithubOutlined className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-orange-400">Liên kết nhanh</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Trang chủ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Thể loại
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Truyện mới
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Top truyện
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Tìm kiếm
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-orange-400">Hỗ trợ</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Liên hệ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Hướng dẫn
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Báo lỗi
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Quy định
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-4 md:mb-0">
                            © 2025 MangaDex. All rights reserved.
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 text-center">
                    <p className="text-gray-500 text-xs">
                        Trang web này chỉ mang tính chất giải trí và không nhằm mục đích thương mại
                    </p>
                </div>
            </div>
        </AntFooter>
    );
};

export default Footer;