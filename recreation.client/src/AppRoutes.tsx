import Account from "./pages/account/Account";
import CreatePost from "./pages/createpost/CreatePost";
import FAQ from "./pages/faq/FAQ";
import Home from "./pages/home/Home";
import MyPosts from "./pages/myposts/MyPosts";
import Post from "./pages/post/Post";
import Posts from "./pages/posts/Posts";
import Search from "./pages/search/Search";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";

const AppRoutes = [
    {
        index: true,
        element: <Home />,
    },
    {
        path: "/signin",
        element: <SignIn />
    },
    {
        path: "/signup",
        element: <SignUp />
    }, 
    {
        path: "/account",
        element: <Account />
    },
    {
        path: "/faq",
        element: <FAQ />
    },
    {
        path: "/createpost",
        element: <CreatePost />
    },
    {
        path: "/post",
        element: <Post />
    },
    {
        path: "/posts",
        element: <Posts />
    },
    {
        path: "/myposts",
        element: <MyPosts />
    },
    {
        path: "/search",
        element: <Search />
    }
]

export default AppRoutes;