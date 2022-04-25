import styled from "styled-components";
import { useWeb3Context } from "../Web3Context";

export function ContractAddress() {
  const { contract } = useWeb3Context();

  return (
    <Root>
      <>
        <div>Contract Address:</div> {contract?.address}
      </>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  column-gap: 10px;
`;
