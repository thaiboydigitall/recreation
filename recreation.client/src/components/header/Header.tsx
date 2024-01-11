import { Button, Container, Dropdown, Form, Navbar, NavbarBrand } from "react-bootstrap";
import "./Header.css"
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../main";
import { API_HOST } from "../../consts";
import UserApi from "../../api/UserApi";

export default function Header() {

    const queryParams = new URLSearchParams(window.location.search);
    const stores = useContext(Context);

    const [searchContent, setSearchContent] = useState<string>(queryParams.get("search") ?? "");

    const search = () => {
        if (searchContent.length > 2)
            window.location.href = "/search?search=" + searchContent;
        else 
            window.location.href = "/posts";
    }

    return (
        <>
            <Navbar expand="sm" variant="light" bg="light" className="shadow">
                <Container>
                    <NavbarBrand className="d-flex align-items-center">
                        <Link to="/" className="d-flex align-items-center text-decoration-none">
                            <div style={{ width: "60px", height: "60px" }}>
                                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5 8.5L60 0L47.5 49.5L0 60L13.5 8.5Z" fill="#00A8CC" />
                                    <path d="M26.9531 29.125H33.7344C34.7656 29.125 35.6354 28.7917 36.3438 28.125C37.0625 27.4583 37.4219 26.5104 37.4219 25.2812C37.4219 24.375 37.0469 23.5625 36.2969 22.8438C35.5469 22.1146 34.6927 21.75 33.7344 21.75H24.0781V42H22.9531V20.625H33.7344C35.0052 20.625 36.125 21.099 37.0938 22.0469C38.0625 22.9844 38.5469 24.0625 38.5469 25.2812C38.5469 26.7812 38.0781 27.9844 37.1406 28.8906C36.2031 29.7969 35.0677 30.25 33.7344 30.25H26.9531V29.125ZM26.9531 31.375H33.7344C35.3594 31.375 36.7552 30.8073 37.9219 29.6719C39.0885 28.526 39.6719 27.0625 39.6719 25.2812C39.6719 23.75 39.0729 22.4062 37.875 21.25C36.6875 20.0833 35.3073 19.5 33.7344 19.5H21.8281V42H20.7031V18.375H33.7344C34.974 18.375 36.1354 18.6927 37.2188 19.3281C38.3125 19.9635 39.1823 20.8177 39.8281 21.8906C40.474 22.9531 40.7969 24.0833 40.7969 25.2812C40.7969 27.3333 40.099 29.0521 38.7031 30.4375C37.3177 31.8125 35.6615 32.5 33.7344 32.5H26.9531V31.375ZM26.9531 33.625H33.7344C35.1927 33.625 36.5469 33.2656 37.7969 32.5469C39.0469 31.8281 40.0469 30.8281 40.7969 29.5469C41.5469 28.2552 41.9219 26.8333 41.9219 25.2812C41.9219 23.875 41.5469 22.5573 40.7969 21.3281C40.0573 20.0885 39.0573 19.099 37.7969 18.3594C36.5365 17.6198 35.1823 17.25 33.7344 17.25H19.5781V42H18.4531V16.125H33.7344C35.3698 16.125 36.9062 16.5469 38.3438 17.3906C39.7812 18.224 40.9219 19.349 41.7656 20.7656C42.6198 22.1719 43.0469 23.6771 43.0469 25.2812C43.0469 27.1354 42.6458 28.7656 41.8438 30.1719C41.0521 31.5781 39.974 32.6771 38.6094 33.4688L41.5156 42H40.3281L37.5469 34C37.1302 34.1667 36.8125 34.2812 36.5938 34.3438L39.2031 42H38.0156L35.4688 34.6094C35.375 34.6302 35.0417 34.6667 34.4688 34.7188L36.8906 42H35.7031L33.3125 34.75H32.2969L34.5781 42H33.3906L31.0938 34.75H26.9531V33.625ZM26.3281 42H25.2031V22.875H33.7344C34.4323 22.875 35.0312 23.1146 35.5312 23.5938C36.0417 24.0625 36.2969 24.625 36.2969 25.2812C36.2969 27.0938 35.4427 28 33.7344 28H26.9531V26.875H33.7344C34.1823 26.875 34.5312 26.7604 34.7812 26.5312C35.0417 26.2917 35.1719 25.875 35.1719 25.2812C35.1719 24.9167 35.0312 24.6146 34.75 24.375C34.4792 24.125 34.1406 24 33.7344 24H26.3281V42Z" fill="white" />
                                </svg>
                            </div>
                            <h3 className="montserrat fw-900 mx-2 d-none d-lg-block mt-2">Recreation</h3>
                        </Link>

                    </NavbarBrand>

                    <Navbar.Toggle aria-controls="navbar-toggle" className="border-0">

                    </Navbar.Toggle>

                    <Navbar.Collapse id="navbar-toggle" className="text-end">
                        <div className="search-block col-10 col-sm-8 col-md-6 col-lg-6 mx-auto my-3 my-md-0">
                            <Form.Control
                                type="search"
                                className="input-search"
                                placeholder="Поиск..."
                                onChange={e => setSearchContent(e.target.value)}
                                defaultValue={searchContent}
                            />

                            <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ rotate: "90deg", cursor: "pointer" }} onClick={search}>
                                <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="var(--primary-color)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="position-relative">
                            {
                                !stores?.user.isAuth ?
                                    <Link to="/signin">
                                        <Button className="px-5 py-2 outline-primary-button">Войти</Button>
                                    </Link>
                                    :
                                    <>
                                        <Dropdown drop="start" className="d-none d-md-block">
                                            <Dropdown.Toggle variant="black" id="dropdown-basic" className="bg-transparent border-0 circle p-0">
                                                <img src={`${API_HOST}/${stores?.user.user?.avatarUrl}`} className="circle" style={{ width: '52px', height: "52px" }} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu variant="light">
                                                <Dropdown.ItemText className="text-center text-secondary">#{stores?.user.user?.login}</Dropdown.ItemText>
                                                <Dropdown.Divider></Dropdown.Divider>
                                                <Dropdown.Item href="/account" className="text-black py-2 d-flex btn-light btn">
                                                    <svg width="21px" height="21px" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_15_82)">
                                                            <g filter="url(#filter0_d_15_82)">
                                                                <path d="M14.3365 12.3466L14.0765 11.9195C13.9082 12.022 13.8158 12.2137 13.8405 12.4092C13.8651 12.6046 14.0022 12.7674 14.1907 12.8249L14.3365 12.3466ZM9.6634 12.3466L9.80923 12.8249C9.99769 12.7674 10.1348 12.6046 10.1595 12.4092C10.1841 12.2137 10.0917 12.022 9.92339 11.9195L9.6634 12.3466ZM4.06161 19.002L3.56544 18.9402L4.06161 19.002ZM19.9383 19.002L20.4345 18.9402L19.9383 19.002ZM16 8.5C16 9.94799 15.2309 11.2168 14.0765 11.9195L14.5965 12.7737C16.0365 11.8971 17 10.3113 17 8.5H16ZM12 4.5C14.2091 4.5 16 6.29086 16 8.5H17C17 5.73858 14.7614 3.5 12 3.5V4.5ZM7.99996 8.5C7.99996 6.29086 9.79082 4.5 12 4.5V3.5C9.23854 3.5 6.99996 5.73858 6.99996 8.5H7.99996ZM9.92339 11.9195C8.76904 11.2168 7.99996 9.948 7.99996 8.5H6.99996C6.99996 10.3113 7.96342 11.8971 9.40342 12.7737L9.92339 11.9195ZM9.51758 11.8683C6.36083 12.8309 3.98356 15.5804 3.56544 18.9402L4.55778 19.0637C4.92638 16.1018 7.02381 13.6742 9.80923 12.8249L9.51758 11.8683ZM3.56544 18.9402C3.45493 19.8282 4.19055 20.5 4.99996 20.5V19.5C4.70481 19.5 4.53188 19.2719 4.55778 19.0637L3.56544 18.9402ZM4.99996 20.5H19V19.5H4.99996V20.5ZM19 20.5C19.8094 20.5 20.545 19.8282 20.4345 18.9402L19.4421 19.0637C19.468 19.2719 19.2951 19.5 19 19.5V20.5ZM20.4345 18.9402C20.0164 15.5804 17.6391 12.8309 14.4823 11.8683L14.1907 12.8249C16.9761 13.6742 19.0735 16.1018 19.4421 19.0637L20.4345 18.9402Z" fill="var(--primary-color)" />
                                                            </g>
                                                        </g>
                                                        <defs>
                                                            <filter id="filter0_d_15_82" x="2.55444" y="3.5" width="18.8911" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dy="1" />
                                                                <feGaussianBlur stdDeviation="0.5" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_82" />
                                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_82" result="shape" />
                                                            </filter>
                                                        </defs>
                                                    </svg>

                                                    <span className="d-block ms-3">
                                                        Личный кабинет
                                                    </span>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="/createpost" className="text-black py-2 d-flex btn-light btn">
                                                    <svg width="21px" height="21px" viewBox="0 0 21 22.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                                        <path d="M12 6L12 8M12 8L12 10M12 8H9.99998M12 8L14 8" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M8 14H9M16 14H12" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M9 18H15" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C20.4816 3.82476 20.7706 4.69989 20.8985 6M21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3.51839 20.1752 3.22937 19.3001 3.10149 18" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <span className="d-block ms-3">
                                                        Создать
                                                    </span>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="/myposts" className="text-black py-2 d-flex btn-light btn">
                                                    <svg width="21px" height="21px" viewBox="0 0 21 22.5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 12H9M16 12H12" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M16 8H15M12 8H8" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M8 16H13" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C20.4816 3.82476 20.7706 4.69989 20.8985 6M21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3.51839 20.1752 3.22937 19.3001 3.10149 18" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <span className="d-block ms-3">
                                                        Мои объявления
                                                    </span>
                                                </Dropdown.Item>
                                                <Dropdown.Divider></Dropdown.Divider>
                                                <Dropdown.Item onClick={e => { e.preventDefault(); UserApi.logout(); }} className="text-black py-2 d-flex btn-light btn">
                                                    <svg width="21px" height="21px" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ rotate: "180deg" }}>
                                                        <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <span className="d-block ms-3">
                                                        Выйти
                                                    </span>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="d-md-none" style={{ width: "100px", height: "60px" }}>
                                        </div>
                                        <Dropdown drop="start" className="d-md-none position-absolute" style={{ right: "25px", top: "3px" }}>
                                            <Dropdown.Toggle variant="black" id="dropdown-basic" className="bg-transparent border-0 circle p-0">
                                                <img src={`${API_HOST}/${stores?.user.user?.avatarUrl}`} className="circle" style={{ width: '52px', height: '52px' }} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu variant="light">
                                                <Dropdown.ItemText className="text-center text-secondary">#{stores?.user.user?.login}</Dropdown.ItemText>
                                                <Dropdown.Divider></Dropdown.Divider>
                                                <Dropdown.Item href="/account" className="text-black py-2 d-flex btn-light btn">
                                                    <svg width="21px" height="21px" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_15_82)">
                                                            <g filter="url(#filter0_d_15_82)">
                                                                <path d="M14.3365 12.3466L14.0765 11.9195C13.9082 12.022 13.8158 12.2137 13.8405 12.4092C13.8651 12.6046 14.0022 12.7674 14.1907 12.8249L14.3365 12.3466ZM9.6634 12.3466L9.80923 12.8249C9.99769 12.7674 10.1348 12.6046 10.1595 12.4092C10.1841 12.2137 10.0917 12.022 9.92339 11.9195L9.6634 12.3466ZM4.06161 19.002L3.56544 18.9402L4.06161 19.002ZM19.9383 19.002L20.4345 18.9402L19.9383 19.002ZM16 8.5C16 9.94799 15.2309 11.2168 14.0765 11.9195L14.5965 12.7737C16.0365 11.8971 17 10.3113 17 8.5H16ZM12 4.5C14.2091 4.5 16 6.29086 16 8.5H17C17 5.73858 14.7614 3.5 12 3.5V4.5ZM7.99996 8.5C7.99996 6.29086 9.79082 4.5 12 4.5V3.5C9.23854 3.5 6.99996 5.73858 6.99996 8.5H7.99996ZM9.92339 11.9195C8.76904 11.2168 7.99996 9.948 7.99996 8.5H6.99996C6.99996 10.3113 7.96342 11.8971 9.40342 12.7737L9.92339 11.9195ZM9.51758 11.8683C6.36083 12.8309 3.98356 15.5804 3.56544 18.9402L4.55778 19.0637C4.92638 16.1018 7.02381 13.6742 9.80923 12.8249L9.51758 11.8683ZM3.56544 18.9402C3.45493 19.8282 4.19055 20.5 4.99996 20.5V19.5C4.70481 19.5 4.53188 19.2719 4.55778 19.0637L3.56544 18.9402ZM4.99996 20.5H19V19.5H4.99996V20.5ZM19 20.5C19.8094 20.5 20.545 19.8282 20.4345 18.9402L19.4421 19.0637C19.468 19.2719 19.2951 19.5 19 19.5V20.5ZM20.4345 18.9402C20.0164 15.5804 17.6391 12.8309 14.4823 11.8683L14.1907 12.8249C16.9761 13.6742 19.0735 16.1018 19.4421 19.0637L20.4345 18.9402Z" fill="var(--primary-color)" />
                                                            </g>
                                                        </g>
                                                        <defs>
                                                            <filter id="filter0_d_15_82" x="2.55444" y="3.5" width="18.8911" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                <feOffset dy="1" />
                                                                <feGaussianBlur stdDeviation="0.5" />
                                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_82" />
                                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_82" result="shape" />
                                                            </filter>
                                                        </defs>
                                                    </svg>

                                                    <span className="d-block ms-3">
                                                        Личный кабинет
                                                    </span>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="/createpost" className="text-black py-2 d-flex btn-light btn">
                                                    <svg width="21px" height="21px" viewBox="0 0 21 22.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                                                        <path d="M12 6L12 8M12 8L12 10M12 8H9.99998M12 8L14 8" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M8 14H9M16 14H12" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M9 18H15" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C20.4816 3.82476 20.7706 4.69989 20.8985 6M21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3.51839 20.1752 3.22937 19.3001 3.10149 18" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <span className="d-block ms-3">
                                                        Создать
                                                    </span>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="/myposts" className="text-black py-2 d-flex btn-light btn">
                                                    <svg width="21px" height="21px" viewBox="0 0 21 22.5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 12H9M16 12H12" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M16 8H15M12 8H8" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M8 16H13" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C20.4816 3.82476 20.7706 4.69989 20.8985 6M21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3.51839 20.1752 3.22937 19.3001 3.10149 18" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <span className="d-block ms-3">
                                                        Мои объявления
                                                    </span>
                                                </Dropdown.Item>
                                                <Dropdown.Divider></Dropdown.Divider>
                                                <Dropdown.Item onClick={e => { e.preventDefault(); UserApi.logout(); }} className="text-black py-2 d-flex btn-light btn">
                                                    <svg width="21px" height="21px" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ rotate: "180deg" }}>
                                                        <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <span className="d-block ms-3">
                                                        Выйти
                                                    </span>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </>
                            }

                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
