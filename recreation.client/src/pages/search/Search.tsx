import { useEffect, useState } from "react";
import PostApi, { PostType } from "../../api/PostApi";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import CardPost from "../../components/cardpost/CardPost";

export default function Search() {

    const queryParams = new URLSearchParams(window.location.search);

    const [posts, setPosts] = useState<PostType[]>([]);

    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        setPage(Number(queryParams.get('page') ?? 1));
        setSearchText(queryParams.get('search') ?? "");

        PostApi.search(6, Number(queryParams.get('page') ?? 1), queryParams.get('search') ?? "")
            .then(res => setPosts(res))
            .catch(() => { });

        PostApi.getCountSearch(queryParams.get('search') ?? "").then(res => {
            if (res > 0)
                setPageCount(Math.ceil(res / 6));
        })

    }, []);



    return (
        <>
            <Container>
                {
                    posts == null || posts.length == 0 ?
                        <>
                            <h3 className="text-secondary mt-5 text-center">Ничего не найдено</h3>
                        </>
                        :
                        <div className="mt-3">
                            <Row xs="1" md="2" lg="3">
                                {
                                    posts.map((item) => <Col key={item.id} className="mt-4"><CardPost k={`${item.id}`} {...item} /></Col>)
                                }
                            </Row>

                            {
                                posts != null && posts.length > 0 ?
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
                                                        <Pagination.First href={`/posts?page=1&search=${searchText}`} />
                                                        <Pagination.Prev href={`/posts?page=${page - 1}&search=${searchText}`} />
                                                        <Pagination.Item href={`/posts?page=${page - 1}&search=${searchText}`}>{`${page - 1}`}</Pagination.Item>

                                                    </>
                                            }
                                            <Pagination.Item href={`/posts?page=${page}&search=${searchText}`} active>{`${page}`}</Pagination.Item>
                                            {
                                                pageCount > page
                                                    ?
                                                    <>
                                                        <Pagination.Item href={`/posts?page=${page + 1}&search=${searchText}`}>{`${page + 1}`}</Pagination.Item>
                                                        {
                                                            pageCount - page > 1
                                                                ?
                                                                <>
                                                                    <Pagination.Item href={`/posts?page=${page + 2}&search=${searchText}`}>{`${page + 2}`}</Pagination.Item>
                                                                    <Pagination.Ellipsis />
                                                                    <Pagination.Item href={`/posts?page=${pageCount}&search=${searchText}`}>{pageCount}</Pagination.Item>

                                                                </>
                                                                :
                                                                <></>
                                                        }

                                                        <Pagination.Next href={`/posts?page=${page + 1}&search=${searchText}`} />
                                                        <Pagination.Last href={`/posts?page=${pageCount}&search=${searchText}`} />
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
                }
            </Container>
        </>
    )

}