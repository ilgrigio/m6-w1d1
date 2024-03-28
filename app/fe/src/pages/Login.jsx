import React, { useState } from 'react'
import LoginForm from '../components/loginForm/Login'
import SignupForm from '../components/signupForm/SignupForm'

const Login = () => {
    const [showSignUpForm, setShowSignUpForm] = useState(false)
    const toggleForm = () => setShowSignUpForm(!SignupForm)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 col-lg-5">
                    <h2 className="text-center text-dark mt-5">Login</h2>
                    <div className="card my-5">
                        {showSignUpForm ? (
                            <SignupForm toggleForm={toggleForm} />
                        ) : (
                            <LoginForm toggleForm={toggleForm} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
