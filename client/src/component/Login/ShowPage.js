import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Logo from '../../images/logo.PNG';
import Avatar from '@material-ui/core/Avatar';
import Child from '../../images/child.jpg';
import { Link, useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 370,
    height:'350px',
    border:'1px solid #C0C0C0',
    backgroundColor: theme.palette.background.paper,
    margin:'10px',
    
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(2, 2),
  },
  section2: {
    margin: theme.spacing(2),
    marginTop:'-10px'
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
  // section4: {
   
  //   display:'flex',
  //   justifyContent:'center',
  //    margin: theme.spacing(2, 10),
    
    
  // },
  Logo:{
    height:'70px',
    width:'200px',
    margin:'25px 0px 0px 70px'


  },
  avatar:{
    height:'100px',
    width:'100px',
    margin:'15px 40px 0px 120px'
  },
  button:{
    width:'200px',
    height:'30px',
    marginLeft:'11vh',
    backgroundColor:'#0095F6'
  },
  link:{
    color:'#0095F6',
    paddingLeft:'1px'
    
  }
}));



export default function MiddleDividers() {
  const history = useHistory();
  const classes = useStyles();
  const onChange = () =>{
    let path='/'
    
     history.push(path);

 }
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <img  className={classes.Logo} src={Logo} alt="umair" />
          </Grid>
         
        </Grid>
       </div>
     
      <div className={classes.section2}>
      <Avatar className={classes.avatar} alt="Remy Sharp" src={Child} />
        
        
      </div>
      <div className={classes.section3}>
      <Button style={{textTransform:'none'}} className={classes.button}  variant="contained" color="primary" disableElevation>
      Continue as iiiumair
    </Button>
      </div>
      <div className={classes.section4}>
      <span style={{marginLeft:'94px', display:'flex'}}>
      <p>Not iiiumair?</p>
      <Button onClick={onChange} type="submit" style={{textTransform:'none'}} className={classes.link} href="#text-buttons" color="primary">
        Switch accounts
      </Button>
      </span>
      </div>
    </div>
  );
}