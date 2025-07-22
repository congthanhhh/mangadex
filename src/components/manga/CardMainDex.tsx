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
import { fetchLatestManga } from "../../store/slice/mangadexSlice";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getCoverImageUrl } from "../../services/mangadexService";

const CardMainDex = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const pageSize = 30;
    const maxPages = 100;

    const [currentPage, setCurrentPage] = useState(1);

    const { manga, loading, pagination } = useAppSelector(state => state.mangadex);
    const { chaptersByMangaId } = useAppSelector(state => state.chapter);

    useEffect(() => {
        dispatch(fetchLatestManga({ page: currentPage, limit: pageSize }))
            .unwrap()
            .catch(error => {
                console.error("Error fetching mangadex manga:", error);
            });
    }, [dispatch, currentPage, pageSize]);

    // Lấy cover image URL từ relationships
    const getCoverUrl = (mangaItem: any) => {
        const coverRelation = mangaItem.relationships?.find(
            (rel: any) => rel.type === "cover_art"
        );
        if (coverRelation?.attributes?.fileName) {
            return getCoverImageUrl(mangaItem.id, coverRelation.attributes.fileName);
        }
        return assets.mangaImg2;
    };

    // Lấy title theo ngôn ngữ
    const getTitle = (mangaItem: any) => {
        const title = mangaItem.attributes?.title;
        return title?.en || title?.['ja-ro'] || title?.ja || Object.values(title || {})[0] || "Không có tên";
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.min(Math.ceil(pagination.total / pageSize), maxPages);

    return (
        <>
            <CarouselItem />
            <div className='pr-3 flex items-center'>
                <div className='uppercase h-9 min-w-16 px-4 pt-1 text-xl font-medium'>Truyện mới</div>
                <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
            </div>
            <Row gutter={10}>
                {manga.map((item) => (
                    <Col xs={12} sm={8} md={6} lg={4} key={item.id} >
                        <div className="pt-3 ">
                            <div className="">
                                <Card loading={loading} hoverable size="small"
                                    cover={
                                        <div onClick={() => navigate(`/truyen/${item.id}`)} className="relative">
                                            <img className="h-[250px] w-full rounded-t-lg" src={getCoverUrl(item)} />
                                            <div className="absolute bottom-0 w-full h-5">
                                                <span className="w-auto font-medium px-[2px] text-xs font-sans h-full text-white flex items-center bg-black opacity-50 rounded-b-sm">
                                                    <EyeFilled className="mx-2 fill-white" style={{ fontSize: '15px' }} />
                                                    0
                                                    <UsergroupAddOutlined className="mx-2 fill-white" style={{ fontSize: '15px' }} />
                                                    0
                                                </span>
                                            </div>
                                        </div>
                                    }>
                                    <Card.Meta
                                        style={{
                                            lineHeight: '16px',
                                        }}
                                        title={
                                            <Tooltip title={getTitle(item)} arrow={false}>
                                                <a onClick={() => navigate(`/truyen/${item.id}`)} className="h-8 text-wrap line-clamp-2 hover:text-red-700">
                                                    <span>{getTitle(item)}</span>
                                                </a>
                                            </Tooltip>
                                        } description={
                                            <div className="relative">
                                                <div className="absolute bg-gray-400 opacity-50 w-[1px] h-full left-[10px] bottom-0"></div>
                                                {chaptersByMangaId[item.id]?.map((chap) => (
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
                        totalPages={totalPages}
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

export default CardMainDex;
