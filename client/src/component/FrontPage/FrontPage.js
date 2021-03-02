import React from 'react';
import Header from './Header';
import Stories from './Stories';
import HomePosts from './Post'
import Posts from './Posts';
import Suggestion from './Suggestions';
import { withAuthContext } from '../../context';

const FrontPage = (props) => {

  
  return (
    <div>
      <Header />
<div className="container" >
    <div className="box">
    <Stories />
    <HomePosts />
    </div>
    <div className="hidden">
       <Suggestion /> 
    </div>
</div>
</div>
  )
}
export default withAuthContext(FrontPage)
