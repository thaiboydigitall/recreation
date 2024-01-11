import axios from "axios";
import { API_HOST } from "../consts";

export type CommentType = {
    userId: number,
    id: number,
    content: string,
    createdAt: string,
    postId: number
}

export type PostType = {
    createdAt: string,
    description: string,
    id: number,
    posterUrl: string,
    title: string,
    userId: number,
    views: number,

    comments : CommentType[] | null,

}

class PostApi {

    getBearer() : string {
        if (localStorage.getItem("token") == null)
            return "";
        return `Bearer ${localStorage.getItem("token")}`;
    }

    async create(image: any, title: string, description: string) : Promise<string> {
        let result : string = "";
        try {

            var data = new FormData();
            console.log(image)
            data.append('image', image);
            data.append('title', title);
            data.append('description', description);

            await axios.post(`${API_HOST}/api/post/create`, data, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                    Authorization : this.getBearer()
                }
            })
            .then((res) => {
                if (res.data.postId)
                    window.location.href = "/post?id=" + res.data.postId;
            })
            .catch(() => {});
        }
        catch(ex) {
            console.log(ex);
            result = "Ошибка сервера, попробуйте позже";
        }
        return result;
    }

    async getLatests() : Promise<PostType[]>{
        let result : PostType[] = [];
        try {
            await axios.get(`${API_HOST}/api/post/getlatests`)
                .then(res => {
                    if (res.data) {
                        if (res.data.length > 0) {
                            res.data.map((item : any) => {
                                result.push({
                                    title: item.title,
                                    createdAt: item.createdAt,
                                    posterUrl: item.posterUrl,
                                    userId: item.userId,
                                    id: item.id,
                                    description: item.description,
                                    views: item.views,
                                    comments: null
                                });
                            });
                            
                        }
                    }
                })
                .catch(() => {});
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }

    async getById(id: number) : Promise<PostType | null> {
        let result : PostType | null = null;

        try {
            await axios.get(`${API_HOST}/api/post/getbyid?id=${id}`)
                .then(res => {
                    if (res.data.id)
                    {
                        result = {
                            title: res.data.title,
                            createdAt: res.data.createdAt,
                            description: res.data.description,
                            userId: res.data.userId,
                            id: res.data.id,
                            posterUrl: res.data.posterUrl,
                            comments : res.data.comments,
                            views: res.data.views
                        }
                    }
                })
                .catch(() => {});
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }

    async addComment(postId: number, content: string) : Promise<string> {
        let result = "";

        try {
            await axios.post(`${API_HOST}/api/post/addcomment`, {
                postId, comment: content
            }, {
                headers : {
                    Authorization: this.getBearer()
                }
            })
            .then(() => window.location.reload())
            .catch()
        }
        catch (ex) {
            console.log(ex);
            result = "Ошибка сервера, попробуйте позже";
        }

        return result;
    }


    async getPage(count: number, page: number, order: number) : Promise<PostType[]>{
        let result : PostType[] = [];
        try {
            await axios.get(`${API_HOST}/api/post/getpage?count=${count}&page=${page}&order=${order}`)
                .then(res => {
                    if (res.data) {
                        if (res.data.length > 0) {
                            res.data.map((item : any) => {
                                result.push({
                                    title: item.title,
                                    createdAt: item.createdAt,
                                    posterUrl: item.posterUrl,
                                    userId: item.userId,
                                    id: item.id,
                                    description: item.description,
                                    views: item.views,
                                    comments: null
                                });
                            });
                            
                        }
                    }
                })
                .catch(() => {});
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }

    async getCount() : Promise<number>
    {
        let result = 0;
        try {
            await axios.get(`${API_HOST}/api/post/getcount`)
                .then(res => result = res.data)
                .catch();
        }
        catch (ex) {
            console.log(ex);
        }
        return result;
    }

    async getMyPosts() : Promise<PostType[]> {
        let result : PostType[] = [];

        try {
            await axios.get(`${API_HOST}/api/post/getmyposts`, {
                headers: {
                    Authorization: this.getBearer()
                }
            })
                .then(res => {
                    if (res.data.length > 0) {
                        res.data.map((item : any) => {
                            result.push({
                                title: item.title,
                                createdAt: item.createdAt,
                                posterUrl: item.posterUrl,
                                userId: item.userId,
                                id: item.id,
                                description: item.description,
                                views: item.views,
                                comments: null
                            });
                        });
                        
                    }
                })
                .catch(() => {});
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }

    async search(count: number, page: number, text: string) : Promise<PostType[]>{
        let result : PostType[] = [];
        try {
            await axios.get(`${API_HOST}/api/post/search?count=${count}&page=${page}&text=${text}`)
                .then(res => {
                    if (res.data) {
                        if (res.data.length > 0) {
                            res.data.map((item : any) => {
                                result.push({
                                    title: item.title,
                                    createdAt: item.createdAt,
                                    posterUrl: item.posterUrl,
                                    userId: item.userId,
                                    id: item.id,
                                    description: item.description,
                                    views: item.views,
                                    comments: null
                                });
                            });
                            
                        }
                    }
                })
                .catch(() => {});
        }
        catch (ex) {
            console.log(ex);
        }

        return result;
    }

    async getCountSearch(text: string) : Promise<number>
    {
        let result = 0;
        try {
            await axios.get(`${API_HOST}/api/post/getcountsearch?text=${text}`)
                .then(res => result = res.data)
                .catch();
        }
        catch (ex) {
            console.log(ex);
        }
        return result;
    }
}

export default new PostApi();