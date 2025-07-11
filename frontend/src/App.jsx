import React from 'react'
import {Routes, Route } from 'react-router-dom';
import BlogDeatilPage from './BlogDetailComponents/BlogDeatilPage';
import Home from './HomePages/Home';
import ProjectDeatilPage from './ProjectDetailComponents/ProjectDetailPage'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogDeatilPage />} />
        <Route path="/project/:slug" element={<ProjectDeatilPage />} />
      </Routes>
    </div>
  )
}

export default App
