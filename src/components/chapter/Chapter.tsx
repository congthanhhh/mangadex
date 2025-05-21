import { Breadcrumb, Button } from "antd"
import { MenuOutlined, VerticalLeftOutlined, VerticalRightOutlined, EyeFilled } from "@ant-design/icons"
import { useEffect, useState } from "react"
import SelectChapter from "../modalManga/SelectChapter"
import Comment from "../mangaDetail/Comment"
import { useParams, NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchPagesByChapterId } from "../../store/slice/pageSlice"
import { increaseViewCount } from "../../store/slice/chapterSlice"



const Chapter = () => {
    const [isOpenChapter, setIsOpenChapter] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [comment, setComment] = useState([]);
    const [replyComment, setReplyComment] = useState([]);
    const LIMIT_COMMENT = 10;
    const LIMIT_REPCOMMENT = 4;

    const { id, chapterNumber } = useParams();

    const fetchComment = async () => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data = await res.json();
            setComment(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchReplyComment = async () => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
            const data = await res.json();
            setReplyComment(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const dispatch = useAppDispatch();
    const { pages } = useAppSelector(state => state.page); useEffect(() => {
        if (id) {
            dispatch(fetchPagesByChapterId(Number(id)));
            dispatch(increaseViewCount(Number(id)));
        }

        fetchComment();
        fetchReplyComment();
    }, [id, dispatch]);

    const showModal = () => {
        setIsOpenChapter(true)
    }
    const handleCancel = () => {
        setIsOpenChapter(false)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < lastScrollY) {
                setIsScrollingUp(true); // Cuộn lên → Fixed header
            } else {
                setIsScrollingUp(false); // Cuộn xuống → Bỏ fixed
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div>
            {/* header fixed */}
            <div className="bg-white">
                <div className={`py-2 bg-white transition-all duration-500 ${isScrollingUp ? "fixed top-0 left-0 w-full shadow-md z-10" : "relative"}`}>
                    <div className="flex flex-col items-center">
                        <div className="">
                            <Breadcrumb
                                className="capitalize"
                                separator=">"
                                items={[
                                    {
                                        title: <NavLink to="/trang-chu"><span className="text-red-600 cursor-pointer">Trang chủ</span></NavLink>,
                                    },
                                    {
                                        href: '',
                                        title: (
                                            <span className="text-red-600 cursor-pointer">
                                                {pages[0]?.titleComic}
                                            </span>
                                        ),
                                    },
                                    {
                                        href: '',
                                        title: <span className="text-red-600 cursor-pointer">Chương #{chapterNumber}</span>,
                                    },
                                ]}
                            />
                        </div>
                        <div className="">
                            <div className="">
                                <Button
                                    icon={<VerticalRightOutlined />}
                                    color="default" variant="text" size="large"
                                    className="text-stone-500 text-xl" />
                                <Button
                                    onClick={showModal}
                                    icon={<MenuOutlined />}
                                    color="default" variant="text" size="large"
                                    className="text-stone-500 text-xl mx-2" />
                                <Button
                                    icon={<VerticalLeftOutlined />}
                                    color="default" variant="text" size="large"
                                    className="text-stone-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* content*/}
                <div>
                    {pages.map((item) => (
                        <div className="w-fit m-auto py-1" key={item.pageNumber}>
                            <img
                                src={item.imageUrl}
                                alt={`Img_${item.titleComic}_${item.chapterNumber}_${item.pageNumber}`}
                                className="object-contain" />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center py-4">
                    <Button
                        icon={<VerticalRightOutlined />}
                        color="default" variant="filled" size="large"
                        className="text-stone-500 text-xl">TRƯỚC</Button>
                    <Button
                        icon={<EyeFilled />}
                        color="default" variant="text" size="large"
                        className="text-stone-500 text-xl mx-2">6.000</Button>
                    <Button
                        icon={<VerticalLeftOutlined />} iconPosition="end"
                        color="default" variant="filled" size="large"
                        className="text-stone-500 text-xl">SAU</Button>
                </div>
            </div>
            <Comment
                dataComment={comment}
                dataReply={replyComment}
                LIMIT_COMMENT={LIMIT_COMMENT}
                LIMIT_REPCOMMENT={LIMIT_REPCOMMENT} />
            <SelectChapter
                isOpenChapter={isOpenChapter}
                handleCancel={handleCancel} />
        </div>
    )
}

export default Chapter