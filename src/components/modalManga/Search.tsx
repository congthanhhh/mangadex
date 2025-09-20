import { Modal, Input, Row, Col, Tooltip } from "antd";
import { useState, useCallback } from "react";
import { assets } from '../../assets/assets';
import { EyeOutlined } from "@ant-design/icons";
import { searchMangaAPI } from "../../services/mangaService";
import { Manga } from "../../types/mangaTypes";

interface ModelSearchProps {
    isOpenSearch: boolean;
    handleCancel: () => void;
}
const Search = (props: ModelSearchProps) => {
    const { isOpenSearch, handleCancel } = props;
    const [search, setSearch] = useState('');
    const [result, setResult] = useState<Manga[]>([]);
    const [loading, setLoading] = useState(false);

    // Debounce function
    const debounce = useCallback((func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    }, []);

    const mangaData = async (value: string) => {
        if (value.trim() === '') {
            setResult([]);
            return;
        }

        setLoading(true);
        try {
            const response = await searchMangaAPI(value);
            setResult(response.result || []);
        } catch (error) {
            console.error("Error searching manga:", error);
            setResult([]);
        } finally {
            setLoading(false);
        }
    }

    const debouncedSearch = useCallback(debounce(mangaData, 500), [debounce]);

    const handleSearch: React.ComponentProps<"input">["onChange"] = (e) => {
        let value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    }
    return (
        <>
            <Modal style={{ top: 68 }}
                width={{
                    xs: '80%',
                    sm: '50%',
                    md: '40%',
                    lg: '30%',
                    xl: '30%',
                    xxl: '30%',
                }}
                open={isOpenSearch} onCancel={handleCancel} footer={null}>
                <div>
                    <div className="border-b-2 w-11/12 mb-1">
                        <Input
                            onChange={handleSearch}
                            placeholder="Nhập từ khóa"
                            className="w-[95%]" variant="borderless" />
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                        {loading ? (
                            <div className="text-center py-4">Đang tìm kiếm...</div>
                        ) : result.length > 0 ? (
                            result.map((item) => (
                                <Row key={item.id} className="my-2 cursor-pointer pr-4 hover:shadow-md">
                                    <Col xs={5} sm={5} md={5}>
                                        <a>
                                            <img src={item.imageUrl || assets.mangaImg} className="h-fit w-full object-cover" alt={item.title} />
                                        </a>
                                    </Col>
                                    <Col xs={19} sm={19} md={19} className="pl-1 capitalize relative">
                                        <Tooltip title={item.title} arrow={false}>
                                            <a className="absolute top-0 line-clamp-2 font-medium leading-4 text-slate-600" href="">{item.title}</a>
                                        </Tooltip>
                                        <div className="absolute -top-2/3 text-slate-600 font-sans">
                                            <EyeOutlined /> {item.viewCount || 0} view
                                        </div>
                                        <div className="font-medium text-slate-500 absolute bottom-0">
                                            <a href="">{item.totalChapters || 0} chương</a>
                                        </div>
                                    </Col>
                                </Row>
                            ))
                        ) : search.trim() !== '' ? (
                            <div className="text-center py-4">Không tìm thấy kết quả nào.</div>
                        ) : null}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Search