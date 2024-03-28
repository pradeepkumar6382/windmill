import React,{useState} from 'react';
import './Login.css';
import Logo from '../Assets/logo.png';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Scan from './Scan'
import Dash from './Dashboard';
import { useNavigate } from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage";
import server from './server'
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://intechchennai.com/" >
                intechchennai
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

export default function SignIn({final,setlog,setfinals}) {
    console.log(final)
    const navigate=useNavigate()
       const [data,setdata]=useState({
        name:'',
        password:''
    })

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         username: data.get('username'),
    //         password: data.get('password'),
    //     });
    // };

    function changeBackground(e) {
        e.target.style.background = 'green';
    }

const handlesubmit=async(e)=>{
    e.preventDefault()
    if(data.name!==''){
        await server.post('/hi',{employeeid:data.name,password:data.password}).then(res=>{
      if(res.data[1]==="success"){
        secureLocalStorage.setItem('data',JSON.stringify(data))
        secureLocalStorage.setItem('fullname',res.data[0].emp_name+" "+res.data[0].initial.replace('.', ''))
        secureLocalStorage.setItem('name',res.data[0].emp_name)
        secureLocalStorage.setItem('initial',res.data[0].initial)
        secureLocalStorage.setItem('id',res.data[0].employee_id)
        setfinals(res.data[0])
        setlog(true)
        navigate('/Dash ') 
      }else{
        alert("username or password is incorrect")
      }
       
    })
    }else{
        alert("Please fill all the fields")
    }
    
}
    return (
        <ThemeProvider className="log" theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={Logo} style={{ width: '100%', height: 150, marginBottom: 10 }} />

                    <Box component="form" onSubmit={handlesubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            onChange={(e) => setdata({ ...data, name: e.target.value })}
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            onChange={(e) => setdata({ ...data, password: e.target.value })}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            className='buttonHover'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onMouseOver={changeBackground}
                            onClick={handlesubmit}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <ul style={{ listStyleType: 'none' }}>
                                    <strong style={{ color: "red" }}> NOTE :-</strong>
                                    <li>
                                        <p>
                                            1. Settings &gt;&gt; Camera &amp; Location &gt;&gt; Select <b>`Allow` </b>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            2. Privacy  &gt;&gt;  Location Services  &gt;&gt; <b>`ON`</b> and check Share my location  &gt;&gt;  Allow Browser App, select <b>`Ask Next Time Or When I Share`</b>
                                        </p>
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>
                        <hr style={{
                            background: "#F4F4F4",
                            height: "1px",
                            border: "none",
                        }} />
                        <p style={{textAlign:'center'}}>  V 0.0.1 (1)</p>
                    </Box>

                </Box>
                <hr style={{
                    background: "#F4F4F4",
                    height: "1px",
                    border: "none",
                }} />
                <Copyright sx={{ mt: 3, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}