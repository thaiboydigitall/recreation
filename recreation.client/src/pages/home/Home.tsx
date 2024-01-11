import { Button, Col, Container, Row } from "react-bootstrap";
import { API_HOST } from "../../consts";
import { useEffect, useState } from "react";
import PostApi, { PostType } from "../../api/PostApi";
import CardPost from "../../components/cardpost/CardPost";
import { Link } from "react-router-dom";

export default function Home() {

    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        PostApi.getLatests()
            .then(res => setPosts(res))
            .catch(() => {});
    }, []);

    return (
        <>
            <Container className="px-0">
                <div className="shadow-custom position-relative col-12 my-md-5 mb-5" 
                    style={
                        {
                            height: "720px", 
                            backgroundImage: `url(${API_HOST}/images/main_offer.jpg)`,
                            backgroundSize: "cover", 
                            backgroundPositionY: "bottom",
                            backgroundRepeat: ""    
                        }
                        }>
                    <div className="position-absolute w-100 bottom-0 text-white" style={{background: "rgba(0, 0, 0, .5)"}}>
                        <h5 className="ps-4 pt-4">Найдите компанию для вашего идеального досуга!</h5>
                        <hr />
                        <span className="d-block col-12 col-md-10 ps-4 pb-4" style={{color: "#D7D7D7"}}>Создавайте объявления о поиске партнеров для совместных приключений. Знакомьтесь, обсуждайте интересы и проводите время весело вместе!</span>
                    </div>
                </div>

                <div>
                    <span className="d-block text-center fw-500">Популярные</span>
                    <Row xs="1" md="2" lg="3">
                        {
                            posts.map((item) => <Col key={item.id} className="mt-4 pe-0 pe-md-2"><CardPost k={`${item.id}`} {...item} /></Col> )
                        }
                    </Row>
                    <div className="text-center mt-5 mb-3">
                        <Link to={"/posts"}>Показать все</Link>
                    </div>
                    <div className="text-center">
                        <Link to="/createpost"><Button className="primary-button rounded-0 px-4 py-2 ">Создать объявление</Button></Link>
                    </div>
                </div>
            </Container>
        </>
    )
}