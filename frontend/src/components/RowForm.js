import React,{useState} from 'react'
import axiosInstance from '../axios.js'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
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
const RowForm=({id,rows,editFormData,edit})=>{
  
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
          value:"High",
          label:"High"
        }
  ]
	 const classes = useStyles();
   const history=useHistory()
   let initialFormData;
   if(edit){
    
    initialFormData = Object.freeze({
      priority:editFormData.priority,
      task_name:editFormData.task_name,
      assigned_to:editFormData.assigned_to,
      deadline:editFormData.deadline,
    })
   }else{
    initialFormData = Object.freeze({
    priority: '',
    task_name: '',
    assigned_to:'',
    deadline:'',
  });
   }
   
   const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let Url;
    if(edit){
      Url=`row/${editFormData.id}`
    }else{
      Url=`project/row_add/${id}`
    }
    axiosInstance
      .post(Url, {
        priority: formData.priority,
        task_name: formData.task_name,
        assigned_to:formData.assigned_to,
        deadline:formData.deadline

      })
      .then((res) => {
        
        console.log(res.data)
       
        history.push('/dashboard');
        
      }).catch(err=>console.log(err));
  };
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
            defaultValue={edit?editFormData.priority:''}
            id="priority"
            label="Priority"
            name="priority"
            onChange={handleChange}
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
            defaultValue={edit?editFormData.task_name:''}
            onChange={handleChange}
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
            defaultValue={edit?editFormData.assigned_to:''}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="deadline"
            defaultValue={edit?editFormData.deadline:''}
            type="date"
            id="deadline"
             onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
           {edit? 'Edit Row':'Add a new row'}
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        
      </Box>
    </Container>
	 	)
}
export default RowForm