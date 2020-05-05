import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import JSONViewer from 'react-json-viewer';
import Image from 'material-ui-image'
const images = [
    {}]

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
  render() {
    return (
        <div style={{marginTop:'5%', height:'80%'}}>
            
                
                <Grid container spacing={8} style={{ padding: "0 24px 0px 24px" }}>
              <Grid item xs={12} sm={6} lg={6} xl={6} >
              {/* <Image 
        src="http://loremflickr.com/300/200"
      /> */}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6} xl={6} style={{width:'100%'}}>
                  <JSONViewer
        json={ [
            
              
              
            
            ]}
      />
                  </Grid>
                  </Grid>
            
            
            
        </div>
    );
  }
}

export default (ViewData);
