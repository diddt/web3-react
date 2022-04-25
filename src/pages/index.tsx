import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { Address } from "../lib/components/Address";
import { Balance } from "../lib/components/Balance";
import { Button } from "../lib/components/Buttons";
import { ContractAddress } from "../lib/components/ContractAddress";
import { ContractBalance } from "../lib/components/ContractBalance";
import { Network } from "../lib/components/Network";
import { Transfer } from "../lib/components/Transfer";

const Home: NextPage = () => {
  return (
    <Root>
      <Head>
        <title>Web3 dApp</title>
      </Head>
      <Button />
      <Main>
        <Meta>
          <Address />
          <Network />
          <Balance />
        </Meta>
        <Meta>
          <ContractAddress />
          <ContractBalance />
        </Meta>
        <Transfer />
      </Main>
    </Root>
  );
};

export default Home;

const Root = styled.div`
  margin: 50px auto;
  max-width: 850px;
  min-height: 100vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  flex: 1;
  padding: 40px 0;
`;

const Meta = styled.div`
  display: flex;
  column-gap: 20px;
`;
