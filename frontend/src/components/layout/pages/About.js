import React, { Component } from 'react';
import {Container, Typography, Grid, Dvider, Link} from '@material-ui/core';
import ArchivedProjectsAdmin from './ArchivedProjectsAdmin';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core';
import ApprovedProjectsAdmin from './ApprovedProjectsAdmin';
import ListEntryNewProjectsAdmin from './ListEntryNewProjectsAdmin';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router';
import RejectedProjectsAdmin from './RejectedProjectsAdmin';
import AdminButtonBar from './AdminButtonBar';
import { ElectionSystemAPI } from '../../../api';



class About extends Component {
    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            googleID: null,
            redirect: false,
            error: null,
            openDialog: false,
            duringSemester: false,
            rows:[

            {
            id:1,
            name: "Amna-Mia Mujezinovic",
            martriculation: 38276,
            mail:"am195",
            git:"Amna-MiaMujezinovic"

            },

            {
            id:2,
            name: "Adiran Awad",
            martriculation:37972,
            mail:"aa076",
            git:"AdrianAwad"

            },


            {
            id:3,
            name: "Jana Jessica Beer",
            martriculation: 35312,
            mail:"jb203",
            git:"Jana-Beer"

            },

            {
            id:4,
            name: "Kevin Bahnmueller",
            martriculation:38280,
            mail:"kbq130",
            git:"Kevin-Bahnmueller"

            },

            {
            id:5,
            name: "Marius Muenstermann ",
            martriculation:38268,
            mail:"mm284",
            git:"muenstermannmarius"

            },

            {
            id:6,
            name: "Maire Zaluski",
            martriculation:38402,
            mail:"mw220",
            git:"MarieZaluski"

            },

            {
            id:7,
            name: "Saranda Gojani",
            martriculation:37973,
            mail:"sg173",
            git:"SarandaGojani"

            }

            ]
            }


        };


    /** Gives back the semester */



  render() {
    const {classes}= this.props;


        return (
            <div>
                <Container maxWidth="MD" align ="center" className={classes.grid}>
                    <Grid className={classes.grid}>
                        <Typography className={classes.redHeader}>  HDM ElectionSystem for projects </Typography>
                    </Grid>
                    <Typography className={classes.greyHeader}>
                        Software Praktikum WS 20/21
                        with
                        Prof. Dr. Peter Thies & Prof. Dr. Christoph Kunz
                    </Typography>
                    <Divider/>
                    <Grid className={classes.grid}>
                        <Typography className={classes.greyText}> About the ElectionSystem </Typography>
                    </Grid>
                    <Grid item xs={6}className={classes.backColor}>
                        <Typography variant="body1" >
                            The Elections system can be used by students, professors and administrators.
                            It simplifies the election process of projects at HDM.
                        </Typography>
                    <br/>
                        <Typography variant="body1">
                            Students can vote, view their projects, access their grades, and access their project reports at
                            the end of the semester.
                        </Typography>
                    <br/>
                        <Typography variant="body1">
                            The professor can create projects and manage them. He also gets an overview
                            of the current semester with his projects and the participants of it.
                        </Typography>
                    <br/>
                        <Typography variant="body1">
                            The admin is able to customize and manage the semester's framework, grade keys, modules, and project types.
                            Approving and rejecting projects is also included. The admin can view all projects and manage them
                            in the same way as the professor. There is also access to past and old projects from previous semesters.
                        </Typography>
                </Grid>

                <Typography variant='caption'>
                    © Hochschule der Medien 2020, all rights reserved.
                </Typography>
                <br/>
                <br/>

                <Grid item xs={6}>
                    <Typography className={classes.greyText}>
                        About the Project
                    </Typography>
                </Grid>

                <Grid container justify="flex-start" xs={6} md={6}>

                    <Grid item xs={12} md ={12}className={classes.backColor}>
                        <Typography variant="button">
                            Frontend and Backend Authors
                        </Typography>
                    </Grid>
                    <Grid item xs={3} md={3}className={classes.backColor}>
                        <Typography>
                                name
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={3} md={3}className={classes.backColor}>
                        <Typography>
                            marticulationnumber
                        </Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={3} md={3}className={classes.backColor}>
                        <Typography>
                            HDM E-Mail
                        </Typography>
                        <Divider/>
                    </Grid>

                    <Grid item xs={3} md={3}className={classes.backColor}>
                        <Typography>
                            Github
                        </Typography>
                        <Divider/>
                    </Grid>
                </Grid>

                {this.state.rows.map((row) => (
                    <Grid container justify="flex-start" xs={6} md={6} >
                        <Grid item xs={3} md={3}className={classes.backColor}>
                            <Typography variant="body2">
                                {row.name}
                            </Typography>
                        </Grid>
                    <Grid item xs={3} md={3}className={classes.backColor}>
                        <Typography variant="body2">
                            {row.martriculation}
                        </Typography>
                    </Grid>

                    <Grid item xs={3} md={3}className={classes.backColor}>
                        <Typography variant="body2">
                            {row.mail}
                        </Typography>
                     </Grid>

                    <Grid item xs={3} md={3}className={classes.backColor}>
                        <Typography variant="body2">
                            {row.git}
                        </Typography>
                    </Grid>
                </Grid>
                ))}

                <Grid item xs={6} md ={6}className={classes.backColor}>
                    <Typography variant="button">
                        GIT Hub project
                    </Typography>
                </Grid>

                <Grid item xs={6} md ={6}className={classes.backColor}>
                    <Link href='https://github.com/muenstermannmarius/ElectionSystem'>For the github project click here</Link>
                </Grid>



            </Container>

           </div>



      );
   }
}

const styles = theme => ({
    grid:{
        width: '100%',
        marginTop: theme.spacing(10),


    },
    padding:{

        padding: theme.spacing(3),
    },

     appBar: {
      top: 'auto',
      bottom: 0,
      align:'center'
    },
    grow: {
      flexGrow: 1,
      },
    redHeader:{
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 40
    },
    greyHeader:{
        color: 'grey',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 27
    },
     greyText:{
        color: 'grey',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 20
    },
    backColor:{
        backgroundColor: '#ffebee',
        padding: theme.spacing(3)

    },
    texColor:{
        color: 'white'


    }
});



export default withStyles(styles)(About);
