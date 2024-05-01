import type { RequestHandler } from "@sveltejs/kit";
import { isAddress } from "viem";
import { env } from "$env/dynamic/private";
import { JsonRpcProvider } from "ethers";
import { Wallet } from "ethers";
import { Contract } from "ethers";
import deployedContracts from "$lib/contracts/deployedContracts";
import scaffoldConfig from "$lib/scaffold.config";

export const POST: RequestHandler = async ({ request }) => {
  const { address: destination, proof } = await request.json();

  if (!destination || !isAddress(destination)) {
    return new Response("Invalid address", { status: 400 });
  }

  const PRIVATE_KEY = env["PRIVATE_KEY"];

  if (!PRIVATE_KEY) {
    return new Response("Private key not set", { status: 500 });
  }

  const CONTRACT_ADDRESS = env["CONTRACT_ADDRESS"];

  if (!CONTRACT_ADDRESS) {
    return new Response("Contract address not set", { status: 500 });
  }

  const provider = new JsonRpcProvider(
    env["RPC_URL"] ?? `https://eth-sepolia.g.alchemy.com/v2/${scaffoldConfig.alchemyApiKey}`,
  );
  const signer = new Wallet(PRIVATE_KEY, provider);

  const contract = new Contract(CONTRACT_ADDRESS, deployedContracts[11155111].Faucet.abi, signer);

  const tx = await contract.withdraw(proof, destination);

  return new Response(JSON.stringify({ tx: tx.hash }), { status: 200 });
};
