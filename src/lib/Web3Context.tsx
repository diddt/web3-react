import { ReactChild, createContext, useContext } from "react";
import { useWeb3, Web3Client, Web3InitialClientState } from "./useWeb3";

const Web3Context = createContext<Web3Client>(Web3InitialClientState);

interface Props {
  children: ReactChild;
}

export const Web3ContextProvider = ({ children }: Props) => {
  const state = useWeb3();
  return <Web3Context.Provider value={state}>{children}</Web3Context.Provider>;
};

export function useWeb3Context() {
  return useContext(Web3Context);
}
