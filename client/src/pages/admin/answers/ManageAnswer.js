import React ,{useState,useEffect} from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser ,getAuthUser} from "../../../helper/storage";

const ManageAnswer = () => {
  const auth = getAuthUser();

//response
  const [responses, setResponses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
    success: null,
  });

  useEffect(() => {
    setResponses({ ...responses, loading: true });
    axios.get("http://localhost:4000/responses/")
    .then((resp) => {
      setResponses({ ...responses, results: resp.data, loading: false, err: null });
    })
    .catch((err) => {
      setResponses({
        ...responses,
        loading: false,
        err: "something went wrong, please try again later!",
      });
    });
  }, [responses.reload]);


  //users->remove that part in final (to test dlelete)
  const [users,setUsers] = useState({
    ID :"3",
    name:"admin",
    token:"5",
  });
  setAuthUser(users);
 

  //delete
  const deleteResponse=(id) =>{
    axios  
        .delete("http://localhost:4000/responses/"+id,{
          headers:{
           token : auth.token,
          }
        })
        .then((resp)=>{
          setResponses({...responses, reload :responses.reload +1});
        })
        .catch((err)=>{
          setResponses({
            ...responses,
            loading:false,
            err:"something went wrong,please try again later!" ,
        });
        });
  }
  

  return (
    <div className="container1">
      <div className="header d-flex justify-content-between mb-5">
        <h1 className="text-center">Manage Answers</h1>
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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Response </th>
            <th>Is Correct</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            responses.results.map( response=>( 
            <tr key={Math.random()}>
              {/* # */}
              <td>{response.ID}</td>      
              {/* response */}
              <td>{response.response}</td>
              {/*/is correct */}
              <td>
                  {
                    response.is_correct === 1 ? (
                      <button type="button" className="btn btn-outline-primary">
                        Correct
                      </button>
                    ) : (
                      <button type="button" className="btn btn-outline-secondary">
                        Not Correct
                      </button>
                    )
                  }
              </td>
                {/* action */}
              <td>
                {/* delete*/}
                <button type="button" className="btn btn-outline-danger" onClick={(e)=>{deleteResponse(response.ID)}}  >
                  Delete
                </button>
                {/* Update*/}
                <Link type="button" className="btn btn-outline-primary" to={{pathname: `/admin/response/${response.ID}`, state: { question: response.question_id}}} > 
                {/* <Update Q_id={response.question_id}/> */}
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

export default ManageAnswer;

