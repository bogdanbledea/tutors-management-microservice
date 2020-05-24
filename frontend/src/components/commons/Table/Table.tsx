import React from 'react';
import { Table as StyledTable, Th, Td} from '../Table/Table.styled';
import moment from 'moment';
import { Tutor } from '../../../App';
import DeleteTutorModal from '../../ManageTutors/DeleteTutorModal';
import AddTutorModal from '../../ManageTutors/AddTutorModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons'

const Table = (props:any) => {
  const { tutors, access_key, setRefetch } = props;
  const [deleteTutorOpen, setDeleteTutorOpen] = React.useState(false);
  const [addTutorOpen, setAddTutorOpen] = React.useState(false);
  const [selectedTutor, setSelectedTutor] = React.useState({});

  const handleClose = () => {
    setAddTutorOpen(false);
  }

  return (
    <StyledTable>
      <tr>
        <Th>id</Th>
        <Th>Name</Th>
        <Th>Didactic grade</Th>
        <Th>DOB</Th>
        <Th>Office</Th>
        <Th>email</Th>
        <Th>Phone number</Th>
        <Th>Departament</Th>
        <Th>Hire date</Th>
        <Th>Edit</Th>
        <Th>Delete</Th>
      </tr>
      {tutors.map((tutor:Tutor) => {
        return (
          <tr key={tutor.idTutor}>
          <Td>{tutor.idTutor}</Td>
          <Td>{tutor.name}</Td>
          <Td>{tutor.professionalDegree}</Td>
          <Td>{moment(tutor.dateOfBirth).format('DD MMM YYYY')}</Td>
          <Td>{tutor.officeName}</Td>
          <Td>{tutor.email}</Td>
          <Td>{tutor.phoneNumber}</Td>
          <Td>{tutor.departamentName}</Td>
          <Td>{moment(tutor.hireDate).format('DD MMM YYYY')}</Td>
          <Td>
            <button 
              style={{backgroundColor: 'transparent', width:'100%', border:'0', outline:'none', color:'#3498db', cursor:'pointer'}}
              onClick={() => {
              setSelectedTutor(tutor);
              setAddTutorOpen(true);
              }}>
              <FontAwesomeIcon icon={faUserEdit} />
            </button>
          </Td>
          <Td>
            <button 
              style={{backgroundColor: 'transparent', width:'100%', border:'0', outline:'none', color:'#f44336', cursor:'pointer'}}
              onClick={() => {
              setSelectedTutor(tutor);
              setDeleteTutorOpen(true);
              }}>
                <FontAwesomeIcon icon={faUserTimes} />
            </button>
          </Td>
        </tr>
        )
        
      })}
      {deleteTutorOpen && <DeleteTutorModal setRefetch={setRefetch} access_key={access_key} tutor={selectedTutor} deleteTutorOpen={deleteTutorOpen} setDeleteTutorOpen={setDeleteTutorOpen}/>}
      {addTutorOpen && <AddTutorModal setRefetch={setRefetch} access_key={access_key} tutor={selectedTutor} addTutorOpen={addTutorOpen} handleClose={handleClose} mode="edit"/> }
    </StyledTable>
    
  )
}

export default Table;