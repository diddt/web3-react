import styled from "styled-components";
import { useWeb3Context } from "../Web3Context";

export function Address() {
  const { address } = useWeb3Context();
  return (
    <Root>
      <>
        <div>Address:</div> {address}
      </>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  column-gap: 10px;
`;
