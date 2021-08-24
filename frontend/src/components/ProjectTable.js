import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import RowForm from './RowForm.js'
import Popup from './Popup.js'
const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
    marginBottom:'10%',
    
  },
  contaienr:{
    marginTop:'10%',
  },
  tHead:{
    fontWeight: '800 !important',
    color: theme.palette.primary.main,
    backgroundColor: '#85bcff',
  }
}));




const ProjectTable=({project})=>{
  const rows = [
  
];
	const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false)
  const projectId=project.id
  const[tablerow,setTablerow]=useState(project.rows)
  project.rows.map(row=>rows.push(row))
 
  
  console.log('Row State',tablerow)
	return(
    <>
		<Grid container spacing={4} justifyContent='space-between'>
    <Grid item>
      <Typography variant='h3'>{project.project_name}</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" value={project.id} onClick={()=>setOpenPopup(true)} >
          <AddIcon/> Row
        </Button>
      </Grid>
    </Grid>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow className={classes.tHead}>
            <TableCell>Task Name</TableCell>
            <TableCell align="right">Prority</TableCell>
            <TableCell align="right">Assigned to</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">Deadline</TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tablerow.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.task_name}
              </TableCell>
              <TableCell align="right">{row.priority}</TableCell>
              <TableCell align="right">{row.assigned_to}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.deadline}</TableCell>
              <TableCell align="right">
                <Button color="primary">
                   <EditOutlinedIcon fontSize="small" onClick={()=>setOpenPopup(true)} />
                </Button>
                <Button color="secondary">
                  <CloseIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
    <RowForm id={projectId} rows={rows}/>
    </Popup>
      </>
    
    
		)
}
export default ProjectTable