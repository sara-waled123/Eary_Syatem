import React ,{useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser} from "../../../helper/storage";
import axios from "axios";

const AddQuestions = () => {
  const auth = getAuthUser();

  //add
  const [questions,setQuestions] = useState({
    question:'',
    status:'',
    loading:false,
    err    :"",
    success:null,
  });

  const audios = useRef(null);

  const createQuestion = (e) => {
      e.preventDefault();
      setQuestions({ ...questions, loading: true });
  
      const formData = new FormData();
      formData.append("question", questions.question);
      formData.append("status", questions.status);
      
      if (audios.current.files && audios.current.files[0]) {
        formData.append("audio", audios.current.files[0]);
      }
      axios
          .post("http://localhost:4000/questions/", formData, {
              headers: {
                  token: auth.token,
                  "Content-Type": "multipart/form-data",
              },
          })
          .then((resp) => {
              setQuestions({
                  audio: "",
                  question: "",
                  status:"",
                  loading: false,
                  err: "",
                  success: "Question Created Successfully :)",
              });
              audios.current.value = null;
          })
          .catch((err) => {
              setQuestions({
                  ...questions,
                  success: null,
                  loading: false,
                  err: "something went wrong, please try again later!",
              });
          });
  };

  return (
    <div className="container1">
      <h1 className="title">New Question</h1>

       {/* alert */}
       {questions.err&&(
        <Alert variant="danger" className="p-2">
          {questions.err}
      </Alert>
      )}
      {questions.success&&(
        <Alert variant="success" className="p-2">
          {questions.success}
      </Alert>
      )}
      
      
      <Form onSubmit={createQuestion}>
        {/* audio */}
        <Form.Group className="mb-3">
        <Form.Control type="file"  required  ref={audios}/>
        </Form.Group>
        {/* question */}
        <Form.Group className="mb-3">
          <Form.Control value={questions.question}  type="text" placeholder="question.." onChange={(e)=>setQuestions({...questions,question:e.target.value})} required/>
        </Form.Group>
        {/* status */}
        <Form.Group className="mb-3">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="active">
              <Form.Check
                type="radio"
                value={1}
                name="status"
                onChange={(e) => setQuestions({...questions, status: e.target.value})}
              />
              Active
            </label>
            <label htmlFor="notActive">
              <Form.Check
                type="radio"
                value={0}
                name="status"
                onChange={(e) => setQuestions({...questions, status: e.target.value})}
              />
              Not Active
            </label>
          </div>
        </Form.Group>
        {/* submit */}
        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add New Question
        </Button>
      </Form>
    </div>
  );
};

export default AddQuestions;
