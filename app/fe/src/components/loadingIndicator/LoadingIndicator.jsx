import React, { useState, useEffect } from 'react'
import styles from './spinner.module.css'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

const LoadingIndicator = () => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 10000)
    }, [])

    return (
        <>
            <div className={`${styles.spinner}`}>
                <ClimbingBoxLoader color={'#36d7b7'} size={30} />
            </div>
        </>
    )
}

export default LoadingIndicator
