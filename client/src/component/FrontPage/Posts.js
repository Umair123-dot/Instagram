import React,{useState} from 'react';
import Umair from '../../images/child.jpg'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import {Avatar, Grid, Hidden} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from "@material-ui/core/ButtonBase";
import {InputBase} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { Link, useHistory, Redirect } from "react-router-dom";
import { gql, useMutation } from '@apollo/client'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'black',
  },
  
  
  
});


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  heading:{
    textAlign:'center',
    marginTop:'10px',
    fontWeight:'bold'

  },
 
  size: {
    height: "50px",
    width: "50px",
    marginLeft:'-10px',
    marginTop:'4px'
  },First:{
    color:'#050505',
    fontWeight:'bold'
  },grid:{
    marginRight:'12px',
    
  },
  second:{
    
  },
  main:{
    width:'100%',
    
    margin:'auto',
    overflow:'Hidden'
  }
}));

const CREATEPOST = gql`
mutation($picture:Upload!, $content:String!){
    createPost(picture:$picture,content:$content){
        picture
        content
    }
}`;

const initialState = {
  picture: '',
  content: ''

}

const DialogTitle = withStyles(styles)((props) => {
  
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dialog=useStyles();
  const classes = useStyles();

  const [form, setForm] = useState(initialState)
  const [imagePreview, setImagePreview] = useState('')
  const history = useHistory();
  const [createPost] = useMutation(CREATEPOST, {
      onCompleted: () => {
          setForm(initialState)
          alert("POST ADDED")
          history.push('/')
      },
      onError: ({ message }) => {
          // <Alert severity="error">error</Alert>
          alert(message)

      }
  })
  const onFormChange = (event) => {
    const { name, type, value } = event.target
    if (type == 'file') {
        setImagePreview( URL.createObjectURL(event.target.files[0]))
        setForm({
            ...form,
            picture: event.target.files[0]
        })
    }
    else {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
}
const onImageChange = (event) => {
  if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("image-file");
      preview.src = src;
      preview.style.display = "block";
  }

}

const onFormSubmit = (event) => {
  event.preventDefault();
  console.log(form)
  createPost({ variables: form })
}

  return (
    <div>
    
    <HomeIcon variant="outlined" onClick={handleClickOpen}>
    
      
     </HomeIcon>
   
      <Dialog  fullWidth className={classes.main} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
       
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         
          <Typography gutterBottom variant="h4" className={dialog.heading}>
            Create Post
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Grid container spacing={2} className={classes.grid}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <Avatar className={classes.size} src={Umair} alt="Umair" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography className={classes.First} gutterBottom variant="subtitle1">
                Umair Zafar
              </Typography>
              <Typography className={classes.second} variant="body1" gutterBottom>
                This is Caption
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <img id="image-file" src={imagePreview} height="40%" width="40%" style={{marginLeft:"20%"}} /><br />
     
        </DialogTitle>
        <form onSubmit={onFormSubmit}>
        <InputBase

        className={classes.margin}
        placeholder="Enter the name"
        

        inputProps={{ 'aria-label': 'naked' }}
      />
         <Button  type="submit"  onClick={handleClose} color="primary">
            Save changes
          </Button>
          </form>

        <input type="file" id="picture" name="picture" accept="image/*" onChange={onFormChange} />
        
  
          
         
        </DialogContent>
        <DialogActions>
     
  
         
        </DialogActions>
      </Dialog>
    </div>
  );
}
