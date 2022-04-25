import styled from "styled-components";
import { Contract } from "ethers";
import { useState } from "react";
import { useWeb3Context } from "../Web3Context";
import { PrimaryButton } from "./Buttons";
export function Transfer() {
  const { contract } = useWeb3Context();
  const [transferAddress, setTransferAddress] = useState("");
  const [transferAmout, setTransferAmount] = useState(0);
  const [status, setStatus] = useState<
    "Pending" | "Failed" | "Completed" | null
  >(null);
  const onTransfer = async (contract: Contract) => {
    setStatus("Pending");
    const tx = await contract.transfer(transferAddress, transferAmout);
    const receipt = await tx.wait();
    setStatus(receipt.status ? "Completed" : "Failed");
  };
  return (
    <Root>
      <HStack>
        <Input
          onChange={(event) => setTransferAddress(event.target.value)}
          placeholder="Transfer address"
          disabled={!contract}
        />
        <Input
          type="number"
          onChange={(event) => setTransferAmount(parseInt(event.target.value))}
          placeholder="Amount"
          disabled={!contract}
        />
      </HStack>
      Status : {status}
      <PrimaryButton
        onClick={() =>
          contract && transferAddress && transferAmout
            ? onTransfer(contract)
            : undefined
        }
        disabled={!contract}
      >
        Transfer
      </PrimaryButton>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
`;

const HStack = styled.div`
  display: flex;
  column-gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 2px;

  padding: 10px;
  margin-top: 8px;
  font-size: 18px;
  line-height: 146%;
  font-weight: 300;
  font-family: inherit;
  color: #333;
  outline: none;

  &:hover {
    border-color: #333;
  }

  &:focus {
    border-color: #959595;
  }

  &:disabled {
    background-color: #eaeaea;
  }
`;
