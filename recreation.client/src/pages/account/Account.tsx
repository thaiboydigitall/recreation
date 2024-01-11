import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Context } from "../../main";
import { API_HOST } from "../../consts";
import UserApi from "../../api/UserApi";
import { Link } from "react-router-dom";

export default function Account() {

    const stores = useContext(Context);

    const [login, setLogin] = useState<string>(stores?.user.user?.login ?? "");
    const [password, setPassword] = useState<string>("");
    const [city, setCity] = useState<string>(stores?.user.user?.city ?? "");
    const [name, setName] = useState<string>(stores?.user.user?.name ?? "");
    const [surname, setSurname] = useState<string>(stores?.user.user?.surname ?? "");

    const [dateBirth, setDateBirth] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");
    const [posts, setPosts] = useState<number>(11);
    const [comments, setComments] = useState<number>(11);

    const [error, setError] = useState<string>("");

    useEffect(() => {
        UserApi.checkAuth();
        UserApi.getStatistics()
            .then(res => {
                if (res == null)
                    return null;

                setDateBirth(res.dateBirth);
                setCreatedAt(res.createdAt);
                setPosts(res.posts);
                setComments(res.comments);
            })
        
            UserApi.getCountCreatedPosts().then(res => setPosts(res)).catch();
            UserApi.getCountCreatedComments().then(res => setComments(res)).catch();
        }, []);

    const confirmChanges = async () => {
        if (login.length < 3)
            return setError("Логин слишком короткий !");
        if (login.length > 50)
            return setError("Логин слишком длинный !");
        if (name.length < 2)
            return setError("Введите ваше имя !");
        if (surname.length < 3)
            return setError("Введите вашу фамилию !");
        if (city.length < 2)
            return setError("Введите название вашего города !");
        if (password.length < 7 && password != "")
            return setError("Минимальная длина пароля 7 символов !");

        setError(await UserApi.updateProfile(login, password, city, name, surname));
    }

    return (
        <>
            <Container>
                <div className="text-center py-5">
                    <img src={`${API_HOST}/${stores?.user.user?.avatarUrl}`} className="circle" style={{ width: "192px", height: "192px" }} />
                    <span className="d-block mt-3 fs-5 fw-600">{stores?.user.user?.name} {stores?.user.user?.surname}</span>
                    <span className="d-block small text-secondary">{stores?.user.user?.city}</span>
                </div>
                <div className="w-100">
                    <Row xs="1" md="2" xl="3">
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary">Логин</Form.Label>
                                <Form.Control
                                    type="login"
                                    placeholder={login}
                                    className="py-3 px-3 rounded-0"
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                    onChange={e => setLogin(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary">Пароль</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="************"
                                    className="py-3 px-3 rounded-0"
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary">Город</Form.Label>
                                <Form.Control
                                    type="city"
                                    placeholder={city}
                                    className="py-3 px-3 rounded-0"
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary">Имя</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder={name}
                                    className="py-3 px-3 rounded-0"
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary">Фамилия</Form.Label>
                                <Form.Control
                                    type="surname"
                                    placeholder={surname}
                                    className="py-3 px-3 rounded-0"
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                    onChange={e => setSurname(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label className="small text-secondary">Дата рождения</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="2004-12-27"
                                    className="py-3 px-3 rounded-0"
                                    value={dateBirth}
                                    onChange={e => setDateBirth(e.target.value)}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <span className="d-block text-center text-danger">{error}</span>
                    <Button className="col-12 col-md-6 col-xl-4 rounded-0 mx-auto d-block py-3 my-3 primary-button" onClick={confirmChanges}>
                        Подтвердить изменения
                    </Button>
                </div>
                <div className="mt-5 d-sm-flex justify-content-between align-items-end">
                    <div>
                        <span className="d-block small text-secondary my-3">
                            Дата регистрации: {createdAt}
                        </span>
                        <span className="d-block small text-secondary my-3">
                            Создано объявлений: {posts}
                        </span>
                        <span className="d-block small text-secondary my-3">
                            Оставленных комментариев: {comments} 
                        </span>
                    </div>
                    <div>
                    <Link to={"/createpost"}>
                    <Button className="outline-primary-button rounded-0 p-2 px-3">
                        Создать объявление
                    </Button>
                    </Link>

                    </div>
                    
                </div>
            </Container>
        </>
    );
}