import React from "react";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import { Route, Switch, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInandSignUp from "./pages/singIn-and-signUp/SignInandSignUp";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    // We get userAuth equals user
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // We check if user exists
        const userRef = await createUserProfileDocument(userAuth);
        //We create the user in our database from the information we got using createuser method we imported
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });

        //On snapshot method gives us a object of data from the database but we have to call the data method on it
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
    //onAuthStateChanged is a method on the auth libary,what we get is a function where the parameter is the user we get, and on callback we set current user to the user tldr when user state on firebase is changed it changes current user.Thats how it remmebers the user and stores him.
    // To unsubcribe we first init a value to null, then we reassign it to the return value of auth.onAuthStateChanged(), in this case this method returns another method firebase.unsubscribe()
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
    // so when unsubscribe from auth is called inside compot will unmount it has the value of firebase.unsubscribe
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInandSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
