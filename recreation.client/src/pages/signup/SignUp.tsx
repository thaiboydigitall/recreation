import { Button, Container, Form } from "react-bootstrap";
import './SignUp.css'
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserApi from "../../api/UserApi";
import { Context } from "../../main";

export default function SignUp() {

    const stores = useContext(Context);

    useEffect(() => {
        if (stores?.user.isAuth && localStorage.getItem("token") != null)
            window.location.href = "/";
    }, []);
    
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [dateBirth, setDateBith] = useState<string>('');
    const [error, setError] = useState<string>('');

    const startSignUp = async () => {
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
        if (dateBirth.length < 4)
            return setError("Введите дату вашего рождения !");
        if (password.length < 7)
            return setError("Минимальная длина пароля 7 символов !");
        
        setError("");
        setError(await UserApi.signUp(login, name, surname, city, dateBirth, password));
    }

    return (
        <>
                <Container className="vh-100">
                    <div className="form-signup d-flex align-items-center h-100 justify-content-center">
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 text-center">
                            <img src="/images/user.png" className="mb-4"/>
                            <h4 className="text-center fw-600 mb-5">Регистрация</h4>
                            <Form>
                                <Form.Control
                                    type="login"
                                    placeholder="Логин"
                                    className="px-3 py-3 input-login"
                                    onChange={e => setLogin(e.target.value)}
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                />
                                <Form.Control
                                    type="name"
                                    placeholder="Имя"
                                    className="px-3 py-3"
                                    onChange={e => setName(e.target.value)}
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                />
                                <Form.Control
                                    type="surname"
                                    placeholder="Фамилия"
                                    className="px-3 py-3"
                                    onChange={e => setSurname(e.target.value)}
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                />
                                <Form.Control
                                    type="city"
                                    placeholder="Город"
                                    className="px-3 py-3"
                                    onChange={e => setCity(e.target.value)}
                                    readOnly
                                    onFocus={e => e.target.removeAttribute("readonly")}
                                />
                                <Form.Control
                                    type="date"
                                    placeholder="Дата рождения"
                                    className="px-3 py-3"
                                    min={"1940-01-01"}
                                    max={"2008-12-31"}
                                    onChange={e => setDateBith(e.target.value)}
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
                                <span className="small text-danger">{error}</span>
                                <Button 
                                    className="w-100 btn-lg rounded-0 mt-4 mb-4 primary-button"
                                    onClick={startSignUp}
                                >
                                    Продолжить
                                </Button>
                                <span>Есть аккаунт ? <Link to="/signin">авторизуйтесь</Link></span>
                            </Form>
                        </div>

                    </div>

                </Container>

        </>
    );
}