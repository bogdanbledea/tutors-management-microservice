export type ModalProps = {
  title:string;
  open: boolean;
  handleClose: (type:boolean) => any;
  children:any;
}