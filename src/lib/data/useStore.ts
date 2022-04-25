import create from "zustand";
import { ethers } from "ethers";

export interface Web3StateProps {
  provider: any;
  web3Provider: ethers.providers.Web3Provider | null | undefined;
  address: string | null | undefined;
  network: ethers.providers.Network | null | undefined;
  contract: ethers.Contract | null | undefined;
}

interface StoreProps extends Web3StateProps {
  setWeb3Provider: (props: Web3StateProps) => void;
  setAddress: (address: Web3StateProps["address"]) => void;
  setNetwork: (network: Web3StateProps["network"]) => void;
  setContract: (contract: Web3StateProps["contract"]) => void;
  reset: () => void;
}

export const initialState: Web3StateProps = {
  provider: null,
  web3Provider: null,
  address: null,
  network: null,
  contract: null,
};

export const useStore = create<StoreProps>((set) => ({
  ...initialState,
  setWeb3Provider: (props: Web3StateProps) =>
    set((state) => ({
      ...state,
      provider: props.provider,
      web3Provider: props.web3Provider,
      address: props.address,
      network: props.network,
      contract: props.contract,
    })),
  setAddress: (address: Web3StateProps["address"]) =>
    set((state) => ({ ...state, address })),
  setNetwork: (network: Web3StateProps["network"]) =>
    set((state) => ({ ...state, network })),
  setContract: (contract: Web3StateProps["contract"]) =>
    set((state) => ({ ...state, contract })),
  reset: () =>
    set((state) => ({
      ...state,
      ...initialState,
    })),
}));
