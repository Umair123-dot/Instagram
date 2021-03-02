import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Components
import Posts from './Posts'
// import { Modal } from '@material-ui/core';
import Posts1 from './Modal';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 2,
        backgroundColor: '#f1efef',

    },
    tabs: {
        backgroundColor: '#f1efef',
        color: '#8c8b8b',
        marginTop: '8vh',
        justifyContent: 'center',
        alignItems: 'center',
    },
    posts: {
        justifyContent: 'center',
    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.tabs}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="POSTS" {...a11yProps(0)} />
                    <Tab label="IGTV" {...a11yProps(1)} />
                    <Tab label="SAVED" {...a11yProps(2)} />
                    <Tab label="TAGGED" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel className={classes.posts} value={value} index={0}>
                {/* <Posts /> */}
                <Posts1 />
            </TabPanel>
            <TabPanel value={value} index={1}>
                IGTV
      </TabPanel>
            <TabPanel value={value} index={2}>
                SAVED
      </TabPanel>
            <TabPanel value={value} index={3}>
                TAGGED
      </TabPanel>
        </div>
    );
}