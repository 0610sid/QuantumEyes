import React from "react";

import styles from "../stylesheets/Home.module.css";
import navb from "../stylesheets/Navbar.module.css";

import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

import uploadimg from "../assets/upload.png";
import brain from "../assets/brain.png";
import eyescanner from "../assets/eye-scanner.png";

import ChatBot from "./ChatBot.jsx";

const Home = () => {
  let navigate = useNavigate();

  const func1 = (e) => {
    navigate("/image/upload");
  };

  return (
    <>
      <nav className={navb.navbar}>
        <button className={navb.buttonhome} onClick={func1}>
          Get Started
        </button>
      </nav>
      <ChatBot/>
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
            <div className={styles.stepparent}>
              <div className={styles.stepimg}>
                <img
                  src={eyescanner}
                  alt="Eye Scanner"
                  className={styles.img}
                />
              </div>
              <p className={styles.steptxt}>
                Click a picture of your eye under a{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Fundus_(eye)"
                  className={styles.link}
                >
                  Fundus
                </a>{" "}
                or using a 20D lens attachment which matches the image above.
              </p>
            </div>

            <div className={styles.stepparent}>
              <div className={styles.stepimg}>
                <img
                  src={uploadimg}
                  alt="Upload Image"
                  className={styles.img2}
                />
              </div>
              <p className={styles.steptxt}>
              Conveniently upload images by dragging or selecting them directly from your device.
              </p>
            </div>

            <div className={styles.stepparent}>
              <div className={styles.stepimg}>
                <img src={brain} alt="Upload Image" className={styles.img2} />
              </div>
              <p className={styles.steptxt}>
                Await AI Assessment:<br/> Attain Instant Results, Detailed Overview
              </p>
              <a href="/image/upload" className={styles.testnow}>Test Now</a>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home;
