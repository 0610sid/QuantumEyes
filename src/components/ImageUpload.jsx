import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { ClipLoader } from "react-spinners";

import styles from "../stylesheets/ImageUp.module.css";
import imguploadsvg from "./imgupload.svg";

const ImageUpload = () => {
  const [clickme, setclickme] = useState(true);
  const [loader, setloader] = useState(false);
  const [result, setresult] = useState(false);

  const [filename, setfilename] = useState(null);
  const [error, setError] = useState(null);

  const file = useRef(null);

  const handlefiles = async (param) => {
    if (param[0]) {
      const type = param[0].type;
      const splitted = type.split("/");

      let temp1 = "jpeg";
      let temp2 = "png";

      if (splitted[1] === temp1 || splitted[1] === temp2) {
        file.current = param[0];
        setfilename(file.current.name);
        setError(null);
      } else {
        setError("Please upload supported files only");
        setfilename(null);
        file.current = null;
      }
    } else {
      setError("Please upload single file only");
      setfilename(null);
      file.current = null;
    }

    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  const handlesubmit = () => {
    setclickme(false);
    setloader(true);
    console.log(file.current);

    setTimeout(() => {
      setloader(false);
      setresult(true);
    }, 8000);
  };

  //   useEffect(() => {
  //     const filediv = document.getElementById("acceptdiv");
  //     const errordiv = document.getElementById("errdiv");

  //     const outerdiv = document.getElementById("outerdiv");
  //     outerdiv.style.transition = "height 0.5s ease";

  //     if (filename) {
  //       filediv.classList.add(styles.active);
  //       filediv.style.transition = "height 2s ease";
  //       filediv.style.transition = "padding 2s ease";
  //     } else {
  //       filediv.classList.remove(styles.active);
  //     }

  //     if (error) {
  //       console.log("hehy");
  //       errordiv.style.transition = "height 0.7s ease";
  //       errordiv.style.transition = "padding 0.7s ease";
  //       errordiv.classList.add(styles.errorafter);

  //       setTimeout(() => {
  //         setError(null);
  //       }, 4000);
  //     } else {
  //       errordiv.classList.remove(styles.errorafter);
  //     }
  //   }, [filename, error]);

  return (
    <div className={styles.container}>
      {clickme && (
        <div className={styles.firstout}>
          <div className={styles.firstin} id="outerdiv">
            <div className={styles.uploaddiv}>
              <Dropzone
                onDrop={(acceptedFiles) => handlefiles(acceptedFiles)}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className={styles.dragarea}>
                        <img src={imguploadsvg} alt="Image upload svg" />

                        <p className={styles.dragtag}>
                          Drag and drop your image here, or click to select a
                          file
                        </p>
                        <p className={styles.draginfo}>
                          Accepts JPEG and PNG formats, limited to one image at
                          a time.
                        </p>
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>

            {error && (
              <div className={styles.error} id="errdiv">
                {error}
              </div>
            )}

            {filename && (
              <div className={styles.fileinfo} id="acceptdiv">
                {filename}{" "}
                <button className={styles.buttons} onClick={handlesubmit}>
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {loader && (
        <div className={styles.secondout}>
          <div className={styles.secondin}>
            <ClipLoader
              loading={true}
              color={"#a3b1eb"}
              size={18}
              speedMultiplier={0.7}
              className={styles.loader}
            />

            <p className={styles.loadtext}>
              Hang Tight! While We Analyze Your Image
            </p>
          </div>
        </div>
      )}

      {result && (
        <div className={styles.thirdouter}>
          <div className={styles.thirdout}>
            <div className={styles.thirdin}>
                <p className={styles.thirdhead}>Heading</p>
                
                <div className={styles.thirdtext}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto modi sunt, alias 
                obcaecati atque ab quia repudiandae fugit. Magnam impedit modi id, laboriosam minima sit consequuntur tempore maxime 
                aliquam enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed facilis non fugiat, ullam impedit.
                Quo nemo, ipsum, voluptas totam quis labore fugiat eos praesentium sit eaque amet dolorum doloribus.
                </div>
                
            </div>

            <div className={styles.thirdin}>
            <p className={styles.thirdhead}>Heading</p>
                
                <div className={styles.thirdtext}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto modi sunt, alias 
                obcaecati atque ab quia repudiandae fugit. Magnam impedit modi id, laboriosam minima sit consequuntur tempore maxime 
                aliquam enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed facilis non fugiat, ullam impedit.
                Quo nemo, ipsum, voluptas totam quis labore fugiat eos praesentium sit eaque amet dolorum doloribus.
                </div>
            </div>

            <div className={styles.thirdin}><p className={styles.thirdhead}>Heading</p>
                
                <div className={styles.thirdtext}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto modi sunt, alias 
                obcaecati atque ab quia repudiandae fugit. Magnam impedit modi id, laboriosam minima sit consequuntur tempore maxime 
                aliquam enim! Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sed facilis non fugiat, ullam impedit.
                Quo nemo, ipsum, voluptas totam quis labore fugiat eos praesentium sit eaque amet dolorum doloribus.
                </div></div>
          </div>

            <div className={styles.btncontianer}>
            <button className={styles.buttons} onClick={handlesubmit}>
                  Try with another image
                </button>
            </div>
          
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
