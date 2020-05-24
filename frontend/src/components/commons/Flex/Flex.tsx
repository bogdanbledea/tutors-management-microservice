import React from 'react';
import { FlexProps } from './FlexProps';
import { Flex as FlexContainer } from './Flex.styled';

const Flex = (props:FlexProps) => {
  const { flexDirection, flex, children, mb, mt, mr, ml } = props;
  return (
    <FlexContainer flex={flex} mb={mb} mt={mt} mr={mr} ml={ml} flexDirection={flexDirection}>
      {children}
    </FlexContainer>
  );
}

export default Flex;