import React, { useEffect, useState } from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Governance from './pages/governance/Governance';
import More from './pages/more/More';
import Pools from './pages/pools/Pools';
import Swap from './pages/swap/Swap';
import SwapDetails from './pages/swap/Swap_Details';
import ConnectWallet from './pages/connectWallet/ConnectWallet';
import GovernanceInfo from "./pages/governance/GovernanceInfo";
import PoolAddLiquidity from "./pages/pools/Pools_Add_Liquidity";
import PoolRemoveLiquidity from "./pages/pools/Pools_Remove_Liquidity";
import PoolSwap from "./pages/pools/Pools_Swap";
import PoolLocking from "./pages/pools/Pools_Looking";
import Helloabi from "./contracts/Hello.json";
import SimpleStorage from "./contracts/SimpleStorage.json"
import Web3 from "web3";
import Navbar from "./components/Navbar/navbar/Navbar"

const App = () => {
  const [refresh, setrefresh] = useState(0);
  const [storageValue, setStorageValue] = useState(0);

  let content;
  const [loading2, setloading2] = useState(false);

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [Hello, setHello] = useState({});

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    if (
      typeof window.ethereum == "undefined" 
    ) {
      return;
    }
    const web3 = new Web3(window.ethereum);

    let url = window.location.href;
    console.log(url);

    const accounts = await web3.eth.getAccounts();

    if (accounts.length == 0) {
      return;
    }
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    
    
    if (networkId == await web3.eth.net.getId()) {
      // const hello = new web3.eth.Contract(Helloabi.abi, 
      //   networkData.address
      //   // deployedNetwork && deployedNetwork.address,
      //   );
      const hello = {}
      setHello(hello);

      setLoading(false);
    } else {
      window.alert("the contract not deployed to detected network.");
      setloading2(true);
    }
  };

  const onclick = async (a) => {
    const web3 = new Web3(window.web3);
    await Hello.methods
      .setCompleted(a.toString())
      .send({ from: account })
      .once("recepient", (recepient) => {
        console.log("success");
      })
      .on("error", () => {
        console.log("error");
      });
  };

  const walletAddress = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    window.location.reload();
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    if (refresh == 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    //esl
  }, [refresh]);

  if (loading === true) {
    content = (
      <p className="text-center">
        Loading...{loading2 ? <div>loading....</div> : ""}
      </p>
    );
  } else {
    content = (
      <div class="">
        <main role="main" class="">
          <div class="jumbotron">
            <h1>Project</h1>
            <div className="row" style={{ paddingTop: "30px" }}>
              {" "}
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 1</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 2</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>text 3</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <button className="btn btn-primary">Click on it</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      {/* <Navbar account={account} /> */}
      

      {/* {account == "" ? (
        <div className="">
          {" "}
          Connect your wallet to application{"   "}{" "}
          <button onClick={walletAddress}>metamask</button>
        </div>
      ) : (
        content
      )} */}
 



      <Router>
      <Navbar walletAddress={walletAddress} account={account}/>
      <Switch>
        <Route path="/" component={Swap} exact />
        <Route path="/swap/details" component={SwapDetails} exact />
        <Route path="/pools" component={Pools} exact />
        <Route path="/pools/add-liquidity" component={PoolAddLiquidity} exact />
        <Route path="/pools/remove-liquidity" component={PoolRemoveLiquidity} exact />
        <Route path="/pools/swap" component={PoolSwap} exact />
        <Route path="/pools/locking" component={PoolLocking} exact />
        <Route path="/governance" component={Governance} exact />
        <Route path="/governance-info" component={GovernanceInfo} exact />
        <Route path="/more" component={More} exact />
        <Route path="/connect-wallet" component={ConnectWallet} exact />
      </Switch>
     </Router>
    </div>
  );
};

export default App;


