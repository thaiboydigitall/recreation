import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserApi from "../../api/UserApi";

export default function Footer() {
    const [email, setEmail] = useState<string>("");

    const sendEmail = () => {
        if (!(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/.test(email)))
            return alert("Адрес эл. почты введена некорректно !")

        UserApi.addSignedEmail(email);
    }

    return (
        <>
            <div className="footer shadow-lg py-5 mt-2 mt-md-0">
                <Container>
                    <Row xs="1" sm="2" md="3" className="mb-4">
                        <Col className="mt-md-0 ">
                            <span className="primary fs-18" >Навигация</span>
                            <hr />
                            <Link to="/" className="text-decoration-none text-secondary mt-4 d-block">Главная</Link>
                            <Link to="/posts" className="text-decoration-none text-secondary  mt-4 d-block">Все объявления</Link>
                            <Link to="/account" className="text-decoration-none text-secondary mt-4 d-block">Личный кабинет</Link>
                        </Col>

                        <Col className="mt-5 mt-sm-0 mt-md-0">
                            <span className="primary fs-18" >Помощь</span>
                            <hr />
                            <Link to="/faq" className="text-decoration-none text-secondary mt-4 d-block">FAQ</Link>
                            <span className="text-decoration-none text-secondary  mt-4 d-block">recreation@mail.ru</span>
                            <span className="text-decoration-none text-secondary mt-4 d-block">+ 7 999 777 77 77</span>
                        </Col>

                        <Col className="mt-5 mt-sm-0 mt-md-0">
                            <span className="primary fs-18" >Подписка на новости</span>
                            <hr />
                            <Form.Group className="mt-4">
                                <Form.Label className="mx-1">Следите за новинками</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Введите ваш email"
                                    className="rounded-0 px-3 py-2"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="primary-button my-3 w-100 py-2 rounded-0" onClick={sendEmail}>
                                Подписаться
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <span className="d-block text-center small text-secondary">©️ Copyright 2024 - Все права защищены</span>
                </Container>
            </div>
        </>
    )
}