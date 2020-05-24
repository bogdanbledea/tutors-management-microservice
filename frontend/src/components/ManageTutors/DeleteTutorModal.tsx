import React from 'react';
import Modal from '../commons/Modal/Modal';
import Button from '@material-ui/core/Button';
import Flex from '../commons/Flex/Flex';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteTutorModal = (props:any) => {
  const { tutor, deleteTutorOpen, setDeleteTutorOpen, access_key, setRefetch } = props;

  // create the form for axios
  let formData = new FormData();
  formData.append('id', tutor.idTutor);
  formData.append('access_token', access_key);

  const showSuccessToast = (message:any) => {
    toast.success(message);
  }
  
  const showErrorToast = (message:any) => {
    toast.error(message);
  }

  const submitForm = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:8080/delete-tutor',
      data: formData
    })
    .then((response) => {
      showSuccessToast(response.data);
      setDeleteTutorOpen(false);
      setRefetch(Math.random());
    }, (error) => {
      showErrorToast(error);
      setDeleteTutorOpen(false);
    });
  } 

  const handleClose = () => {
    setDeleteTutorOpen(false);
  }

  return (
    <Modal handleClose={() => handleClose} title="Delete Tutor" open={deleteTutorOpen}>
      <Flex flexDirection="column">
        <Flex flex={1}>
          Do you want to delete {tutor.name}?
        </Flex>
        <Flex mt={10} mb={10}>
          <Flex mr={10}>
            <Button
              variant="contained"
              color="primary"
              onClick={submitForm}
            >
              Yes
            </Button>
          </Flex>
          <Flex>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setDeleteTutorOpen(false)}
            >
              No
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
}

export default DeleteTutorModal;