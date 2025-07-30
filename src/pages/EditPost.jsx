import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

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

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-black to-black overflow-x-hidden font-sans flex items-center justify-center">
            <PatternBG />
            <div className="relative z-10 w-full">
                <Container>
                    <div className="py-24 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
                            Edit Post
                        </h1>
                        <div className="max-w-4xl mx-auto">
                            <PostForm post={post} />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    ) : null
}

export default EditPost