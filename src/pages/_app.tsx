import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ContextProvider } from "../lib/Web3Context";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <>
        <Component {...pageProps} />
        <ToastContainer
          hideProgressBar
          position="bottom-right"
          autoClose={2000}
        />
      </>
    </Web3ContextProvider>
  );
}

export default App;
