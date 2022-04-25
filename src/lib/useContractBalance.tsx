import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3Context } from "./Web3Context";

export function useContractBalance() {
  const [balance, setBalance] = useState("");
  const { address, contract } = useWeb3Context();

  useEffect(() => {
    if (contract) {
      contract.balanceOf(address).then((balance: BigNumber) => {
        setBalance(balance.toString());
      });
    } else {
      setBalance("");
    }
  }, [contract, address]);

  return balance;
}
