import React from 'react'

const Footer = () => {
  return (
    <footer className=" bg-gray-800 text-gray-300 p-6">
      <div className="container mx-auto text-center">
        <h6 className="text-white mt-16">All rights reserved</h6>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Expense Management. Made with ❤️ by Soumargha
        </p>
      </div>
    </footer>
  )
}

export default Footer
