import React, { useState, useEffect } from "react";
import styles from "../stylesheets/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();

    const gohome = () => {
        navigate("/");
    }

    const upload = () => {
        navigate('/image/upload');
    }

    const [alldata, setAllData] = useState([]);
    let once = true;

    useEffect(() => {
        const getdata = async () => {
            const id = localStorage.getItem("ID")
            const response = await axios.post("http://localhost:5000/getdata", { abhaid: id })
            setAllData(response.data.data)
            console.log(alldata)
        }
        if (once) {
            getdata();
            once = false;
        }
    }, [once])

    console.log(alldata)

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
                            <table className={styles.dashtable}>
                                <thead>
                                    <tr>
                                        <th>Images</th>
                                        <th>Grade</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alldata.map((data, index) => {
                                        return (
                                            <tr>
                                                <td><img src={data.url} height='100%' className={styles.imgtable}/></td>
                                                <td>{data.diag}</td>
                                                <td>{data.date}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </center>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
