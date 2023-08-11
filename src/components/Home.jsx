import React from "react";

import styles from "../stylesheets/Home.module.css";
import navb from "../stylesheets/Navbar.module.css";

import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

const Home = () => {

    let navigate = useNavigate()

    const func1 = (e) =>{
        navigate('/image/upload')
    }

  return (
    <>
      <nav className={navb.navbar}>
        <button className={navb.buttonhome} onClick={func1}>Get Started</button>
      </nav>

      <div className={styles.container}>
        <div className={styles.headings}>
          <p className={styles.title}>
            <Typewriter
              options={{
                strings: ["QuantumEyes"],
                autoStart: true,
                deleteSpeed: Infinity,
              }}
            />
          </p>

          <p className={styles.tagline}>
            Exploring Diabetic Retinopathy with Quantum Computing
          </p>
        </div>

        <div>
          <p className={styles.aboutus}>About Us</p>

          <p className={styles.abouttxt}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            porro perspiciatis error inventore ex, quibusdam ad est aut vel
            ratione molestiae a, sed, laboriosam voluptate quisquam rerum
            nostrum? Aliquid, corporis!
          </p>
        </div>

        <div>
          <p className={styles.testedtxt}>Get Tested</p>
          <p className={styles.steps}>In 3 Simple Steps</p>
        </div>

        <div className={styles.stepsdiv}>
          <div>
            <div className={styles.stepimg}></div>
            <p className={styles.steptxt}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              porro perspiciatis error
            </p>
          </div>

          <div>
            <div className={styles.stepimg}></div>
            <p className={styles.steptxt}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              porro perspiciatis error
            </p>
          </div>

          <div>
            <div className={styles.stepimg}></div>
            <p className={styles.steptxt}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              porro perspiciatis error
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
