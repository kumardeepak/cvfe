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
  paper: {
    margin: "25%",
    width: "50%",
    minWidth: "20%",
    marginTop: "5%",
    padding: "2%",
  },
  typography: {
    textAlign: "center",
    minWidth: "10%",
  },
  button: {
    marginTop: "4%",
    marginLeft: "20%",
    width: "60%",
  },
});
class Recipe extends Component {
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
        console.log("files",this.state.files)
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

            axios
        .post("http://52.11.90.50/food/api/v1/rect/recipe", {"image_file_id":res.data.filepath},  {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 15000,
          })
      .then(res => {
        const imageDetails = res.data;
        this.setState({ imageDetails,
            showLoader: false,
            resData: res.data.recipe_name,
            showView: true,
         });
      })

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
          > Detect Recipe
              </Typography>
              <br />
              <br />
            </Grid>
            
            <DropzoneArea
                showPreviewsInDropzone={true}
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                dropzoneText={"Drag and drop a image here or click"}
              ></DropzoneArea>
        

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
                    <b>back</b>
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
                  <b>NEXT</b>
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

export default withStyles(styles)(Recipe);
