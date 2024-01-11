import { useEffect, useState } from "react";
import PostApi, { PostType } from "../../api/PostApi";
import { Button, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import CardPost from "../../components/cardpost/CardPost";
import { Link } from "react-router-dom";

export default function Posts() {

    const queryParams = new URLSearchParams(window.location.search);

    const [posts, setPosts] = useState<PostType[]>([]);

    const [order, setOrder] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);

    useEffect(() => {
        setOrder(Number(queryParams.get("order") ?? 1));
        setPage(Number(queryParams.get('page') ?? 1));

        PostApi.getPage(6, Number(queryParams.get('page') ?? 1), Number(queryParams.get('order') ?? 1))
            .then(res => setPosts(res))
            .catch(() => { });

        PostApi.getCount().then(res => {
            if (res > 0)
                setPageCount(Math.ceil(res / 6));
        })

    }, []);



    return (
        <>
            <Container>
                <div className="mt-3">
                    <div className="d-md-flex justify-content-md-between align-items-center">
                        <div style={{ width: "250px" }}>
                            <Form.Select className="rounded-0" onChange={e => window.location.href = `/posts?order=${e.target.value}`} value={order}>
                                <option value="1" className="rounded-0">Сначала новые</option>
                                <option value="2">Сначала старые</option>
                                <option value="3">Сначала популярные</option>
                            </Form.Select>
                        </div>
                        <div className="my-3 my-md-0">
                            <Link to="/createpost"><Button className="primary-button rounded-0 px-4 py-2 ">Создать объявление</Button></Link>
                        </div>

                    </div>
                    <Row xs="1" md="2" lg="3">
                        {
                            posts.map((item) => <Col key={item.id} className="mt-4"><CardPost k={`${item.id}`} {...item} /></Col>)
                        }
                    </Row>

                    {
                        posts != null && posts.length?
                            <>
                                <Pagination className="mt-5 fw-500">
                                    {
                                        page < 2
                                            ?
                                            <>
                                                <Pagination.First disabled />
                                                <Pagination.Prev disabled />
                                            </>
                                            :
                                            <>
                                                <Pagination.First href={`/posts?page=1&order=${order}`} />
                                                <Pagination.Prev href={`/posts?page=${page - 1}&order=${order}`} />
                                                <Pagination.Item href={`/posts?page=${page - 1}&order=${order}`}>{`${page - 1}`}</Pagination.Item>

                                            </>
                                    }
                                    <Pagination.Item href={`/posts?page=${page}&order=${order}`} active>{`${page}`}</Pagination.Item>
                                    {
                                        pageCount > page
                                            ?
                                            <>
                                                <Pagination.Item href={`/posts?page=${page + 1}&order=${order}`}>{`${page + 1}`}</Pagination.Item>
                                                {
                                                    pageCount - page > 1
                                                        ?
                                                        <>
                                                            <Pagination.Item href={`/posts?page=${page + 2}&order=${order}`}>{`${page + 2}`}</Pagination.Item>
                                                            <Pagination.Ellipsis />
                                                            <Pagination.Item href={`/posts?page=${pageCount}&order=${order}`}>{pageCount}</Pagination.Item>

                                                        </>
                                                        :
                                                        <></>
                                                }

                                                <Pagination.Next href={`/posts?page=${page + 1}&order=${order}`} />
                                                <Pagination.Last href={`/posts?page=${pageCount}&order=${order}`} />
                                            </>
                                            :
                                            <>
                                                <Pagination.Next disabled />
                                                <Pagination.Last disabled />
                                            </>
                                    }


                                </Pagination>
                            </>
                            :
                            <>
                            </>
                    }


                </div>
            </Container>
        </>
    )

}