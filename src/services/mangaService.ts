import axiosInstance from "../utils/axiosInstance"

export const getMangaList = async (page: number, pageSize: number) => {
    const response = await axiosInstance.get('/posts', {
        params: {
            _page: page,
            _pageSize: pageSize,
        },
    });
    const total = response.headers['x-total-count'];
    return {
        data: response.data, total: Number(total),
    };
}