import { useContext, useEffect, useState } from "react";
import PostApi, { PostType } from "../../api/PostApi";
import { API_HOST, parseDate } from "../../consts";
import { Container, Form } from "react-bootstrap";
import UserApi, { ProfileType } from "../../api/UserApi";
import './Post.css'
import { Context } from "../../main";
import Comment from "../../components/comment/Comment";

export default function Post() {

    const queryParams = new URLSearchParams(window.location.search);

    const [post, setPost] = useState<PostType | null>(null);
    const [user, setUser] = useState<ProfileType | null>(null);

    const [comment, setComment] = useState<string>("");
    const [error, setError] = useState<string>("");

    const stores = useContext(Context);

    useEffect(() => {
        PostApi.getById(Number(queryParams.get("id") ?? 1))
            .then(res => {
                setPost(res);
                UserApi.getProfileById(res?.userId ?? 1)
                    .then(res => setUser(res))
                    .catch();
            })
            .catch(() => { });
    }, [])

    const addComment = async () => {
        if (!(stores?.user.isAuth ?? true))
            return window.location.href = '/signin';
        if (comment.length < 3)
            return setError("Слишком короткий комментарий");
        if (comment.length > 500)
            return setError("Сликшом длинный комментарий");

        setError(await PostApi.addComment(post?.id ?? 0, comment));
    }

    return (
        <>
            <Container>
                {
                    post != null ?
                        <>
                            <h5 className="mt-5 text-center">{post?.title}</h5>

                            <div className="d-lg-flex mt-4 border shadow-custom h-100">
                                <div className="col-12 col-lg-6">
                                    <img src={`${API_HOST}/${post?.posterUrl}`} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div>
                                <div className="col-12 col-lg-6 px-3 px-lg-5 position-relative pt-4">
                                    <div className="small text-secondary mb-3 d-flex justify-content-between">
                                        <label className="d-block">Описание идеи</label>
                                        <div className="d-flex align-items-center">
                                            <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z" fill="var(--primary-hover-color)" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z" fill="var(--primary-hover-color)" />
                                            </svg>
                                            <span className="ms-1 small">
                                                {post?.views}
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <span>{post?.description}</span>
                                    <div className="w-100" style={{ height: "128px" }}>

                                    </div>
                                    <div className="px-3 px-lg-5 position-absolute w-100" style={{ bottom: '10px', left: "0px" }}>
                                        <hr />
                                        <div className="d-flex justify-content-between w-100 align-items-end">
                                            <div className="d-flex align-items-center">
                                                {
                                                    user == null ? <></> : <>
                                                        <img className="circle shadow-custom" src={`${API_HOST}/${user?.avatarUrl}`} style={{ width: '64px', height: '64px' }} />
                                                        <div className="ms-3">
                                                            <span>{user?.name} {user?.surname}</span>
                                                            <span className="d-block small text-secondary">{user?.city}</span>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                            <div className="small text-secondary">
                                                {parseDate(post?.createdAt ?? "01-01-2001")}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                                    <div className="mt-5">
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Комментарий</Form.Label>
                                                <div className="d-flex align-items-center input-comment-block position-relative">
                                                    <Form.Control
                                                        className="rounded-0 px-3 input-comment position-relative"
                                                        as="textarea"
                                                        style={{ resize: "none" }}
                                                        rows={3}
                                                        placeholder="Введите комментарий..."
                                                        onChange={e => setComment(e.target.value)}
                                                    />
                                                    <div className="input-comment-label small text-secondary ps-3">{stores?.user.user?.name} {stores?.user.user?.surname} :</div>
                                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-send" onClick={() => addComment()}>
                                                        <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </Form.Group>
                                        </Form>
                                        <div className="text-center small text-danger">{error}</div>
                                    </div>

                            <div className="mt-5">
                                {
                                    post?.comments?.map(item => <Comment {...item} key={item.id} />)
                                }
                            </div>
                        </>
                        :
                        <>
                        </>
                }
            </Container>
        </>
    )
}
