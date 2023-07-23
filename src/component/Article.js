import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Article = () => {
    const location = useLocation();

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setError(null);
                setArticle(null);
                setLoading(true);

                const response = await axios.get(location.pathname);
                setArticle(response.data);
            } catch (e) {
                setError(e);
                console.log(`Error ${e}`);
            }
            setLoading(false);
        }

        fetchArticles();
    }, []);

    if (loading) return <div>로딩 중...</div>
    if (error) return <div>에러!</div>
    if (!article) return <div>글이 없습니다.</div>

    return (
        <div>
            <h1>{article.title}</h1>
            <ul>
                <li>작성자: {article.nick}</li>
                <li>작성일 : {article.date}</li>
                <li>본문 : {article.body}</li>
            </ul>
        </div>
    );
};

export default Article;