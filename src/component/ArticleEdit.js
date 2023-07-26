import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios_api from '../api/axios_api';

const ArticleEdit = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setError(null);
                setArticle(null);
                setLoading(true);

                const response = await axios_api.get(`/article/${params.id}`);
                setArticle(response.data);
            } catch (e) {
                setError(e);
                console.log(`Error ${e}`);
            }
            setLoading(false);
        }
        fetchArticles();
    }, [params]);

    const onChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios_api.put(`/article/${params.id}`,
                JSON.stringify(article),
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            ).then((response) => {
                alert("수정되었습니다.");
                navigate(`/article/${params.id}`);
            }).catch((e) => {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
        }
    }

    if (loading) return <div>로딩 중...</div>
    if (error) return <div>에러!</div>
    if (!article) return <div>글이 없습니다.</div>

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' value={article.title} onChange={onChange} name="title" placeholder='제목' />
                <input type='text' value={article.body} onChange={onChange} name="body" placeholder='본문' />
                <button formAction=''>수정</button>
            </form>
        </div>
    );
};

export default ArticleEdit;