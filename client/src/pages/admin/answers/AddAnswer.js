import React ,{useRef,useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser} from "../../../helper/storage";

import axios from "axios";

const AddAnswer = () => {
  const auth = getAuthUser();

  //add
  const [responses,setResponses] = useState({
    response:'',
    is_correct:'',
    question_id:'',
    loading:false,
    err    :"",
    success:null,
  });

  const createResponse = (e) => {
    e.preventDefault();
    setResponses({ ...responses, loading: true });

    const data={
      response :responses.response,
      is_correct:responses.is_correct,
      question_id:responses.question_id,
    }
    
    axios
        .post("http://localhost:4000/responses/", data, {
            headers: {
                token: auth.token,
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => {
          setResponses({
                response  : "",
                is_correct: "",
                question_id  :"",
                loading   : false,
                err       : "",
                success: " Created Successfully :)",
            });
        })
        .catch((err) => {
          setResponses({
                ...responses,
                success: null,
                loading: false,
                err: "something went wrong, please try again later!",
            });
        });
};

//menu
const [questions,setQuestions] = useState({
  loading:true,
  results:[],
  err    :null,
  reload :0,
});
  useEffect(()=>{
    setQuestions({...questions,loading:true});
  axios  
      .get("http://localhost:4000/questions/")//all question
      .then((resp)=>{
          console.log(resp);
          setQuestions({...questions,results: resp.data,loading:false,err:null});
      })
      .catch((err)=>{
        setQuestions({
              ...questions,
              loading:false,
              err:"can't retrieve question !" 
          });
      });
},[]);

  return (
    <div className="container1">
      <h1 className="title">New Response </h1>

       {/* alert */}
       {responses.err&&(
        <Alert variant="danger" className="p-2">
          {responses.err}
      </Alert>
      )}
      {responses.success&&(
        <Alert variant="success" className="p-2">
          {responses.success}
      </Alert>
      )}

      <Form onSubmit={createResponse}>
        {/* question_id */}
      <Form.Group className="mb-3">
        <Form.Select id="my-menu" name="my-menu" onChange={(e) => {
            setResponses({...responses,question_id:e.target.value})
            }} required>
                <option value="" disabled selected>Select a question</option>
                {Array.isArray(questions.results) && questions.results.map((question) => (
                    <option key={question.ID} value={question.ID}>{question.question}</option>
                ))}
        </Form.Select>
        </Form.Group>

        {/* response */}
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="response" value={responses.response} onChange={(e)=>setResponses({...responses,response:e.target.value})} required />
        </Form.Group>
        {/* is_correct */}
        <Form.Group className="mb-3">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="active">
              <Form.Check
                type="radio"
                value={1}
                name="is_correct"
                onChange={(e) => setResponses({...responses, is_correct: e.target.value})}
              />
              Correct
            </label>
            <label htmlFor="notActive">
              <Form.Check
                type="radio"
                value={0}
                name="is_correct"
                onChange={(e) => setResponses({...responses, is_correct: e.target.value})}
              />
              Not Correct
            </label>
          </div>
        </Form.Group>
        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add New Response
        </Button>
      </Form>
    </div>
  );
};

export default AddAnswer;
