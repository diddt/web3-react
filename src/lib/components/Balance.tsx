import styled from "styled-components";
import { useBalance } from "../useBalance";
import { useWeb3Context } from "../Web3Context";

export function Balance() {
  const balance = useBalance();
  return (
    <Root>
      <>
        <div>Balance:</div> {balance}
      </>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  column-gap: 10px;
`;
