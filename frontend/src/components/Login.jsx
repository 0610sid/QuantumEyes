import React, { useState } from 'react'
import styles from '../stylesheets/Login.module.css'

import user from '../assets/user.png'
import password from '../assets/password.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [abha, setabha] = useState("")
    const [pass, setpass] = useState("")

    const navigate = useNavigate()

    const onchange1 = (event) => {
        setabha(event.target.value)
    }

    const onchange2 = (event) => {
        setpass(event.target.value)
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        console.log(abha)
        console.log(pass)

        const response = await fetch("http://localhost:3456/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ abhaid : abha, password: pass }),
            }
        )

        const json = await response.json()

        if(json.success)
        {
            localStorage.setItem("Token", json.authToken)
            navigate("/")       
        }
    }

    return (
        <div className={styles.outer}>
            <div className={styles.container}>
                <p className={styles.heading}>Login</p>

                <form className={styles.form} onSubmit={handlesubmit}>
                    <div className={styles.field}>
                        <img src={user} className={styles.img} />
                        <input className={styles.input} placeholder='ABHA Number' type='number' onChange={onchange1} />
                    </div>

                    <div className={styles.field}>
                        <img src={password} className={styles.img2} />
                        <input className={styles.input} placeholder='Password' type='password' onChange={onchange2} />
                    </div>
                    <div className={styles.btndiv}>
                        <button className={styles.buttons}>Login</button>
                    </div>
                </form>

                <p className={styles.tagline} >Not a member yet? <a href='/signup' className={styles.link}>SignUp</a> </p>

            </div>
        </div>
    )
}

export default Login