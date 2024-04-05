import React from 'react'
import { useState, useNavigate } from 'react'

const AuthorForm = () => {
    // const client = new AxiosClient()
    const [formData, setFormData] = useState({})
    //Stato per i file da caricare
    const [file, setFile] = useState(null)
    console.log(formData)
    console.log(file)

    // Handle per il caricamento file
    const onChangeHandleFile = (e) => {
        setFile(e.target.files[0])
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const uploadFile = async () => {
        const fileData = new FormData()
        fileData.append('avatar', file)

        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_BASE_URL}/author/uploadImg`,
                {
                    method: 'POST',
                    body: fileData,
                }
            )
            return await response.json()
        } catch (error) {
            console.log('errore upload' + error.message)
        }
    }

    // const navigate = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault()
        if (file) {
            try {
                const uploadedFile = await uploadFile(file)
                const bodyToSend = {
                    ...formData,
                    avatar: uploadedFile.sourceImg,
                }
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_BASE_URL}/createAuthor`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(bodyToSend),
                    }
                )
                return await response.json()
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="card-body cardbody-color p-lg-5"
            >
                <div className="text-center">
                    <img
                        src="https://picsum.photos/340/340"
                        className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                        width="200px"
                        alt="profile"
                    />
                </div>

                <div className="mb-3">
                    <input
                        onChange={onChangeInput}
                        type="text"
                        className="form-control"
                        name="firstName"
                        aria-describedby="emailHelp"
                        placeholder="Inserisci il tuo nome"
                    />
                </div>

                <div className="mb-3">
                    <input
                        onChange={onChangeInput}
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Inserisci il tuo cognome"
                    />
                </div>
                <div className="mb-3">
                    <input
                        onChange={onChangeInput}
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Inserisci la tua email"
                    />
                </div>
                <div className="mb-3">
                    <input
                        onChange={onChangeInput}
                        type="date"
                        className="form-control"
                        name="birthday"
                        placeholder="Inserisci la tua data di nascita"
                    />
                </div>
                <div className="mb-3">
                    <input
                        onChange={onChangeHandleFile}
                        type="file"
                        className="form-control"
                        name="avatar"
                        placeholder="Inserisci il tuo avatar"
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-primary px-5 mb-5 w-100"
                    >
                        SignUp
                    </button>
                </div>

                {/* { <div>
                    onClick={() => toggleForm()}
                    <a href="#" className="text-dark fw-bold ms-1">
                        Entra nell'area Autori
                    </a>
                </div> } */}
            </form>
        </div>
    )
}

export default AuthorForm
