import { useEffect, useState } from "react";
import UserApi, { ProfileType } from "../../api/UserApi";
import { API_HOST, parseDate } from "../../consts";

export default function Comment(props: {
    id: number,
    postId: number,
    userId: number,
    content: string,
    createdAt: string
}) {
    const [user, setUser] = useState<ProfileType | null>(null);

    useEffect(() => {
        UserApi.getProfileById(props.userId)
            .then(res => setUser(res))
            .catch()
    }, []);

    

    return (
        user == null
            ?
            <></>
            :
            <div className=" p-3 mb-3">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <img className="circle shadow-custom" src={`${API_HOST}/${user?.avatarUrl}`} style={{ width: '42px', height: '42px' }} />
                        <div className="ms-3">
                            <span className="small">{user?.name} {user?.surname}</span>
                            <span className="d-block text-secondary" style={{ fontSize: "12px" }}>{user?.city}</span>
                        </div>
                    </div>
                    <div className="small text-secondary" style={{ fontSize: "12px" }}>
                        {parseDate(props.createdAt ?? "01-01-2001")}
                    </div>
                </div>
                <hr />
                <div>
                    {props.content}
                </div>
            </div>
    )
}