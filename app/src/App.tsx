import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Chat from './pages/Chat'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
