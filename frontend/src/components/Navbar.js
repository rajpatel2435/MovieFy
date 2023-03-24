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
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from '@mui/material';
import { useNavigate } from "react-router-dom";



const navitems = [
    {
        text: 'Home',
        path: '/'
    },
    {
        text: 'Movies',
        path: '/Signup'
    },
    {
        text: 'Shows',
        path: '/Login'
    },
    {
      text:'Favourite',
      path:'/FileUpload'
    }
]

const AdmNavitems = [
  {
      text: 'Home',
      path: '/'
  },
 
  {
    text:'AddMovies',
    path:'/FileUpload'
  },
  {
    text:'All Users',
    path:'/users'
  }
]

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  let auth = localStorage.getItem('user');

  console.log(auth);

  return (
    <AppBar  sx={{backgroundColor:'black',height:'4em'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            }}
          >
            MovieFy         
             </Typography>
             {/* Add if here */}
{auth ?
  
// 
JSON.parse(auth).email=="admin@admin.com"?
<>

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
              {AdmNavitems.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
               
                  <Typography textAlign="center" href={page.path}>{page.text}</Typography>
              
                </MenuItem>
              ))}
            </Menu>
          </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           HealthiFy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },marginLeft:'310px' }}>
            {AdmNavitems.map((page) => (
            
              <Button
                key={page.text}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block',mx:2}}
                href={page.path}
              >
                {page.text}
              </Button>
      
            ))}
            
            <Link href={'/login'} style={{ textDecoration: 'none', color: '#fff', fontSize: '32px' }}>
                                <Button onClick={() => { localStorage.clear(); navigate('/login') }} color='inherit' sx={{ height: '4em',mx:2,my:0.8 }}>Logout ({JSON.parse(auth).name})</Button>
                            </Link>
          </Box>

            
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="k" src="/static/images/avatar/3.jpg" />
              </IconButton>
            </Tooltip>
         
          </Box>
          </>
          // Add else here
          : 

<>
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
              {navitems.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
               
                  <Typography textAlign="center" href={page.path}>{page.text}</Typography>
              
                </MenuItem>
              ))}
            </Menu>
          </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           HealthiFy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },marginLeft:'390px' }}>
            {navitems.map((page) => (
            
              <Button
                key={page.text}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block',mx:2}}
                href={page.path}
              >
                {page.text}
              </Button>
      
            ))}
            
            <Link href={'/login'} style={{ textDecoration: 'none', color: '#fff', fontSize: '32px' }}>
                                <Button onClick={() => { localStorage.clear(); navigate('/login') }} color='inherit' sx={{ height: '4em',mx:2,my:0.8 }}>Logout ({JSON.parse(auth).name})</Button>
                            </Link>
          </Box>

            
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="k" src="/static/images/avatar/3.jpg" />
              </IconButton>
            </Tooltip>
         
          </Box>
          </>

          :
          <>
        <>
                        <Box sx={{ display: 'flex', flexGrow: 1 }} />
                        <Box>
                            <Link href={'/signup'} style={{ textDecoration: 'none', color: '#fff', fontSize: '32px' }}>
                                <Button color='inherit' sx={{ height: '4em', px: '2em' }}>Sign Up</Button>
                            </Link>
                            <Link href={'/login'} style={{ textDecoration: 'none', color: '#fff', fontSize: '32px' }}>
                                <Button color='inherit' sx={{ height: '4em', px: '2em' }}>Login</Button>
                            </Link>
                        </Box>
                    </>
          </>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;