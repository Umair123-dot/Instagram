import React, { useState } from 'react';
import mobile from '../../images/screen.png'
import instalogo from '../../images/logo.PNG'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import AppStore from '../../images/AppStore.png';
import GoogleStore from '../../images/google.png';
import FrontPage from '../FrontPage/FrontPage';
import AUTH_TOKEN from '../../constant';
import { FaFacebookSquare } from 'react-icons/fa';
import Haro from './slider';
import { IconContext } from "react-icons";
import { SliderData } from './SliderData';
import './slides.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import {
  ApolloClient, gql, useMutation
} from '@apollo/client';


const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
      user{
        name
        email
      }
    }
  }
`;






const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const classes = useStyles();
  const [loginValues, setLoginValues] = useState({

    email: '',
    password: '',

  });
  const history = useHistory();
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem(AUTH_TOKEN, data.login.token)
      console.log(localStorage)
      history.push('/frontpage');
    },
    onError: ({ message }) => alert(message)
  })

  function onFormChange(event) {
    setLoginValues({
      ...loginValues,
      [event.target.name]: event.target.value

    })

  }
  function onValueChange(event) {
    event.persist()
    event.preventDefault();
    console.log({ loginValues })
    login({ variables: loginValues })
  } 
  if (localStorage.getItem(AUTH_TOKEN)) return <Redirect to='/frontpage' />

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <div className={classes.grandpa}>
            <div className={classes.mobile}>
              <img src={mobile} alt='Mobile Phone' />
            </div>
            <div className={classes.image5}>

              <Haro slides={SliderData} />
            </div>

          </div>

        </Grid>

        <Grid className={classes.main} item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <div className={classes.logo}>
              <img src={instalogo} alt="LOGO" />
            </div>
            <form onSubmit={onValueChange}>
              <div>

                <TextField type="email" name="email" onChange={onFormChange} required style={{ height: 50, width: 266, border: '1px solid #EDEDED' }} InputProps={{ disableUnderline: true }} className={classes.textField} FloatingLabelStyle={{ color: 'black' }} id="Username" label="Phonenumber, username, or email" />
                <TextField type="password" name="password" onChange={onFormChange} required style={{ height: 50, width: 266, border: '1px solid #EDEDED' }} className={classes.textField1} label='Password' type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                  InputProps={{ // <-- This is where the toggle button is added.
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputAdornment>
                    )
                  }}
                />
              </div>


              {/* <Link to=""> */}
              <Button


                style={{ backgroundColor: "#0095F6", color: "white" }}
                className={classes.buttonLogin}
                type="submit"
                variant="contained"
              > Login</Button>
              {/* </Link> */}
            </form>
            <div style={{ marginLeft: '43px', marginTop: '15px ', width: '70%', height: '12px', borderBottom: '1px solid #EDEDED', textAlign: 'center' }}>
              <span style={{ backgroundColor: 'white', padding: ' 0 10px' }}>
                OR
             </span>
            </div>
            <IconContext.Provider value={{ color: "#385185", className: "global-class-name" }}>
              <div style={{ margin: '28px' }}>
                <FaFacebookSquare /> Log in With Facebook
  </div>
            </IconContext.Provider>
            <div style={{ marginBottom: '3px' }}>
              <p>Forgot Password</p>
            </div>

          </Paper>
          <Paper className={classes.paper2}>
            <div className={classes.para1}>
              <p>Don't have an account? <Link className={classes.linkS} to="/signup"> Sign up  </Link></p>
            </div>
          </Paper>
          {/* <Paper className={classes.paper1}>
              <div style={{ marginTop: '-10px', color: '#000000' }}>
                Don't have an account? <Link className={classes.sign}>Sign Up</Link>
              </div>
            </Paper> */}

          <div className={classes.detail}>
            <div style={{ marginLeft: '8.5em' }}>
              <p>Get the App</p>

            </div>
            <div style={{ marginTop: '15px' }}>
              <img src={AppStore} alt="GooleApp" style={{ marginRight: '10px', marginLeft: '30px', height: '45px', width: '140px' }} />
              <img src={GoogleStore} alt="App Storex" style={{ height: '45px', width: '140px' }} />

            </div>


          </div>
        </Grid>

      </Grid>
    </div>
  );
}

export default Home;