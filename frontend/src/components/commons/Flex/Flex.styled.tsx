import styled from 'styled-components';
import { FlexProps } from './FlexProps';

export const Flex = styled.div<FlexProps>`
  display:flex;
  ${props => props.flex ? `flex: ${props.flex};` : undefined}
  ${props => props.mb ? `margin-bottom: ${props.mb}px;` : undefined};
  ${props => props.mt ? `margin-top: ${props.mt}px;` : undefined};
  ${props => props.ml ? `margin-left: ${props.ml}px;` : undefined};
  ${props => props.mr ? `margin-right: ${props.mr}px;` : undefined}; 
  ${props => props.flexDirection ? `flex-direction: ${props.flexDirection};` : undefined}
`;