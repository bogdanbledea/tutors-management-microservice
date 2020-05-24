import styled from 'styled-components';

export const ModalWrapper = styled.div`
  outline:none;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding:20px;
  background-color:#ffffff;
  border:0;
  width:500px;
  display:block;
  margin:0 auto;
  display:flex;
  flex-direction:column;
`;

export const ErrorMessage = styled.span`
  font-size:14px;
  color:#f44336;
`;

export const Flex = styled.div`
  flex:1;
  margin:5px 5px;
  display:flex;
`;

export const InlineFlex = styled.div`
  display:flex;
  flex-direction:row;
`;

export const CloseButton = styled.button`
  font-size:32px;
  cursor:pointer;
  outline:none;
  flex: 1;
  flex-grow:0;
  background-color: transparent;
  border: 0px;
  align-items: flex-end;
  text-align: right;
`;