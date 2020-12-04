import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Header from './components/layout/Header';





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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <Container>
                <Header />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <h1>Projektwahl</h1>
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
                            <h2>Auswahl</h2>
                            <div className={classes.root}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        centered
                                    >
                                        <Tab label="Semester 1" {...a11yProps(0)} />
                                        <Tab label="Semester 2" {...a11yProps(1)} />
                                        <Tab label="Semester 3" {...a11yProps(2)} />
                                        <Tab label="Semester 4" {...a11yProps(3)} />
                                        <Tab label="Semester 5" {...a11yProps(4)} />
                                        <Tab label="Semester 6" {...a11yProps(5)} />
                                        <Tab label="SK" {...a11yProps(6)} />
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={value} index={0}>
                                    <div><Checkbox
                                        value="checkedA"
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                    />
                                    Projekt 1 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 2 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 3 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <div><Checkbox
                                        value="checkedA"
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                    />
                                    Projekt 4 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 5 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 6 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <div><Checkbox
                                        value="checkedA"
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                    />
                                    Projekt 7 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 8 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 9 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <div><Checkbox
                                        value="checkedA"
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                    />
                                    Projekt 10 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 11 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 12 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={4}>
                                    <div><Checkbox
                                        value="checkedA"
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                    />
                                    Projekt 13 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 14 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 15 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={5}>
                                    <div><Checkbox
                                        value="checkedA"
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                    />
                                    Projekt 16 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 17 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Projekt 18 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={6}>
                                    <div><Checkbox
                                        value="checkedA"
                                        inputProps={{ 'aria-label': 'Checkbox A' }}
                                    />
                                    Schlüsselkompetenz 2 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Schlüsselkompetenz 2 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                    <div>
                                        <Checkbox
                                            value="checkedA"
                                            inputProps={{ 'aria-label': 'Checkbox A' }}
                                        />
                                    Schlüsselkompetenz 3 - Kurzbeschreibung
                                    <Button label="Button">Wählen</Button>
                                    </div>
                                </TabPanel></div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
        
    );

    
}

