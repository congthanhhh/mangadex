import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    //--------------------------------------------------------------------------- 
    const KEY_TOKEN = "accessToken";
    const setToken = (token: any) => { localStorage.setItem(KEY_TOKEN, token); };
    const getToken = () => { return localStorage.getItem(KEY_TOKEN); };
    const removeToken = () => { return localStorage.removeItem(KEY_TOKEN); };
    // ---------------------------------------------------------------------------

    useEffect(() => {
        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);

        if (isMatch) {
            const authCode = isMatch[1];

            fetch(
                `http://localhost:8080/comic/auth/outbound/authentication?code=${authCode}`,
                {
                    method: "POST",
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);

                    setToken(data.result?.token);
                    setIsLoggedin(true);
                });
        }
    }, []);

    useEffect(() => {
        if (isLoggedin) {
            navigate("/home-profile");
        }
    }, [isLoggedin, navigate]);
    return (
        <div>Authenticate.......</div>
    )
}

export default Authenticate