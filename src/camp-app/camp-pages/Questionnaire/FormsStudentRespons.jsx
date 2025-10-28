import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../../component/common/breadcrumb/breadcrumb';
import axios from 'axios';
import { BASE_URL } from '../../../Api/baseUrl';
import { toast } from 'react-toastify';
import { Button, Modal, Table } from 'antd';

export default function FormsStudentRespons() {
    const { formId, levelId } = useParams();
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [detailsModal , setDetailsModal] = useState(false);
    const [studentResponseData , setStudentResponseData] = useState([]);

    function handleGetAllResponse() {
        const data_send = {
            form_id: formId, 
            level_id: levelId
        }
        setIsLoading(true);
        axios.post(BASE_URL + "/admin/forms/get_all_students_responses.php", data_send)
            .then(res => {
                console.log(res);
                if (res?.data?.status === "success") {
                    setAllData(res?.data?.message);
                } else {
                    toast.error(res?.data?.message);
                }
            })
            .catch(error => {
                console.error('Error fetching responses:', error);
                toast.error('Failed to fetch student responses');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (formId && levelId) {
            handleGetAllResponse();
        }
    }, [formId, levelId]);
    
    const handleViewDetails = (student_id) => {
        const data_send = {
            student_id
        }
        axios.post(BASE_URL +"/admin/forms/get_one_student_responses.php", data_send)
        .then(res => {
            console.log(res)
            if(res?.data?.status =="success") {
                setStudentResponseData(res?.data?.data);
            }else {
                toast.error(res?.data?.message);
            }
        }).catch(e => console.log(e))
    };

    const columns = [
        {
            dataIndex: "student_id",
            key: "student_id",
            title: "Student Id",
        },
        {
            dataIndex: "name",
            key: "name",
            title: "Name"
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button 
                     color="primary btn-pill"
                    onClick={() =>{
                        handleViewDetails(record?.student_id)
                        setDetailsModal(true)
                    }}
                >
                    View Response Details
                </Button>
            )
        }
    ];
   
    const student_column = [
        {
            dataIndex:"response_id",
            key:"response_id",
            title:"Response ID",
        },
        {
            dataIndex:"response_date",
            key:"response_date",
            title:"Response Date",
            render:(row) => <p>{new Date(row)?.toLocaleDateString()}</p>
        },
        {
            dataIndex:"form_name",
            key:"form_name",
            title:"Form Name"
        },
        {
            dataIndex:"answers",
            key:"answers",
            title:"Answers",
            
            render:(row) => <ul style={{display:"flex",listStyleType:"desc",flexDirection:"column",gap:"2px"}}>
                {row?.map(item => (
                    <>
                <li key={item.answer_id}><span>{item?.question_text} : </span>{item.answer_text}</li>
                <li key={item.answer_id}><span>{item?.question_type} : </span>{item.answer_rate}</li>
                    </>
                )
            )}
            </ul>
        }
    ]

    useEffect(() => {
        console.log(studentResponseData);
    } , [studentResponseData])

    return (
        <>
            <Breadcrumbs parent="Responded Student on Form" title="Responded Student on Form" />
            <div className="container-fluid">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Responded students List</h5>
                        </div>
                        <div className="card-body">
                            <Table
                                rowKey={(record) => record.student_id}
                                scroll={{
                                    x: "max-content",
                                }}
                                columns={columns}
                                loading={isLoading}
                                dataSource={allData?.length ? allData : []}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal width={800} open={detailsModal} onClose={() => setDetailsModal(false)} onCancel={() => setDetailsModal(false)} footer={null}>
                <Table scroll={{x:"max-content"}} columns={student_column} dataSource={Array.isArray(studentResponseData) && studentResponseData?.length > 0 ? studentResponseData : []} />
            </Modal>
        </>
    );
}
