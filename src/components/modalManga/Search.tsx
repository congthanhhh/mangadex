import { Modal, Input, Row, Col, Tooltip } from "antd";
import { useState } from "react";
import { assets } from '../../assets/assets';
import { EyeOutlined } from "@ant-design/icons";
interface IManga {
    id: number;
    title: string;
}
interface ModelSearchProps {
    isOpenSearch: boolean;
    handleCancel: () => void;
}
const Search = (props: ModelSearchProps) => {
    const { isOpenSearch, handleCancel } = props;
    const [search, setSearch] = useState('');
    const [result, setResult] = useState<IManga[]>([])

    const mangaData = async (value: string) => {
        if (value.trim() === '') {
            setResult([]);
            return;
        }
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data: IManga[] = await res.json();
            const searchResult = data
                .filter((manga) => manga && manga.title && manga.title.toLowerCase().includes(value.toLowerCase()))
            // .slice(0, 10);
            setResult(searchResult);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleSearch: React.ComponentProps<"input">["onChange"] = (e) => {
        let value = e.target.value;
        setSearch(value);
        mangaData(value);
    }
    return (
        <>
            <Modal style={{ top: 68 }}
                width={{
                    xs: '60%',
                    sm: '50%',
                    md: '40%',
                    lg: '30%',
                    xl: '25%',
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
                        {result.length > 0 ? (result.map((item) => (
                            <Row key={item.id} className="my-2 cursor-pointer mr-1 hover:shadow-md">
                                <Col span={5}>
                                    <a>
                                        <img src={assets.mangaImg} className="" />
                                    </a>
                                </Col>
                                <Col span={19} className="pl-1 capitalize relative">
                                    <Tooltip title={item.title} arrow={false}>
                                        <a className="line-clamp-2 font-medium leading-4 text-slate-600" href="">{item.title}</a>
                                    </Tooltip>
                                    <div className="text-slate-600 font-sans mt-2"> <EyeOutlined /> 2000 view</div>
                                    <div className="font-medium  text-slate-500 absolute bottom-0"><a href="">chuong 50</a></div>
                                </Col>
                            </Row>
                        ))) : (<div>No results found.</div>)
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Search