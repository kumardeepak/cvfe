import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "../../components/web/common/SelectItems";
import axios from "axios";
import ViewData from "./ViewData";
import history from "../../../web.history";
import { blueGrey50 } from "material-ui/styles/colors";
import Spinner from "../../components/web/common/Spinner";

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
    if (files.length > 0) {
      this.readFileDataAsBinary(files[0]).then((result, err) => {
        this.setState({
          ImageFile: result,
          inputImage: a,
          iFile: files
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
          inputVideo: a,
          type:files[0].type,
          vFile: files
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
    var apiEndpoint=''
    var items = {}
if(["video/mp4","video/webm"].includes(this.state.mime)){
  apiEndpoint = "verify";
  items = {"image_file_id":image,"video_file_id":video}
}else if(["image/jpeg","image/png"].includes(this.state.mime)){
  apiEndpoint = "compare";
  items = {"source_file_id":image, "target_file_id":video}
}
    if(apiEndpoint){
      axios
        .post("https://demo-ai-api.tarento.com/api/v1/face/"+apiEndpoint, items , {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${decodeURI(localStorage.getItem("token"))}`
            },
            timeout: 60000,
          })
      .then(res => {
        const imageDetails = res.data;
        var diff1 = new Date(res.data.rsp.session.ended).getTime();
        var diff2 = new Date(res.data.rsp.session.started).getTime();
        this.setState({ imageDetails,
            showLoader: false,
            resData:res.data.rsp.face.distance!==undefined && res.data.rsp.face.distance!==null ? {"Session ID": res.data.rsp.session.id,"Face verified" : res.data.rsp.face.found,"Time taken": Math.round((diff1-diff2)/1000)+' '+"sec",  "Distance":Number((res.data.rsp.face.distance).toFixed(2)) }: {"Session ID": res.data.rsp.session.id,"Face verified" : res.data.rsp.face.found,"Time taken": Math.round((diff1-diff2)/1000)+' '+"sec"  },
            showView: true,
         });
      })
      .catch(error => {
            
        this.setState({
            showLoader: false, 
            
          });
          
          if(error=="Error: Request failed with status code 401"){
            alert("Login expired. Please login again..!")
            history.push('/')
          }
          else{
            alert("Processing failed. please try again..!")
            window.location.reload()
          }
    });
    }
    

      
  }

  handleSubmit(e) {
    console.log(this.state.iFile)
    e.preventDefault();
    if (this.state.ImageFile) {
      this.setState({
        showLoader: true,
      });
      const formData = new FormData();
        formData.append('file',this.state.iFile[0])
        
      
      axios
        .post("https://demo-ai-api.tarento.com/api/v1/file/upload", formData, {
          headers: {
            
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${decodeURI(localStorage.getItem("token"))}`
             
          },
          timeout: 60000,
        })
        .then((res) => {
          console.log("log----",res.data.rsp)
            this.setState({"image_file_id":res.data.rsp.filename})
            if(this.state.image_file_id && this.state.video_file_id){
              
                this.handleVideoUpload(this.state.image_file_id,this.state.video_file_id)
            }
        })
        .catch(error => {
            
            this.setState({
                showLoader: false, 
                
              });

             
              
        });
        
    }else {
        alert("File shouldn't be empty");
      }
    
    
    if (this.state.vFile) {
      this.setState({
        showLoader: true,
      });
      const formData2 = new FormData();
        formData2.append('file',this.state.vFile[0])
      axios
      
        .post("https://demo-ai-api.tarento.com/api/v1/file/upload", formData2, {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${decodeURI(localStorage.getItem("token"))}`
            
           
          },
          timeout: 58000,
        })
        .then((res) => {
          console.log("log",res.data.rsp)
            this.setState({"video_file_id":res.data.rsp.filename, mime:res.data.rsp.mime})
            if(this.state.image_file_id && this.state.video_file_id){
                this.handleVideoUpload(this.state.image_file_id,this.state.video_file_id)
            }
        })
        .catch(error => {
            
            this.setState({
                showLoader: false, 
                
              });

              if(error=="Error: Request failed with status code 401"){
                alert("Login expired. Please login again..!")
                history.push('/')
              }
              else{
                alert("Video upload failed. please reload again..!")
              }
             
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
        { !this.state.showView ? (
          <Paper className={this.props.classes.paper}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Typography
                gutterBottom
                variant="title"
                component="h2"
                style={{
                  marginTop: "-.7%",
                  paddingLeft: "38%",
                  background: blueGrey50,
                  paddingTop: "25px",
                  paddingBottom: "16px"
                }}
              >
                {" "}
                Detect and Verify Face
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
                  dropzoneText="Drop an image ID here or click"
                />
              </Grid>
              <Grid item xs={12} sm={5} lg={5} xl={5}>
                <DropzoneArea
                  showPreviewsInDropzone
                  acceptedFiles={["video/mp4","video/MPEG4","image/jpeg","image/png","video/webm"]}
                  onChange={this.handleVideoChange.bind(this)}
                  maxFileSize={8000000}
                  filesLimit={1}
                  dropzoneText="Drop a video/image here or click"
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

{this.state.showLoader && (
          <Spinner />
        ) }
      </div>
    );
  }
}

export default withStyles(styles)(Recipe);

