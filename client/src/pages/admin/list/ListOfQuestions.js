import React ,{useState,useEffect} from "react";
import CardOfQuestion from './component/CardOfQuestion';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { Alert } from "react-bootstrap";

const ListOfQuestions = () => {
    //questions
    const [questions,setQuestions] = useState({
        loading:true,
        results:[],
        err    :null,
        reload :0,
    });

    const [search,setSearch]=useState("");

    useEffect(()=>{
        setQuestions({...questions,loading:true});
        axios  
            .get("http://localhost:4000/questions/",{
                params:{
                    search:search,
                },
            })
            .then((resp)=>{
                console.log(resp);
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

    const searchQuestions= (e)=>{
        e.preventDefault();
        console.log(search);
        setQuestions({...questions,reload:questions.reload +1});
    };

    return (
    <div className="container1">
        <div className='home-container p-5'>
            {/* loader */}
            {questions.loading===true&&(
                <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </div>
            )}
            {/* list question */}
            {questions.loading===false&& questions.err==null &&(
                <>
                {/* Search */}
                <Form onSubmit={searchQuestions}>
                    <Form.Group className="mb-3 d-flex">
                        <Form.Control
                        type="text"
                        placeholder="Search Question"
                        className="rounded-0"
                        value={search}
                        onChange={(e)=> setSearch(e.target.value)}
                        />
                        <button className="btn btn-dark rounded-0">Search </button>
                    </Form.Group>
                </Form>

                {/* list  */}
                <div className='row'>
                    {questions.results.map((questions)=>(
                    <div className='col-3 card-question-container' key={questions.ID} >
                        <CardOfQuestion 
                        question={questions.question} 
                        audio={questions.audio} 
                        id={questions.ID}
                        />
                    </div>
                    ))}
                </div>
                </>
                )} 
             {/* error handeling */}
              {questions.loading===false&& questions.err!=null &&(
                <>
               <Alert variant="danger" className="p-2">
                    {questions.err}
               </Alert>
                </>
                )} 
              {questions.loading===false&& questions.err==null && questions.length===0 && (
                    <>
                   <Alert variant="info" className="p-2">
                        No Movie ,Please try again leter!
                   </Alert>
                    </>
                )}
        </div>
    </div>
    );
};

export default ListOfQuestions;