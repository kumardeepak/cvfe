/**
 * Login API
 */
import API from "./api";
import C from "../constants";
import CONFIGS from "../../../configs/configs";

export default class LoginAPI extends API {
  constructor(username, password, timeout = 2000) {
    super("POST", timeout, false);
    this.username = username;
    this.password = password;
    
    this.type = C.LOGIN;
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.token = res.rsp;
      this.expires = res.expires;
     
      // sessionStorage.setItem('user', JSON.stringify(res.user))
    }
  }

  apiEndPoint() {
    return `http://poc1.tarento.ai/api/v1/user/login`;
  }

  getBody() {
    return {
      username: this.username,
      password: this.password,
      
    };
  }

  getHeaders() {
    this.headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    return this.headers;
  }

  getPayload() {
    return {
     
      token: this.token
      
    };
  }

  getCustomConfigs() {
    return {
      auth: {
        username: CONFIGS.DEV_SALT,
        password: CONFIGS.DEV_PEPPER
      },
      timeout: this.timeout
    };
  }
}
