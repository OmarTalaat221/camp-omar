import React, { useEffect, useState } from 'react';
import './Questionnaire.css'; // Assuming you want to keep the styling
import Breadcrumbs from '../../../component/common/breadcrumb/breadcrumb';
import { Button, Input, Select, Checkbox, Radio } from 'antd'; // Import necessary Ant Design components
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'; // Import icons
import axios from 'axios';
import { toast } from 'react-toastify';

const { TextArea } = Input;
const { Option } = Select;

export default function Questionnaire() {
    const [formTitle, setFormTitle] = useState('Untitled form');
    const [formDescription, setFormDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null); // State to track the active question
    const [formData, setFormData] = useState({
        form_name: "",
        questions: [],
    })
    const [isLoading, setIsLoading] = useState(false);

    const handleAddQuestion = () => {
        const newQuestions = [...questions, {
            question_text: '',
            question_type: 'text', // Default to text
            is_required: false,
            choices: []
        }];
        setQuestions(newQuestions);
        setActiveQuestionIndex(newQuestions.length - 1); // Set the newly added question as active
    };

    const handleDeleteQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
        if (activeQuestionIndex === index) {
            setActiveQuestionIndex(null); // Clear active state if deleted question was active
        } else if (activeQuestionIndex > index) {
            setActiveQuestionIndex(activeQuestionIndex - 1); // Adjust active index if a question before it was deleted
        }
    };

    const handleQuestionTextChange = (index, text) => {
        const newQuestions = [...questions];
        newQuestions[index].question_text = text;
        setQuestions(newQuestions);
    };

    const handleQuestionTypeChange = (index, type) => {
        const newQuestions = [...questions];
        newQuestions[index].question_type = type;

        if (type !== 'multiple_choice' && type !== 'single_choice') {
            newQuestions[index].choices = [];
        }
        setQuestions(newQuestions);
    };

    const handleRequiredChange = (index, isRequired) => {
        const newQuestions = [...questions];
        newQuestions[index].is_required = isRequired;
        setQuestions(newQuestions);
    };

    const handleAddChoice = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices.push('');
        setQuestions(newQuestions);
    };

    const handleChoiceTextChange = (questionIndex, choiceIndex, text) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices[choiceIndex] = text;
        setQuestions(newQuestions);
    };

    const handleDeleteChoice = (questionIndex, choiceIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices = newQuestions[questionIndex].choices.filter((_, i) => i !== choiceIndex);
        setQuestions(newQuestions);
    };

    const renderQuestionInput = (question, index) => {
        const isActive = index === activeQuestionIndex;
        return (
            <div
                key={index}
                className={`question-container ${isActive ? 'active' : ''}`}
                onClick={() => setActiveQuestionIndex(index)} // Set this question as active on click
            >
                <div className="question-header">
                    <Input
                        className="question-text-input"
                        placeholder="Question title"
                        value={question.question_text}
                        onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                        onClick={(e) => e.stopPropagation()} // Prevent click on input from changing active state
                    />
                    <Select
                        value={question.question_type}
                        style={{ width: 180 }}
                        onChange={(type) => handleQuestionTypeChange(index, type)}
                        onClick={(e) => e.stopPropagation()} // Prevent click on select from changing active state
                    >
                        <Option value="text">Text</Option>
                        <Option value="multiple_choice">Multiple choice</Option>
                        <Option value="single_choice">Single choice</Option>
                        <Option value="rate">Rating</Option>
                    </Select>
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={(e) => { e.stopPropagation(); handleDeleteQuestion(index); }} />
                </div>

                <div className="question-body">
                    {question.question_type === 'text' && (
                        <Input placeholder="Short answer text" disabled />
                    )}

                    {(question.question_type === 'multiple_choice' || question.question_type === 'single_choice') && (
                        <>
                            {question.choices.map((choice, choiceIndex) => (
                                <div key={choiceIndex} className="choice-input-container">
                                    {question.question_type === 'multiple_choice' ? (
                                        <Checkbox disabled />
                                    ) : (
                                        <Radio disabled />
                                    )}
                                    <Input
                                        placeholder={`Option ${choiceIndex + 1}`}
                                        value={choice}
                                        onChange={(e) => handleChoiceTextChange(index, choiceIndex, e.target.value)}
                                        onClick={(e) => e.stopPropagation()} // Prevent click on input from changing active state
                                    />
                                    <Button type="text" danger icon={<DeleteOutlined />} onClick={(e) => { e.stopPropagation(); handleDeleteChoice(index, choiceIndex); }} />
                                </div>
                            ))}
                            <Button type="text" icon={<PlusCircleOutlined />} onClick={(e) => { e.stopPropagation(); handleAddChoice(index); }}>Add option</Button>
                        </>
                    )}
                    {/* {question.question_type === 'rate' && (
                         <div className="rating-container">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <Button
                                    key={rating}
                                    type="button"
                                    className="rating-button"
                                    disabled // Disabled in editor mode
                                >
                                    {rating}
                                </Button>
                            ))}
                        </div>
                    )} */}
                </div>

                <div className="question-footer">
                    <Checkbox
                        checked={question.is_required}
                        onChange={(e) => handleRequiredChange(index, e.target.checked)}
                        onClick={(e) => e.stopPropagation()} // Prevent click on checkbox from changing active state
                    >
                        Required
                    </Checkbox>
                </div>
            </div>
        );
    };

    useEffect(() => {
        console.log(questions);
    }, [questions])

    function handleCreateForm() {
        const data_send = {
            form_name: formTitle,
            form_description: formDescription,
            questions
        }
        console.log(data_send);
        setIsLoading(true);
        axios.post("http://camp-coding.online/camp-for-english/admin/forms/create_form.php", data_send)
            .then(res => {
                console.log(res);
                if (res?.data?.status == "success") {
                    toast.success(res?.data?.message);
                    setQuestions([]);
                    setFormTitle("");
                    setFormDescription(""); // Clear form description as well
                } else {
                    toast.error(res?.data?.message);
                }
            }).catch(e => {
                console.log(e);
                toast.error("An error occurred while creating the form.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <Breadcrumbs parent="Forms" title="Create Form" />
            <div className="container-fluid">
                <div className='col-sm-12'>
                    <div className="card">
                        <div className="card-header">
                            <Input
                                className="form-title-input"
                                placeholder="Untitled form"
                                value={formTitle}
                                onChange={(e) => setFormTitle(e.target.value)}
                            />
                            {/* <TextArea
                                className="form-description-input"
                                placeholder="Form description"
                                value={formDescription}
                                onChange={(e) => setFormDescription(e.target.value)}
                                autoSize={{ minRows: 1, maxRows: 6 }}
                            /> */}
                        </div>
                        <div className="card-body">
                            {questions.map((question, index) => renderQuestionInput(question, index))}
                            <Button type="dashed" onClick={handleAddQuestion} block icon={<PlusCircleOutlined />}>
                                Add Question
                            </Button>
                        </div>
                        {/* You can add a save button or other actions here */}
                        {/* <div className="card-footer"></div> */}
                        <Button type="dashed" onClick={handleCreateForm} block>
                            {isLoading ? "Loading...." : "Submit"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
