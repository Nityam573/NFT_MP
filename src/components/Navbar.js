import logo from "../logo_3.png";
import fullLogo from "../full_logo.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }
  async function isConnected() {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      console.log(`You're connected to: ${accounts[0]}`);
      updateButton();
      toggleConnect(true);
      getAddress();
    } else {
      console.log("Metamask is not connected");
    }
  }

  async function connectWebsite() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const addr = await signer.getAddress();
    updateAddress(addr);
    updateButton();
    toggleConnect(true);

    // const chainId = await window.ethereum.request({ method: "eth_chainId" });
    // if (chainId !== "0x56b29") {
    //   //alert('Incorrect network! Switch your metamask network to Rinkeby');
    //   await window.ethereum.request({
    //     method: "wallet_switchEthereumChain",
    //     params: [{ chainId: "0x56b29" }],
    //   });
    // }
    // await window.ethereum
    //   .request({ method: "eth_requestAccounts" })
    //   .then(() => {
    //     updateButton();
    //     console.log("here");
    //     getAddress();
    //     window.location.replace(location.pathname);
    //   });
  }

  useEffect(() => {
    isConnected();

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <>
      <nav className="w-[80%] bg-white rounded-3xl flex mx-auto mt-4 p-[0.7rem]">
        <ul className="w-[40%]">
          <li className="flex mt-2 items-center">
            <Link to="/">
              <div className="text-[18px] font-bold capitalize">NFT MUSEUM</div>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-row w-[60%] justify-between text-black">
          {location.pathname === "/" ? (
            <li className="flex justify-center items-center text-[16px]">
              <Link to="/">Showcase</Link>
            </li>
          ) : (
            <li className="flex justify-center items-center text-[16px]">
              <Link to="/">Showcase</Link>
            </li>
          )}
          {location.pathname === "/sellNFT" ? (
            <li className="flex justify-center items-center text-[16px]">
              <Link to="/sellNFT">List My ART</Link>
            </li>
          ) : (
            <li className="flex justify-center items-center text-[16px]">
              <Link to="/sellNFT">List My ART</Link>
            </li>
          )}
          {location.pathname === "/profile" ? (
            <li className="flex justify-center items-center text-[16px]">
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            <li className="flex justify-center items-center text-[16px]">
              <Link to="/profile">Profile</Link>
            </li>
          )}
          <li className="flex justify-center items-center text-[16px]">
            <button
              className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-3xl"
              onClick={connectWebsite}
            >
              {connected ? "Connected" : "Connect Wallet"}
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-white text-bold text-right mr-10 text-sm">
        {currAddress !== "0x"
          ? "Connected to"
          : "Not Connected. Please login to view NFTs"}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div>
    </>
  );
}

export default Navbar;
