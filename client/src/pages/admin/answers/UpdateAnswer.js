import React ,{ useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser} from "../../../helper/storage";
import axios from "axios";
import { useParams } from "react-router-dom";


const UpdateAnswer = (props) => {
  let {id} =useParams();
  const auth = getAuthUser();
//update
  const [responses,setResponses] = useState({
    response:'',
    is_correct:'',
    loading:false,
    err    :"",
    success:null,
    reload:false,//old data
  });

  const updateResponse = (e) => {
    e.preventDefault();
    setResponses({ ...responses, loading: true });
    //formdata 
    const data={
      response :responses.response,
      is_correct:responses.is_correct,
      
    }
    console.log(id);
    axios
        .put("http://localhost:4000/responses/"+ id, data, {
            headers: {
                token: auth.token,
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => {
          setResponses({
            ...responses,
            success: "Updated Successfully :>",
            loading: false,
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

//to restore old data
useEffect(()=>{
  axios
      .get("http://localhost:4000/responses/"+ id)
      .then((resp) => {
        setResponses({
          ...responses,
          response :resp.data[0].response,
          is_correct   :resp.data[0].is_correct,
          question_id   :resp.data[0].question_id,
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
},[responses.reload])

//display question
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
      <h1 className="title">Update Response</h1>

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

      <Form onSubmit={updateResponse}>
        {/* question_id &question*/}
        <Form.Group className="mb-3">
        <Form.Select id="my-menu" name="my-menu" value={responses.question_id} onChange={(e) => {
            setResponses(prevState => ({
              ...prevState,
              question_id: e.target.value,
              question: questions.results.find(q => q.ID.toString() === e.target.value.toString())?.question || ""
            }));
          }}>
            {questions.loading
              ? <option>Loading...</option>
              : <>
                  {/* Create first option with selected value */}
                  <option key={responses.question_id || ""} value={responses.question_id || ""}>
                    {questions.results.find(q => q.ID.toString() === (responses.question_id || "").toString())?.question || "Select a question"}
                  </option>
                  {/* Map over remaining questions */}
                  {questions.results.filter(q => q.ID.toString() !== (responses.question_id || "").toString()).map((question) => (
                    <option key={question.ID} value={question.ID}>{question.question}</option>
                  ))}
                </>
            }
          </Form.Select>
          </Form.Group>
        {/* response */}
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="response" value={responses.response} onChange={(e)=>setResponses({...responses,response:e.target.value})}  />
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
          Update Response
        </Button>
      </Form>
    </div>
  );
};

export default UpdateAnswer;
