import React from 'react';
import Table from '../commons/Table/Table';
import Button from '../commons/Button/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = () => {
  toast.success("Tutor added successfully!");
}

toast.configure();

const ManageTutors = () => {
  return (
    <React.Fragment>
      <Table />
      <Button color="green" onClick={showToast}>Add tutor</Button>
    </React.Fragment>
  )
}

export default ManageTutors;