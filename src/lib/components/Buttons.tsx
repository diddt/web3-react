import styled from "styled-components";
import { useWeb3Context } from "../Web3Context";

interface ConnectProps {
  connect: (() => Promise<void>) | null;
}
const ConnectButton = ({ connect }: ConnectProps) => {
  return connect ? (
    <PrimaryButton onClick={connect}>Connect</PrimaryButton>
  ) : (
    <PrimaryButton>Loading...</PrimaryButton>
  );
};

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null;
}

const DisconnectButton = ({ disconnect }: DisconnectProps) => {
  return disconnect ? (
    <PrimaryButton onClick={disconnect}>Disconnect</PrimaryButton>
  ) : (
    <PrimaryButton>Loading...</PrimaryButton>
  );
};

export function Button() {
  const { web3Provider, connect, disconnect } = useWeb3Context();

  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  );
}

export const PrimaryButton = styled.button`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 18px;
  padding: 16px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, 0.1);

  &:disabled {
    background: #eaeaea;
    cursor: default;
    color: #959595;
    border-color: transparent;
    filter: none;
  }
  }
`;
