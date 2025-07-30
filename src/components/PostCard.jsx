import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

  return (
    <Link to={`/post/${$id}`}>
      <div className=' bg-gray-100 flex flex-col justify-center gap-8 rounded-xl p-4 transition-transform hover:shadow-lg hover:scale-105'>

        <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
          className='rounded-xl h-[20vh] w-[15vw]' />

        <h2 className='text-xl font-bold'>
          {title}
        </h2>
      </div>
    </Link>
  )
}


export default PostCard