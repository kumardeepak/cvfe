import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import JSONViewer from 'react-json-viewer';
// import Image from 'material-ui-image'
import Button from "@material-ui/core/Button";
import history from "../../../web.history";
import Typography from "@material-ui/core/Typography";
import { blueGrey50 } from "material-ui/styles/colors";

class ViewData extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      showComponent: false,
      openDropzone: false,
      showLoader: false,
      showView: false
    };
  }

  handleBack(){
      history.push("/dashboard")
  }
  render() {
   var gridValue=  this.props.file2? 4:6;
   var gridsmValue=  this.props.file2? 3:6;
    return (
      
        <div style={{marginTop:'7%',height:'90%', maxHeight:'90%'}}>
        <div style={{width:'90%', height:'75%'}}>
            
            
                <Grid container spacing={8} style={{ padding: "0 50px 0px 44px" }}>
              <Grid item xs={6} sm={gridsmValue} lg={gridValue} xl={gridValue} style={{maxHeight:'60%'}}>
              <Typography
                gutterBottom
                variant="title"
                component="h2"
                style={{
                  marginTop: "-.7%",
                  textAlign:'center',
                 
                  paddingTop: "25px",
                  paddingBottom: "16px"
                }}
              >
                {" "}
                Source Image
              </Typography>
              <img src= {URL.createObjectURL(this.props.file[0])}  style={{maxWidth: "100%",
        maxHeight: "65vh",
        display: "block",
  marginLeft: "auto",
  marginRight: "auto"}} alt=""/>
  </Grid>
  {this.props.file2 &&
  <Grid item xs={6} sm={gridsmValue} lg={gridValue} xl={gridValue} style={{maxHeight:'60%'}}>
    <Typography
                gutterBottom
                variant="title"
                component="h2"
                style={{
                  marginTop: "-.7%",
                  textAlign:'center',
                  
                  paddingTop: "25px",
                  paddingBottom: "16px"
                }}
              >
                {" "}
                Target Image
              </Typography>
              <img src= {URL.createObjectURL(this.props.file2[0])}  style={{maxWidth: "100%",
        maxHeight: "65vh",
        display: "block",
  marginLeft: "auto",
  marginRight: "auto"}} alt=""/>
  </Grid> }
 
  
              {/* <Image 
        src= {URL.createObjectURL(this.props.file[0])}
      /> */}
                  
                  <Grid item xs={12} sm={6} lg={gridValue} xl={gridValue} style={{width:'100%'}}>
                  <Typography
                gutterBottom
                variant="title"
                component="h2"
                style={{
                  marginTop: "-.7%",
                  textAlign:'center',
                  
                  paddingTop: "25px",
                  paddingBottom: "16px"
                }}
              >
                {" "}
                Face Detect Information
              </Typography>
                  <JSONViewer
        json= { this.props.fileDetails}
      />
                  </Grid>
                  </Grid>
            
            
                  <Button
              style={{marginTop:'3%',marginLeft:'50%' }}
              variant="contained"
              color="primary"
              
              size="large"
              onClick={this.handleBack.bind(this)}
            >
              <b>Close</b>
            </Button>
        </div>
       
        </div>
    );
  }
}

export default (ViewData);
