import axiosInstance from "../utils/axiosInstance"

export const getMangaListAPI = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get('/manga/paginated', {
        params: {
            page: page,
            pageSize: pageSize,
        },
    });
    const total = response.data.result.totalPages;
    return {
        data: response.data.result.content, total: Number(total),
    };
}