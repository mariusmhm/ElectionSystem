import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { AppBar } from '@material-ui/core';
import StudentListSelectionLayout from './components/layout/StudentListSelectionLayout';
import Header from './components/layout/Header';
import { projects, website, server } from "./general";




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));



export default function CenteredGrid() {

    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div className={classes.root}>
            <Container >
                <Header />
            </Container>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Select Project</h1>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <h2>This is the Space for already selected Courses.</h2>

                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <h2>This is the Space for updates inside already selected Courses.</h2>

                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h2>Hier kommen noch nicht gewählte Kurse hin</h2>
                            <AppBar position="static" color="default" >
                                <Tabs
                                    value={selectedTab}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                >
                                    <Tab label="Selected" />
                                    <Tab label="Not Selected" />
                                    <Tab label="Already Enterd" />
                                </Tabs>
                            </AppBar>
                            
                        </Paper>
                        {selectedTab === 0 && <StudentListSelectionLayout 
                        tasksIndexes={[0, 1, 2 , 3]}
                        tasks={projects}
                        />}
                        {selectedTab === 1 && <StudentListSelectionLayout
                        tasksIndexes = {[0,1]}
                        tasks={website}
                        />}
                    </Grid>

                </Grid>
            </Container>
        </div>
    );
}
