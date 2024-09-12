import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Common/Header/Header';
import GetAllBlogs from './Components/Blogs/GetAllBlogs/GetAllBlogs';
import Navbar from './Components/Common/Navbar/Navbar';
import BlogDetails from './Components/Blogs/BlogDetails/BlogDetails';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<> <Navbar/> <Header/> <GetAllBlogs/> </>}/>
        <Route path='/blogdetails' element={<> <Navbar/> <Header/> <BlogDetails/> </>}/>
        
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
