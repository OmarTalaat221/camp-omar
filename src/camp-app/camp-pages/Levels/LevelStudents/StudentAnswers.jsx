import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../component/common/breadcrumb/breadcrumb";
import { Table } from "antd";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../Api/baseUrl";
import axios from "axios";
import './style.css'

const StudentAnswers = () => {
  const [StudentAnswers, setStudentAnswers] = useState([]);

  const { level_id,student_id } = useParams();
  const columns = [
    {
      id: "question_id",
      dataIndex: "question_id",
      title: "#",
    },
    {
      id: "question_image",
      dataIndex: "question_image",
      title: "question image",
      render: (text, row) => (
        <>
          <img
            src={row?.question_image}
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
        </>
      ),
    },
    {
      id: "question_text",
      dataIndex: "question_text",
      title: "question text",
    },
    {
        id: "question_valid_answer",
        dataIndex: "question_valid_answer",
        title: "question valid answer",
        render: (text, row) => (
            <>
              <p style={{ color: "green" }}>{row?.question_valid_answer}</p>
             
            </>
          ),
      },
    {
      id: "choosed_answer",
      dataIndex: "choosed_answer",
      title: "choosed answer",
      render: (text, row) => (
        <>
          {row?.correct_or_not == 1 ? (
            <>
              <p style={{ color: "green" }}>{row?.choosed_answer}</p>
            </>
          ) : (
            <>
              <p style={{ color: "red" }}>{row?.choosed_answer}</p>
            </>
          )}
        </>
      ),
    },
  ];

  function handelGetStudentAnswers() {
    const dataSend = {
      level_id: level_id,
      student_id: student_id,
    };
     console.log(dataSend);
    
    axios
      .post(
        BASE_URL + "/admin/level_exam/select_solved_exam_level_questions.php",
        dataSend
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          setStudentAnswers(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

useEffect(()=>{
    handelGetStudentAnswers()
},[])


  return (
    <>
      <Breadcrumbs parent="Levels" title="student's answers" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>student's answers</h5>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={StudentAnswers}
                //   rowClassName={(record) => 
                //     record.correct_or_not == 1 ? "row_highlight_correct" : "row_highlight_wrong"                    
                   
                    
                //   }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAnswers;
