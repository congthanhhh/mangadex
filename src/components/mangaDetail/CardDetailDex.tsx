import { Button, Col, Rate, Row, Tag, Input } from "antd"
import { useEffect, useState } from "react"
import { format, parseISO } from 'date-fns';
import { UsergroupAddOutlined, StarFilled, EyeFilled, HeartFilled, BellFilled, TagOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ShowMoreLess from "./ShowMoreLess";
import Comment from "./Comment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMangaChaptersDex } from "../../store/slice/chapterdexSlice";
import { fetchMangaById } from "../../store/slice/mangadexSlice";
import { fetchRootComments, fetchAllRepliesForComments, clearComments } from "../../store/slice/commentSlice";
import { getCoverImageUrl } from "../../services/mangadexService";


const CardDetail = () => {
    const [chapterInput, setChapterInput] = useState("");
    const LIMIT_MANGA = 21;
    const LIMIT_COMMENT = 10;
    const LIMIT_REPLIES = 2;
    const navigate = useNavigate();

    const { cid } = useParams(); // comicId

    const dispatch = useAppDispatch();
    const { chapters, loading, error } = useAppSelector(state => state.chapterdex);
    const { currentManga } = useAppSelector(state => state.mangadex);
    const { rootComments, replies, loading: commentLoading, error: commentError } = useAppSelector(state => state.comment);

    // Helper functions for manga data
    const getMangaCoverImage = () => {
        if (!currentManga) return '/placeholder-manga.jpg';
        const coverArt = currentManga.relationships?.find(rel => rel.type === 'cover_art');
        if (coverArt?.attributes?.fileName) {
            return getCoverImageUrl(currentManga.id, coverArt.attributes.fileName, '512');
        }
        return '/placeholder-manga.jpg';
    };

    const getMangaTitle = () => {
        if (!currentManga?.attributes?.title) return 'Loading...';
        return currentManga.attributes.title.en ||
            currentManga.attributes.title.ja ||
            currentManga.attributes.title['ja-ro'] ||
            Object.values(currentManga.attributes.title)[0] || 'Unknown Title';
    };

    const getMangaDescription = () => {
        if (!currentManga?.attributes?.description) return 'No description available';
        return currentManga.attributes.description.en ||
            currentManga.attributes.description.ja ||
            Object.values(currentManga.attributes.description)[0] || 'No description available';
    };

    const getMangaTags = () => {
        return currentManga?.attributes?.tags || [];
    };

    const getMangaStatus = () => {
        return currentManga?.attributes?.status || 'Unknown';
    };

    const getMangaYear = () => {
        return currentManga?.attributes?.year || 'Unknown';
    };

    const getMangaAuthors = () => {
        if (!currentManga?.relationships) return [];
        return currentManga.relationships.filter(rel => rel.type === 'author' || rel.type === 'artist');
    };

    const getAuthorNames = () => {
        const authors = getMangaAuthors().filter(rel => rel.type === 'author');
        if (authors.length === 0) return 'Updating';

        // Debug: log the author data to see structure
        console.log('Author data:', authors);

        return authors.map(author => {
            // Trong MangaDx API, thông tin author được include trong attributes
            // Tạm thời sử dụng any để bypass TypeScript limitation
            const authorAttributes = author.attributes as any;

            // Thử các cách truy cập khác nhau
            let authorName = 'Unknown Author';

            if (authorAttributes) {
                authorName = authorAttributes.name ||
                    authorAttributes.username ||
                    authorAttributes.title ||
                    author.id;
            } else {
                authorName = author.id;
            }

            return authorName;
        }).join(', ');
    };

    const getArtistNames = () => {
        const artists = getMangaAuthors().filter(rel => rel.type === 'artist');
        if (artists.length === 0) return 'Updating';

        // Debug: log the artist data to see structure
        console.log('Artist data:', artists);

        return artists.map(artist => {
            // Trong MangaDx API, thông tin artist được include trong attributes
            // Tạm thời sử dụng any để bypass TypeScript limitation
            const artistAttributes = artist.attributes as any;

            // Thử các cách truy cập khác nhau
            let artistName = 'Unknown Artist';

            if (artistAttributes) {
                artistName = artistAttributes.name ||
                    artistAttributes.username ||
                    artistAttributes.title ||
                    artist.id;
            } else {
                artistName = artist.id;
            }

            return artistName;
        }).join(', ');
    };

    const fetchComment = async () => {
        if (!cid) return;

        try {
            const resultAction = await dispatch(fetchRootComments(cid));

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

        // Find the chapter with the matching chapter number from MangaDx API
        const chapter = chapters.find(ch => parseInt(ch.attributes?.chapter || "0") === chapterNumber);
        if (chapter) {
            navigate(`/chapter/${chapter.id}/chapter-number/${chapter.attributes?.chapter || chapterNumber}`);
        } else {
            console.log(`Chapter ${chapterNumber} not found`);
        }
    };

    const handleReadFromBeginning = () => {
        if (!chapters || chapters.length === 0) return;

        // Sort chapters by chapter number to find the first one
        const sortedChapters = [...chapters].sort((a, b) =>
            parseFloat(a.attributes?.chapter || "0") - parseFloat(b.attributes?.chapter || "0")
        );
        const firstChapter = sortedChapters[0];

        if (firstChapter) {
            navigate(`/chapter/${firstChapter.id}/chapter-number/${firstChapter.attributes?.chapter || "1"}`);
        } else {
            console.log("No chapters available");
        }
    };

    useEffect(() => {
        if (cid) {
            // Clear previous comments when manga changes
            dispatch(clearComments());
            dispatch(fetchMangaChaptersDex({ mangaId: cid, limit: 100, offset: 0 }));
            dispatch(fetchMangaById(cid));
            fetchComment();
        }
    }, [cid, dispatch]);


    return (
        <div>
            <div>
            </div>
            {!currentManga ? (
                <div className="w-full text-center p-8">
                    <div className="text-xl">Đang tải thông tin manga...</div>
                </div>
            ) : (
                <div className="w-full mb-2">
                    <Row>
                        <Col lg={7} xs={24} className="p-3">
                            <div>
                                <div className="flex items-center">
                                    <div className="w-full mx-auto h-[450px] min-w-[275px] max-w-[295px] rounded-md">
                                        <img className="w-full h-full rounded-md object-cover"
                                            src={getMangaCoverImage()}
                                            alt={getMangaTitle()} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-around mx-auto mt-5 max-w-[345px] min-w-[300]">
                                <div className="rounded-lg flex items-center flex-col justify-center bg-neutral-200 h-16">
                                    <span className="w-16 inline-flex items-center justify-center text-2xl">
                                        <StarFilled className="" />
                                    </span>
                                    <div className="text-xs tracking-wider font-medium">{currentManga?.attributes?.contentRating || 'N/A'}</div>
                                </div>
                                <div className="rounded-lg flex items-center flex-col justify-center bg-neutral-200 h-16">
                                    <span className="w-16 inline-flex items-center justify-center text-2xl">
                                        <EyeFilled />
                                    </span>
                                    <div className="text-xs tracking-wider font-medium">{chapters?.length || 0} Ch</div>
                                </div>
                                <div className="rounded-lg flex items-center flex-col justify-center bg-neutral-200 h-16">
                                    <span className="w-16 inline-flex items-center justify-center text-2xl">
                                        <UsergroupAddOutlined />
                                    </span>
                                    <div className="text-xs tracking-wider font-medium">{getMangaTags().length} Tags</div>
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
                                        <div className="capitalize text-2xl leading-6 font-bold px-4 pt-4">{getMangaTitle()}</div>
                                        <div className='px-4 py-2 flex flex-wrap'>
                                            {getMangaTags().map((tag: any) => (
                                                <Tag icon={<TagOutlined />} key={tag.id} className='mt-1 bg-slate-300 hover:opacity-50 rounded-xl text-xs h-6 font-medium flex items-center'>
                                                    <a href="#">{tag.attributes?.name?.en || 'Unknown'}</a>
                                                </Tag>))}
                                        </div>
                                        <div className="line-clamp-3 px-4 text-sm">
                                            {getMangaDescription()}
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
                                                    Tác giả: <span className="text-green-700 pl-2">
                                                        {getAuthorNames()}
                                                    </span>
                                                </div>
                                                <div className="text-sm mb-1 font-normal uppercase">
                                                    Trạng Thái: <span className="text-green-700 pl-2">{getMangaStatus()}</span>
                                                </div>
                                                <div className="text-sm mb-1 font-normal uppercase">
                                                    Studio: <span className="text-green-700 pl-2">{getArtistNames()}</span>
                                                </div>
                                                <div className="text-sm mb-1 font-normal uppercase">
                                                    Năm phát hành: <span className="text-green-700 pl-2">{getMangaYear()}</span>
                                                </div>
                                                <div className="text-sm mb-1 font-normal">
                                                    <div className="border border-sky-500 rounded-md mt-1 bg-[#1f53794d]">
                                                        <p className="ml-1">LỊCH RA CHƯƠNG MỚI: UPDATING...</p>
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
                                                        data={[...chapters].sort((a, b) =>
                                                            parseFloat(b.attributes?.chapter || "0") - parseFloat(a.attributes?.chapter || "0")
                                                        )}
                                                        initialVisible={LIMIT_MANGA}
                                                        className="pt-2 w-full"
                                                        buttonClassName="w-full h-11 rounded-md text-sm px-4 border-2"
                                                        renderItem={(item) => (
                                                            <Col lg={8} md={8} sm={12} xs={24} key={item.id} className="p-2 py-1 cursor-pointer">
                                                                <a onClick={() => navigate(`/chapter/${item.id}/chapter-number/${item.attributes?.chapter || '1'}`, { state: { cid: cid } })}
                                                                    className="w-full flex items-center bg-neutral-300 p-1 rounded hover:opacity-65 hover:text-slate-500">
                                                                    <div className=" flex items-center rounded-md bg-red-300 w-12 h-14 justify-center">
                                                                        <EyeTwoTone twoToneColor='#f33' className="text-base" />
                                                                    </div>
                                                                    <div className="flex justify-center flex-col py-1 px-2 w-full">
                                                                        <div className="text-base font-normal">
                                                                            <span>#{item.attributes?.chapter || 'N/A'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between text-xs text-slate-500 font-sans">
                                                                            <div>
                                                                                <span>{item.attributes?.publishAt
                                                                                    ? format(parseISO(item.attributes.publishAt), 'MM-dd-yyyy')
                                                                                    : 'Unknown'}</span>
                                                                            </div>
                                                                            <div>
                                                                                <EyeFilled />
                                                                                <span className="pl-1">0</span>
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
                        comicId={cid || ""}
                        chapterId={undefined}
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
            )}
        </div>
    )
}

export default CardDetail