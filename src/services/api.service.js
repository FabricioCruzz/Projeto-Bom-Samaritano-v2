import React from "react";
import axios from "axios";

export default axios.create({
  baseURL: `http://192.168.0.104:8087/api/v1/pbs/`,
});
