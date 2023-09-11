import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { ClipLoader } from "react-spinners";
import axios from "axios";

import styles from "../stylesheets/ImageUp.module.css";
import imguploadsvg from "../assets/imgupload.svg";

import ChatBot from "./ChatBot.jsx";
import { useNavigate } from "react-router-dom";

const toclass = [1, 2, 0, 3, 4];
const gradesAll = ["Mild", "Moderate", "None", "Proliferate", "Severe"];
const description = [
  "This is the earliest stage of diabetic retinopathy, characterized by tiny swellings/bulges in the blood vessels of the retina. These areas of swelling are known as microaneurysms. These microaneurysms can cause small amounts of fluid to leak into the retina, triggering swelling of the macula - the back of the retina. Despite this, there are usually no clear symptoms indicating there is a problem.",
  "At this stage, the tiny blood vessels further swell up, blocking blood flow to the retina and preventing proper nourishment. This stage will only cause noticeable signs if there is a build-up of blood and other fluids in the macula, causing vision to become blurry.",
  "You have no signs of Diabetic Retinopathy. However, it is important to note that diabetes can cause changes in your vision before you notice any problems. It is important to have regular eye exams to monitor your eye health.",
  "At this advanced stage of the disease, new blood vessels continue to grow in the retina. These blood vessels, which are thin and weak and prone to bleeding, cause scar tissue to form inside the eye. This scar tissue can pull the retina away from the back of your eye, causing retinal detachment. A detached retina typically results in blurriness, reduced field of vision, and even permanent blindness.",
  "During this stage, a larger section of blood vessels in the retina becomes blocked, causing a significant decrease in blood flow to this area. The lack of blood triggers a signal to the body to start growing new blood vessels in the retina. These new blood vessels are extremely thin and fragile and cause retinal swelling, resulting in noticeably blurry vision, dark spots and even patches of vision loss. If these vessels leak into the macula, sudden and permanent vision loss may occur. At this stage, there is a high chance of irreversible vision loss.",
];

const ImageUpload = () => {
  const [clickme, setclickme] = useState(true);
  const [loader, setloader] = useState(false);
  const [result, setresult] = useState(false);
  const [grade57, setGrade57] = useState(null);
  const [grade73, setGrade73] = useState(null);
  const [grade, setGrade] = useState(null);

  const [filename, setfilename] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("ID");
    localStorage.removeItem("Token");
    navigate("/");
  };

  const gohome = () => {
    navigate("/");
  };

  const file = useRef(null);

  useEffect(() => {
    if (grade73 && grade57) {
      if (grade57 === grade73) {
        setGrade(grade57);
      } else {
        const high = grade57 > grade73 ? grade57 : grade73;
        setGrade(high);
      }
    }
  }, [grade57, grade73]);

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

  const handlesubmit = async () => {
    setclickme(false);
    setloader(true);
    // const form = new FormData();

    // form.append("file", file.current);

    // await axios.post("http://127.0.0.1:5000/predict", form)
    //   .then((res) => {
    //     console.log(res.data);
    //     setGrade73(res.data.class_id);
    //   })

    // await axios.post("http://127.0.0.1:8081/predict", form)
    //   .then((res) => {
    //     console.log(res.data);
    //     setGrade57(res.data.class_id);
    //   })

    const cloud = new FormData();
    cloud.append("file", file.current);
    cloud.append("upload_preset", "quantumeyes");
    cloud.append("cloud_name", "djb8pgo4n");

    const curdate = new Date();
    const fordate =
      curdate.getDate() +
      "/" +
      (curdate.getMonth() + 1) +
      "/" +
      curdate.getFullYear();

    const response1 = await fetch(
      "https://api.cloudinary.com/v1_1/djb8pgo4n/image/upload",
      {
        method: "POST",
        body: cloud,
      }
    );

    const data1 = await response1.json();

    const response2 = await fetch("http://localhost:5000/savehistory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: data1.url,
        abhaid: localStorage.getItem("ID"),
        date: fordate,
        diag: "GRADE1",
      }),
    });

    const data2 = await response2.json();

    if (data2.success) {
      setloader(false);
      setresult(true);
    }
  };

  const showdash = () => {
    navigate("/dashboard");
  };

  const tryagain = () => {
    setclickme(true);
    setresult(false);
    setfilename(null);
    file.current = null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonab}>
        <button className={styles.buttons} onClick={gohome}>
          Home
        </button>
        
        {result && (
          <button className={styles.buttons} onClick={tryagain}>
            New Image
          </button>
        )}

        <button className={styles.buttons} onClick={logout}>
          Logout
        </button>
      </div>

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
                <span>{filename} </span>
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
            <div className={styles.thirdin2}>
              <p className={styles.thirdhead}>Diagnosis</p>

              <div className={styles.thirdscroll}>
                <div className={styles.thirdtxt}>
                  <div className={styles.thirdintxt1}>Severity</div>
                  <div>:</div>
                  <div className={styles.thirdintxt2}>Moderate</div>
                </div>

                <div className={styles.thirdtxt}>
                  <div className={styles.thirdintxt1}>Description</div>
                  <div>:</div>
                  <div className={styles.thirdintxt2}>
                    At this stage, the tiny blood vessels further swell up,
                    blocking blood flow to the retina and preventing proper
                    nourishment. This stage will only cause noticeable signs if
                    there is a build-up of blood and other fluids in the macula,
                    causing vision to become blurry.
                  </div>
                </div>

                <div className={styles.thirdtxt}>
                  <div className={styles.thirdintxt1}>Precaution</div>
                  <div>:</div>
                  <div className={styles.thirdintxt2}>
                    At this stage, the tiny blood vessels further swell up,
                    blocking blood flow to the retina and preventing proper
                    nourishment. This stage will only cause noticeable signs if
                    there is a build-up of blood and other fluids in the macula,
                    causing vision to become blurry. At this stage, the tiny
                    blood vessels further swell up, blocking blood flow to the
                    retina and preventing proper nourishment. This stage will
                    only cause noticeable signs if there is a build-up of blood
                    and other fluids in the macula, causing vision to become
                    blurry.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.thirdin}>
              <p className={styles.thirdhead}>Image</p>
              <img
                src={file.current && URL.createObjectURL(file.current)}
                alt="Uploaded"
                className={styles.uploadedimg}
              />
            </div>
          </div>
        </div>
      )}
      <ChatBot />
    </div>
  );
};

export default ImageUpload;
