import React, { useState } from 'react';
import { RiMessengerLine } from 'react-icons/ri';
import { MdExplore } from 'react-icons/md'
import { Avatar } from '@material-ui/core';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import useStyles from './StylesH';
import Child from '../../images/child.jpg'
import { fade, makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import TextField from '@material-ui/core/TextField';
import { useHistory, Link } from 'react-router-dom';
import PostB from './Posts';
import { gql, useQuery } from '@apollo/client'
import { Token } from 'graphql';
import Profile from '../../component/Profile/index';
import updateProfile from '../settings/UpdateProfile'

const ShowData = gql`
query {
  loggedInUser {
    name,
    email,
    avatar

  }
}
`

function Header() {
  const classes = useStyles();
  const { data, loading, error } = useQuery(ShowData);
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push('/');
  }




  //  let user=JSON.parse(localStorage.getItem())

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (


    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={handleMenuClose}>

        {/* LOGOUT  */}
      Profile</MenuItem>
      <MenuItem onClick={logout}>LOGOUT</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <TurnedInNotIcon />
          </Badge>
        </IconButton>
        <p>Saved</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <SettingsIcon />
          </Badge>
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem>
        <hr />

        <p>LOGOUT</p>
      </MenuItem>


    </Menu>
  );
  
  return (

    <div className={classes.grow}>

      <AppBar position="static">
        <Toolbar style={{ backgroundColor: 'white', color: 'black' }} >
          <Typography className={classes.title} variant="h6" noWrap style={{ fontFamily: 'Lobster cursive', marginLeft: '10vw' }}>
            <img
              className={classes.insta}
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Insta"
            />
          </Typography>
          <div className={classes.search} style={{ marginLeft: '13vw' }}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>


            <InputBase

              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />

          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">

              <Badge badgeContent={0} color="secondary">
                <PostB />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">

              <Badge badgeContent={0} color="secondary">
                <RiMessengerLine />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">

              <Badge badgeContent={0} color="secondary">
                <Link to="/profile">
                  <MdExplore />
                </Link>

              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {loading ? (
                <Skeleton variant="circle" width={40} height={40} />
              ) : (
                  error ? 
                  (
                    <Avatar className={classes.small}
                      alt="Umair_Zafar"
                    >E</Avatar>
                  ) : (
                    <Avatar className={classes.small}
                      alt="Umair_Zafar"
                      src={`/images/${data.loggedInUser.avatar}`}
                    />
                  )
                )}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>

            <IconButton aria-label="show 4 new mails" color="inherit">

              <Badge badgeContent={0} color="secondary">
                <HomeIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">

              <Badge badgeContent={0} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >


              <Badge badgeContent={0} color="secondary">
                <Avatar className={classes.small}
                  alt="Umair_Zafar"
                  src={Child}
                />

              </Badge>

            </IconButton>


          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default Header;