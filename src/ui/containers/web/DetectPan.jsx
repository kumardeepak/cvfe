import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import ViewData from "./ViewData";
import history from "../../../web.history";
import { blueGrey50 } from "material-ui/styles/colors";

const styles = () => ({
    myDropZone: {
      marginLeft: "5%",
      width: "90%",
      borderColor:'#1C9AB7',
      backgroundColor: '#F5F9FA',
      border: '1px dashed #1C9AB7',
      fontColor:'#1C9AB7',
      "& svg ": { minWidth: "100px",color:'#1C9AB7' },
      "& img ": { minWidth: "100px" },
      "& p": {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        fontSize: "19px",
        color:'#1C9AB7'
      },
    },
  
    paper: {
      margin: "25%",
      width: "50%",
      minWidth: "150px",
      marginTop: "5%",
      padding: "2%",
    },
    typography: {
      textAlign: "center",
      minWidth: "10%",
    },
    button: {
      marginTop: "4%",
      marginLeft: "15%",
    },
  });
class DetectPan extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      showComponent: false,
      openDropzone: false,
      showLoader: false,
      showView: false,
      source: "",
    };
  }

  readFileDataAsBinary(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  handleBack() {
    history.push('/dashboard')
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.files) {
      this.setState({
        showLoader: true,
      });
      axios
        .post("http://52.11.90.50/upload", this.state.files, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 15000,
        })
        .then((res) => {
            alert("Still in progress")
        //     axios
        // .post("http://52.11.90.50/food/api/v1/rect/recipe", {"image_file_id":res.data.filepath},  {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     timeout: 15000,
        //   })
    //   .then(res => {
    //     const imageDetails = res.data;
    //     this.setState({ imageDetails,
    //         showLoader: false,
    //         resData: res.data.recipe_name,
    //         showView: true,
    //      });
    //   })

      .catch(error => {
            
        this.setState({
            showLoader: false
            
          });
          alert("Something Went wrong. please reload again..!")
    });
          
        })
        .catch(error => {
            
            this.setState({
                showLoader: false, 
                
              });
              alert("Something Went wrong. please reload again..!")
        });
    } else {
      alert("Filed shouldn't be empty");
    }
  }

  handleSelectChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, model: [] });
    
  };

  handleChange = (files) => {
      var a = files;
    if (files.length > 0) {
      this.readFileDataAsBinary(files[0]).then((result, err) => {
        this.setState({
          files: result,
          inputFile: a
        });
      });
    }
  };
  render() {
    return (
      <div style={{marginTop:'8%'}}>
        {this.state.showLoader ? (
          <CircularProgress style={{ marginTop: "18%",marginLeft:'50%' }} />
        ) : !this.state.showView ? (
          <Paper className={this.props.classes.paper}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Typography
            gutterBottom
            variant="title"
            component="h2"
            style={{
              marginTop: "-.7%",
              paddingLeft: "40%",
              background: blueGrey50,
              paddingTop: "25px",
              paddingBottom: "16px"
            }}
          > Detect PAN Card
              </Typography>
              <br />
              <br />
            </Grid>
            
            <DropzoneArea
                  dropZoneClass={this.props.classes.myDropZone}
                  showPreviewsInDropzone
                  acceptedFiles={["image/jpeg", "image/png"]}
                  onChange={this.handleChange.bind(this)}
                  filesLimit={1}
                  dropzoneText="Drop an image here or click"
                />
              
        

            <Grid container style={{marginTop:'3%',marginLeft:'2%'}}>
              
                <Grid
                  item
                  xs={12}
                  sm={5}
                  lg={5}
                  xl={5}
                  style={{ marginBottom: "20px", width: "90%" }}
                >
                  <Button
                    style={{ width: "90%" }}
                    variant="contained"
                    color="primary"
                    className={this.props.classes.button}
                    size="large"
                    onClick={this.handleBack.bind(this)}
                  >
                    <b>Cancel</b>
                  </Button>
                </Grid>
              

              <Grid item xs={12} sm={5} lg={5} xl={5}>
                <Button
                  style={{ width: "90%" }}
                  variant="contained"
                  color="primary"
                  className={this.props.classes.button}
                  size="large"
                  onClick={this.handleSubmit.bind(this)}
                >
                  <b>Submit</b>
                </Button>
              </Grid>
            </Grid>

            <br />
          </Paper>
           ) : (
            <ViewData fileDetails={this.state.resData} file ={this.state.inputFile}/>
          )}
        
      </div>
    );
  }
}

export default withStyles(styles)(DetectPan);
