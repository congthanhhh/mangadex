import CardItem from "./CardItem"
import { useEffect } from 'react';
import PaginationManga from '../pagination/PaginationManga';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMangaNew, setCurrentPage } from "../../store/slice/mangaSlice";


const CardNew = () => {
    const dispatch = useAppDispatch()
    const pageSize = 4;
    // Get manga state from Redux store
    const { mangaList, totalPages, currentPage, loading } = useAppSelector(state => state.manga);

    useEffect(() => {
        dispatch(fetchMangaNew({ page: currentPage, pageSize }));
    }, [currentPage])

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    }
    return (
        <div className="mt-3">
            <div className='pr-3 flex items-center'>
                <div className='uppercase h-9 min-w-16 px-4 pt-1 text-xl font-medium'>Truyện mới</div>
                <hr className="block flex-1 border border-gray-30 border-opacity-30 border-solid transition max-w-full" />
            </div>
            <CardItem manga={mangaList} loading={loading} />
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

export default CardNew