import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "../../components/web/common/SelectItems";
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

  handleImageChange = files => {
    const a = files;
    console.log("files------",files[0])
    if (files.length > 0) {
      this.readFileDataAsBinary(files[0]).then((result, err) => {
        this.setState({
          ImageFile: result,
          inputImage: a
        });
      });
    }
  };

  handleVideoChange = files => {
    const a = files;
    if (files.length > 0) {
      this.readFileDataAsBinary(files[0]).then((result, err) => {
        this.setState({
          videoFile: result,
          inputVideo: a
        });
      });
    }
  };

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

  handleVideoUpload(image,video){


    this.setState({image_file_id:'',video_file_id:''})
    axios
        .post("http://poc1.tarento.ai/api/v1/face/verify", {"image_file_id":image,"video_file_id":video} , {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${decodeURI(localStorage.getItem("token"))}`
            },
            timeout: 15000,
          })
      .then(res => {
        const imageDetails = res.data;
        this.setState({ imageDetails,
            showLoader: false,
            resData:{"Face verified" : res.data.rsp.face.found,"Time taken": res.data.rsp.session.started+' - '+res.data.rsp.session.ended},
            showView: true,
         });
      })
      .catch(error => {
            
        this.setState({
            showLoader: false, 
            
          });
          
          alert("error")
    });

      
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.ImageFile) {
      this.setState({
        showLoader: true,
      });
      axios
        .post("http://poc1.tarento.ai/upload", this.state.ImageFile, {
          headers: {
            "Content-Type": "multipart/form-data",
            
          },
          timeout: 15000,
        })
        .then((res) => {
            this.setState({"image_file_id":res.data.filepath})
            if(this.state.image_file_id && this.state.video_file_id){
                this.handleVideoUpload(this.state.image_file_id,this.state.video_file_id)
            }
        })
        .catch(error => {
            
            this.setState({
                showLoader: false, 
                
              });
              alert("Image upload failed. please try again..!")
        });
        
    }else {
        alert("File shouldn't be empty");
      }
    
    
    if (this.state.videoFile) {
        console.log("files",this.state.videoFile)
      this.setState({
        showLoader: true,
      });
      axios
        .post("http://poc1.tarento.ai/upload", this.state.videoFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 15000,
        })
        .then((res) => {
            this.setState({"video_file_id":res.data.filepath})
            if(this.state.image_file_id && this.state.video_file_id){
                this.handleVideoUpload(this.state.image_file_id,this.state.video_file_id)
            }
        })
        .catch(error => {
            
            this.setState({
                showLoader: false, 
                
              });
              alert("Video upload failed. please reload again..!")
        });
        
    }else {
      alert("File shouldn't be empty");
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
    const gridValue = this.state.openDropzone ? 5 : 12;
    return (
      <div style={{ marginTop: "8%" }}>
        {this.state.showLoader ? (
          <CircularProgress style={{ marginTop: "18%", marginLeft: "50%" }} />
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
              >
                {" "}
                Detect Face
              </Typography>
              <br />
              <br />
            </Grid>
            <Grid container style={{ marginLeft: "5%" }} spacing={10}>
              <Grid item xs={12} sm={5} lg={5} xl={5} style={{ marginBottom: "20px", width: "90%" }}>
                <DropzoneArea
                  showPreviewsInDropzone
                  acceptedFiles={["image/jpeg","image/png"]}
                  onChange={this.handleImageChange.bind(this)}
                  filesLimit={1}
                  dropzoneText="Drag an image ID here or click"
                />
              </Grid>
              <Grid item xs={12} sm={5} lg={5} xl={5}>
                <DropzoneArea
                  showPreviewsInDropzone
                  acceptedFiles={["video/mp4","video/MPEG4"]}
                  onChange={this.handleVideoChange.bind(this)}
                  filesLimit={1}
                  dropzoneText="Drop a video here or click"
                />
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: "3%", marginLeft: "2%" }}>
              <Grid item xs={12} sm={5} lg={5} xl={5} style={{ marginBottom: "20px", width: "90%" }}>
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
          <ViewData fileDetails={this.state.resData} file={this.state.inputImage} />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Recipe);
