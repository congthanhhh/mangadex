import { useEffect, useState } from "react";
import { Card, Col, Row, Tooltip } from "antd";
import PaginationManga from "../pagination/PaginationManga";
import { CodepenCircleOutlined, EyeFilled, UsergroupAddOutlined } from "@ant-design/icons";
import { assets } from '../../assets/assets';
import CardNew from "./CardNew";
import CardProposal from "./CardProposal";
import CarouselItem from "./CarouselItem";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTopManga } from "../../store/slice/jikanSlice";
import { fetchTop2ChaptersByMangaId } from "../../store/slice/chapterSlice";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const CardMain2 = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const pageSize = 24;
    const maxPages = 200;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesJikan, setTotalPagesJikan] = useState(0);

    const { topMangaList, loading } = useAppSelector(state => state.jikan);
    const { mangaList } = useAppSelector(state => state.manga);
    const { chaptersByMangaId } = useAppSelector(state => state.chapter);

    const displayedManga = topMangaList;

    useEffect(() => {
        dispatch(fetchTopManga({ page: currentPage, pageSize: pageSize }))
            .unwrap()
            .then(response => {
                const apiTotalPages = response.pagination?.last_visible_page || 1;
                setTotalPagesJikan(Math.min(apiTotalPages, maxPages));
            })
            .catch(error => {
                console.error("Error fetching jikan manga:", error);
            });
    }, [dispatch, currentPage, pageSize]);

    useEffect(() => {
        if (mangaList.length > 0) {
            mangaList.forEach(manga => {
                dispatch(fetchTop2ChaptersByMangaId(manga.id));
            });
        }
    }, [mangaList, dispatch]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <CarouselItem />
            <div className='pr-3 flex items-center'>
                <div className='uppercase h-9 min-w-16 px-4 pt-1 text-xl font-medium'>Truyện mới</div>
                <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
            </div>
            <Row gutter={10}>
                {displayedManga.map((item) => (
                    <Col xs={12} sm={8} md={6} lg={4} key={item.mal_id} >
                        <div className="pt-3 ">
                            <div className="">
                                <Card loading={loading} hoverable size="small"
                                    cover={
                                        <div onClick={() => navigate(`/truyen/${item.mal_id}`)} className="relative">
                                            <img className="h-[250px] w-full rounded-t-lg" src={item.images.webp.image_url || assets.mangaImg2} />
                                            <div className="absolute bottom-0 w-full h-5">
                                                <span className="w-auto font-medium px-[2px] text-xs font-sans h-full text-white flex items-center bg-black opacity-50 rounded-b-sm">
                                                    <EyeFilled className="mx-2 fill-white" style={{ fontSize: '15px' }} />
                                                    {item.scored_by || 0}
                                                    <UsergroupAddOutlined className="mx-2 fill-white" style={{ fontSize: '15px' }} />
                                                    {item.members || 0}
                                                </span>
                                            </div>
                                        </div>
                                    }>
                                    <Card.Meta
                                        style={{
                                            lineHeight: '16px',
                                        }}
                                        title={
                                            <Tooltip title={item.title} arrow={false}>
                                                <a onClick={() => navigate(`/truyen/${item.title}`)} className="h-8 text-wrap line-clamp-2 hover:text-red-700">
                                                    <span>{item.title}</span>
                                                </a>
                                            </Tooltip>
                                        } description={
                                            <div className="relative">
                                                <div className="absolute bg-gray-400 opacity-50 w-[1px] h-full left-[10px] bottom-0"></div>
                                                {chaptersByMangaId[item.mal_id]?.map((chap) => (
                                                    <a key={chap.id} className="text-sm text-gray-500 flex items-center hover:text-red-700 hover:fill-red-700">
                                                        <div className="z-[1]"><CodepenCircleOutlined style={{ fontSize: '20px' }} /></div>
                                                        <div className="flex flex-col pl-3 pb-2">
                                                            <span className="text-sm font-medium">{chap.chapterNumber}</span>
                                                            <span className="text-xs">
                                                                {chap.releaseDate
                                                                    ? formatDistanceToNow(new Date(chap.releaseDate), { addSuffix: true, locale: vi })
                                                                    : "N/A"}
                                                            </span>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        } />
                                </Card>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <div className="my-2 w-full pr-3">
                <div className="flex items-center">
                    <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
                    <PaginationManga
                        totalPages={totalPagesJikan}
                        postsPerPage={pageSize}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>

            <CardProposal />
            <CardNew />
        </>
    );
};

export default CardMain2;
