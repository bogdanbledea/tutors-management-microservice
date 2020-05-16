import React from 'react';
import { Button as BaseButton } from './Button.styled';
import { ButtonProps } from './ButtonProps';

const Button = (props: ButtonProps) => {
  return <BaseButton {...props} onClick={props.onClick} {...props.children} />
}

export default Button;