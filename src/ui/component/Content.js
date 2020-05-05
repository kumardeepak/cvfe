import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "./SelectItems";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageGallery from "react-image-gallery";
import ViewData from "./ViewData";

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
class Content extends Component {
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

      reader.readAsText(file, "UTF8");
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.openDropzone && this.state.source) {
      this.setState({
        openDropzone: true,
      });
    } else if (this.state.files.length > 0) {
      this.setState({
        showLoader: true,
      });
      axios
        .post("http://52.11.90.50/upload", this.state.files, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
        })
        .then((res) => {
          this.setState({
            showLoader: false,
            resData: res.data.filepath,
            showView: true,
          });
          console.log(res.data.filepath)
        });
    } else {
      alert("Filed shouldn't be empty");
    }
  }

  handleSelectChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, model: [] });
  };

  handleChange = (files) => {
    if (files.length > 0) {
      this.readFileDataAsBinary(files[0]).then((result, err) => {
        this.setState({
          files: result,
        });
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.showLoader ? (
          <CircularProgress style={{ marginTop: "20%" }} />
        ) : !this.state.showView ? 
          <Paper className={this.props.classes.paper}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Typography
                value=""
                variant="h4"
                className={this.props.classes.typography}
              >
                {this.state.source && this.state.openDropzone
                  ? this.state.source
                  : "Image Processing"}
              </Typography>
              <br />
              <br />
            </Grid>
            {!this.state.openDropzone ? (
              <Grid container style={{ marginLeft: "12%" }}>
                <Grid item xs={12} sm={5} lg={5} xl={5}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{ width: "100%", paddingTop: "50px" }}
                  >
                    Please select item :
                  </Typography>
                  <br />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={2}
                  lg={4}
                  xl={4}
                  style={{ marginBottom: "20px" }}
                >
                  <br />
                  <br />
                  <Select
                    id="outlined-age-simple"
                    selectValue="language_code"
                    MenuItemValues={["Detect Recipe", "Detect Aadhaar"]}
                    handleChange={this.handleSelectChange}
                    value={this.state.source}
                    name="source"
                  />
                </Grid>
              </Grid>
            ) : (
              <DropzoneArea
                showPreviewsInDropzone={true}
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                dropzoneText={"Drag and drop a image here or click"}
              ></DropzoneArea>
            )}
            <Button
              style={{ marginLeft: "2%" }}
              variant="contained"
              color="primary"
              className={this.props.classes.button}
              size="large"
              onClick={this.handleSubmit.bind(this)}
            >
              <b>{this.state.openDropzone ? "SUBMIT" : "NEXT"}</b>
            </Button>

            <br />
          </Paper>
         :  <ViewData filePath ={this.state.resData}/>}
      </div>
    );
  }
}

export default withStyles(styles)(Content);
