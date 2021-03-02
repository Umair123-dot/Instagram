import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

 const useStyles = makeStyles((theme) => console.log(theme) || ({
  root: {
      flexGrow: 1,
      display:'flex',
      alignItems:'center',
      backgroundColor: "",
      overflow:'hidden'
      
  },
  main:{
   
   
      
  },
  grandpa:{
    
    position: 'relative',
    [theme.breakpoints.down('xs')]:{
        display:'none',
       

        

        
    },
    
   
    


    top: 2,
    left: 0
  },
  paper: {
      padding: theme.spacing(2),
      paddingLeft:'30px ',
      textAlign: 'center',
      backgroundColor: "#FFFFFF",
      height: '400px',
      width: '320px',
      marginTop: '30px',
      border: '1px solid #FAFAFA '


  },
  paper1: {
    height: '5px',
    width: '360px',
    marginTop: '10px',
    marginRight:'100px',
    paddingRight:'10px',
    textAlign: 'center',
    border: 'none',
    

  },
  image5:{
   position:'absolute',
   
   marginLeft:'353px',
   marginTop:'-562px',
   [theme.breakpoints.up('lg')]:{
     marginLeft:'336px'
   },
   [theme.breakpoints.down('lg')]:{
    marginLeft:'111px'
  },
  [theme.breakpoints.down('sm')]:{
    marginLeft:'-10px'
  },
  [theme.breakpoints.down('sm')]:{
    marginLeft:'-10px'
  },
  [theme.breakpoints.up('lg')]:{
    marginRight:'100px'
  },
  
   

  },
  mobile: {
    position:'relative',
    marginLeft: '43%',
    marginTop: '8px',
    height:'660px',
    width:'500px',
    [theme.breakpoints.down('lg')]:{
        position:'relative',
        marginTop: '6px',
        marginLeft:'70px'
      },
      [theme.breakpoints.down('sm')]:{
        position:'relative',
        marginLeft:'-50px'
      },
    // [theme.breakpoints.up('md')]: {
    //     paddingRight:'100px'
       
    // },

    // [theme.breakpoints.up('md')]: {
        
       
    //   },
      
    //   [theme.breakpoints.down('xs')]: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //       display:'none'
         
       
    // }
     
  },
  logo: {
      marginTop: '5px'
  },
  paper2: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: "#FFFFFF",
      height: '41px',
      width: '320px',
      marginTop: '13px',
      paddingLeft:'30px ',
  },
  textField: {
      marginTop: '20px',
      backgroundColor: "#FAFAFA",
  },
  textField1: {
      marginTop: '15px',
      backgroundColor: "#FAFAFA",

  },
  buttonLogin: {
      backgroundColor: "#0095f6",
      height: 30,
      width: 266,
      marginTop: '20px'
  },
  para1: {
      fontSize: '14px',
      margin: '15px',
      textDecoration:'none'
  },
  para2:{
      textAlign:'center',
      margin:'60px 30px 10px 60px'
  },
  linkS:{
      textDecoration:'none',
      color:'blue',
      
      
  }
}));


export default useStyles;