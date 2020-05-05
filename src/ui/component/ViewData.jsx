import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import JSONViewer from 'react-json-viewer';
// import Image from 'material-ui-image'
import Button from "@material-ui/core/Button";

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
      window.location.reload()
  }
  render() {
    return (
        <div style={{marginTop:'7%',height:'90%', maxHeight:'90%'}}>
        <div style={{width:'90%', height:'80%'}}>
            
            
                <Grid container spacing={8} style={{ padding: "0 50px 0px 44px" }}>
              <Grid item xs={12} sm={6} lg={6} xl={6} style={{maxHeight:'60%'}}>
              <img src= {URL.createObjectURL(this.props.file[0])}  style={{maxWidth: "100%",
        maxHeight: "70vh",
        display: "block",
        block: 'center'}} alt=""/>
              {/* <Image 
        src= {URL.createObjectURL(this.props.file[0])}
      /> */}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6} xl={6} style={{width:'100%'}}>
                  <JSONViewer
        json={ [
            {
              "_id": "5eb120a28fb9f85beae099a5",
              "align": "CENTER",
              "is_new_line": true,
              "is_bold": true,
              "text": "REPORTABLE",
            },
            {
                "_id": "5eb120a28fb9f85beae099a5",
                "align": "CENTER",
                "is_new_line": true,
                "is_bold": true,
                "text": "REPORTABLE",
              },
              {
                "_id": "5eb120a28fb9f85beae099a5",
                "align": "CENTER",
                "is_new_line": true,
                "is_bold": true,
                "text": "REPORTABLE",
              },
              {
                "_id": "5eb120a28fb9f85beae099a5",
                "align": "CENTER",
                "is_new_line": true,
                "is_bold": true,
                "text": "REPORTABLE",
              }]}
      />
                  </Grid>
                  </Grid>
            
            
                  <Button
              style={{marginTop:'3%' }}
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
