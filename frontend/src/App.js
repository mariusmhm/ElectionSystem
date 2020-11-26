import React, { Component } from 'react';
//import Header from './components/layout/Header'
import Grid from '@material-ui/core/Grid';
//import Registration from './components/Registration';
import { Button, Typography} from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
//import SignIn from './components/pages/Signin';
//import LoadingProgress from './components/dialogs/LoadingProgress';
import firebaseConfig from './firebaseconfig';
//import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
//import Theme from './Theme';
//import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Avatar} from '@material-ui/core';

/**App.js: The main bank administration app. It uses Googles firebase to log into the bank end. For routing the
user to the respective pages, react-router-dom ist used.*/


class App extends Component {

/** Constructor of the ElectionSystem app, which initializes firebase  */
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

	/**Handles firebase users logged in state changes
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
	}*/

    //Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
    handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	//console.log("Checking if '" + name + "' is stored in database with google id '" + googleId + "'")
	checkIfUserInDatabase(name, email, googleId) {
	//soon
	}

	 //Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 //Initializes the firebase SDK.
	 componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}
	}

 /** Renders the whole app */
  render() {
    const {user, googleUserData, appError, authError, authLoading} = this.state;
        return (

            <div>
            //soon
                <ThemeProvider theme={Theme}>
				    <CssBaseline />
				        <Router basename={process.env.PUBLIC_URL}>
                        <Container maxWidth='md'>
                            <Typography variant='h1' align='center'style={{color:'red'}}> Hochschule der Medien</Typography>
                            <Typography  align='center' variant='h3'>Electionsystem.</Typography>
                                <Header user={currentUser} />
                                {
					            // Is a user signed in?
							        currentUser ?
								        <>
								        //soon
                                        </>
								        :
								        // else show the sign in page
								        <>
									        <Redirect to='/index.html' />
									        <SignIn onSignIn={this.handleSignIn} />
								        </>
						        }
						        <LoadingProgress show={authLoading} />
						        <ContextErrorMessage error={authError} contextErrorMsg={'Etwas ist schief gelaufen während dem Prozess'} onReload={this.handleSignIn} />
						        <ContextErrorMessage error={appError} contextErrorMsg={'Etwas ist schief geleaufen in der App. Bitte lade die Seite neu.'} />
						        }
                        <Container/>
                    </Router>
			    </ThemeProvider>
		    </div>
		);
	}
}

export default App;


