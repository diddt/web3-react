import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useWeb3Context } from "./Web3Context";

export function useBalance() {
  const { web3Provider, address } = useWeb3Context();
  const [balance, setBalance] = useState("");

  const fetchBalance = useCallback(
    async (web3Provider: ethers.providers.Web3Provider, address: string) => {
      const balance = await web3Provider.getBalance(address);
      setBalance(formatEther(balance));
    },
    []
  );

  useEffect(() => {
    if (web3Provider && address) {
      fetchBalance(web3Provider, address);
    } else {
      setBalance("");
    }
  }, [web3Provider, address, fetchBalance]);

  return balance;
}
