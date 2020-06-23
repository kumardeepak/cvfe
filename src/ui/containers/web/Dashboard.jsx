import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "../../components/web/common/SelectItems";
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

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.source==="Detect Recipe") {
      history.push("/detect-recipe")
    }
    else if (this.state.source==="Detect Face") {
      history.push("/detect-face")
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
    let gridValue = this.state.openDropzone ? 5 : 12;
    return (
      <div style={{marginTop:'8%'}}>
        {this.state.showLoader ? (
          <CircularProgress style={{ marginTop: "20%" }} />
        ) : !this.state.showView ? (
          <Paper className={this.props.classes.paper}>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Typography
            gutterBottom
            variant="title"
            component="h2"
            style={{
              marginTop: "-.7%",
              textAlign: "center",
              
              background: blueGrey50,
              paddingTop: "25px",
              paddingBottom: "16px"
            }}
          >  Computer Vision Demonstration
              </Typography>
                  
              <br />
              <br />
            </Grid>
            
              <Grid container style={{ marginLeft: "22%" }}>
                <Grid item xs={12} sm={5} lg={5} xl={5}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{ width: "100%", paddingTop: "50px" }}
                  >
                    Select demonstration category:
                  </Typography>
                  <br />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={5}
                  lg={5}
                  xl={5}
                  style={{ marginBottom: "20px" }}
                >
                  <br />
                  <br />
                  <Select
                    id="outlined-age-simple"
                    selectValue="language_code"
                    MenuItemValues={["Detect Face","Detect Recipe", "Detect Aadhaar"]}
                    handleChange={this.handleSelectChange}
                    value={this.state.source}
                    name="source"
                  />
                </Grid>
              </Grid>
       
            <Grid container>
              
              <Grid item xs={12} sm={gridValue} lg={gridValue} xl={gridValue}>
                <Button
                  style={{ marginLeft: "20%" }}
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

export default withStyles(styles)(Content);
