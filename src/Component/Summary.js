import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dash from './Dashboard';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(date, person, windmill, In) {
    return { date, person, windmill, In };
}

const rows = [
    createData("27-01-2024", 'test', 6,'10:00 AM'),

];

export default function CustomizedTables() {
    return (
        <>
            <Dash />
           
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 ,marginTop:10}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell align="right">Person</StyledTableCell>
                            <StyledTableCell align="right">WindMill</StyledTableCell>
                            <StyledTableCell align="right">IN</StyledTableCell>
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.date}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.person}</StyledTableCell>
                                <StyledTableCell align="right">{row.windmill}</StyledTableCell>
                                <StyledTableCell align="right">{row.In}</StyledTableCell>
                          
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}