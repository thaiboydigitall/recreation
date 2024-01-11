import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "./components/header/Header";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import UserApi from "./api/UserApi";
import { Container, Spinner } from "react-bootstrap";
import Footer from "./components/footer/Footer";

function App() {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const stores = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            stores?.user.setUser(null);
            stores?.user.setIsAuth(false);
            setIsLoaded(true);
        }
        else {
            UserApi.authentication()
                .then(res => {
                    if (res != null) {
                        stores?.user.setUser(res);
                        stores?.user.setIsAuth(true);
                    }
                    else {
                        stores?.user.setIsAuth(false);
                        localStorage.removeItem('token');
                    }
                    setIsLoaded(true);
                });
        }
    }, [])

    return (
        isLoaded ?
            <>
                <Header />
                <main className="content">

                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                    </Routes>
                </main>
                <Footer />
            </>
            :
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" className="fs-3 p-4" style={{color: "var(--primary-color)"}}/>
            </Container>
          

    );

}

export default App;