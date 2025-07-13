import axios from "axios";
import React from "react";

const axiosIns = axios.create({
  baseURL: "https://dailygigs.vercel.app",
});

const useAxios = () => {
  return axiosIns;
};

export default useAxios;
