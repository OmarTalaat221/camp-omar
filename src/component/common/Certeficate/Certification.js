import React, { useEffect, useState } from "react";
import "./style.css";
import logo from "../../../assets/images/logo_png_2_1_1_rx2qjj.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { generatePDF } from "./generatePDF";

const Certification = (data) => {
  console.log(data.data);
  const { student_id } = useParams();

  const date = new Date();

  const [dataStudent, setData] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.post(
        "https://campforenglish.net/camp_for_english/admin/certificateData.php",
        { student_id }
      );

      setData(response.data);

      // Convert image to Base64 if image URL exists
      if (response.data?.image) {
        const base64 = await imageUrlToBase64(response.data.image);
        console.log(base64);
        setBase64Image(base64);
        console.log(base64);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const imageUrlToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Converts the Blob into a Base64 string
    });
  };

  useEffect(() => {
    if (student_id) {
      getData();
    }
  }, [student_id]);

  return (
    <>
      <button
        style={{ marginTop: "60px", marginBottom: "10px" }}
        className="btn btn-success-gradien"
        onClick={() =>
          generatePDF(
            "studentCertificate",
            dataStudent?.name + "_" + date?.toDateString()
          )
        }
      >
        Download Certificate
      </button>
      <div className="certificate_Continer" id="studentCertificate">
        <div className="certification_left_side">
          <span className="certification_left_side_img_continer">
            {/* Display the base64 image here */}
            <img
              src={
                (dataStudent?.image &&
                  "data:image/jpeg;base64," + dataStudent?.image) ||
                logo
              }
              alt="Student Image"
            />
          </span>
          <span className="certification_left_side_user_data">
            <div className="user_text_data">
              <h1 style={{ textAlign: "center" }}>
                <strong>{dataStudent?.name}</strong>
              </h1>
              <h3 style={{ color: "#053D3C" }}>
                <strong>Current Evaluation: </strong>{" "}
                {
                  dataStudent?.levels_data[dataStudent?.levels_data?.length - 1]
                    ?.level_name
                }
              </h3>
            </div>
          </span>
          <div className="certification_date">
            <p>
              <strong>certification date: </strong> {date.toDateString()}
            </p>
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="certification_right_side">
          <div className="right_userData" style={{ padding: "0px 20px" }}>
            <h1>
              <strong>{dataStudent?.name}</strong>
              <br />
              <strong style={{ fontSize: "15px", margin: 0 }}>
                {dataStudent?.phone}
              </strong>
            </h1>
            <img src={logo} alt="" />
          </div>
          <h2 style={{ padding: "0px 20px" }}>
            <strong>Graduation Data</strong>
          </h2>
          <div className="graduation_data">
            <span className="left_data_side">
              {dataStudent?.levels_data?.map((item) => {
                return (
                  <h6 key={item?.level_name}>
                    <strong>{item?.level_name} :</strong> (
                    {item?.level_description}) with grade of {item?.score}/
                    {item?.total_score}{" "}
                  </h6>
                );
              })}
            </span>
            <span className="right_data_side">
              <p>
                <strong>Branch</strong>{" "}
                <b>{dataStudent?.branch_data?.branch_name}</b>{" "}
              </p>
              <p>
                <strong>Starting Evaluation </strong>{" "}
                <b>{dataStudent?.levels_data[0]?.level_name}</b>{" "}
              </p>
              <p>
                <strong>Levels count </strong>{" "}
                <b>{dataStudent?.levels_data?.length}</b>
              </p>
            </span>
          </div>
          <div className="signetures">
            <span className="sign">
              <h5>Instructor</h5>
              <input
                name="Instructor"
                style={{
                  outline: "1px solid",
                  display: "block",
                  padding: "10px",
                  marginLeft: "10px",
                }}
                autoFocus
              />
            </span>
            <span className="sign">
              <h5>Camp Manager</h5>
              <input
                name="Camp"
                style={{
                  outline: "1px solid",
                  display: "block",
                  padding: "10px",
                }}
                autoFocus
              />
            </span>
            <span className="sign">
              <h5>Branch Manager</h5>
              <input
                name="branch"
                style={{
                  outline: "1px solid",
                  display: "block",
                  padding: "10px",
                }}
                autoFocus
              />
            </span>
          </div>
          <span
            style={{
              width: "100%",
              direction: "rtl",
              display: "flex",
              height: "109px",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="" style={{ width: "80px", height: "60px" }} />
          </span>
          <div className="data_footer"></div>
        </div>
      </div>
    </>
  );
};

export default Certification;
