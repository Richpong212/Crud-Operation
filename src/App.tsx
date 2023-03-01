import React, { useState, useEffect, useLayoutEffect, FormEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import HomePage from "./pages/HomePage";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;
