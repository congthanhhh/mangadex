import { Breadcrumb, Button } from "antd"
import { MenuOutlined, VerticalLeftOutlined, VerticalRightOutlined, EyeFilled } from "@ant-design/icons"
import { useEffect, useState } from "react"
import SelectChapter from "../modalManga/SelectChapter"
import Comment from "../mangaDetail/Comment"
import { useParams, NavLink, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { clearComments, fetchAllRepliesForComments, fetchRootCommentChapter } from "../../store/slice/commentSlice";



const Chapter = () => {
    const [isOpenChapter, setIsOpenChapter] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const LIMIT_COMMENT = 10;
    const LIMIT_REPLIES = 4;

    const location = useLocation();
    const cid = location.state?.cid;
    const { chid, chapterNumber } = useParams();


    const dispatch = useAppDispatch();
    const { pages } = useAppSelector(state => state.page);

    const { rootComments, replies, loading: commentLoading, error: commentError } = useAppSelector(state => state.comment);

    const fetchComment = async () => {
        if (!chid) return;

        try {
            const resultAction = await dispatch(fetchRootCommentChapter(Number(chid)));

            if (fetchRootCommentChapter.fulfilled.match(resultAction)) {
                const rootCommentsData = resultAction.payload;

                if (Array.isArray(rootCommentsData) && rootCommentsData.length > 0) {
                    dispatch(fetchAllRepliesForComments(rootCommentsData));
                }
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }

    useEffect(() => {
        dispatch(clearComments());
        fetchComment();
    }, [chid, dispatch]);

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
                comicId={cid || ""}
                chapterId={Number(chid)}
                dataComment={rootComments}
                dataReply={replies}
                LIMIT_COMMENT={LIMIT_COMMENT}
                LIMIT_REPLIES={LIMIT_REPLIES} />
            {commentLoading && (
                <div className="text-center p-4">
                    Đang tải bình luận...
                </div>
            )}
            {commentError && (
                <div className="text-center p-4 text-red-500">
                    Lỗi: {commentError}
                </div>
            )}
            <SelectChapter
                isOpenChapter={isOpenChapter}
                handleCancel={handleCancel} />
        </div>
    )
}

export default Chapter