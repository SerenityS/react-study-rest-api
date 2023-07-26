import React, { useState } from 'react';
import axios_api from '../api/axios_api';
import { useNavigate } from 'react-router-dom';

const ArticleWrite = () => {
    const navigate = useNavigate();

    const [article, setArticle] = useState(
        {
            title: "",
            body: "",
        }
    )

    const onChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios_api.post(`/article`,
                JSON.stringify(article),
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            ).then((response) => {
                alert("글이 성공적으로 등록 되었습니다.");
                navigate("/");
            }).catch((e) => {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' value={article.title} onChange={onChange} name="title" placeholder='제목' />
                <input type='text' value={article.body} onChange={onChange} name="body" placeholder='본문' />
                <button formAction=''>작성</button>
            </form>
        </div>
    );
};

export default ArticleWrite;