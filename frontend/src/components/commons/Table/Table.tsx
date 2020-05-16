import React from 'react';
import { Table as StyledTable, Th, Td} from '../Table/Table.styled';
import Button from '../Button/Button';

const Table = () => {
  return (
    <StyledTable>
      <tr>
        <Th>id</Th>
        <Th>Name</Th>
        <Th>Didactic grade</Th>
        <Th>DOB</Th>
        <Th>Office</Th>
        <Th>email</Th>
        <Th>Phone number</Th>
        <Th>Departament</Th>
        <Th>Hire date</Th>
      </tr>
      <tr>
        <Td>1</Td>
        <Td>Bogdan Bledea</Td>
        <Td>Assistent</Td>
        <Td>19/01/1997</Td>
        <Td>B226</Td>
        <Td>bledeabogdanalexandru@gmail.com</Td>
        <Td>+40729095510</Td>
        <Td>Communications</Td>
        <Td>27 September 2019</Td>
      </tr>
    </StyledTable>
  )
}

export default Table;