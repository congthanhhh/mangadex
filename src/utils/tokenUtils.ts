const KEY_TOKEN = "accessToken";

export const setToken = (token: string) => {
    localStorage.setItem(KEY_TOKEN, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(KEY_TOKEN);
};

export const removeToken = () => {
    localStorage.removeItem(KEY_TOKEN);
};

// google auth info
export const OAuthConfig = {
    clientId: "285017198166-v3bg04pi6vb53fve3homa4o6le3taskd.apps.googleusercontent.com",
    redirectUri: "http://localhost:5173/authenticate",
    authUri: "https://accounts.google.com/o/oauth2/auth",
};