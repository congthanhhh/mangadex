import { Button, Input } from "antd"
import { useState } from "react";
import ShowMoreLess from "./ShowMoreLess";
const { TextArea } = Input;

interface IComment {
    id: number;
    userId: number
    title: string;
    body: string;
}
interface IRePlyComment {
    id: number;
    username: string;
}

interface CommentProps {
    dataComment: IComment[];
    dataReply: IRePlyComment[];
    LIMIT_COMMENT: number;
    LIMIT_REPCOMMENT: number;
}

const Comment = (props: CommentProps) => {

    const { dataComment, LIMIT_COMMENT, dataReply, LIMIT_REPCOMMENT } = props;

    const [isVisible, setIsVisible] = useState<Record<number, boolean>>({});
    const [isVisible2, setIsVisible2] = useState<Record<number, boolean>>({});

    const handleShowTextArea = (id: number) => {
        setIsVisible((prev) => ({
            ...prev,
            [id]: !prev[id], // Đảo ngược trạng thái hiển thị của comment đó
        }));
        console.log(">>> Check comment: ", isVisible)
    };
    const handleShowTextArea2 = (id: number) => {
        setIsVisible2((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        console.log(">>> Check comment: ", isVisible2)
    };
    return (
        <div className="bg-neutral-200 font-sans rounded-md">
            <div className="px-4 mt-5 pb-2">
                <p className="text-2xl py-3">BÌNH LUẬN</p>
                <div className="relative">
                    <TextArea size="large"
                        autoSize={{ minRows: 2, maxRows: 3 }}
                        styles={{ textarea: { paddingRight: 90 } }}
                        placeholder="Người tiện tay vẽ hoa vẽ lá, Tôi đa tình tưởng đó là mùa xuân..." />
                    <Button
                        color="blue" size="middle"
                        className="absolute right-4 top-2"
                        variant="solid">GỬI</Button>
                </div>
                <div className="w-[95%] m-auto font-sans">
                    <ShowMoreLess
                        data={dataComment}
                        initialVisible={LIMIT_COMMENT}
                        incremental={true}
                        step={10}
                        className="pt-2"
                        buttonClassName="w-full h-11 rounded-md text-sm px-4 border-2"
                        renderItem={(item) => (
                            <div key={item.id}>
                                {/* Comment */}
                                <div className="px-1 py-1 flex items-center">
                                    <div className="capitalize mr-1 text-pink-600">
                                        Naruto
                                        <span className="ml-1 text-blue-600">Chương 20</span>
                                    </div>
                                    <div className="text-xs text-neutral-500">3 giờ trước</div>
                                </div>
                                <div className="bg-neutral-300 p-2 rounded-md">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                </div>
                                <div className="capitalize text-xs text-neutral-500">
                                    <span onClick={() => handleShowTextArea(item.id)}
                                        className="px-1 cursor-pointer hover:opacity-60">trả lời</span>
                                    <span className="px-1 cursor-pointer hover:opacity-60">báo cáo</span>
                                    <span className="px-1 cursor-pointer hover:opacity-60">tag tên</span>
                                    {isVisible[item.id] && (
                                        <div className="relative w-[96%] m-auto">
                                            <TextArea size="large"
                                                autoSize={{ minRows: 2, maxRows: 3 }}
                                                styles={{ textarea: { paddingRight: 90 } }}
                                                placeholder={`Trả lời ${item.title}`} />
                                            <Button
                                                color="blue" size="middle"
                                                className="absolute right-4 top-2"
                                                variant="solid">GỬI</Button>
                                        </div>
                                    )}
                                </div>
                                {/* Reply */}
                                <ShowMoreLess
                                    data={dataReply}
                                    initialVisible={LIMIT_REPCOMMENT}
                                    incremental={true}
                                    step={4}
                                    className="pb-2 w-1/4 m-auto"
                                    buttonClassName="w-full h-6 rounded-md text-xs px-4 border-2"
                                    renderItem={(item) => (
                                        <div className="pl-6 font-sans" key={item.id}>
                                            <div className="px-1 py-1 flex items-center">
                                                <div className="capitalize mr-1 text-pink-600">
                                                    {item.username}
                                                </div>
                                                <div className="text-xs text-neutral-500">2 giờ trước</div>
                                            </div>
                                            <div className="bg-neutral-300 p-2 rounded-md">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum repellendus perspiciatis aliquid minima maxime sint perferendis, corporis illo saepe eaque!
                                            </div>
                                            <div className="capitalize text-xs text-neutral-500">
                                                <span onClick={() => handleShowTextArea2(item.id)}
                                                    className="px-1 cursor-pointer hover:opacity-60">trả lời</span>
                                                <span className="px-1 cursor-pointer hover:opacity-60">báo cáo</span>
                                                <span className="px-1 cursor-pointer hover:opacity-60">tag tên</span>
                                                {isVisible2[item.id] && (
                                                    <div className="relative w-[96%] m-auto">
                                                        <TextArea size="large"
                                                            autoSize={{ minRows: 2, maxRows: 3 }}
                                                            styles={{ textarea: { paddingRight: 90 } }}
                                                            placeholder={`Trả lời ${item.username}`} />
                                                        <Button
                                                            color="blue" size="middle"
                                                            className="absolute right-4 top-2"
                                                            variant="solid">GỬI</Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        )} />
                </div>
            </div>
        </div>
    )
}

export default Comment