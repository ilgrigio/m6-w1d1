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
        <form onSubmit={onSubmit}>
            <input
                onChange={onChangeInput}
                type="text"
                name="userName"
                placeholder="Inserisci user"
            />
            {/* <input onChange={onChangeInput} type="text" name="userSurname" /> */}
            <input
                onChange={onChangeInput}
                type="password"
                name="password"
                placeholder="Inserisci la password"
            />
            <input
                onChange={onChangeInput}
                type="email"
                name="email"
                placeholder="Inserisci email"
            />
            <input
                onChange={onChangeInput}
                type="text"
                name="age"
                placeholder="Inserisci l'età"
            />
            <input
                onChange={onChangeInput}
                type="text"
                name="role"
                placeholder="Inserisci il ruolo"
            />

            <button className="btn btn-primary" type="submit">
                Registrati
            </button>
        </form>
    )
}
export default SignupForm
