import styled from 'styled-components';
import { SpaceProps } from './HeaderProps';

export const Title = styled.div<SpaceProps>`
  display:flex;
  flex:1;
  font-size: 24px;
  font-weight: 700;
  ${props => props.mb ? `margin-bottom: ${props.mb}px;` : undefined};
  ${props => props.mt ? `margin-top: ${props.mt}px;` : undefined};
  ${props => props.ml ? `margin-left: ${props.ml}px;` : undefined};
  ${props => props.mr ? `margin-right: ${props.mr}px;` : undefined};
`;