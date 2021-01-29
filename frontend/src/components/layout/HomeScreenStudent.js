import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core';
import HomeScreenCompOne from './pages/HomeScreenCompOne';
import HomeScreenCompTwo from './pages/HomeScreenCompTwo';






class HomeScreenStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phase: true
        }}



  render() {

    const { phase } = this.state;

        return (

            <div>

                 <CssBaseline />

                  <Container xl={12} xs={12}>

                      {phase ? <HomeScreenCompOne /> : <HomeScreenCompTwo />}
                      
				  </Container>
		    </div>
		);
	}
}
export default HomeScreenStudent;
