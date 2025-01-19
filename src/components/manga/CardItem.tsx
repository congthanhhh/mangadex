import { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import PaginationManga from "../pagination/PaginationManga";
const { Meta } = Card;
interface IManga {
    id: number;
    title: string;
}

const CardItem = () => {
    const [manga, setManga] = useState<IManga[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const pageSize = 12;

    const fetchManga = async (page: number, pageSize: number) => {
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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchManga(currentPage, pageSize);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Row gutter={12}>
                {manga.map((item) => (
                    <Col xs={12} sm={8} md={6} lg={4} key={item.id} >
                        <div className="pt-3">
                            <Card
                                loading={loading}
                                hoverable
                                cover={<img alt="example" src="https://preview.redd.it/nano-machine-will-cheon-won-still-use-nano-after-become-v0-xkhr9w5isapc1.jpeg?auto=webp&s=9dbb42d6330b79a8ca1276aac4b9726d0d2bc78a" />}
                            >
                                <Meta title={item.title} description="www.instagram.com" />
                            </Card>
                        </div>
                    </Col>
                ))}

            </Row>

            <PaginationManga
                totalPages={totalPages}
                postsPerPage={pageSize}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default CardItem;
