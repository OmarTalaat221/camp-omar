import React, {useEffect, useState} from "react";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import "./style.css";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import {message} from "antd";
import {BsSend} from "react-icons/bs";
import {BASE_URL} from "../../../Api/baseUrl";
import axios from "axios";
import {toast} from "react-toastify";

const TeketDetails = () => {
  const {id} = useParams();
  const location = useLocation();
  const data = location?.state?.tecketData;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState(data?.question_replay);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!id || !data) {
    return <Navigate to={`${process.env.PUBLIC_URL}/teckets/:id`} />;
  }

  async function onSendMessage(e) {
    e.preventDefault();

    if (!message) {
      toast.error("Please enter a message to send");
      return;
    }

    const data_send = {
      question_id: id,
      question_replay: message,
    };

    await axios
      .post(
        BASE_URL + `/admin/students_questions/add_question_replay.php`,
        data_send
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setSendMessage(message);
          setMessage("");
          data.question_replay = message;
        } else {
          toast.error(res?.data?.message || "There's a problem");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  }

  return (
    <>
      <Breadcrumbs parent='Technical support' title='teckets / reply' />

      <div className="container-fluid px-3 px-md-5">
        <div className='d-flex flex-column flex-md-row gap-3 gap-md-5 mb-4'>
          <div className='d-flex flex-column gap-2'>
            <h6 className='fw-bolder mb-0'>Name : </h6>
            <h6 className='fw-bolder mb-0'>Email : </h6>
            <h6 className='fw-bolder mb-0'>Phone : </h6>
            <h6 className='fw-bolder mb-0'>level : </h6>
          </div>
          <div className='d-flex flex-column gap-2'>
            <h6 className='mb-0'> {data?.student_data.name}</h6>
            <h6 className='mb-0'> {data?.student_data.email}</h6>
            <h6 className='mb-0'> {data?.student_data.phone}</h6>
            <h6 className='mb-0'> {data?.student_level_sub}</h6>
          </div>
        </div>

        <div className="chat-container">
          <div className='d-flex flex-column gap-4 mt-4'>
            <div className='message-blue'>
              <p className='message-content fs-5 mb-0'>{data?.question_text}</p>
            </div>

            {sendMessage && (
              <div className='message-orange'>
                <p className='message-content fs-5 mb-0'>{sendMessage}</p>
              </div>
            )}
          </div>

          <form className='form-container' onSubmit={onSendMessage}>
            <div className='input-wrapper'>
              <textarea
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
                type='text'
                value={message}
                className='message-input'
                placeholder='Reply to Message'
              />
              <button
                type='submit'
                className='send-button'
              >
                {false ? <div className='loading-spinner'></div> : <BsSend />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TeketDetails;
