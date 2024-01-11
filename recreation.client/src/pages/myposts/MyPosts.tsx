import { useEffect, useState } from "react";
import PostApi, { PostType } from "../../api/PostApi";
import { Col, Container, Row } from "react-bootstrap";
import CardPost from "../../components/cardpost/CardPost";

export default function MyPosts() {

    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        PostApi.getMyPosts()
            .then(res => setPosts(res))
            .catch(() => { });
    }, []);



    return (
        <>
            <Container>
                <div className="mt-3">
                    <span className="d-block text-center fw-500 mt-4">Мои объявления</span>

                    <Row xs="1" md="2" lg="3">
                        {
                            posts.map((item) => <Col key={item.id} className="mt-4"><CardPost k={`${item.id}`} {...item} /></Col>)
                        }
                    </Row>
                </div>
            </Container>
        </>
    )

}