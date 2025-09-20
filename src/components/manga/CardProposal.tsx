import { useEffect, useState } from 'react';
import PaginationManga from '../pagination/PaginationManga';
import CardItem from './CardItem';
import { Button, Tabs } from 'antd';

import type { TabsProps } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMangaNew, fetchMangaViewCount } from '../../store/slice/mangaSlice';
const CardProposal = () => {
    const dispatch = useAppDispatch();
    const [totalPages1, setTotalPages1] = useState(0);
    const [totalPages2, setTotalPages2] = useState(0);
    const [currentPage1, setCurrentPage1] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [activeButton, setActiveButton] = useState(1);
    const pageSize = 6;
    const { mangaListNew, loading, mangaListByViewCount, loadingViewCount } = useAppSelector(state => state.manga);


    useEffect(() => {
        dispatch(fetchMangaNew({ page: currentPage1, pageSize }))
            .unwrap()
            .then(response => {
                setTotalPages1(response.result.totalPages);
            })
            .catch(error => {
                console.error("Error fetching new manga:", error);
            });
        dispatch(fetchMangaViewCount({ page: currentPage2, pageSize }))
            .unwrap()
            .then(response => {
                setTotalPages2(response.result.totalPages);
            })
            .catch(error => {
                console.error("Error fetching manga by view count:", error);
            });
    }, [currentPage1, currentPage2, dispatch, pageSize])
    const handlePageChangeNew = (page: number) => {
        setCurrentPage1(page);
    }
    const handlePageChangeBest = (page: number) => {
        setCurrentPage2(page);
    }




    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: 'tab1',
            label: (
                <>
                    <Button onClick={() => setActiveButton(1)}
                        className={`${activeButton === 1 ? 'text-red-500' : ''} uppercase text-sm h-9 min-w-16 px-4 pt-1`}
                        color='default' variant='text'>Tât cả</Button>
                </>
            ),
            children: (
                <>
                    <CardItem manga={mangaListByViewCount || []} loading={loadingViewCount} />
                    <div className="my-2 w-full pr-3">
                        <div className="flex items-center">
                            <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
                            <PaginationManga
                                totalPages={totalPages2}
                                postsPerPage={pageSize}
                                currentPage={currentPage2}
                                handlePageChange={handlePageChangeBest}
                            />
                        </div>
                    </div>
                </>
            ),
        },
        {
            key: 'tab2',
            label: (
                <>
                    <Button onClick={() => setActiveButton(2)}
                        className={`${activeButton === 2 ? 'text-red-500' : ''} uppercase text-sm h-9 min-w-16 px-4 pt-1`}
                        color='default' variant='text'>Truyện hay</Button>
                </>
            ),
            children: (
                <>
                    <CardItem manga={mangaListNew || []} loading={loading} />
                    <div className="my-2 w-full pr-3">
                        <div className="flex items-center">
                            <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
                            <PaginationManga
                                totalPages={totalPages1}
                                postsPerPage={pageSize}
                                currentPage={currentPage1}
                                handlePageChange={handlePageChangeNew}
                            />
                        </div>
                    </div>
                </>
            ),
        },
    ];

    return (
        <div>
            <div className='mt-3'>
                <div className='flex flex-col'>
                    <div className='capitalize font-medium text-xl px-4'>
                        Truyện đề xuất
                    </div>
                    <div className='pr-3 flex items-center pl-3'>
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                        <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default CardProposal