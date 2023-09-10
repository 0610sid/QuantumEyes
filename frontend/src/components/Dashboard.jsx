import React, { useState, useEffect } from "react";
import styles from "../stylesheets/Dashboard.module.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const gohome = () => {
        navigate("/");
    }

    const upload = () => {
        navigate('/image/upload');
    }

    const [images, setImages] = useState([]);

    useEffect(async () => {
        const response = await fetch("http://localhost:8000/api/image/", {")
        setImages([["a", "b", "c"]])
    })

    return (
        <>
            <div className={styles.dashboard}>
                <section>
                    <center>
                        <div className={styles.buttonsflex}>
                            <button className={styles.buttons} onClick={gohome}>Home</button>
                            <button className={styles.buttons} onClick={upload}>
                                Upload Image
                            </button>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.content}>
                                <span className={styles.title}>Image</span>
                                { images }
                                {/* <img
                                    src="https://res.cloudinary.com/djb8pgo4n/image/upload/v1694371549/iyezib7zo6v6ew7il2rv.jpg"
                                    alt=""
                                /> */}
                            </div>

                            <div className={styles.content}>
                                <span className={styles.title}>Grade</span>
                                <span className={styles.text}>
                                    No Diabetic Retinopathy
                                </span>
                            </div>

                            <div className={styles.content}>
                                <span className={styles.title}>Date</span>
                                <span className={styles.text}>11/09/2023</span>
                            </div>
                        </div>
                    </center>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
