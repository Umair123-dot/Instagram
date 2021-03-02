import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import Logo from './images/logo.PNG'
import TextField from '@material-ui/core/TextField';


const useStyles=makeStyles((theme)=>({
   main:{
     backgroundColor:'#FFFFFF',
     borderBottom:'2px solid #efeff5',
     width:'100%',
     height:'60px'
     
   },
   logo:{
    [theme.breakpoints.down('xs')]: {
      marginLeft:'30px',
    },
     marginTop:'19px',
     marginLeft:'22%',
     
   }

}));
  

const Practice = () => {

  const classes=useStyles();
  return (
    <Grid className={classes.main} container xs={12} >
      <Grid className={classes.logo} item xs={3}>
      <img c src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="umair" />
     </Grid>
     <Grid className={classes.search} item xs={3}>
     <TextField
         
          id="outlined-margin-dense"
          defaultValue="Search"
          className={classes.textField}
         
          margin="dense"
          variant="outlined"
        />
      

     </Grid>
  

    </Grid>
  )
}

export default Practice
