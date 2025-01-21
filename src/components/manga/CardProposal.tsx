import { useEffect, useState } from 'react';
import PaginationManga from '../pagination/PaginationManga';
import CardItem from './CardItem';
import { Button, Tabs } from 'antd';
interface IManga {
    title: string;
    body: string;
}
const CardProposal = () => {
    const [manga, setManga] = useState<IManga[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const pageSize = 10;
    const fetchProposal = async (page: number, pageSize: number) => {
        setLoading(true);
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`);
            const data = await res.json();
            const total = res.headers.get("X-Total-Count");
            setManga(data);
            setTotalPages(Number(total));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProposal(currentPage, pageSize);
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }
    return (
        <div className='mt-3'>
            <div className='flex flex-col'>
                <div className='capitalize font-medium text-xl px-4'>
                    Truyện đề xuất
                </div>
                <div className='pr-3 flex items-center pl-3'>
                    <Button className='uppercase text-sm h-9 min-w-16 px-4 pt-1' color='danger' variant='text'>Tât cả</Button>
                    <Button className='uppercase text-sm h-9 min-w-16 px-4 pt-1' color='default' variant='text'>Truyện hay</Button>
                    <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
                </div>
            </div>
            <CardItem manga={manga} loading={loading} />
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
        </div>
    )
}

export default CardProposal