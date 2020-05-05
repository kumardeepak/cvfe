
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
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
                    <Grid item xs={6} sm={6} lg={6} xl={6}>
                        sajish
                    </Grid>

                    <Grid item xs={6} sm={6} lg={6} xl={6}>
                        sajish
                    </Grid>
                    
                </Grid><br />
                
            </Paper>
        )
    }
}


export default withStyles(styles)(ImageDetails);




