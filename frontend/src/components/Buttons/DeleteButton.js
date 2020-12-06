import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

class DeleteButton extends Component {

render() {
  return (
    <div>
      <IconButton aria-label="delete" useStyles>
        <DeleteIcon />
      </IconButton>
    </div>
  );
  }
}
export default DeleteButton