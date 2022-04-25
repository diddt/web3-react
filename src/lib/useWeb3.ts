import { useEffect, useReducer, useCallback } from "react";
import { ethers } from "ethers";
import { initialState, useStore, Web3StateProps } from "./data/useStore";
import { toast } from "react-toastify";
import { web3Modal } from "./Web3Client";
import { abi } from "./abi";

const contractAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508";

export type Web3Client = Web3StateProps & {
  connect: (() => Promise<void>) | null;
  disconnect: (() => Promise<void>) | null;
};

export const Web3InitialClientState: Web3Client = {
  ...initialState,
  connect: null,
  disconnect: null,
};

export const useWeb3 = () => {
  const {
    provider,
    web3Provider,
    address,
    network,
    contract,
    setWeb3Provider,
    setAddress,
    reset,
  } = useStore();

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        toast.success("Connected to Web3");
        setWeb3Provider({
          provider,
          web3Provider,
          address,
          network,
          contract,
        });
      } catch (e) {
        console.log("connect error", e);
      }
    } else {
      console.error("No Web3Modal");
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      toast.error("Disconnected from Web3");
      reset();
    } else {
      console.error("No Web3Modal");
    }
  }, [provider]);

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, []);

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        toast.info("Changed Web3 Account");
        setAddress(accounts[0]);
      };

      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== "undefined") {
          console.log("switched to chain...", _hexChainId);
          toast.info("Web3 Network Changed");
          window.location.reload();
        } else {
          console.log("window is undefined");
        }
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return {
    provider,
    web3Provider,
    address,
    network,
    contract,
    connect,
    disconnect,
  } as Web3Client;
};
