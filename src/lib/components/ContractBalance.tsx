import styled from "styled-components";
import { useContractBalance } from "../useContractBalance";

export function ContractBalance() {
  const contractBalance = useContractBalance();

  return (
    <Root>
      <>
        <div>Contract Balance:</div> {contractBalance}
      </>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  column-gap: 10px;
`;
