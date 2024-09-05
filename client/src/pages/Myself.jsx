import React from 'react'
import { FaGithub, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa'

const Myself = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-950">
  <div className="w-1/2 shadow-3xl rounded-xl p-10 border bg-zinc-700">
    <h2 className="text-3xl font-bold leading-tight text-gray-100 shadow-3xl sm:text-4xl xl:text-5xl mb-6">About me</h2>
    <div className="flex justify-around gap-11 items-center">
      <div>
        <img src="https://avatars.githubusercontent.com/u/110277485?v=4" alt="" className="rounded-2xl" />
      </div>
      <div>
        <h1 className="font-extrabold text-3xl">Hi, I am Soumargha</h1>
        <p className="font-semibold text-sm">I am a full stack developer and data analyst currently pursuing my studies at the National Institute of Technology, Agartala, with an anticipated graduation in 2025. In addition to my academic and professional pursuits, I have a passion for playing cricket and love dedicating time to composing unique and cool background music. Let's connect😊</p>
        
        <div className="flex space-x-4 mt-4">
          <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-6 h-6 text-gray-100" />
          </a>
          <a href="https://www.instagram.com/your-instagram-username" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-6 h-6 text-gray-100" />
          </a>
          <a href="https://www.facebook.com/your-facebook-username" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-6 h-6 text-gray-100" />
          </a>
          <a href="mailto:your-email@example.com">
            <FaEnvelope className="w-6 h-6 text-gray-100" />
          </a>
        </div>

        <button href="" className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-white">
          <span className="ml-2">See my Resume</span>
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Myself
