
import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    paper: {
        margin: "25%",
        width: "50%",
        minWidth: "20%",
        marginTop: "5%",
        padding: '2%',
    },
    typography: {
        textAlign: 'center',
        minWidth: '10%'
    },
    button: {
        marginTop: '4%',
        marginLeft: '20%',
        width: '60%',
    }
})
class ImageDetails extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            showComponent: false,
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.files.length > 0) {
            this.setState({
                showComponent: true,
            })
        }
        else {
            alert("File not selected")
        }
    }
    handleChange(files) {
        this.setState({
            files: files
        });
    }
    render() {
        return (
            <Paper className={this.props.classes.paper}>
                <Grid container  >
                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                        <Typography value='' variant="h4" className={this.props.classes.typography} >Add File</Typography>
                        <br /><br />
                    </Grid>
                    
                </Grid><br />
                
            </Paper>
        )
    }
}


export default withStyles(styles)(ImageDetails);




