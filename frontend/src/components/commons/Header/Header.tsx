import React from 'react';
import { Title } from './Header.styled';
import { HeaderProps, SpaceProps } from './HeaderProps';

const Header = (props:HeaderProps&SpaceProps) => {
  const { title, mb, mt, mr, ml } = props;
  return <Title mb={mb} mr={mr} mt={mt} ml={ml}>{title}</Title>
}

export default Header;
