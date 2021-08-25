import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography,Button,Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axiosInstance from '../axios.js'
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        overflowX:'hidden'
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))
const DeletePopup=(props)=> {

    const { openPopup, setOpenPopup,rowId } = props;
    
    const classes = useStyles();
    const deleteTask=()=>{
        axiosInstance.delete(`row/${rowId}`)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
    }

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        Delete Task
                    </Typography>
                   
                </div>
            </DialogTitle>
            <DialogContent >
                <Grid container spacing={4}>
            <Grid item xs>
              <Button variant="contained" color="secondary" onClick={()=>setOpenPopup(false)} style={{textAlign:'right'}}>

                <CloseIcon/>
                </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={()=>deleteTask()}style={{textAlign:'right'}}>

                Delete Task
                </Button>
            </Grid>
          </Grid>
                
            </DialogContent>
        </Dialog>
    )
}
export default DeletePopup