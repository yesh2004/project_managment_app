import React,{useState} from 'react'
import axiosInstance from '../axios.js'
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
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
	const history=useHistory()
  const initialFormData=Object.freeze({
    project_name:'',
  })
  const[formData,updateFormData]=useState(initialFormData);
	 const classes = useStyles();

   const handleChange=(e)=>{
    updateFormData({
      ...formData,
      [e.target.name]:e.target.value.trim()
    })
   }
   const handleSubmit=(e)=>{
    e.preventDefault()
    axiosInstance.post('/project',{
      project_name:formData.project_name
    }).then(res=>{
      console.log(res.data)
    history.push('/dashboard');
  }).catch(err=>console.log(err))
   }
	 return(
	 	<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Create a Project
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="project_name"
            label="Project Name"
            name="project_name"
            onChange={handleChange}
            autoFocus
          />
          
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Create Project
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        
      </Box>
    </Container>
	 	)
}
export default LoginForm