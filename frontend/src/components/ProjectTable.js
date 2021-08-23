import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
    
    
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const ProjectTable=()=>{
	const classes = useStyles();
	return(
    <>
		<Grid container spacing={4} justifyContent='space-between'>
    <Grid item>
      <Typography variant='h3'>Project title</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" >
          <AddIcon/> Row
        </Button>
      </Grid>
    </Grid>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow className={classes.tHead}>
            <TableCell>Task Name</TableCell>
            <TableCell align="right">Assigned to</TableCell>
            <TableCell align="right">Prority</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">
                <Button color="primary">
                   <EditOutlinedIcon fontSize="small" />
                </Button>
                <Button color="secondary">
                  <CloseIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
    
    
		)
}
export default ProjectTable