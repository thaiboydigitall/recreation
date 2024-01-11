import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST, parseDate } from "../../consts";
import { useEffect, useState } from "react";
import UserApi, { ProfileType } from "../../api/UserApi";

export default function CardPost(props: {
    k: string,
    title: string,
    description: string,
    posterUrl: string,
    userId: number,
    id: number,
    createdAt: string
}) {

    let description = props.description;

    if (props.description.length > 130)
        description = props.description.substring(0, 130) + "...";

    const [user, setUser] = useState<ProfileType | null>();

    useEffect(() => {
        UserApi.getProfileById(props.userId)
            .then(res => setUser(res))
            .catch(() => { });
    }, []);

    return (
        user != null ?
            <Card key={`${props.k}`} className="border rounded-0 shadow-custom" style={{ height: "35rem" }}>
                <Card.Img
                    src={`${API_HOST}/${props.posterUrl}`}
                    className="rounded-0 m-0"
                    style={{
                        height: "16rem",
                        width: "100%",
                        objectFit: "cover"
                    }}
                />
                <Card.Body>
                    <Link to={`/post?id=${props.id}`} className=" w-100">
                        <Card.Title>
                            <span className="d-block" style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                fontSize: "18px"
                            }}>{props.title}</span>
                        </Card.Title>
                    </Link>

                    <hr />
                    <Card.Text className="mt-4" style={{ color: "#323232" }}>
                        {description}
                    </Card.Text>
                    <div className="w-100" style={{height: "50px"}}></div>
                    <Card.Footer className="position-absolute bottom-0 w-100" style={{ left: 0 }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="small text-secondary d-block">
                                {parseDate(props.createdAt)}
                            </span>
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="pe-3 small">{user?.name}</div>
                                <div><img src={`${API_HOST}/${user?.avatarUrl}`} alt="" className=" circle" style={{ width: "42px", height: "42px" }} /></div>
                            </div>
                        </div>
                    </Card.Footer>
                </Card.Body>
            </Card>
            : <></>
    )
}