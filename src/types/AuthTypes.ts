// Auth related types
export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    code: number;
    result: {
        token: string;
    };
    message?: string;
}

export interface User {
    id: string;
    username: string;
    email?: string;
    // Add other user properties as needed
}

// Redux State types
export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

// Component Props types
export interface ModelLoginProps {
    isOpenLogin: boolean;
    handleCancel: () => void;
}