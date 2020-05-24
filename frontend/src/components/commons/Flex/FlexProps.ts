import { SpaceProps } from '../Header/HeaderProps';

export type FlexProps = SpaceProps & {
  flex?: number;
  flexDirection?: string;
  children?:any;
}