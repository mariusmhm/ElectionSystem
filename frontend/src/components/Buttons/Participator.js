import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export class Participator extends Component {

    const classes = useStyles();

render() {
  return (
        const classes = useStyles();
        <div className={classes.root}>
            <Button variant="outlined">Default</Button>
        </div>
       );
    }
}

export default Participator;
