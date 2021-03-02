//      Instagram Logo Image 
// <img src="https://i.imgur.com/zqpwkLQ.png" alt='logo' style={{marginTop: '20px'}}  /> 
import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import {
    ApolloClient,from,gql, useMutation
} from '@apollo/client';
// import from '@material-ui';
import { Paper, FormControl, TextField, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import useStyles from './Styles';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { formatPhoneNumberIntl } from 'react-phone-number-input'


const Reg=gql`
   mutation($name:String!,$email:String!,$password:String!,$phone:String!,$gender:String!,$avatar:Upload ,$dateOfBirth:String!){
    singUp(name:$name,email:$email,password:$password,phone:$phone,gender:$gender,avatar:$avatar ,dateOfBirth:$dateOfBirth){
    
        user{
            id
            name
            email
            password
            phone
            gender
            avatar
            dateOfBirth
        }
    }
}
`;

const initial={
    
    name:'',
    email:'',
    password:'',
    conformPassword:'',
    phone:'',
    gender:'',
    avatar:'',
    dateOfBirth:'',
}

function SignUp() {
    const classes = useStyles()
    const [formState, setFormState] = useState(initial);
    const [countryCode, setCountryCode] = useState('');
    useEffect(() => {
        fetch('https://extreme-ip-lookup.com/json/')
            .then((res) => res.json())
            .then(({ countryCode }) => setCountryCode(countryCode))
            .catch((data, status) => console.log('Request failed:', data, status));
    }, []);

    const [singUp] = useMutation(Reg,{
        onCompleted:()=>{
            setFormState(initial)
        },
        onError:({message})=>{
          alert(message);
        }
    })
    const onFormChange = (event) => {
        if(typeof event=== 'string'|| !event){
            setFormState({...formState,phone:event||''})
        }
        else
        {
        const { name, type, value } = event.target
        // console.log({type})
        if (type == 'file') {
            // console.log(event.target.files[0])
            setFormState({
                ...formState,
                avatar: event.target.files[0]

            })}
            else{
                setFormState({
                    ...formState,
                    [event.target.name]: event.target.value,
                
            })}
        }}
    const onSubmitForm=e=>{
        e.preventDefault();
        console.log(formState);
        if(formState.password !== formState.conformPassword){
            alert('Password not Match');
        }
        else
        {
            singUp({variables:formState});
        }
    }

    return (
        <div className={classes.root}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className={classes.paper}>
                <Paper elevation={2}>

                    <h2 style={{ fontFamily: 'Lobster cursive' }}>
                        Social Media App
            </h2>
                    <h5 style={{ color: '#A9A9A9' }}>
                        Sign up to see photos and videos from your friends.
            </h5>
                    <Button variant="contained" style={{ backgroundColor: '#0095f6', color: 'white' }} >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <FacebookIcon fontSize="small" /> Login with facebook
               </div>             </Button>


                    <div style={{ width: '100%', height: '12px', borderBottom: '1px solid black', textAlign: 'center' }}>
                        <span style={{ backgroundColor: 'white', padding: ' 0 10px' }}>
                            OR
             </span>
                    </div>
                    <form onSubmit={onSubmitForm}  className={classes.inputField}>
                        <TextField  name="email" label="Email" onChange={onFormChange} variant="outlined" />
                        <PhoneInput international defaultCountry={countryCode} name="phone" label="Phone" onChange={onFormChange} variant="outlined" />
                        <TextField name="name" label="Full name" onChange={onFormChange} variant="outlined" />
                        <TextField name="password" label="Password" onChange={onFormChange} variant="outlined" />
                        <TextField name="conformPassword" label="conform Password" onChange={onFormChange} variant="outlined" />
                        <TextField name="dateOfBirth" label="Date of Birth" onChange={onFormChange} variant="outlined" />
                        <input type="file" id="avatar" name="avatar" onChange={onFormChange}  /><br /><br />

                        <Button type="submit" variant="contained" style={{ backgroundColor: '#0095f6', color: 'white' }} >
                            Sign Up
             </Button>
                        <div style={{ color: '#C0C0C0', fontSize: '10px' }}>
                            By signing up, you agree to our Terms , Data Policy and Cookies Policy
             </div>

                    </form>
                </Paper>

            </div>

            <div className={classes.signUpPaper}>
                <Paper elevation={3}>
                    <div style={{ marginTop: '1.5vw' }}>
                        have an account? <Link style={{ color: '#3EC3DF', textDecoration: 'none' }} to="/">Login</Link>
                    </div>
                </Paper>
            </div>
        </div>
        </div>
    )
}

export default SignUp;