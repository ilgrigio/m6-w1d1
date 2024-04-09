import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AuthorForm from './components/authorForm/AuthorForm'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/author" element={<AuthorForm />} />
            </Routes>
        </Router>
    )
}

export default App
