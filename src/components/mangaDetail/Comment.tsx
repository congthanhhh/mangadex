import { Button, Input, message } from "antd"
import { useState, useEffect } from "react";
import ShowMoreLess from "./ShowMoreLess";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { IRootComment, IRePlyComment, CommentProps } from "../../types/commentTypes";
import { postComment, fetchRootComments, fetchAllRepliesForComments, resetPostState, fetchRootCommentChapter } from "../../store/slice/commentSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Login from "../modalManga/Login";
const { TextArea } = Input;

const Comment = (props: CommentProps) => {

    const { dataComment, LIMIT_COMMENT, dataReply, LIMIT_REPLIES, comicId, chapterId } = props;
    const dispatch = useAppDispatch();

    const { postSuccess } = useAppSelector(state => state.comment);
    const { isAuthenticated } = useAppSelector(state => state.auth);

    const [isVisible, setIsVisible] = useState<Record<number, boolean>>({});
    const [isVisible2, setIsVisible2] = useState<Record<number, boolean>>({});
    const [content, setContent] = useState<string>("");
    const [inputComicId, setInputComicId] = useState<string>("");
    const [inputChapterId, setInputChapterId] = useState<number>();
    const [parentId, setParentId] = useState<number>();
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);


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

    const handleOnChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        comic?: string,
        chapter?: number,
        parent?: number
    ) => {
        setContent(e.target.value);
        setInputComicId(comic ? comic : comicId || "");
        setInputChapterId(chapter ? chapter : chapterId || undefined);
        setParentId(parent ? parent : undefined);
    }

    const reloadComments = async () => {
        if (chapterId) {
            try {
                console.log("Reloading comments for chapter:", chapterId);
                const resultAction = await dispatch(fetchRootCommentChapter(chapterId));

                if (fetchRootCommentChapter.fulfilled.match(resultAction)) {
                    const rootCommentsData = resultAction.payload;
                    if (Array.isArray(rootCommentsData) && rootCommentsData.length > 0) {
                        dispatch(fetchAllRepliesForComments(rootCommentsData));
                    }
                }
            } catch (error) {
                console.error("Error reloading chapter comments:", error);
            }
        } else if (comicId) {
            try {
                console.log("Reloading comments for comic:", comicId);
                const resultAction = await dispatch(fetchRootComments(comicId));

                if (fetchRootComments.fulfilled.match(resultAction)) {
                    const rootCommentsData = resultAction.payload;
                    if (Array.isArray(rootCommentsData) && rootCommentsData.length > 0) {
                        dispatch(fetchAllRepliesForComments(rootCommentsData));
                    }
                }
            } catch (error) {
                console.error("Error reloading comic comments:", error);
            }
        }
    };

    useEffect(() => {
        if (postSuccess) {
            message.success("Đăng bình luận thành công!");

            setContent("");
            setInputComicId("");
            setInputChapterId(undefined);
            setParentId(undefined);

            setIsVisible({});
            setIsVisible2({});

            reloadComments();

            dispatch(resetPostState());
        }
    }, [postSuccess, dispatch, comicId, chapterId]);

    // Close login modal when user successfully authenticates
    useEffect(() => {
        if (isAuthenticated && showLoginModal) {
            setShowLoginModal(false);
        }
    }, [isAuthenticated, showLoginModal]);

    const handleSendComment = () => {
        // Kiểm tra authentication trước
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        if (!content || content.trim().length < 5) {
            message.error("Nội dung bình luận phải có ít nhất 5 ký tự.");
            return;
        }
        dispatch(postComment({ content, comicId: inputComicId, chapterId: inputChapterId, parentId }))
    }

    const handleSendReplyComment = (targetParentId: number) => {
        // Kiểm tra authentication trước
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        if (!content || content.trim().length < 5) {
            message.error("Nội dung bình luận phải có ít nhất 5 ký tự.");
            return;
        }
        dispatch(postComment({ content, comicId: inputComicId, chapterId: inputChapterId, parentId: targetParentId }))
    }

    return (
        <div className="bg-neutral-200 font-sans rounded-md">
            <div className="px-4 mt-5 pb-2">
                <p className="text-2xl py-3">BÌNH LUẬN</p>
                <div className="relative px-4">
                    <TextArea size="large"
                        autoSize={{ minRows: 2, maxRows: 3 }}
                        styles={{ textarea: { paddingRight: 90 } }}
                        placeholder="Người tiện tay vẽ hoa vẽ lá, Tôi đa tình tưởng đó là mùa xuân..."
                        value={content}
                        onChange={(e) => handleOnChange(e, comicId, undefined, undefined)}
                    />
                    <Button
                        onClick={handleSendComment}
                        disabled={!content.trim()}
                        color="blue" size="middle"
                        className="absolute right-8 top-2"
                        variant="solid">
                        GỬI
                    </Button>
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
                                                placeholder={`Trả lời ${item.userName}`}
                                                value={parentId === item.commentId ? content : ""}
                                                onChange={(e) => handleOnChange(e, comicId, chapterId, item.commentId)}
                                            />
                                            <Button
                                                onClick={() => handleSendReplyComment(item.commentId)}
                                                disabled={!content.trim() || parentId !== item.commentId}
                                                color="blue" size="middle"
                                                className="absolute right-4 top-2"
                                                variant="solid">
                                                GỬI
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {/* Reply */}
                                {dataReply[item.commentId] && dataReply[item.commentId].length > 0 && (
                                    <ShowMoreLess
                                        data={flattenReplies(dataReply[item.commentId])}
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
                                                                placeholder={`Trả lời ${replyItem.userName}`}
                                                                value={parentId === replyItem.commentId ? content : ""}
                                                                onChange={(e) => handleOnChange(e, comicId, chapterId, replyItem.commentId)}
                                                            />

                                                            <Button
                                                                onClick={() => handleSendReplyComment(replyItem.commentId)}
                                                                disabled={!content.trim() || parentId !== replyItem.commentId}
                                                                color="blue" size="middle"
                                                                className="absolute right-4 top-2"
                                                                variant="solid">
                                                                GỬI
                                                            </Button>
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
            {/* Login Modal */}
            <Login
                isOpenLogin={showLoginModal}
                handleCancel={() => setShowLoginModal(false)}
            />
        </div>
    )
}

export default Comment