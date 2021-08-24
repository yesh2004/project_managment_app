import React from 'react'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const LoginForm=()=>{
	const prorityOption=[
        {
          value:"Low",
          label:"Low"
        },
        {
          value:"Meduim",
          label:"Meduim"
        },
        {
          value:"Low",
          label:"Low"
        }
  ]
	 const classes = useStyles();
	 return(
	 	<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            select
            required
            fullWidth

            id="prority"
            label="Prority"
            name="prority"
         
            autoFocus
          >
          {prorityOption.map(option=>(
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>)
          )}
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="task_name"
            label="TaskName"
            type="text"
            id="task_name"
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="assigned_to"
            label="Assigned To"
            type="text"
            id="assigned_to"
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="assigned_to"
            label="Assigned To"
            type="date"
            id="assigned_to"
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        
      </Box>
    </Container>
	 	)
}
export default LoginForm