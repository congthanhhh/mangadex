import { Button, Col, Rate, Row } from "antd"
import { useState } from "react"
import { UsergroupAddOutlined, StarFilled, EyeFilled, HeartFilled, BellFilled } from "@ant-design/icons";
import { assets } from '../../assets/assets';

const CardDetail = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div>
            <div className="w-full mb-5">
                <Row>
                    <Col lg={7} md={12} className="p-3">
                        <div>
                            <div className="flex items-center">
                                <div className="w-full mx-auto h-[450px] min-w-[275px] max-w-[295px] rounded-md">
                                    <img className="w-full h-full rounded-md" src={assets.mangaImg2} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around mx-auto mt-5 max-w-[345px] min-w-[300]">
                            <div className="rounded-lg flex items-center flex-col justify-center bg-neutral-200 h-16">
                                <span className="w-16 inline-flex items-center justify-center text-2xl">
                                    <StarFilled className="" />
                                </span>
                                <div className="text-xs tracking-wider font-medium">106</div>
                            </div>
                            <div className="rounded-lg flex items-center flex-col justify-center bg-neutral-200 h-16">
                                <span className="w-16 inline-flex items-center justify-center text-2xl">
                                    <EyeFilled />
                                </span>
                                <div className="text-xs tracking-wider font-medium">601.020</div>
                            </div>
                            <div className="rounded-lg flex items-center flex-col justify-center bg-neutral-200 h-16">
                                <span className="w-16 inline-flex items-center justify-center text-2xl">
                                    <UsergroupAddOutlined />
                                </span>
                                <div className="text-xs tracking-wider font-medium">5.008</div>
                            </div>
                        </div>
                        <div className="mt-3 mx-auto min-w-[300px] max-w-[400]">
                            <div className="flex items-center rounded-lg mx-2 bg-neutral-200">
                                <div className="max-w-full px-3 py-2 cursor-pointer">
                                    <Rate defaultValue={4} />
                                </div>
                                <div className="flex-grow"></div>
                                <div className="pr-3 text-base">
                                    <b className="text-slate-500">4</b>
                                    <small className="text-slate-500">/5</small>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center mx-2">
                            <Button
                                color="default" variant="filled"
                                size="large"
                                className="min-w-16 w-2/4 mr-1"
                                icon={<HeartFilled />}>
                                Theo Dõi
                            </Button>
                            <Button icon={<BellFilled className="text-yellow-400" />}
                                size="large"
                                className="min-w-16 w-2/4 ml-1"
                                color="default" variant="filled">
                                Thông Báo
                            </Button>
                        </div>
                        <div className="mt-3 mx-2">
                            <Button
                                color="default"
                                variant="filled" size="large"
                                className="w-full"
                            >Đọc Từ Đầu
                            </Button>

                        </div>
                    </Col>
                    <Col lg={17} md={12} className="p-3 bg-blue-100">
                        <div className="w-full">content</div>
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default CardDetail