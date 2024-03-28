import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignupForm from './components/signupForm/SignupForm'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<SignupForm />} />
                <Route exact path="/" element={<Login />} />
                <Route exact path="/home" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App
