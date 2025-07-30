import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate } from 'react-router-dom';

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

function AllPosts() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPost([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-black to-black overflow-x-hidden font-sans flex items-center justify-center">
                <PatternBG />
                <Container>
                    <div className="min-h-screen flex flex-col justify-center items-center relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">No posts available</h2>
                        <button
                            onClick={() => navigate('/add-post')}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-8"
                        >
                            Add Post
                        </button>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-x-hidden font-sans flex items-center justify-center">
            <PatternBG />
            <Container>
                <div className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
                        All Posts
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <div key={post.$id} className="transform transition-all duration-300 hover:scale-[1.02]">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
