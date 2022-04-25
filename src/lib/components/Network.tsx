import styled from "styled-components";
import { useWeb3Context } from "../Web3Context";

export function Network() {
  const { network } = useWeb3Context();
  return (
    <Root>
      <>
        <div>Network:</div> {network?.name}
      </>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  column-gap: 10px;
`;
