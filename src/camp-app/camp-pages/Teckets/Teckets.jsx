import {Table} from "antd";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../../Api/baseUrl";
import {render} from "@testing-library/react";
import {useNavigate} from "react-router-dom";

const Teckets = () => {
  const [teckets, setTeckets] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      id: "question_id",
      dataIndex: "question_id",
      title: "Id",
    },
    {
      id: "student_data",
      dataIndex: "student_data",
      title: "Tecket from ",
      render: (text, row) => {
        return <div>{row.student_data.name}</div>;
      },
    },
    {
      id: "Email",
      dataIndex: "student_data",
      title: "Tecket from ",
      render: (text, row) => {
        return <div>{row.student_data.email}</div>;
      },
    },
    {
      id: "",
      dataIndex: "student_level_sub",
      title: "stuendent level ",
      render: (text, row) => {
        return <div>{row.student_level_sub}</div>;
      },
    },
    {
      id: "question_text",
      dataIndex: "question_text",
      title: "Question",
      render: (text, row) => {
        return <div>{text}</div>;
      },
    },
    {
      id: "question_replay",
      dataIndex: "question_replay",
      title: "Question reply",
      render: (text, row) => {
        return <div>{text ?? "___"}</div>;
      },
    },

    {
      title: "Actions",
      render: (text, row) => {
        return (
          <button
            className='btn btn-primary'
            style={{width: "100%"}}
            onClick={() =>
              navigate(
                `${process.env.PUBLIC_URL}/teckets/${row?.question_id}`,
                {
                  state: {tecketData: row},
                }
              )
            }
          >
            Reply
          </button>
        );
      },
    },
  ];

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (value) => {
    const filtereName = [].filter((level) =>
      level.level_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtereName);
  };





  function handleSelectTeckets() {
    axios
      .get(BASE_URL + "/admin/students_questions/select_student_questions.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          console.log("teckets", teckets);
          setTeckets(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleSelectTeckets();
  }, []);

  return (
    <>
      <Breadcrumbs parent='Technical support' title='teckets' />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='card'>
              <div className='card-header'>
                <h5>Teckets List</h5>
              </div>
              <div className='card-body'>
                <Table columns={columns} dataSource={teckets} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teckets;
