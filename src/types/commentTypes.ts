// Comment related types
export interface IRootComment {
    commentId: number;
    content: string;
    userName: string;
    createdDate: string;
    comicTitle: string;
    chapterNumber: number;
}

export interface IRePlyComment {
    commentId: number;
    userName: string;
    createdDate: string;
    comicTitle: string;
    parentId: number;
    chapterNumber: number;
    content: string;
    replies: IRePlyComment[];
}

// API Response types
export interface RootCommentResponse {
    code: number;
    result: IRootComment[];
}

export interface RepliesCommentResponse {
    code: number;
    result: IRePlyComment[];
}

// Component Props types
export interface CommentProps {
    dataComment: IRootComment[];
    dataReply: { [key: number]: IRePlyComment[] };
    LIMIT_COMMENT: number;
    LIMIT_REPLIES: number;
    onFetchReplies?: (commentId: number) => void;
}

// Redux State types
export interface CommentState {
    rootComments: IRootComment[];
    replies: { [key: number]: IRePlyComment[] };
    loading: boolean;
    error: string | null;
}
