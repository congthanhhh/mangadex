import { Button, Input } from "antd"
import { useState } from "react";
import ShowMoreLess from "./ShowMoreLess";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { IRootComment, IRePlyComment, CommentProps } from "../../types/commentTypes";
const { TextArea } = Input;

const Comment = (props: CommentProps) => {

    const { dataComment, LIMIT_COMMENT, dataReply, LIMIT_REPLIES, onFetchReplies } = props;

    const [isVisible, setIsVisible] = useState<Record<number, boolean>>({});
    const [isVisible2, setIsVisible2] = useState<Record<number, boolean>>({});

    // Function to flatten nested replies into a single array with parent info
    const flattenReplies = (replies: IRePlyComment[], rootComment?: IRootComment): (IRePlyComment & { replyToUser?: string })[] => {
        const result: (IRePlyComment & { replyToUser?: string })[] = [];

        // Create a map of all comments (root + replies) for quick lookup
        const commentMap = new Map<number, { userName: string }>();

        // Add root comment to map
        if (rootComment) {
            commentMap.set(rootComment.commentId, { userName: rootComment.userName });
        }

        // Add all replies to map first
        const addToMap = (repliesArray: IRePlyComment[]) => {
            for (const reply of repliesArray) {
                commentMap.set(reply.commentId, { userName: reply.userName });
                if (reply.replies && reply.replies.length > 0) {
                    addToMap(reply.replies);
                }
            }
        };
        addToMap(replies);

        const flatten = (repliesArray: IRePlyComment[], parentId?: number) => {
            for (const reply of repliesArray) {
                const replyToUser = parentId ? commentMap.get(parentId)?.userName : undefined;
                result.push({ ...reply, replyToUser });

                if (reply.replies && reply.replies.length > 0) {
                    flatten(reply.replies, reply.commentId);
                }
            }
        };

        // Start flattening, first level replies to root comment
        flatten(replies, rootComment?.commentId);
        return result;
    };

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
                <div className="relative px-4">
                    <TextArea size="large"
                        autoSize={{ minRows: 2, maxRows: 3 }}
                        styles={{ textarea: { paddingRight: 90 } }}
                        placeholder="Người tiện tay vẽ hoa vẽ lá, Tôi đa tình tưởng đó là mùa xuân..." />
                    <Button
                        color="blue" size="middle"
                        className="absolute right-8 top-2"
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
                            <div key={item.commentId}>
                                {/* Comment */}
                                <div className="px-1 py-1 flex items-center">
                                    <div className="capitalize mr-1 text-pink-600">
                                        <span className="font-semibold">{item.userName}</span>
                                        {item.chapterNumber &&
                                            <span className="ml-1 text-blue-600">{"Chương " + item.chapterNumber}</span>
                                        }
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                        {item.createdDate
                                            ? formatDistanceToNow(new Date(item.createdDate), { addSuffix: true, locale: vi })
                                            : "N/A"}
                                    </div>
                                </div>
                                <div className="bg-neutral-300 p-2 rounded-md">
                                    {item.content}
                                </div>
                                <div className="capitalize text-xs text-neutral-500">
                                    <span onClick={() => handleShowTextArea(item.commentId)}
                                        className="px-1 cursor-pointer hover:opacity-60">trả lời</span>
                                    <span className="px-1 cursor-pointer hover:opacity-60">báo cáo</span>
                                    <span className="px-1 cursor-pointer hover:opacity-60">tag tên</span>
                                    {isVisible[item.commentId] && (
                                        <div className="relative w-[96%] m-auto">
                                            <TextArea size="large"
                                                autoSize={{ minRows: 2, maxRows: 3 }}
                                                styles={{ textarea: { paddingRight: 90 } }}
                                                placeholder={`Trả lời ${item.userName}`} />
                                            <Button
                                                color="blue" size="middle"
                                                className="absolute right-4 top-2"
                                                variant="solid">GỬI</Button>
                                        </div>
                                    )}
                                </div>
                                {/* Reply */}
                                {/* Load replies button if not loaded yet */}
                                {!dataReply[item.commentId] && onFetchReplies && (
                                    <div className="pl-6 mt-2">
                                        <button
                                            onClick={() => onFetchReplies(item.commentId)}
                                            className="text-sm text-blue-600 hover:opacity-60"
                                        >
                                            Xem phản hồi
                                        </button>
                                    </div>
                                )}

                                {dataReply[item.commentId] && dataReply[item.commentId].length > 0 && (
                                    <ShowMoreLess
                                        data={flattenReplies(dataReply[item.commentId], item)}
                                        initialVisible={LIMIT_REPLIES}
                                        incremental={true}
                                        step={4}
                                        className="pb-2 w-1/4 m-auto"
                                        buttonClassName="w-full h-6 rounded-md text-xs px-4 border-2"
                                        renderItem={(replyItem) => (
                                            <div className="pl-6 font-sans" key={replyItem.commentId}>
                                                <div className="px-1 py-1 flex items-center">
                                                    <div className="capitalize mr-1 text-pink-600">
                                                        <span className="font-semibold">{replyItem.userName}</span>
                                                        {replyItem.chapterNumber &&
                                                            <span className="ml-1 text-blue-600">{"Chương " + replyItem.chapterNumber}</span>
                                                        }
                                                    </div>
                                                    <div className="text-xs text-neutral-500">
                                                        {replyItem.createdDate
                                                            ? formatDistanceToNow(new Date(replyItem.createdDate), { addSuffix: true, locale: vi })
                                                            : "N/A"}
                                                    </div>
                                                </div>
                                                <div className="bg-neutral-300 flex p-2 rounded-md">
                                                    {replyItem.replyToUser && (
                                                        <div className="text-blue-600 font-semibold">
                                                            #{replyItem.replyToUser}
                                                        </div>
                                                    )}
                                                    <div className="ml-1">
                                                        {replyItem.content}
                                                    </div>
                                                </div>
                                                <div className="capitalize text-xs text-neutral-500">
                                                    <span onClick={() => handleShowTextArea2(replyItem.commentId)}
                                                        className="px-1 cursor-pointer hover:opacity-60">trả lời</span>
                                                    <span className="px-1 cursor-pointer hover:opacity-60">báo cáo</span>
                                                    <span className="px-1 cursor-pointer hover:opacity-60">tag tên</span>
                                                    {isVisible2[replyItem.commentId] && (
                                                        <div className="relative w-[96%] m-auto">
                                                            <TextArea size="large"
                                                                autoSize={{ minRows: 2, maxRows: 3 }}
                                                                styles={{ textarea: { paddingRight: 90 } }}
                                                                placeholder={`Trả lời ${replyItem.userName}`} />
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
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default Comment