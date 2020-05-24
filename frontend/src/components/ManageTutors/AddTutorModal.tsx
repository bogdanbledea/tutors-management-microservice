import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../commons/Modal/Modal';
import { ErrorMessage } from '../commons/Modal/Modal.styled';
import Flex from '../commons/Flex/Flex';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showSuccessToast = (message:string) => {
  toast.success(message);
}

const showErrorToast = (message:string) => {
  toast.error(message);
}

toast.configure();


const AddTutorModal = (props:any) => {
  const { access_key, addTutorOpen, handleClose, setRefetch, mode, tutor } = props;
  const {handleSubmit, register, errors, control } = useForm();

  const onSubmit = async (data:any) => {
    // create the form for axios
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('idOffice', data.office);
    formData.append('hireDate', moment(data.hireDate).format('YYYY-MM-DD'));
    formData.append('dateOfBirth', moment(data.dateOfBirth).format('YYYY-MM-DD'));
    formData.append('idDepartament', data.departament);
    formData.append('idProfessionalDegree', data.profDegree);
    formData.append('email', data.email);
    formData.append('access_token', access_key);
    if(tutor && tutor.idTutor){
      formData.append('idTutor', tutor.idTutor);
    }
      await axios({
        method: 'post',
        url: mode === 'new' ? 'http://localhost:8080/add-tutor' : 'http://localhost:8080/update-tutor',
        data: formData
      })
      .then((response) => {
        showSuccessToast(response.data);
        handleClose();
        setRefetch(Math.random());
      }, (error) => {
        showErrorToast(error);
        handleClose();
      });
  }

  const emailPattern = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: "Invalid email address"
  }

  const phonePattern = {
    value: /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/i,
    message: "Enter a valid phone number!"
  }

  const getErrorMessage = (errors:any) => {
    switch(errors.type){
      case 'required':
        return "This field is required!";
        break;
      case 'pattern':
        return errors.message;
        break;
    }
  }

  console.log(errors);

  const initialValues = {
    name: tutor ? tutor.name : '',
    phoneNumber: tutor ? tutor.phoneNumber : '',
    email: tutor ? tutor.email : '',
    office: tutor ? tutor.idOffice : undefined,
    profDegree: tutor ? tutor.idProfessionalDegree : undefined,
    departament: tutor ? tutor.idDepartament : undefined,
    hireDate: tutor ? tutor.hireDate : undefined,
    dateOfBirth: tutor ? tutor.dateOfBirth : undefined
  }

  return (
    <Modal handleClose={() => handleClose} title={mode === 'new' ? "Add new tutor" : `Edit tutor "${tutor.name}"`} open={addTutorOpen}>
      <Flex flex={1}>
        <form onSubmit={handleSubmit(onSubmit)} style={{width:'100%'}}>
          <Flex flexDirection="column" flex={1}>
            <Controller
              as={
                <TextField id="outlined-basic" error={errors.name} name="name" label="Name" style={{width:'100%'}}/>
              }
              name="name"
              rules={{ required: true }}
              control={control}
              defaultValue={initialValues.name}
            />
            {errors.name && <ErrorMessage>{getErrorMessage(errors.name)}</ErrorMessage>}
          </Flex>
          <Flex flexDirection="column">
            <Controller
              as={
                <TextField
                  id="outlined-basic" 
                  error={errors.phoneNumber} 
                  name="phoneNumber" style={{width:'100%'}} 
                  label="Phone number"
                />
              }
              name="phoneNumber"
              control={control}
              rules={{ required: true, pattern: phonePattern }}
              defaultValue={initialValues.phoneNumber}
            />
            {errors.phoneNumber && <ErrorMessage>{getErrorMessage(errors.phoneNumber)}</ErrorMessage>}
          </Flex>
          <Flex flexDirection="column">
            <Controller
              as={
                <TextField
                  id="outlined-basic"
                  error={errors.email}
                  name="email"
                  style={{width:'100%'}}
                  label="email"
                  />
              }
              name="email"
              control={control}
              rules={{ required: true, pattern: emailPattern }}
              defaultValue={initialValues.email}
            />
            {errors.email && <ErrorMessage>{getErrorMessage(errors.email)}</ErrorMessage>}
          </Flex>
          <Flex flexDirection="row">
            <Flex flex={1}>
              <FormControl style={{width:'100%', margin:'5px'}}>
                <InputLabel id="demo-simple-select-label" error={errors.office}>Office</InputLabel>
                <Controller
                  as={
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{width:'100%'}}
                      error={errors.office}
                    >
                      <MenuItem value={1}>B226</MenuItem>
                      <MenuItem value={2}>A210</MenuItem>
                      <MenuItem value={3}>Electro2</MenuItem>
                      <MenuItem value={4}>A210</MenuItem>
                      <MenuItem value={5}>B228</MenuItem>
                      <MenuItem value={6}>B225</MenuItem>
                    </Select>
                  } 
                  name="office"
                  rules={{ required: true }}
                  control={control}
                  defaultValue={initialValues.office}
                />
                {errors.office && <ErrorMessage>{getErrorMessage(errors.office)}</ErrorMessage>}
              </FormControl>
            </Flex>
            <Flex flex={1}>
              <FormControl style={{width:'100%', margin:'5px'}}>
              <InputLabel id="demo-simple-select-label" error={errors.profDegree}>Prof. Degree</InputLabel>
              <Controller
                  as={
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{width:'100%'}}
                      error={errors.profDegree}
                    >
                      <MenuItem value={1}>Drd.</MenuItem>
                      <MenuItem value={2}>Asoc.</MenuItem>
                      <MenuItem value={3}>As.</MenuItem>
                      <MenuItem value={4}>Sl.</MenuItem>
                      <MenuItem value={5}>Conf.</MenuItem>
                      <MenuItem value={6}>Prof.</MenuItem>
                    </Select>
                  }
                  name="profDegree"
                  rules={{ required: true }}
                  control={control}
                  defaultValue={initialValues.profDegree}
                />
                {errors.profDegree && <ErrorMessage>{getErrorMessage(errors.profDegree)}</ErrorMessage>}
              </FormControl>
            </Flex>
          </Flex>
          <Flex flex={1}>
            <FormControl style={{width:'100%', margin:'5px'}}>
              <InputLabel id="demo-simple-select-label" error={errors.departament}>Departament</InputLabel>
              <Controller
                as={
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                  >
                    <MenuItem value={1}>Communications</MenuItem>
                    <MenuItem value={2}>Applied Electronics</MenuItem>
                    <MenuItem value={3}>Measurements and Optic Electronics</MenuItem>
                    <MenuItem value={4}>Automation and Applied Informatics</MenuItem>
                    <MenuItem value={5}>Computers and Information Technology</MenuItem>
                    <MenuItem value={6}>Mathematics</MenuItem>
                    <MenuItem value={7}>The physical basis of engineering</MenuItem>
                    <MenuItem value={8}>Management</MenuItem>
                    <MenuItem value={9}>Economic and socio-human sciences</MenuItem>
                  </Select>
                }
                name="departament"
                rules={{ required: true }}
                control={control}
                defaultValue={initialValues.departament}
              />
              {errors.departament && <ErrorMessage>{getErrorMessage(errors.departament)}</ErrorMessage>}
            </FormControl>
          </Flex>
          <Flex flexDirection="row">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Flex>
              <Controller
                  as={
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Hire date"
                      format="MM/dd/yyyy"
                      value={initialValues.hireDate}
                      onChange={() => {}}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  }
                  name="hireDate"
                  rules={{ required: true }}
                  control={control}
                  defaultValue={initialValues.hireDate}
                  />
              </Flex>
              <Flex>
                <Controller
                  as={
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date of Birth"
                      format="MM/dd/yyyy"
                      value={initialValues.dateOfBirth}
                      onChange={() => {}}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  }
                  name="dateOfBirth"
                  rules={{ required: true }}
                  control={control}
                  defaultValue={initialValues.dateOfBirth}
                />
              </Flex>
            </MuiPickersUtilsProvider>
          </Flex>
          <Button variant="contained" color="primary" type="submit">
            {mode === 'new' ? 'Add tutor' : 'Save tutor'}
          </Button>
        </form>
      </Flex>
    </Modal>
  )
}

export default AddTutorModal;
