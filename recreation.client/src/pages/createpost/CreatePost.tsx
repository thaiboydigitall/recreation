import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PostApi from "../../api/PostApi";
import UserApi from "../../api/UserApi";

export default function CreatePost() {
    useEffect(() => UserApi.checkAuth(), []);

    const [imageUrl, setImageUrl] = useState<string>("");

    const [image, setImage] = useState();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [error, setError] = useState<string>("");

    const onImageChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        }
    }

    const createPost = async () => {
        if (!image)
            return setError("Выберите фотографию для объявления !");
        if (title.length < 3)
            return setError("Введите заголовок !");
        if (description.length < 40)
            return setError("Слишком короткое описание (минимум 40 символов)");

        setError("");
        setError(await PostApi.create(image, title, description))
    }

    return (
        <>
            <Container>
                <h4 className="fw-600 text-center my-5">Создание объявления</h4>
                <Form encType="multipart/form-data">
                <Row xs="1" lg="2">
                    <Col className="pe-lg-5">
                        <div className="h-100">
                            <Form.Group className="mb-4">
                                <Form.Label>Фотография</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="rounded-0 p-3"
                                    onChange={onImageChange}
                                    accept={"image/png, image/jpeg, image/jpg"} 
                                />
                            </Form.Group>
                            <Form.Label>Предпросмотр</Form.Label>
                            <div className="w-100 border bg-white" style={{height: "274px"}}>
                                <img className="mx-auto d-block" src={imageUrl} style={{maxHeight: "272px"}} />
                            </div>
                            
                        </div>
                                
                    </Col>
                    <Col>
                        <div>
                            <div>
                            <Form.Group>
                                <Form.Label>Заголовок</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите заголовок"
                                    className="py-3 px-3 rounded-0"
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            </div>
                            <div>
                            <Form.Group className="mt-4">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите описание вашей идеи"
                                    className="py-3 px-3 rounded-0"
                                    as="textarea"
                                    rows={10}
                                    style={{resize: "none"}}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
                </Form>

                <div className="w-100 mt-5">
                <Button onClick={() => createPost()} className="w-100 primary-button p-3  px-5 rounded-0 col-12 col-md-6 fs-5 mx-auto d-block">
                    Создать
                </Button>
                <span className="d-block text-center text-danger mt-4">{error}</span>
                </div>
                
            </Container>
        </>
    )
}