import React from 'react'
import styles from '../stylesheets/Login.module.css'

import user from '../assets/user.png'
import password from '../assets/password.png'
import email from '../assets/email.png'

const Signup = () => {
  return (
    <div className={styles.outer}>
        <div className={styles.container}>
            <p className={styles.heading}>Signup</p>

            <from className={styles.form}>
                <div className={styles.field}>
                    <img src={user} className={styles.img}/>
                    <input className={styles.input} placeholder='ABHA Number' type='number'/>
                </div>

                <div className={styles.field}>
                    <img src={email} className={styles.img2}/>
                    <input className={styles.input} placeholder='Email' type='text'/>
                </div>

                <div className={styles.field}>
                    <img src={password} className={styles.img2}/>
                    <input className={styles.input} placeholder='Password' type='password'/>
                </div>

                <div className={styles.btndiv}>
                <button className={styles.buttons}>Signup</button>
                </div>
            </from>
            
            <p className={styles.tagline} >Already a member? <a href='/login' className={styles.link}>Login</a> </p>

        </div>
    </div>
  )
}

export default Signup