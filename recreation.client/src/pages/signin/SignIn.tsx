import { Button, Container, Form } from "react-bootstrap";
import './SignIn.css'
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserApi from "../../api/UserApi";
import { Context } from "../../main";

export default function SignIn() {
    
    const stores = useContext(Context);

    useEffect(() => {
        if (stores?.user.isAuth && localStorage.getItem("token") != null)
            window.location.href = "/";
    }, []);

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const startSignIn = async () => {
        if (login.length < 3 || login.length > 50)
            return setError("Логин не зарегистрирован");
        if (password.length < 7)
            return setError("Слишком короткий пароль !");

        setError("");
        setError(await UserApi.signIn(login, password));
    }

    return (
        <>
                <Container className="vh-100">
                    <div className="form-signin d-flex align-items-center h-100 justify-content-center">
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 text-center">
                            <img src="/images/user.png" className="mb-4"/>
                            <h4 className="text-center fw-600 mb-5">Авторизация</h4>
                            <Form autoComplete={"off"}>
                                <Form.Control
                                    type="login"
                                    placeholder="Логин"
                                    className="px-3 py-3 input-login"
                                    onChange={e => setLogin(e.target.value)}
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                />
                                <Form.Control
                                    type="password"
                                    placeholder="Пароль"
                                    className="px-3 py-3 input-password"
                                    onChange={e => setPassword(e.target.value)}
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                />
                                <span className="d-block small text-danger mt-3 text-start">{error}</span>
                                <Button 
                                    className="w-100 btn-lg rounded-0 mt-4 mb-4 primary-button"
                                    onClick={startSignIn}
                                >
                                    Войти
                                </Button>
                                <span>Нет аккаунта ? <Link to="/signup" className="primary-text">зарегистрируетесь</Link></span>
                            </Form>
                        </div>

                    </div>

                </Container>

        </>
    );
}