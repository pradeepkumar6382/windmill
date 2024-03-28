
import * as React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Link ,useLocation} from 'react-router-dom';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DescriptionIcon from '@mui/icons-material/Description';
import secureLocalStorage from 'react-secure-storage';

export default function ButtonAppBar({final,setfinal,setlog}) {
    console.log(final)
    const personname=secureLocalStorage.getItem('fullname')
    const navigate=useNavigate()
    const prad=useLocation().state
    React.useEffect(()=>{
    },[])
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const handlelogout=()=>{
        localStorage.clear()
        navigate('/')
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <Divider />
            <List>
                {[personname].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>

                {['Scan'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to="/scan">
                            <ListItemIcon>
                                <DocumentScannerIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>

                {['Summary Report'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to="/summary">
                            <ListItemIcon>
                                <SummarizeIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>

                {['Attendance Report'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to="/attend">
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />

        </Box>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {['left'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <MenuIcon onClick={toggleDrawer(anchor, true)} />
                                    <Drawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                    >
                                        {list(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
                        </IconButton>

                        <Typography className='head' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <h3>Intech ERP</h3>
                        </Typography>
                        <Button color="inherit" onClick={handlelogout}><LogoutIcon /></Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
