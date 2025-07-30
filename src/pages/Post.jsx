import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function PatternBG() {
  return (
    <svg className="fixed inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="#3b82f6" opacity="0.12" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotPattern)" />
    </svg>
  );
}

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-black to-black overflow-x-hidden font-sans flex items-center justify-center">
            <PatternBG />
            <Container>
                <div className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                                <img 
                                    src={appwriteService.getFilePreview(post.featuredImage)} 
                                    alt={post.title} 
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                                    {post.title}
                                </h1>
                                <div className="prose prose-lg prose-invert max-w-none">
                                    {parse(post.content)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Author Actions */}
                    {isAuthor && (
                        <div className="flex justify-center gap-4 mt-8">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button 
                                    bgColor="bg-green-500" 
                                    className="px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-green-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                bgColor="bg-red-500" 
                                className="px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-red-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400" 
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    ) : null;
}