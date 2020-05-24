import React from 'react';
import { ModalWrapper, CloseButton, Flex } from './Modal.styled';
import Modal from '@material-ui/core/Modal';
import { ModalProps } from './ModalProps';
import Header from '../Header/Header';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const ModalComponent = (props:ModalProps) => {
  const { title, open, handleClose, children } = props;
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      width:'100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <ModalWrapper>
        <Flex>
          <Header title={title} />
          <CloseButton onClick={handleClose(false)} style={{backgroundColor:'transparent', border:0}}>
            &times;
          </CloseButton>
        </Flex>
        <Flex>
          {children}
        </Flex>
      </ModalWrapper>
    </Modal>
  );
}

export default ModalComponent;