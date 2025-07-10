import axios from "axios";
import React from "react";

const axiosIns = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxios = () => {
  return axiosIns;
};

export default useAxios;
