import React, { useState, useEffect } from 'react'

import _ from 'lodash';
import profilePicture from '../../images/child.jpg'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';





import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Header from '../FrontPage/Header';

import { from, gql, useMutation, useQuery } from '@apollo/client';
import { withAuthContext } from '../../context';





const UPDATEPROFILE = gql`

mutation($name:String,$avatar:Upload,$email:String,$password:String,$phone:String){
  updateProfile(name:$name,avatar:$avatar,email:$email,password:$password,phone:$phone){
    name
    email
    avatar
    phone    
  }
}

`;



function TabPanel(props) {
    const { children, value, index, ...other } = props;



    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
        marginTop: '60px',
        marginLeft: '20%',
        marginRight: '20%',
    },
    tabs: {
        borderRight: `2px solid ${theme.palette.divider}`,
    },
    indicator: {
        backgroundColor: '#262626',
        left: '0px'
    },
    avatar: {
        width: '5vh',
        height: '5vh',
        borderRadius: '50%',
        border: '1px solid #DBDBDB'
    },
    margin: {
        margin: '-40px 0px 0px 0px',
        fontSize: '9px',
        textAlign: 'center',
        color: '#17A2F7'
    },

}));

const initialState = {
    name: '',
    email: '',
    phone: '',
    avatar: {
        file: null,
        preview: ''
    },
}

function UpdateProfile({ user }) {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [tabValue, setTabValue] = React.useState(0);



    // donot change
    const [previousValues, setPreviousValues] = useState(initialState);

    // changeable state
    const [userData, setUserData] = useState(initialState);
    //This is for Update Data
    const [updateProfile] = useMutation(UPDATEPROFILE, {
        //Set for Initial State
        onCompleted: ({ updateProfile }) => {
            setPreviousValues(reformUser(updateProfile))
            setUserData(reformUser(updateProfile))
            setLoading(false);
        },
        onError: ({ message }) => {
            console.log(message);
            setLoading(false);
        }
    })

    const reformUser = (data) => {
        const { name, email, phone, ...user } = data
        const avatar = {
            file: null,
            preview: `/images/${user.avatar}`
        }
        return { name, email, phone, avatar }
    }

    useEffect(() => {
        if (user) {
            setUserData(reformUser(user))
            setPreviousValues(reformUser(user))
            setLoading(false)
        }
    }, [user])
    const handleChangeTab = (event, newValue) => setTabValue(newValue)
    // const {data,loading,error} =useQuery(ShowData);



    const handleChange = ({ target: { name, value, files } }) => {

        setUserData(prev => ({
            ...prev,
            [name]: name === 'avatar' ? {
                file: files[0],
                preview: URL.createObjectURL(files[0])
            }
                : value

        }))
    };


    const formSubmit = (ev) => {
        ev.preventDefault();
        if (!canBeSubmitted()) {
            return console.log("Form is not changed at all...")
        }

        setLoading(true);
        const variables = {
            ...userData,
            avatar: userData.avatar.file
        }
        updateProfile({ variables })
    }

    function canBeSubmitted() {
        return !_.isEqual(previousValues, userData);
    }

    console.log('canBeSubmitted', !canBeSubmitted())

    if (isLoading) return <h1>Loading</h1>;

    return (
        <div style={{ backgroundColor: '#FAFAFA', minHeight: '100%' }}>
            <Header />
            <div className={classes.root} style={{ border: '1px solid #DBDBDB', height: '450px' }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabValue}
                    classes={{
                        indicator: classes.indicator
                    }}
                    onChange={handleChangeTab}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Edit Profile" {...a11yProps(0)} />
                    <Tab label="Change Password" {...a11yProps(1)} />
                    <Tab label="Apps and Websites" {...a11yProps(2)} />
                    <Tab label="Email and SMS" {...a11yProps(3)} />
                    <Tab label="Push Notification" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '70px' }}>
                        <form onSubmit={formSubmit}>
                            <CardHeader
                                avatar={
                                    <img src={`${userData.avatar.preview}`} className={classes.avatar} alt={userData.name} />
                                }
                                action={
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                    >
                                    </IconButton>
                                }
                                title={userData.name}
                            />
                            <input type="file" name="avatar" id="avatar" onChange={handleChange} /><br /><br />
                            <div style={{ textAlign: 'right' }}>
                                <label><b>Username</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }}

                                />
                                <br />
                                <br />
                                <label><b>Phone Number</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                                    type="number"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleChange}

                                    style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }} />
                                <br />
                                <br />
                                <label><b>Email</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px' }} />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                                <br />
                                <br />
                                <br />
                                <div style={{ marginRight: '90px' }}>
                                    <Button
                                        disabled={!canBeSubmitted()}
                                        variant="contained"
                                        type="submit"
                                        // style={{ backgroundColor: '#17a2f7', color: 'white' }}
                                    >Submit</Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '70px' }}>
                        <form>
                            <CardHeader
                                avatar={
                                    <img src={profilePicture} className={classes.avatar} alt='Saad' />
                                }
                                action={
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                    >
                                    </IconButton>
                                }
                                title='USERNAME'
                            />
                            <div style={{ textAlign: 'right' }}>
                                <label><b>Old Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px', backgroundColor: '#FAFAFA' }}></input>
                                <br />
                                <br />
                                <label><b>New Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px', backgroundColor: '#FAFAFA' }}></input>
                                <br />
                                <br />
                                <label><b>Confirm Password</b></label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password" style={{ border: '1px solid #dbdbdb', height: '30px', borderRadius: '5px', backgroundColor: '#FAFAFA', }}></input>
                                <br />
                                <br />
                                <br />
                                <div style={{ marginRight: '90px' }}>
                                    <Button variant="contained" style={{ backgroundColor: '#17a2f7', color: 'white' }}>
                                        Change password</Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    Item Three
      </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    Item Four
      </TabPanel>
                <TabPanel value={tabValue} index={4}>
                    Item Five
      </TabPanel>
                <TabPanel value={tabValue} index={5}>
                    Item Six
      </TabPanel>
                <TabPanel value={tabValue} index={6}>
                    Item Seven
      </TabPanel>
            </div>

        </div>
    )
}

export default withAuthContext(UpdateProfile);