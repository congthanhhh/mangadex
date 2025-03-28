import { useEffect } from "react";
import { Card, Col, Row, Tooltip } from "antd";
import PaginationManga from "../pagination/PaginationManga";
import { CodepenCircleOutlined, EyeFilled, UsergroupAddOutlined } from "@ant-design/icons";
import { assets } from '../../assets/assets';
import CardNew from "./CardNew";
import CardProposal from "./CardProposal";
import CarouselItem from "./CarouselItem";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchManga, setCurrentPage } from "../../store/slice/mangaSlice";

const CardMain = () => {
    // const [manga, setManga] = useState<IManga[]>([]);
    // const [totalPages, setTotalPages] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [loading, setLoading] = useState(false);
    // const pageSize = 30;
    // const fetchManga = async (page: number, pageSize: number) => {
    //     setLoading(true);
    //     try {
    //         const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`);
    //         const data = await res.json();
    //         const total = res.headers.get("X-Total-Count");
    //         setManga(data);
    //         setTotalPages(Number(total));
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const navigate = useNavigate();
    const pageSize = 10;
    const dispatch = useAppDispatch();
    const { mangaList, totalPages, currentPage, loading } = useAppSelector((state) => state.manga);

    useEffect(() => {
        dispatch(fetchManga({ page: currentPage, pageSize: pageSize }));
    }, [currentPage, dispatch]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <>
            <CarouselItem />
            <div className='pr-3 flex items-center'>
                <div className='uppercase h-9 min-w-16 px-4 pt-1 text-xl font-medium'>Truyện mới</div>
                <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
            </div>
            <Row gutter={10}>
                {mangaList.map((item) => (
                    <Col xs={12} sm={8} md={6} lg={4} key={item.id} >
                        <div className="pt-3 ">
                            <div className="">
                                <Card loading={loading} hoverable size="small"
                                    cover={
                                        <div onClick={() => navigate(`/truyen/${item.title}`)} className="relative">
                                            <img className="h-[250px] w-full rounded-t-lg" src={assets.mangaImg2} />
                                            <div className="absolute bottom-0 w-full h-5">
                                                <span className="w-auto font-medium px-[2px] text-xs font-sans h-full text-white flex items-center bg-black opacity-50 rounded-b-sm">
                                                    <EyeFilled className="mx-2 fill-white" style={{ fontSize: '15px' }} />
                                                    1,280,000
                                                    <UsergroupAddOutlined className="mx-2 fill-white" style={{ fontSize: '15px' }} />
                                                    1,180
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
                                                <a onClick={() => navigate(`/truyen/${item.id}`)} className="h-8 text-wrap line-clamp-2 hover:text-red-700">
                                                    <span>{item.title}</span>
                                                </a>
                                            </Tooltip>
                                        }
                                        description={
                                            <div className="relative">
                                                <div className="absolute bg-gray-400 opacity-50 w-[1px] h-full left-[10px] bottom-0"></div>
                                                <a className="text-sm text-gray-500 flex items-center hover:text-red-700 hover:fill-red-700">
                                                    <div className="z-[1]"><CodepenCircleOutlined style={{ fontSize: '20px' }} /></div>
                                                    <div className="flex flex-col pl-3 pb-2">
                                                        <span className="text-sm font-medium">21</span>
                                                        <span className="text-xs">1 giờ trước</span>
                                                    </div>
                                                </a>
                                                <a className="text-sm text-gray-500 flex items-center hover:text-red-700">
                                                    <div className="z-[1]"><CodepenCircleOutlined style={{ fontSize: '20px' }} /></div>
                                                    <div className="flex flex-col pl-3 pb-2">
                                                        <span className="text-sm font-medium">20</span>
                                                        <span className="text-xs">2 giờ trước</span>
                                                    </div>
                                                </a>

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

export default CardMain;
