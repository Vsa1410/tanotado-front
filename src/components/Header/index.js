import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link, Navigate } from 'react-router-dom';
import { token } from '../../App';
import { useState } from 'react';



const Header = () => {
  
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [header,setHeader]=useState(true)
  const [redirectToLogin, setRedirectToLogin] = useState(false)
    
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    if (redirectToLogin === true){
     return <Navigate to='/' replace={true} />
    }
    
    function logout(){
      localStorage.removeItem('user', null)
      localStorage.removeItem('token', null)
      setRedirectToLogin(true)
      
    }
    

  

    
    return (
      <AppBar position="static">
        <Container maxWidth="xl" sx={{backgroundColor: '#0081A7'}}>
          <Toolbar disableGutters>
            <DescriptionIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,backgroundColor: '#0081A7'}} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                backgroundColor: '#0081A7'
              }}
            >
              TAnotado
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                
                  <MenuItem  onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" component={Link} to='/notesscreen'>Home</Typography>
                  </MenuItem>

                  
                
              </Menu>
            </Box>
           
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },backgroundColor: '#0081A7' }}>
              
                <Button
                  
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={Link} to='/notesscreen'
                >
                  Home
                </Button>

                
                
              
            </Box>
                



            <Box sx={{ flexGrow: 0 }} >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'gray' }}></Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
               
                  <MenuItem key={"Profile"} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{"Profile"}</Typography>
                  </MenuItem>
                  <MenuItem key={"Logout"} >
                    <Typography textAlign="center" onClick={logout}>{"Logout"}</Typography>
                  </MenuItem>
                
              </Menu>
            </Box>





          </Toolbar>
        </Container>
      </AppBar>
    );
  };
  export default Header;