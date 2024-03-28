import { useState } from 'react'

const SignupForm = () => {
    const [signupFormData, setSignupFormData] = useState({})
    // console.log(signupFormData)

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setSignupFormData({
            ...signupFormData,
            [name]: value,
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            return await fetch(
                `${process.env.REACT_APP_SERVER_BASE_URL}/createUser`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupFormData),
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center text-dark mt-5">Registrati</h2>

                    <div className="card my-5">
                        <form onSubmit={onSubmit}>
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

                            {/* Sei già registrato? */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignupForm
