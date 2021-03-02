import { Grid } from '@material-ui/core';
import React from 'react'
import Scren from '../../images/screen.png';
import SliderData from './SliderData'

import Hero from './slider';

import { makeStyles } from '@material-ui/core/styles';
import Showpage from './ShowPage';


const useStyles = makeStyles((theme) => ({

main:{
  

},
main:{
  top:0,
  position:'absolute',
  marginTop:'50px',
  marginLeft:'330px',
  [theme.breakpoints.up('sm')]:{
    marginLeft:'90px'
  }
  ,
  [theme.breakpoints.down('xs')]:{
    display:'none'
  },
  [theme.breakpoints.down('sm')]:{
    marginLeft:'-80px',
    marginTop:'10px'
  },
  [theme.breakpoints.up('md')]:{
    marginLeft:'60px',
    marginTop:'10px'
  },
  [theme.breakpoints.up('lg')]:{
    marginLeft:'260px',
    marginTop:'10px'
  },

  
  
  
  
},
  moblie:{
    position:'absolute',
    height:"700px",
    
      
  },
  hero:{
    
    position:'relative',
    marginTop:'98px',
    marginRight:'10px',
    marginLeft:'40px'

    

  },
 
  page:{
    marginTop:'200px',
    marginLeft:'780px',
    [theme.breakpoints.up('sm')]:{
      marginLeft:'520px'
    }, [theme.breakpoints.down('xs')]:{
      marginLeft:'-40px',
      marginTop:'60px'
    },
    [theme.breakpoints.only('sm')]:{
      marginLeft:'330px',
      marginTop:'150px'
    },
    [theme.breakpoints.up('lg')]:{
      marginLeft:'700px',
      marginTop:'150px'
    },



  }
}));



const Mobile = () => {

  
  const classes = useStyles();
  return (
    <div  className={classes.main1}>
    <span className={classes.main}>
     <div className={classes.moblie}>
    <img  src={Scren} alt="Umair"/>
    </div>
    <div className={classes.hero}>
    <Hero   slides={SliderData} />
    </div>
    </span>

    <div className={classes.page}>
      <Showpage />
    </div>
   
    
  
   
   
    
    </div>
  )
}

export default Mobile
