import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios_api from '../api/axios_api';
import ArticleHeader from './ArticleHeader';

const Articles = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setError(null);
                setArticles(null);
                setLoading(true);

                const response = await axios_api.get('/article');
                setArticles(response.data);
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
    if (!articles) return <div>글이 없습니다.</div>

    return (
        <div>
            <ArticleHeader />
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <NavLink to={`/article/${article.id}`}>
                            {article.id} {article.title} {article.nick}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Articles;