import React, { Component } from 'react';
import Header from './components/layout/Header';
//import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import Signin from './components/layout/pages/Signin';
import LoadingProgress from './components/dialogs/LoadingProgress';
import firebaseConfig from './firebaseConfig';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container} from '@material-ui/core';
import Registration from './components/layout/pages/Registration'
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';

//import { Button, Icon, Container, TextField, Typography, withStyles } from '@material-ui/core';
import CreateProject from './components/dialogs/CreateProject';
import ProjectContent from './components/layout/pages/ProjectContent';
import Semester from './components/dialogs/Semester';
import HomeScreen from './components/layout/HomeScreen';
import HomeScreenAdmin from './components/layout/HomeScreenAdmin';
import EntryListAdmin from './components/layout/pages/EntryListAdmin';
import GradingEditingDialog from './components/dialogs/GradingEditingDialog';


class App extends Component {

    //Constructor of the ElectionSystem app, which initializes firebase
    constructor(props) {
	super(props);
	//initializing a state
	this.state = {
		currentUser: null,
		appError: null,
		authError: null,
		authLoading: false
	};
   }

   //Create an error boundry for this app so we can recieve all errors from below the component tree.
   //Update state so the next render will show the fallback UI.
   static getDerivedStateFromError(error) {
	return { appError: error };
   }

   //Handles firebase users logged in state changes
   handleAuthStateChange = user => {
	if (user) {
		this.setState({
			authLoading: true
		});
		// The user is signed in
		user.getIdToken().then(token => {
			// Add the token to the browser's cookies. The server will then be
			// able to verify the token against the API.
			document.cookie = `token=${token};path=/`;
			// Set the user not before the token arrived
			this.setState({
				currentUser: user,
				authError: null,
				authLoading: false
			});
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

    //Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
    handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}
   

   //Lifecycle method, which is called when the component gets inserted into the browsers DOM.
   //Initializes the firebase SDK.
   componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
   }


 /** Renders the whole app */
  render() {
    const { currentUser, appError, authError, authLoading } = this.state;

        return (

            <div>
                <ThemeProvider theme={theme}>
			    <CssBaseline />
				<Router basename={process.env.PUBLIC_URL}>
                    <Container maxWidth='md'>
                        <Header user={currentUser} />
                        {
                        // Is a user signed in?
						currentUser ?
							<>
							<Redirect to='/Registration'/>
							<Route path='/Registration'><Registration /></Route>

							<Route path='/Grading-Editing-Dialog'>
							    <GradingEditingDialog />
							</Route>

                            </>
							:
							// else show the sign in page
							<>
							<Redirect to='/Signin'/>
							<Signin handleSignIn={this.handleSignIn} />
							</>
					}
					<LoadingProgress show={authLoading} />
					<ContextErrorMessage error={authError} contextErrorMsg={'Etwas ist schief gelaufen während dem Prozess'} onReload={this.handleSignIn} />
					<ContextErrorMessage error={appError} contextErrorMsg={'Etwas ist schief geleaufen in der App. Bitte lade die Seite neu.'} />

                    </Container>

					<Switch>
        				<Route exact path="/project-content" component={HomeScreenAdmin} />
    				</Switch>
                </Router>
			</ThemeProvider>
		    </div>
		);
	}
}
export default App;



