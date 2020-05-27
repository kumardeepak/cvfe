/**
 * Login API
 */
import API from "./api";
import C from "../constants";
import CONFIGS from "../../../configs/configs";

export default class RepoAPI extends API {
    constructor(timeout = 2000) {
        super("GET", timeout, false);
        this.repos = []
        this.type = C.GET_REPOS;
    }
    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
      }
    
    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.repos = res
        }
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}`;
    }

    getBody() {
    }

    getHeaders() {
    
    }

    getPayload() {
        return this.repos
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
