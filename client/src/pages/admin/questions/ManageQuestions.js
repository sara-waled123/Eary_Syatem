import React ,{useState,useEffect} from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser ,getAuthUser} from "../../../helper/storage";

const ManageQuestions = () => {
  const auth = getAuthUser();

  //question
  const [questions,setQuestions] = useState({
    loading:true,
    results:[],
    err    :null,
    reload :0,
    success:null,
  });

  useEffect(()=>{
    setQuestions({...questions,loading:true});
    axios  
        .get("http://localhost:4000/questions/")
        .then((resp)=>{
            setQuestions({...questions,results: resp.data,loading:false,err:null});
        })
        .catch((err)=>{
            setQuestions({
                ...questions,
                loading:false,
                err:"something went wrong,please try again later!" 
            });
        });
  },[questions.reload]);

  //users->remove that part in final (to test dlelete)
  const [users,setUsers] = useState({
    ID :"3",
    name:"admin",
    token:"5",
  });
  setAuthUser(users);
  console.log(auth);

  //delete
  const deleteQuestion =(id) =>{
    axios  
        .delete("http://localhost:4000/questions/"+id,{
          headers:{
           token : auth.token,
          }
        })
        .then((resp)=>{
           setQuestions({...questions, reload :questions.reload +1});
        })
        .catch((err)=>{
          setQuestions({
            ...questions,
            loading:false,
            err:"something went wrong,please try again later!" ,
        });
        });
  }
  

  return (
    <div className="container1">
      <div className="header d-flex justify-content-between mb-5">
        <h1 className="text-center">Manage Questions</h1>
        <div>
          <div className="float-start">
            <Link to={"add"} className="btn btn-success">
              Add Answer
            </Link>
          </div>
          <div className="float-end">
            <Link to={"list"} className="btn btn-warning">
              SHOW ALL
            </Link>
          </div>
        </div>
      </div>
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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>audio </th>
            <th>Questions</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            questions.results.map( question=>(
            <tr key={question.ID}>
              {/* # */}
              <td>{question.ID}</td>
              {/* audio */}
              <td>
              <audio src={question.audio} controls style={{
              display: 'flex',
              justifyContent: 'center',
                  }} />
              </td>
              {/* questions */}
              <td>{question.question}</td>
              {/*/status */}
              <td>
                  {
                    question.status === 1 ? (
                      <button type="button" className="btn btn-outline-primary">
                        Active
                      </button>
                    ) : (
                      <button type="button" className="btn btn-outline-secondary">
                        Not Active
                      </button>
                    )
                  }
              </td>
                {/* action */}
              <td>
              {/* onClick={(e)=>{deleteQuestion(question.id)}} */}
                <button type="button" className="btn btn-outline-danger" onClick={(e)=>{deleteQuestion(question.ID)}}  >
                  Delete
                </button>
  
                <Link type="button" className="btn btn-outline-primary" to={`/admin/question/${question.ID}`}>
                  Update
                </Link>
              </td>
            </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default ManageQuestions;
