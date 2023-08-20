import React from 'react'
import styles from '../stylesheets/Login.module.css'

import user from '../assets/user.png'
import password from '../assets/password.png'

const Login = () => {
  return (
    <div className={styles.outer}>
        <div className={styles.container}>
            <p className={styles.heading}>Login</p>

            <from className={styles.form}>
                <div className={styles.field}>
                    <img src={user} className={styles.img}/>
                    <input className={styles.input} placeholder='ABHA Number' type='number'/>
                </div>

                <div className={styles.field}>
                    <img src={password} className={styles.img2}/>
                    <input className={styles.input} placeholder='Password' type='password'/>
                </div>

                <button className={styles.buttons}>Login</button>
            </from>

            <p></p>
        </div>
    </div>
  )
}

export default Login