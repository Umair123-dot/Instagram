import React, { useState } from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import { Link, useHistory } from "react-router-dom";




import { gql, useQuery } from '@apollo/client';
import UpdateProfile from '../settings/UpdateProfile';


import Topbar from '../../component/FrontPage/Header';
import Tabs from './Tabs'
import './styles.css'



const ShowData = gql`
query {
  loggedInUser {
    name,
    email,
    avatar

  }
}
`

const Profile = () => {
    const [name, setName] = useState('Umair')
    const [post, setPost] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const { data, loading, error } = useQuery(ShowData);
    const history = useHistory();
    // const navigateTo = () => history.push('/updateProfile');

    if (loading || !data) return <h1>Loading</h1>

    const onChange = () => {
        let path = '/updateProfile'

        history.push(path);

    }

    return (
        <div >
            <Topbar />
            <br />
            <div>
                <Grid className='flex' container spacing={1}>
                    <img alt="Avatar" src={`/images/${data.loggedInUser.avatar}`} className="profileAvatar" />
                    <div >

                        <div className='nameSection' >
                            <div className='marginLeft'>{data.loggedInUser.name}</div>

                            <div className='marginLeft'>

                                <button type="submit" onClick={onChange}> Edit Profile</button>

                            </div>
                            <div className='marginLeft'>  <SettingsIcon /></div>

                        </div>
                        <div className='nameSection' >
                            <div className='marginLeft row'> <p>Post </p><span>{post}</span> </div>

                            <div className='marginLeft row'>
                                <p> Followers </p><span>{followers}</span>
                            </div>
                            <div className='marginLeft row'>  <p> Following </p> <p> {following} </p> </div>

                        </div>
                        <div className='nameSection' >
                            <div className='marginLeft '> <b> {data.loggedInUser.name} </b> </div>

                        </div>
                    </div>
                </Grid>
            </div>
            <div className='stories'>

                {/* Stories Section */}

            </div>
            <div className=''>
                <Tabs />
            </div>
        </div>
    )
}

export default Profile