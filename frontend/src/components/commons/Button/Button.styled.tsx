import styled from 'styled-components';
import { ButtonProps } from './ButtonProps';

export const Button = styled.button<ButtonProps>`
  border:0;
  color:white;
  padding:10px;
  border-radius:5px;
  cursor: pointer;
  background-color: ${props => props.color};
`;