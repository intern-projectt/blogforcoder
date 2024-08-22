import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Blogs from './pages/blogs';
import WriteBlogs from './pages/writeblogs';
import Blogspage from './components/blogspage/blogspage';
import Chatgpt from './components/chatgpt/chatgpt';
import { UserProvider } from './components/contexts/UserContext';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token');

  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/writeblogs' element={<WriteBlogs title={"Write"} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/blogspage/:id' element={<Blogspage />} />
          <Route path='/updateblogs/:id' element={<WriteBlogs title={"Update"} />} />
          {isUserSignedIn && <Route path='/account' element={<Account />} />}
        </Routes>
        {/* <Chatgpt/> */}
      </div>
    </UserProvider>
  );
}

export default App;
