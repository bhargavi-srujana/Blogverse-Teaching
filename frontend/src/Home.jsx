// 
// numbers=[1,2,3,4,5]

import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { getPosts } from "./core/post";

// numbers.map((num)=>(html))

function Home() {

    const {user}= useAuth();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getPosts().then((data) => {
            if (!Array.isArray(data)) setError("Could not load posts");
            else setPosts(data);
        });
    }, []);


    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            <NavBar/>
            <p className="text-4xl pt-5 font-bold">Welcome back,{user ? user.fullName:'Dev Astra'}</p>
            <p className="text-lg text-gray-500 mt-4"> Discover amazing stories, insights, and ideas from our community of writers.</p>
            {error && <p className="text-red-500 mt-3">{error}</p>}
            <div className=" flex gap-10 justify-around mt-5 ">
                <Link to="/posts/new" className="px-10 py-4 cursor-pointer bg-blue-700 hover:bg-blue-900 shadow-md text-white rounded-md">Write a New Post</Link>
                <Link to="/my-posts" className="px-10 py-4 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md">View My Posts</Link>
            </div>
            <div className="mt-5 flex gap-10 flex-wrap justify-center w-full rounded-lg shadow-lg pb-5">
                {
                    posts.map((post) => (
                        <div className="w-96 bg-white shadow-lg rounded-lg" key={post._id}>
                            <div className="flex relative">
                                <img className=" rounded-t-lg  shadow-lg h-52 w-96 " src={post.image} alt="Writing" />
                                <button className="p-3 text-sm bg-white rounded-full absolute cursor-pointer right-4 top-3">Save</button>
                            </div>
                            <div className="flex gap-5 mt-3 px-2">
                                <div>
                                    <p className="font-semibold">{post.author}</p>
                                    <p className="text-gray-500">{post.category} - {post.readTime} min read</p>
                                </div>
                            </div>
                            <div className="mt-3 px-3 flex flex-col gap-3">
                                <p className="text-2xl font-bold ">{post.title}</p>
                                <p className="text-gray-600">
                                    {post.content}
                                </p>
                            </div>
                            <div className="mt-3 mb-3  px-3 flex justify-end">
                                <Link to={`/posts/${post._id}`} state={{ post }} className="text-blue-500 hover:underline cursor-pointer">Read more</Link>
                            </div>
                        </div>))
                }

            </div>
        </div>
    )
}

export default Home;
