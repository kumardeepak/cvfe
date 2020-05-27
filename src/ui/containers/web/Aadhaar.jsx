

import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { blueGrey50 } from "material-ui/styles/colors";
import ViewData from "./ViewData";
import history from "../../../web.history";
import Upload from "../../../flux/actions/apis/upload";
import APITransport from "../../../flux/actions/apitransport/apitransport";

const styles = () => ({
  paper: {
    margin: "25%",
    width: "50%",
    minWidth: "20%",
    marginTop: "5%",
    padding: "2%"
  },
  typography: {
    textAlign: "center",
    minWidth: "10%"
  },
  button: {
    marginTop: "4%",
    marginLeft: "20%",
    width: "60%"
  }
});
class Face extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      showComponent: false,
      openDropzone: false,
      showLoader: false,
      showView: false,
      source: ""
    };
  }

  readFileDataAsBinary(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        resolve(event.target.result);
      };
      reader.onerror = err => {
        reject(err);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  handleBack() {
    history.push("/dashboard");
  }

  handleSubmit(e) {
    e.preventDefault();
    const { APITransporter } = this.props;
    if (this.state.ImageFile) {
      const apiObj = new Upload(this.state.ImageFile, "image_file_id");
     APITransporter(apiObj);

      this.setState({
        showLoader: true
      });
    } else if (this.state.VideoFile) {
      const apiObj1 = new Upload(this.state.ImageFile, "image_file_id");
      APITransporter(apiObj1);
      this.setState({
        showLoader: true
      });
    } else {
      alert("Filed shouldn't be empty");
    }
  }

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value, model: [] });
  };

  handleImageChange = files => {
    const a = files;
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

  render() {

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
                  acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                  onChange={this.handleImageChange.bind(this)}
                  filesLimit={1}
                  dropzoneText="Drag and drop a image here or click"
                />
              </Grid>
              <Grid item xs={12} sm={5} lg={5} xl={5}>
                <DropzoneArea
                  showPreviewsInDropzone
                  acceptedFiles={["video/mp4", "video/3gp", "video/avi"]}
                  onChange={this.handleVideoChange.bind(this)}
                  filesLimit={1}
                  dropzoneText="Drag and drop a image here or click"
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
          <ViewData fileDetails={this.state.resData} file={this.state.inputFile} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.filePath
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        APITransporter: APITransport
      },
      dispatch
    );
  
  export default withRouter(
    withStyles(styles)(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Face)
    )
  );



