import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";

export default function Marketplace() {
  const sampleData = [
    {
      name: "NFT#1",
      description: "Alchemy's First NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#2",
      description: "Alchemy's Second NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#3",
      description: "Alchemy's Third NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];
  const [data, updateData] = useState(null);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );
      //create an NFT Token
      let transaction = await contract.getAllNFTs();
      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(
        transaction.map(async (i) => {
          var tokenURI = await contract.tokenURI(i.tokenId);
          console.log("getting this tokenUri", tokenURI);
          tokenURI = GetIpfsUrlFromPinata(tokenURI);
          let meta = await axios.get(tokenURI);
          meta = meta.data;

          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          };
          return item;
        })
      );

      updateFetched(true);
      updateData(items);
    } catch (error) {
      console.log("error from marketplace.js : ", error);
    }
  }

  if (!dataFetched) getAllNFTs();

  return (
    <div>
      <Navbar></Navbar>
      <div className='flex flex-col place-items-center justify-center min-h-[80vh] w-full'>
        <div className='font-bold text-[36px]'>Top ARTs</div>
        <div className='flex mt-5 justify-between flex-wrap max-w-screen-xl text-center'>
          {data?.map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })}
        </div>
      </div>
      <section className="bg-gray-800 text-gray-300 py-10">
      <div class="container mx-auto flex flex-col items-center justify-between">
        <div class="flex items-center mb-4">
            <span class="text-xl font-semibold">My Website</span>
        </div>
        <ul class="flex space-x-4">
            <li><a href="#" class="hover:text-white">Home</a></li>
            <li><a href="#" class="hover:text-white">About</a></li>
            <li><a href="#" class="hover:text-white">Services</a></li>
            <li><a href="#" class="hover:text-white">Contact</a></li>
        </ul>
        <div>
            <p>&copy; 2024 My Website. All rights reserved.</p>
        </div>
    </div>
      </section>
    </div>
  );
}
