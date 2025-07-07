import { Button, Col, Rate, Row, Tag, Input } from "antd"
import { useEffect, useState } from "react"
import { format, parseISO } from 'date-fns';
import { UsergroupAddOutlined, StarFilled, EyeFilled, HeartFilled, BellFilled, TagOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ShowMoreLess from "./ShowMoreLess";
import Comment from "./Comment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchChaptersByMangaId } from "../../store/slice/chapterSlice";
import { fetchMangaById } from "../../store/slice/mangaSlice";
import { fetchRootComments, fetchAllRepliesForComments, clearComments } from "../../store/slice/commentSlice";


const CardDetail = () => {
    const [chapterInput, setChapterInput] = useState("");
    const LIMIT_MANGA = 21;
    const LIMIT_COMMENT = 10;
    const LIMIT_REPLIES = 2;
    const navigate = useNavigate();

    const { id } = useParams(); // comicId

    const dispatch = useAppDispatch();
    const { chapters, loading, error } = useAppSelector(state => state.chapter);
    const { selectedManga } = useAppSelector(state => state.manga);
    const { rootComments, replies, loading: commentLoading, error: commentError } = useAppSelector(state => state.comment);

    const fetchComment = async () => {
        if (!id) return;

        try {
            const resultAction = await dispatch(fetchRootComments(id));

            if (fetchRootComments.fulfilled.match(resultAction)) {
                const rootCommentsData = resultAction.payload;
                if (Array.isArray(rootCommentsData) && rootCommentsData.length > 0) {
                    dispatch(fetchAllRepliesForComments(rootCommentsData));
                }
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }

    const handleGoToChapter = () => {
        if (!chapterInput || !chapters || chapters.length === 0) return;

        const chapterNumber = parseInt(chapterInput);
        if (isNaN(chapterNumber)) return;

        // Find the chapter with the matching chapter number
        const chapter = chapters.find(ch => ch.chapterNumber === chapterNumber);
        if (chapter) {
            navigate(`/chapter/${chapter.id}/chapter-number/${chapter.chapterNumber}`);
        } else {
            // Alert or some feedback that the chapter wasn't found could be added here
            console.log(`Chapter ${chapterNumber} not found`);
        }
    };

    const handleReadFromBeginning = () => {
        if (!chapters || chapters.length === 0) return;

        // Sort chapters by chapter number to find the first one
        const sortedChapters = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
        const firstChapter = sortedChapters[0];

        if (firstChapter) {
            navigate(`/chapter/${firstChapter.id}/chapter-number/${firstChapter.chapterNumber}`);
        } else {
            console.log("No chapters available");
        }
    };

    useEffect(() => {
        if (id) {
            // Clear previous comments when manga changes
            dispatch(clearComments());
            dispatch(fetchChaptersByMangaId(id));
            dispatch(fetchMangaById(id));
            fetchComment();
        }
    }, [id, dispatch]);

    return (
        <div>
            <div>
            </div>
            <div className="w-full mb-2">
                <Row>
                    <Col lg={7} xs={24} className="p-3">
                        <div>
                            <div className="flex items-center">
                                <div className="w-full mx-auto h-[450px] min-w-[275px] max-w-[295px] rounded-md">
                                    <img className="w-full h-full rounded-md" src={selectedManga?.imageUrl} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around mx-auto mt-5 max-w-[345px] min-w-[300]">
                            <div className="rounded-lg flex items-center flex-col justify-center bg-neutral-200 h-16">
                                <span className="w-16 inline-flex items-center justify-center text-2xl">
                                    <StarFilled className="" />
                                </span>
                                <div className="text-xs tracking-wider font-medium">106</div>
                            </div>
                            <div className="rounded-lg flex items-center flex-col justify-center bg-neutral-200 h-16">
                                <span className="w-16 inline-flex items-center justify-center text-2xl">
                                    <EyeFilled />
                                </span>
                                <div className="text-xs tracking-wider font-medium">601.020</div>
                            </div>
                            <div className="rounded-lg flex items-center flex-col justify-center bg-neutral-200 h-16">
                                <span className="w-16 inline-flex items-center justify-center text-2xl">
                                    <UsergroupAddOutlined />
                                </span>
                                <div className="text-xs tracking-wider font-medium">5.008</div>
                            </div>
                        </div>
                        <div className="mt-3 mx-auto min-w-[300px] max-w-96">
                            <div className="flex items-center rounded-lg mx-2 bg-neutral-200">
                                <div className="max-w-full px-3 py-2 cursor-pointer">
                                    <Rate defaultValue={4} />
                                </div>
                                <div className="flex-grow"></div>
                                <div className="pr-3 text-base">
                                    <b className="text-slate-500">4</b>
                                    <small className="text-slate-500">/5</small>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 mx-auto min-w-[300px] max-w-full">
                            <div className="flex items-center mx-2">
                                <Button
                                    color="default" variant="filled"
                                    size="large"
                                    className="min-w-16 w-2/4 mr-1"
                                    icon={<HeartFilled />}>
                                    Theo Dõi
                                </Button>
                                <Button icon={<BellFilled className="text-yellow-400" />}
                                    size="large"
                                    className="min-w-16 w-2/4 ml-1"
                                    color="default" variant="filled">
                                    Thông Báo
                                </Button>
                            </div>
                        </div>                        <div className="mt-3 mx-auto min-w-[300px] max-w-full">
                            <div className="mx-2">
                                <Button
                                    color="default"
                                    variant="filled" size="large"
                                    className="w-full"
                                    onClick={handleReadFromBeginning}
                                >Đọc Từ Đầu
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col lg={17} xs={24} className="p-3">
                        <div className="w-full">
                            <div>
                                <div className="rounded-md bg-neutral-200 pb-4">
                                    <div className="capitalize text-2xl leading-6 font-bold px-4 pt-4 ">{selectedManga?.title}</div>
                                    <div className='px-4 py-2 flex flex-wrap'>
                                        {selectedManga?.genres.map((genre) => (
                                            <Tag icon={<TagOutlined />} key={genre.id} className='mt-1 bg-slate-300 hover:opacity-50 rounded-xl text-xs h-6 font-medium flex items-center'>
                                                <a href="#">{genre.name}</a>
                                            </Tag>))}

                                    </div>
                                    <div className="line-clamp-3 px-4 text-sm">
                                        {selectedManga?.description}
                                    </div>
                                </div>
                                <div className="rounded-md w-full mt-1 bg-neutral-200">
                                    <div>
                                        <div className='flex items-center pr-3'>
                                            <div className='h-9 min-w-16 px-4 pt-1 text-xl font-normal'>Truyện Mới</div>
                                            <hr className="block flex-1 border border-black border-opacity-10 border-solid transition max-w-full" />
                                        </div>
                                        <div className="p-4">
                                            <div className="text-sm mb-1 font-normal uppercase">
                                                Tác giả: <span className="text-green-700 pl-2">Updating</span>
                                            </div>
                                            <div className="text-sm mb-1 font-normal uppercase">
                                                Trạng Thái: <span className="text-green-700 pl-2">{selectedManga?.status}</span>
                                            </div>
                                            <div className="text-sm mb-1 font-normal">
                                                <div className="border border-sky-500 rounded-md mt-1 bg-[#1f53794d]">
                                                    <p className="ml-1">LỊCH RA CHƯƠNG MỚI: Thứ 2 hàng tuần</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md w-full mt-1 bg-neutral-200">
                                    <div>
                                        <div className='flex items-center pr-3 pt-3'>
                                            <div className='h-9 min-w-16 px-4 pt-1 text-xl font-normal'>Danh Sách</div>
                                            <hr className="block flex-1 border mr-2 border-black border-opacity-10 border-solid transition max-w-full" />
                                            <Button className="mx-1" onClick={handleGoToChapter}>ĐI TỚI</Button>
                                            <Input
                                                placeholder="CHƯƠNG"
                                                className="w-[90px] mx-1"
                                                value={chapterInput}
                                                onChange={(e) => setChapterInput(e.target.value)}
                                                onPressEnter={handleGoToChapter}
                                            />
                                        </div>
                                        <Row className="p-4">
                                            {loading ? (
                                                <div className="w-full text-center p-4">
                                                    Đang tải danh sách chương...
                                                </div>
                                            ) : error ? (
                                                <div className="w-full text-center p-4 text-red-500">
                                                    Lỗi: {error}
                                                </div>
                                            ) : chapters && chapters.length > 0 ? (
                                                <ShowMoreLess
                                                    data={chapters}
                                                    initialVisible={LIMIT_MANGA}
                                                    className="pt-2 w-full"
                                                    buttonClassName="w-full h-11 rounded-md text-sm px-4 border-2"
                                                    renderItem={(item) => (
                                                        <Col lg={8} md={8} sm={12} xs={24} key={item.id} className="p-2 py-1 cursor-pointer">
                                                            <a onClick={() => navigate(`/chapter/${item.id}/chapter-number/${item.chapterNumber}`)}
                                                                className="w-full flex items-center bg-neutral-300 p-1 rounded hover:opacity-65 hover:text-slate-500">
                                                                <div className=" flex items-center rounded-md bg-red-300 w-12 h-14 justify-center">
                                                                    <EyeTwoTone twoToneColor='#f33' className="text-base" />
                                                                </div>
                                                                <div className="flex justify-center flex-col py-1 px-2 w-full">
                                                                    <div className="text-base font-normal">
                                                                        <span>#{item.chapterNumber}</span>
                                                                    </div>
                                                                    <div className="flex justify-between text-xs text-slate-500 font-sans">
                                                                        <div>
                                                                            <span>{item.releaseDate
                                                                                ? format(parseISO(item.releaseDate), 'MM-dd-yyyy')
                                                                                : ''}</span>
                                                                        </div>
                                                                        <div>
                                                                            <EyeFilled />
                                                                            <span className="pl-1">{item.viewCount}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </Col>
                                                    )}
                                                />
                                            ) : (
                                                <div className="w-full text-center p-4">
                                                    Không có chương nào
                                                </div>
                                            )}
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Comment
                    dataComment={rootComments}
                    dataReply={replies}
                    LIMIT_COMMENT={LIMIT_COMMENT}
                    LIMIT_REPLIES={LIMIT_REPLIES}
                />
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
            </div>

        </div>
    )
}

export default CardDetail