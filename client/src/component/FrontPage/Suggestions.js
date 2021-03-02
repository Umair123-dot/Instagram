import React, { useState } from 'react';

import './style.css'
import profilePicture from '../../images/child.jpg'
import {gql, useQuery} from '@apollo/client'; 
const ShowData = gql`
query {
  loggedInUser {
    name,
    email,
    avatar

  }
}
`

export default function Suggestion() {
    
    const [userName, setUserName] = useState('Muhammadsaadali96')
    const {loading,data,error} =useQuery(ShowData);
    if(loading) return <h1>Loading</h1>
    return (
        <div className='main'>
            <div className='myProfile'>

                <div className='image'>
                {/* {loading ? (
                <Skeleton variant="circle" width={40} height={40} />
              ) : (
                  error ? 
                  (
                    <Avatar className={classes.small}
                      alt="Umair_Zafar"
                    >E</Avatar>
                  ) : (
                    <Avatar className=""
                      alt="Umair_Zafar"
                      src={`/images/${data.loggedInUser.avatar}`}
                    />
                  )
                )} */}

                    <img alt="avater" src={`/images/${data.loggedInUser.avatar}`}className="avatar" />
                </div>
                <div className='myName'>
                    <p><strong>{data.loggedInUser.name}</strong></p>
                    <p className='gray'>{data.loggedInUser.name}</p>
                </div>
            </div>

            <div className="suggestion">

                <p> Suggestion for You </p>
                <p > See all</p>

            </div>

            <div className='suggestionContainer'>
                <div className='suggestionProfile'>

                    <div className='image'>

                        <img alt="avater" src={profilePicture} className="suggestionAvatar" />
                    </div>
                    <div className='suggestionName'>
                        <p><strong>{userName}</strong></p>
                        <p className='gray'>Suggestion for you </p>
                    </div>
                </div>
                <div className='follow'>Follow</div>
            </div>
            <div className='suggestionContainer'>
                <div className='suggestionProfile'>

                    <div className='image'>

                        <img alt="avater" src={profilePicture} className="suggestionAvatar" />
                    </div>
                    <div className='suggestionName'>
                        <p><strong>{userName}</strong></p>
                        <p className='gray'>Suggestion for you </p>
                    </div>
                </div>
                <div className='follow'>Follow</div>
            </div>

            <div className='suggestionContainer'>
                <div className='suggestionProfile'>

                    <div className='image'>

                        <img alt="avater" src={profilePicture} className="suggestionAvatar" />
                    </div>
                    <div className='suggestionName'>
                        <p><strong>{userName}</strong></p>
                        <p className='gray'>Suggestion for you </p>
                    </div>
                </div>
                <div className='follow'>Follow</div>
            </div>

            <div className='suggestionContainer'>
                <div className='suggestionProfile'>

                    <div className='image'>

                        <img alt="avater" src={profilePicture} className="suggestionAvatar" />
                    </div>
                    <div className='suggestionName'>
                        <p><strong>{userName}</strong></p>
                        <p className='gray'>Suggestion for you </p>
                    </div>
                </div>
                <div className='follow'>Follow</div>
            </div>

        </div>
    )

}