import logo from './logo.svg';
import './App.css';
import Login from './component/Login/Login';
import SignUp from './component/Signup/SignUp';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FrontPage from './component/FrontPage/FrontPage';
import AuthenticationRoute from './component/autheticationRoute'
import Profile from './component/Profile/index';
import UpdateProfile from './component/settings/UpdateProfile'
import Screen from './component/Login/Screen';
function onError() {
  return (
    <div>Error 404 page not found</div>
  )
}
function App() {
  return (
    <BrowserRouter>


      <Switch>
        {/* Login */}
        <Route exact path="/screen">
          <Screen />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        {/* SignUP */}
        <Route exact path="/signup" >
          <SignUp />

        </Route>



        {/* <Route exact  path="/profile" component={Profile}>
    <Profile />
   
    </Route> */}
        <Route exact path="/updateProfile" component={UpdateProfile}>
          <UpdateProfile />

        </Route>
        {/* Front Page */}
        {/* <Route path="/frontpage" component={FrontPage} /> */}
        <AuthenticationRoute path="/frontpage" component={FrontPage} />
        <AuthenticationRoute path="/profile" component={Profile} />

        <Route path="*" component={onError} />



      </Switch>


    </BrowserRouter>
  );
}

export default App;