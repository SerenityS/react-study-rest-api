import React, { useEffect, useState } from 'react';
import axios_api from '../api/axios_api';
import { useNavigate } from 'react-router-dom';

const ArticleHeader = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState(
        {
            email: "",
            password: "",
            nick: "",
        }
    );

    useEffect(() => {
        const nick = localStorage.getItem("nick");
        if (nick) {
            setAccount(account => ({ ...account, nick: nick }));
        }
    }, []);

    const onChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }

    const onClickLogout = () => {
        localStorage.clear();
        setAccount({ ...account, nick: null });
    }

    const onClickWrite = () => {
        navigate('/write');
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios_api.post('/auth/jwt/login',
                new URLSearchParams(
                    {
                        "username": account.email,
                        "password": account.password,
                    }
                )
            ).then((response) => {
                localStorage.setItem("jwt", response.data.access_token);
            });

            await axios_api.get('/users/me').then((response) => {
                localStorage.setItem("nick", response.data.nick);
                localStorage.setItem("user_id", response.data.id);
                setAccount({ ...account, nick: response.data.nick });
            })
        } catch (e) {
            console.log(e);
        }
    }

    if (account.nick) {
        return (
            <div>
                <h2>
                    {account.nick}님 반갑습니다!
                </h2>
                <button onClick={onClickLogout}>로그아웃</button>
                <button onClick={onClickWrite}>글 작성</button>
            </div>
        )
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder='email' onChange={onChange} />
                <input type="password" name="password" placeholder='password' onChange={onChange} />
                <button formAction=''>Login</button>
            </form>
        </div>
    );
};

export default ArticleHeader;