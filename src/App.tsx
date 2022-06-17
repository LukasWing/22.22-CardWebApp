import React, { Children, useState } from 'react';
import './App.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [success, setSuccess] = useState(true);
  const [oneDone, setOneDone] = useState(false);

  
  let postAndListen = async (e:React.FormEvent) => {
    e.preventDefault()
    let msg = await postCard(question, answer);
    let cardSuccess = msg.substring(0,5) === "\"Card"
    setSuccess(cardSuccess);
    if(cardSuccess){
      setQuestion("");
      setAnswer("");
    }
    setOneDone(true);
  }


  return (
    <div className="App">
      <Modal show={true}>
        <Modal.Header>
          Lav Spørgsmål
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={postAndListen}>

          <Form.Group className="mb-3">
            <Form.Label>Spørgsmål</Form.Label>
            <Form.Control type="text" onChange={e => setQuestion(e.target.value)} value={question}>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Svar</Form.Label>
            <Form.Control type="text" onChange={e => setAnswer(e.target.value)} value={answer}>
            </Form.Control>
          </Form.Group>

          <Button className="mb-3" variant='primary' type='submit'>Indsend</Button>
          {
            !success && oneDone
              ?
              <UploadError>
                <FontAwesomeIcon icon={faX}></FontAwesomeIcon> Der skete en fejl.
              </UploadError>
              :
              ""
          }
          {
            success && oneDone
              ?
              <UploadSuccess>
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Succes
              </UploadSuccess>
              :
              ""
          }
        </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

function UploadError(props: {children: React.ReactNode}){
  return <div style={{color: 'red'}}>
    {props.children}
  </div>
}
function UploadSuccess(props: {children: React.ReactNode}){
  return <div style={{color: 'green'}}>
    {props.children}
  </div>
}
async function postCard(q: string, a: string){
  let card = {
    Question: q, 
    Answer: a,
    nDisplays: 6
  };
  let res = await fetch("https://localhost:5001/card",{
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify(card)
  });
  let msg = await res.text();
  return msg;
}
function test_postCard(){
  let expected = "\"Card";
  postCard("Capitol of France is?","Paris")
    .then(msg => {
      let f5eq = expected === msg.substring(0,5);
      if(!f5eq){
        console.error("Test failed on " + msg);
      }
    });
}

export default App;
