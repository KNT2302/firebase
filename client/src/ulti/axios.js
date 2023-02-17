
import axios from "axios"
import  environment  from "./environment/env"

class Provider {



  get = (url, specificConfig) => {
    const config = {
      method: "GET",
      url,
      ...specificConfig,
    }
    return this.sendRequest(config)
  }

  post = (url, specificConfig, data) => {
    const config = {
      method: "POST",
      url,
      data,
      ...specificConfig,
      ...this.commonConfig
    }
    return this.sendRequest(config)
  }

  sendRequest = async (config) => {



    try {
      const response = await axios({baseURL: environment,...config})

      return response.data 
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          error: error
        }
      } else {
        return {
          success: false,
          error: error
        }
      }
    }
  }
}

const axiosProvider = new Provider()

export default axiosProvider
