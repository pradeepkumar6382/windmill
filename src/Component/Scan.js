import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dash from './Dashboard';
import './Scan.css';
import QRCodeScanner from './quaggascan';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import server from './server'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

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

function createData(windmill, checkin) {
    return { windmill, checkin };
}

const rows = [
    createData(100, '10:00 AM'),

];

export default function Scan({final,setfinals,scanned,setscanned}) {
    console.log(scanned)
    const [last,setlast]=useState([])
    const windmillid=secureLocalStorage.getItem('id')
    const initial=secureLocalStorage.getItem('initial')
    const empname=secureLocalStorage.getItem('name')
    const navigator=useNavigate()
    const [result, setResult] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [decodedResults, setDecodedResults] = useState([]);
    const [doc, setDoc] = useState([]);
    // console.log(decodedResults);

    const handleScan = (data) => {
        if (data) {
            setResult(data);
            setScanning(false);
        }
    };

    const handleError = (error) => {
        console.error(error);
    };

    const startScanning = () => {
        setScanning(true);
    };

    const stopScanning = () => {
        setScanning(false);
        setResult(null);

    };

useEffect(() => {
    const fin=async()=>{
         if (doc[0]) {
       await  server.post('/windmill', {
            empname,
            windmillid,
            initial,
            intime: doc[0].intime,
            out_time: doc[0].intime ,
            date: new Date().toISOString().split("T")[0],
            windmillname:doc[0].scanned[0],
        }).then((res) => {
            setlast(res.data)
           navigator('/scan')
        });
    }
    }
   fin()
}, [doc]);

useEffect(()=>{
const vin=async()=>{
    await server.post('/windowner',{windmillid,date: new Date().toISOString().split("T")[0]}).then(res=>{
        setlast(res.data)
    })
}
vin()
},[])

console.log(last)
        
// useEffect(()=> {
//             const currentTime = new Date().getHours();
//             if (currentTime >= 9 && currentTime <= 19) {
//                 if (scanned) {
//                     setDoc([{ ...scanned.code, intime: new Date().toLocaleTimeString() }]);
//                     setScanning(false); 
//                 }
//             } else {
//                 console.log("Scanning is allowed only between 9 am and 7 pm.");
//             }
//         },[scanned])
useEffect(() => {
    const scanAndProcess = async () => {
      const currentTime = new Date().getHours();

      if (currentTime >= 9 && currentTime <= 19) {
        if (scanned?scanned[0]:0) {
          try {
            setDoc([{scanned, intime: new Date().toLocaleTimeString() }]);
            setScanning(false);
          } catch (error) {
            console.error('Error during scanning:', error);
          }
        }
      } else {
        console.log('Scanning is allowed only between 9 am and 7 pm.');
      }
    };

    scanAndProcess();
  }, [scanned]);

console.log(doc)

    return (
        <>
            <Dash />
            <div style={{ position: 'relative', maxWidth: '400px', maxHeight: '500px', margin: '50px 30px 20px 20px' }}>
                {scanning && (
                    <>
                        <QRCodeScanner scanned={scanned} setscanned={setscanned}/>

                    </>
                )}

                {result && <p>Scanned Result: {result}</p>}

                {scanning ? (
                    <ArrowBackIcon style={{ marginTop: '30px' }} onClick={stopScanning} />

                ) : (
                    <Button className='start' component="label" variant="contained" onClick={startScanning} >Start Scanning</Button>
                )}
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>WindMill NO</StyledTableCell>
                            <StyledTableCell align="right">Employee ID</StyledTableCell>
                            <StyledTableCell align="right">Check-IN Time</StyledTableCell>
                            <StyledTableCell align="right">Check-Out Time</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {last.map((row,index) => { console.log(row)
                        return (

                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {row.windmillname}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.employee_id}</StyledTableCell>
                                <StyledTableCell align="right">{row.in_time}</StyledTableCell>
                                <StyledTableCell align="right">{row.out_time}</StyledTableCell>
                            </StyledTableRow>
                        )})}
                    </TableBody>
                </Table>
            </TableContainer>

        </>

    );
}

