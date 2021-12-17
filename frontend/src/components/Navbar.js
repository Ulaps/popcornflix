import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MenuItem from '@mui/material/MenuItem';
// import SearchBar from './SearchBar';
// import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { logout } from '../redux/userSlice';
import GoogleLogoutHook from './GoogleLogoutHook';
import { clearFilters } from '../redux/filterSlice';

const Navbar = () => {
    const pages = [{ name: 'Movies', link: '/'}, {name :'Actors', link: '/actors'},{name :'Producers', link: '/producers'}];
    const settings = ['Logout'];
  
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const storeUser = useSelector(state => state.user);
    const dispatch = useDispatch();
  
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
  
    return (
      <AppBar position="fixed" sx={{
          backgroundColor:"#630000"
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' }}}
            >
              POPCORNFLIX
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
                <LocalMoviesIcon/>
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
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                     <><Link to={page.link} style={{ textDecoration:'none', color:'Black'}} onClick={dispatch(clearFilters())}>{page.name}</Link></>
                  </MenuItem>
                ))}
              </Menu>
              {/* <SearchBar/> */}
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
              Pinoy Flix
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {/* <SearchBar/> */}
                {pages.map((page) => (
                    <MenuItem key={page.name}>
                        <Link to={page.link} style={{ textDecoration:'none', color:'white'}} onClick={dispatch(clearFilters())}>{page.name}</Link>
                    </MenuItem>
                ))}
                {/* {
                  storeUser.user &&
                  (storeUser.user.role === 'Admin') ?
                      <MenuItem key="Admin">
                        <Link to={'/admin'} style={{ textDecoration:'none', color:'white'}}>Admin</Link>
                      </MenuItem> :
                      <></>
                } */}
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Guest" src={storeUser.user !== null ? storeUser.user.avatar[0].url : '/assests/temp_avatar.png' } />
                  {/* <Avatar alt="Remy Sharp" src={ '/assests/temp_avatar.png' } /> */}
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    { !storeUser.onGoogle ? 
                      <GoogleLogoutHook /> : 
                    <Button onClick={() => { dispatch(logout()) }}><Typography textAlign="center">{setting}</Typography></Button>
                    }
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };
 
export default Navbar;