import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios_api from '../api/axios_api';

const Article = () => {
    const location = useLocation();
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

                const response = await axios_api.get(location.pathname);
                setArticle(response.data);
            } catch (e) {
                setError(e);
                console.log(`Error ${e}`);
            }
            setLoading(false);
        }

        fetchArticles();
    }, [location]);

    const onClickDelete = async () => {
        if (article.user_id === localStorage.getItem("user_id")) {
            await axios_api.delete(`/article/${params.id}`)
                .then((response) => {
                    alert("삭제되었습니다.");
                    navigate("/");
                }).catch((e) => {
                    console.log(e);
                });
        }
        else {
            alert("본인이 작성한 게시글만 삭제할 수 있습니다.");
        }
    }

    const onClickEdit = () => {
        if (article.user_id === localStorage.getItem("user_id")) {
            navigate(`/edit/${params.id}`);
        } else {
            alert("본인이 작성한 게시글만 수정할 수 있습니다.");
        }
    }

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
                <li><button onClick={onClickEdit}>글 수정</button></li>
                <li><button onClick={onClickDelete}>글 삭제</button></li>
            </ul>
        </div>
    );
};

export default Article;