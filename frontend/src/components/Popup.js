import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography,Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))
const Popup=(props)=> {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        title
                    </Typography>
                   
                </div>
            </DialogTitle>
            <DialogContent >
                {children}  
                <Button variant="contained" color="secondary" onClick={()=>setOpenPopup(false)} style={{textAlign:'right'}}>

                <CloseIcon/>
                </Button>
            </DialogContent>
        </Dialog>
    )
}
export default Popup