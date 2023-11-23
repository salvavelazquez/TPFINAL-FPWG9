import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Style.css';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [finished, setFinished] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('active');

  const addNote = () => {
    if (inputText && inputTitle) {
      const newNote = {
        id: notes.length + 1,
        Title: inputTitle,
        Description: inputText,
        State: selectedStatus,
      };

      setNotes([...notes, newNote]);
      setInputText('');
      setInputTitle('');
      setSelectedStatus('active');
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const moveNoteToInProgress = (id) => {
    const noteToMove = notes.find((note) => note.id === id);
    setInProgress([...inProgress, noteToMove]);
    deleteNote(id);
  };

  const moveNoteToFinished = (id) => {
    const noteToMove = notes.find((note) => note.id === id);
    setFinished([...finished, noteToMove]);
    deleteNote(id);
  };

  const listStyle = {
    textAlign: 'left',
    backgroundColor: '#f5f5f5',
  };

  return (
    <div className='text-center colorBackground'>
      <h1 className='whiteText'>Notes List</h1>
      <Form>
        <div className='d-flex justify-content-between'>
          {/* Input AddNote Title */}
          <Form.Group className='mr-2 flex-grow-1'>
            <Form.Control
              type='text'
              placeholder='Enter note title'
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </Form.Group>
          {/* Input AddNote Description */}
          <Form.Group className='mr-2 flex-grow-1'>
            <Form.Control
              type='text'
              placeholder='Enter your note description'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </Form.Group>
          {/* Dropdown list */}
          <Form.Group className='mr-2' style={{ width: '200px' }}>
            <Form.Control
              as='select'
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value='active'>Active</option>
              <option value='desactive'>Desactive</option>
            </Form.Control>
          </Form.Group>
        </div>

        <Button variant='success' onClick={addNote}>
          Add Note
        </Button>
      </Form>
      <ListGroup style={listStyle}>
        <h2 className='init'>Started List</h2>
        {notes.map((note) => (
          <ListGroup.Item key={note.id}>
            <span style={{ marginRight: '30px' }}>{note.Title}</span>
            <span style={{ marginRight: '30px' }}>{note.Description}</span>
            <span style={{ marginRight: '30px' }}>{note.State}</span>
            <Button
              variant='danger'
              className='float-right'
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </Button>
            <Button
              variant='primary'
              className='float-right mr-2'
              onClick={() => moveNoteToInProgress(note.id)}
            >
              Move to In Progress
            </Button>
            <Button
              variant='success'
              className='float-right mr-2'
              onClick={() => moveNoteToFinished(note.id)}
            >
              Move to Finished
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className='mt-3'>
        <h2 className='process'>In Progress</h2>
        <ListGroup style={listStyle}>
          {inProgress.map((note) => (
            <ListGroup.Item key={note.id}>
              <span style={{ marginRight: '30px' }}>{note.Title}</span>
              <span style={{ marginRight: '30px' }}>{note.Description}</span>
              <span style={{ marginRight: '30px' }}>{note.State}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className='mt-3'>
        <h2 className='finish'>Finished</h2>
        <ListGroup style={listStyle}>
          {finished.map((note) => (
            <ListGroup.Item key={note.id}>
              <span style={{ marginRight: '30px' }}>{note.Title}</span>
              <span style={{ marginRight: '30px' }}>{note.Description}</span>
              <span style={{ marginRight: '30px' }}>{note.State}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default NotesList;

