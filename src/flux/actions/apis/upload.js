import API from "./api";
import C from "../constants";

export default class ConfigUpload extends API {
  constructor(configFile, name, timeout = 2000) {
    super("POST", timeout, false, "MULTIPART");
    this.type = C.CONFIGUPLOAD;
    this.file = configFile;
    this.name = name;

    console.log(this.file,this.name)
  }

  toString() {
    return `${super.toString()} , type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res.data) {
      this.config = { data: res.data, name: this.name };
    }
  }

  apiEndPoint() {
    return `http://52.11.90.50/upload`;
  }

  getFormData() {
    return this.file;
  }

  getHeaders() {
    return {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
  }

  getPayload() {
    return this.config;
  }
}