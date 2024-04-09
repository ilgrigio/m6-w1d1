import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'

const SignupForm = ({ toggleForm }) => {
    const [signupFormData, setSignupFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setSignupFormData({
            ...signupFormData,
            [name]: value,
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true) // loading a true

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_BASE_URL}/createUser`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupFormData),
                }
            )
            const result = await response.json()
            setLoading(false)
            navigate('/home')
            return result
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <form
                    onSubmit={onSubmit}
                    className="card-body cardbody-color p-lg-5 d-flex flex-column justify-content-center align-items-center"
                >
                    <div className="mb-3">
                        <input
                            onChange={onChangeInput}
                            type="text"
                            name="userName"
                            placeholder="Inserisci user"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            onChange={onChangeInput}
                            type="password"
                            name="password"
                            placeholder="Inserisci la password"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            onChange={onChangeInput}
                            type="email"
                            name="email"
                            placeholder="Inserisci email"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            onChange={onChangeInput}
                            type="age"
                            name="age"
                            placeholder="Inserisci l'età"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            onChange={onChangeInput}
                            type="text"
                            name="role"
                            placeholder="Inserisci il ruolo"
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Registrati
                    </button>
                    <div
                        onClick={() => toggleForm()}
                        id="emailHelp"
                        className="form-text text-center mb-5 text-dark"
                    >
                        Sei già registrato?
                        <a href="#" className="text-dark fw-bold ms-1">
                            Effettua il Login
                        </a>
                    </div>
                </form>
            )}
        </>
    )
}
export default SignupForm
