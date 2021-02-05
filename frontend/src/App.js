import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Signin from './components/layout/pages/Signin';
import LoadingProgress from './components/dialogs/LoadingProgress';
import firebaseConfig from './firebaseConfig';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container} from '@material-ui/core';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import Main from './Main';

import HomeScreenAdmin from './components/layout/pages/HomeScreenAdmin';
import HomeScreenProf from './components/layout/pages/HomeScreenProf';
import HomeScreenStudent from './components/layout/pages/HomeScreenStudent';

import EntryListAdmin from './components/layout/pages/EntryListAdmin';
import ProjectReport from './components/layout/pages/ProjectReport';
import Header from './components/layout/Header';
import HeaderAdmin from './components/layout/HeaderAdmin';
import HeaderProf from './components/layout/HeaderProf';
import ProfileChange from './components/layout/pages/ProfileChange';
import ProjectContent from './components/layout/pages/ProjectContent';
import About from './components/layout/pages/About';
import ProjectUpdateAdmin from './components/layout/pages/ProjectUpdateAdmin';


firebase.initializeApp(firebaseConfig);

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
                        {
                        // Is a user signed in?
						currentUser ?
							<>
							<Redirect to='/'/>
                            </>
							:
							// else show the sign in page
							<>
							<Redirect to='/signin'/>
							<Signin handleSignIn={this.handleSignIn} />
							</>
					}
					<LoadingProgress show={authLoading} />
					<ContextErrorMessage error={authError} contextErrorMsg={'Etwas ist schief gelaufen während dem Prozess'} onReload={this.handleSignIn} />
					<ContextErrorMessage error={appError} contextErrorMsg={'Etwas ist schief geleaufen in der App. Bitte lade die Seite neu.'} />

                    </Container>

					<Switch>
						<Route 
						exact 
						path={'/'}
						render={props => (
							<Main {...props}/>
						)}
						/>
						<Route 
						exact 
						path={"/project-content"}
						render={props => (
							<HomeScreenAdmin {...props} />
						)}
						/>
						<Route 
						exact 
						path={"/admin/project-content"}
						render={props => (
							<>
							<HeaderAdmin {...props}/>
							<ProjectContent {...props} />
							</>
						)}
						/>
						<Route 
						exact 
						path={"/admin/project-edit"}
						render={props => (
							<>
							<HeaderAdmin {...props}/>
							<ProjectUpdateAdmin {...props} />
							</>
						)}
						/>
						<Route 
						exact 
						path={"/project-report"} 
						render={props => (
							<ProjectReport {...props} />
						)}
						/>
						<Route 
						exact 
						path={"/professor"} 
						render={props => (
							<>
							<HeaderProf {...props}/>
							<HomeScreenProf {...props} />
							</>
						)}
						/>
						<Route 
						exact 
						path={"/professor/participations"} 
						render={props => (
							<>
							<HeaderProf {...props}/>
							<EntryListAdmin {...props} />
							</>
						)}
						/>
						<Route
						exact
						path={"/professor/about"}
						render={props => (
							<>
							<HeaderProf {...props}/>
							<About {...props} />
							</>
						)}
						/>
						<Route
						exact
						path={"/admin/participations"}
						render={props => (
							<>
							<HeaderAdmin {...props}/>
							<EntryListAdmin {...props} />
							</>
						)}
						/>
						<Route
						exact
						path={"/admin/about"}
						render={props => (
							<>
							<HeaderAdmin {...props}/>
							<About {...props} />
							</>
						)}
						/>
						<Route
						exact
						path={"/student"}
						render={props =>(
							<>
							<Header {...props}/>
							<HomeScreenStudent {...props} />

							</>
						)}
						/>

						<Route
						exact
						path={"/student/about"}
						render={props => (
							<>
							<Header {...props}/>
							<About {...props} />
							</>
						)}
						/>

						<Route
						exact
						path={"/student/about"}
						render={props => (
							<>
							<Header {...props}/>
							<About {...props} />
							</>
						)}
						/>
						<Route
						exact
						path={"/admin"}
						render={props =>(
							<>
							<HeaderAdmin {...props}/>
							<HomeScreenAdmin {...props} />
							</>
						)}
						/>
						<Route
						exact
						path={"/admin/profile"}
						render={props =>(
							<>
							<HeaderAdmin {...props}/>
							<ProfileChange {...props} />
							</>
						)}
						/>

    				</Switch>
                </Router>
			</ThemeProvider>
		    </div>
		);
	}
}
export default App
