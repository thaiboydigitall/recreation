import axios from "axios";
import { API_HOST } from "../consts";
import { UserProps } from "../stores/UserStore";

type StatisticsType = {
    dateBirth: string,
    createdAt: string,
    posts: number,
    comments: number
}

export type ProfileType = {
    avatarUrl: string,
    name: string,
    surname: string,
    city: string
}

class UserApi {
    getBearer(): string {
        if (localStorage.getItem("token") == null)
            return "";
        return `Bearer ${localStorage.getItem("token")}`;
    }

    async signIn(login: string, password: string): Promise<string> {
        let result: string = "";

        try {
            await axios.post(`${API_HOST}/api/user/signin`, {
                login, password
            })
                .then(res => {
                    if (res.data.token == null) {
                        return result = "Ошибка сервера, попробуйте позже";
                    }
                    localStorage.setItem("token", res.data.token);
                    window.location.href = "/";
                })
                .catch(res => result = res.response.data.error)
        }
        catch (ex) {
            console.log(ex);
            result = "Ошибка сервера, попробуйте позже";
        }

        return result;
    }

    async signUp(login: string, name: string, surname: string, city: string, dateBirth: string, password: string): Promise<string> {
        let result: string = "";

        try {
            await axios.post(`${API_HOST}/api/user/signup`, {
                login, name, surname, city, dateBirth, password
            })
                .then(res => {
                    if (res.data.token == null)
                        return result = "Ошибка сервера, попробуйте позже";

                    localStorage.setItem("token", res.data.token)
                    window.location.href = "/";
                })
                .catch(res => result = res.response.data.error);
        }
        catch (ex) {
            console.log(ex);
            result = "Ошибка сервера, попробуйте позже";
        }

        return result;
    }

    async authentication(): Promise<UserProps | null> {
        let result: UserProps | null = null;
        try {
            await axios.get(`${API_HOST}/api/user/authentication`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    result = {
                        login: res.data.login,
                        name: res.data.name,
                        surname: res.data.surname,
                        city: res.data.city,
                        avatarUrl: res.data.avatar,
                        userId: res.data.userId
                    };
                })
                .catch(() => { });
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }

    async logout() {
        try {
            if (localStorage.getItem("token") != null) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
        }
        catch (ex) {
            console.log(ex);
        }
    }

    async getStatistics(): Promise<StatisticsType | null> {
        let result: StatisticsType | null = null;
        try {
            await axios.get(`${API_HOST}/api/user/getstatistics`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data.dateBirth) {
                        result = {
                            dateBirth: res.data.dateBirth,
                            createdAt: res.data.createdAt,
                            posts: res.data.posts,
                            comments: res.data.comments
                        }
                    }
                })
                .catch(() => { });
        }
        catch (ex) {
            console.log(ex);
        }
        return result;
    }

    async updateProfile(login: string, password: string, city: string, name: string, surname: string): Promise<string> {
        let result: string = "";

        try {
            await axios.put(`${API_HOST}/api/user/update`, {
                login, password, city, name, surname
            }, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(() => {
                    window.location.reload();
                })
                .catch(res => {
                    console.log(res);
                });
        }
        catch (ex) {
            console.log(ex);
            result = "Ошибка сервера, попробуйте позже";

        }

        return result;
    }

    async getProfileById(id: number): Promise<ProfileType | null> {
        let result : ProfileType | null = null;

        try {
            await axios.get(`${API_HOST}/api/user/getprofilebyid?id=${id}`)
                .then(res => {
                    if (res.data.avatarUrl) {
                        result = {
                            avatarUrl: res.data.avatarUrl,
                            name: res.data.name,
                            surname: res.data.surname,
                            city: res.data.city
                        }
                    }
                })
                .catch(() => { });
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }

    checkAuth() {
        if (localStorage.getItem("token") == null)
            window.location.href = '/signup';
    }

    async addSignedEmail(email: string) : Promise<string>
    {
        let result = "";

        try {
            await axios.post(`${API_HOST}/api/user/addsignedemail`, {email}, {headers : {Authorization: this.getBearer()}})
                .then(() => alert("Вы успешно подписались !"))
                .catch(res => alert(res.response.data.error));
        }
        catch (ex) {
            console.log(ex);
            result = "Ошибка сервера, попробуйте позже";
        }

        return result;
    }

    async getCountCreatedPosts() : Promise<number> {
        let result = 0;

        try {
            await axios.get(`${API_HOST}/api/user/getcountcreatedposts`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
            .then(res => result = res.data.count)
            .catch()
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }

    async getCountCreatedComments() : Promise<number> {
        let result = 0;

        try {
            await axios.get(`${API_HOST}/api/user/getcountcreatedcomments`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
            .then(res => result = res.data.count)
            .catch()
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }
}

export default new UserApi();