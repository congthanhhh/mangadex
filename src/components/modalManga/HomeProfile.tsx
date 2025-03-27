import { Button, Card, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeProfile() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [password, setPassword] = useState("");

    //--------------------------------------------------------------------------- 
    const KEY_TOKEN = "accessToken";
    const setToken = (token: any) => { localStorage.setItem(KEY_TOKEN, token); };
    const getToken = () => { return localStorage.getItem(KEY_TOKEN); };
    const removeToken = () => { return localStorage.removeItem(KEY_TOKEN); };
    // ---------------------------------------------------------------------------

    const getUserDetails = async (accessToken: any) => {
        const response = await fetch("http://localhost:8080/comic/users/my-info",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const data = await response.json();

        console.log(data.result);

        setUserDetails(data.result);
    };

    const addPassword = (event) => {
        event.preventDefault();

        const body = {
            password: password,
        };

        fetch("http://localhost:8080/comic/users/create-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.code != 1000) throw new Error(data.message);

                getUserDetails(getToken());
                console.log(data.message);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        const accessToken = getToken();

        if (!accessToken) {
            navigate("/login");
        }

        getUserDetails(accessToken);
    }, [navigate]);

    return (
        <>
            {userDetails ? (
                <div>
                    <Card>
                        <img src={userDetails.picture} alt="user image" />
                        <div>
                            <p>Welcome back {userDetails.username}, </p>
                            <h1 className="name">{userDetails.given_Name}</h1>
                            <p className="email">{userDetails.email}</p>{" "}
                        </div>
                    </Card>
                    <ul>
                        User's roles:
                        {userDetails.roles?.map((item, index) => (
                            <li className="email" key={index}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                    {userDetails.noPassword && (
                        <Form.Item label="Password" >
                            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button type="primary" onClick={(event) => { addPassword(event) }}>
                                Set Password
                            </Button>
                        </Form.Item>

                    )}
                </div>
            ) : (
                <div
                >
                    <div>Loading ...</div>
                </div>
            )}
        </>
    );
}