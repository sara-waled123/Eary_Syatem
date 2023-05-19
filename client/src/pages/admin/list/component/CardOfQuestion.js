import React ,{useState,useEffect} from "react";
import Card from "react-bootstrap/Card";
import ImgAudio from "C:/Users/DELL/EarySystem/client/src/assets/images/oudio.png";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";



const CardOfQuestion = (props) => {
    //responses
    const [responses,setResponses] = useState({
        loading:true,
        results:[],
        err    :null,
        reload :0,
    });
        useEffect(()=>{
        setResponses({...responses,loading:true});
        axios  
            .get("http://localhost:4000/responses/")
            .then((resp) => {
                const filteredResponses = resp.data.filter(
                  (response) => response.question_id === props.id
                );
                setResponses({
                  ...responses,
                  results: filteredResponses,
                  loading: false,
                  err: null,
                });
              })
            .catch((err)=>{
                setResponses({
                    ...responses,
                    loading:false,
                    err:"something went wrong,please try again later!" 
                });
            });
    },[props.id, responses.reload]);


    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={ImgAudio} />
                <Card.Body>
                    {/* question */}
                    <Card.Title>{props.question}</Card.Title>
                    {/* responses */}
                    <ListGroup className="list-group-flush">
                        {responses.results.map((response) => (
                        <ListGroup.Item key={Math.random()}>{response.response}</ListGroup.Item>
                        ))}
                    </ListGroup>
                    {/* audio */}
                    <Card.Body style={{display: 'flex', justifyContent: 'center'}}>
                        <audio src={props.audio} controls />
                    </Card.Body>
                </Card.Body>
                </Card>
        </div>
    );
};

export default CardOfQuestion;