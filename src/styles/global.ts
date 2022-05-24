import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
      font-family: 'Mulish', sans-serif !important;
    }
    
    html, body {
     height: 100%;
    }
    
    #root {
     height: 100%;
     margin: 0 auto;
    }
 `;
