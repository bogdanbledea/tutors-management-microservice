import React from 'react';
import Header from '../commons/Header/Header';
import AddTutorModal from '../ManageTutors/AddTutorModal';
import Table from '../commons/Table/Table';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const Tutors = (props: any) => {
  const [addTutorOpen, setAddTutorOpen] = React.useState(false);
  const access_key = process.env.REACT_APP_API_KEY;
  const [tutors, setTutors] = React.useState();
  const [refetch, setRefetch] = React.useState();
  const closeAddTutor = () => {
    setAddTutorOpen(false);
  }

  React.useEffect(() => {
    axios.get(
      `http://localhost:8080/tutors?access_token=${access_key}`,).then((res) => {
        setTutors(res.data);
    })
  }, [refetch]);

  if(tutors){
    return (
      <React.Fragment>
        <Header title="Tutors management microservice" mb={20}/>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddTutorOpen(true)}
        >
          Add tutor
        </Button>
        <Table tutors={tutors} access_key={access_key} setRefetch={setRefetch}/>
        <AddTutorModal handleClose={closeAddTutor} access_key={access_key} addTutorOpen={addTutorOpen} mode="new" setRefetch={setRefetch}/>
      </React.Fragment>
    )
  } else return null;
}

export default Tutors;