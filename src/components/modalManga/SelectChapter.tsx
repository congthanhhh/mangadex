import { Modal, Input, Row, Col, Button } from "antd";
import { useEffect, useState } from "react";
import { assets } from '../../assets/assets';
import { EyeOutlined } from "@ant-design/icons";
interface IChapter {
    id: number;
}
interface ModelSelectChapProps {
    isOpenChapter: boolean;
    handleCancel: () => void;
}
const SelectChapter = (props: ModelSelectChapProps) => {
    const { isOpenChapter, handleCancel } = props;
    const [search, setSearch] = useState('');
    const [result, setResult] = useState<IChapter[]>([])

    const mangaData = async (value: string) => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
            const data: IChapter[] = await res.json();
            const searchResult = data
                .filter((manga) => manga && manga.id.toString().includes(value));
            if (!value) {
                setResult(data);
            } else {
                setResult(searchResult)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const fetchChapter = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
        const data: IChapter[] = await res.json();
        setResult(data)
    }
    useEffect(() => {
        fetchChapter()
    }, [])

    const handleSearch: React.ComponentProps<"input">["onChange"] = (e) => {
        let value = e.target.value;
        setSearch(value);
        mangaData(value);
    }
    return (
        <>
            <Modal style={{ top: 60 }}
                width={{
                    xs: '85%',
                    sm: '65%',
                    md: '55%',
                    lg: '45%',
                    xl: '35%',
                }}
                open={isOpenChapter} onCancel={handleCancel} footer={null}>
                <div>
                    <div className="border-b-2 w-11/12 mb-1">
                        <Input
                            onChange={handleSearch}
                            placeholder="Tìm kiếm chapter"
                            className="w-[95%]" variant="borderless" />
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        <Row className="" >
                            {result.map((item) => (
                                <Col xs={6} sm={6} md={6} lg={6} xl={6} key={item.id}>
                                    <div className="p-1">
                                        <Button className="text-base w-full">
                                            {item.id}
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SelectChapter