import React,{useState,useEffect} from 'react'
import ProjectTable from '../components/ProjectTable.js'
import ProjectForm from '../components/ProjectForm.js'
import Popup from '../components/Popup.js'
import AddIcon from '@material-ui/icons/Add';
import {Button,Container,makeStyles} from '@material-ui/core'
import axiosInstance from '../axios.js'
const useStyles = makeStyles((theme)=>({
  
  contaienr:{
    marginTop:'10%',
  }
  
}));
const Dashboard=()=>{
	const [openPopup, setOpenPopup] = useState(false)
	const[projects,setProjects]=useState({projects:null})
	useEffect(()=>{
		axiosInstance.get('/project').then(res=>{
			
			let allProject=res.data
			console.log(res.data)
			setProjects({projects:allProject})
			
		}
			).catch(err=>console.log(err))
		console.log(projects)
	},[setProjects])
	const classes = useStyles();
	
	return(
		<>
		<Container className={classes.contaienr}>
		<Button variant="contained" color="secondary" onClick={()=>setOpenPopup(true)}>
		
		  <AddIcon/>
		
		</Button>
		{projects.projects?projects.projects.map(project=>(<ProjectTable key={project.id} project={project}/>)):''}
		
		</Container>
		<Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
		<ProjectForm/>
		</Popup>
		</>
		)
}
export default Dashboard