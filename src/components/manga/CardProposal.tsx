import { useEffect, useState } from 'react';
import PaginationManga from '../pagination/PaginationManga';
import CardItem from './CardItem';
import { Button, Tabs } from 'antd';
interface IManga {
    title: string;
    body: string;
}
import type { TabsProps } from 'antd';
const CardProposal = () => {
    const [mangaNew, setMangaNew] = useState<IManga[]>([]);
    const [mangaBest, setMangaBest] = useState<IManga[]>([]);
    const [totalPagesNew, setTotalPagesNew] = useState(0);
    const [totalPagesBest, setTotalPagesBest] = useState(0);
    const [currentPageNew, setCurrentPageNew] = useState(1);
    const [currentPageBest, setCurrentPageBest] = useState(1);
    const [loadingNew, setLoadingNew] = useState(false);
    const [loadingBest, setLoadingBest] = useState(false);
    const [activeButton, setActiveButton] = useState(1);
    const pageSize = 10;
    const fetchProposalNew = async (page: number, pageSize: number) => {
        setLoadingNew(true);
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`);
            const data = await res.json();
            const total = res.headers.get("X-Total-Count");
            setMangaNew(data);
            setTotalPagesNew(Number(total));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingNew(false)
        }
    }
    const handlePageChangeNew = (page: number) => {
        setCurrentPageNew(page);
    }
    const fetchProposalBest = async (page: number, pageSize: number) => {
        setLoadingBest(true);
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`);
            const data = await res.json();
            const total = res.headers.get("X-Total-Count");
            setMangaBest(data);
            setTotalPagesBest(Number(total));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingBest(false)
        }
    }
    const handlePageChangeBest = (page: number) => {
        setCurrentPageBest(page);
    }
    useEffect(() => {
        fetchProposalNew(currentPageNew, pageSize);
        fetchProposalBest(currentPageBest, pageSize);
    }, [currentPageNew, currentPageBest])




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
                    <CardItem manga={mangaNew} loading={loadingNew} />
                    <div className="my-2 w-full pr-3">
                        <div className="flex items-center">
                            <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
                            <PaginationManga
                                totalPages={totalPagesNew}
                                postsPerPage={pageSize}
                                currentPage={currentPageNew}
                                handlePageChange={handlePageChangeNew}
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
                    <CardItem manga={mangaBest} loading={loadingBest} />
                    <div className="my-2 w-full pr-3">
                        <div className="flex items-center">
                            <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
                            <PaginationManga
                                totalPages={totalPagesBest}
                                postsPerPage={pageSize}
                                currentPage={currentPageBest}
                                handlePageChange={handlePageChangeBest}
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