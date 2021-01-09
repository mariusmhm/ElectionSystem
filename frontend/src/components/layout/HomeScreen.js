import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core';
import HomeScreenCompOne from './pages/HomeScreenCompOne';
import HomeScreenCompTwo from './pages/HomeScreenCompTwo';
import HomeScreenFull from './pages/HomeScreenFull'
import CreateProject from '../dialogs/CreateProject'




class HomeScreen extends Component {


  render() {


        return (

            <div>

                 <CssBaseline />

                  <Container maxWidth="MD">
                      <HomeScreenCompOne />
                      <Divider/>
                      <br/>
                      <br/>
                      
                      <HomeScreenCompTwo />
                      <Divider/>
                      
                      <div>

                      <Divider/>
                      </div>
				  </Container>
		    </div>
		);
	}
}
export default HomeScreen;
