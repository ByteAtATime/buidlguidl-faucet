<script lang="ts">
  import { Address } from "$lib/components/scaffold-eth";
  import TxnNotification from "$lib/runes/TxnNotification.svelte";
  import { createScaffoldReadContract } from "$lib/runes/scaffoldReadContract.svelte";
  import { getBlockExplorerTxLink } from "$lib/utils/scaffold-eth/networks";
  import { notification } from "$lib/utils/scaffold-eth/notification";
  import { createAccount } from "@byteatatime/wagmi-svelte";
  import { isAddress } from "viem";

  const { address: destAddr } = $derived.by(createAccount());

  let addressProof = $state<{ isLoading: boolean; proof: string[] | null }>({
    isLoading: true,
    proof: null,
  });

  $effect(() => {
    if (!destAddr || !isAddress(destAddr)) return;

    addressProof = { isLoading: true, proof: null };

    fetch(`https://buidlers.byteatatime.dev/api/addresses/proof?address=${destAddr}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch proof");
        }

        return res.json();
      })
      .then(data => {
        addressProof = { isLoading: false, proof: data };
      })
      .catch(() => {
        addressProof = { isLoading: false, proof: null };
      });
  });

  const buidlGuidlOracle = $derived.by(
    createScaffoldReadContract(() => ({
      contractName: "BuidlGuidlOracle",
      functionName: "isMember",
      args: [addressProof.proof, destAddr],
      enabled: !!addressProof.proof && !!destAddr,
    })),
  );

  const fundWallet = async () => {
    if (!destAddr || !addressProof.proof || buidlGuidlOracle.isLoading) return;

    const isMember = buidlGuidlOracle.data;

    if (!isMember) {
      notification.error("You must be a BuidlGuidl member to use this faucet.");
      return;
    }

    const res = await fetch(`/api/faucet`, {
      method: "POST",
      body: JSON.stringify({
        address: destAddr,
        proof: addressProof.proof,
      }),
    });

    if (!res.ok) {
      notification.error("Failed to fund wallet");
      return;
    }

    const { tx } = await res.json();

    const txLink = getBlockExplorerTxLink(11155111, tx);

    notification.success(TxnNotification, {
      props: { message: "Sent funds successfully!", blockExplorerLink: txLink },
    });
  };
</script>

<div class="flex items-center justify-center px-4 py-8">
  <div class="flex max-w-screen-sm flex-col items-center gap-y-2 [&>*]:text-center">
    <h1 class="my-0 text-4xl font-bold">BuidlGuidl Sepolia Faucet</h1>

    <p class="my-0">
      This faucet &ndash; powered by Merkle Proofs &ndash; allows <a href="https://buidlguidl.com">BuidlGuidl</a> members
      to get some Sepolia ETH for testing.
    </p>

    <div class="container mt-6 flex flex-col items-center rounded-3xl bg-base-100 p-8">
      <p class="mb-1">Send 0.1 SepoliaETH to:</p>
      <Address address={destAddr} />

      {#if !addressProof.isLoading && !addressProof.proof}
        <p class="mt-4 max-w-sm text-red-500">
          Failed to obtain proof for this address. Are you sure you're a BuidlGuidl member?
        </p>
      {/if}

      <button
        class="btn btn-primary btn-block mt-8"
        disabled={!destAddr || addressProof.isLoading || buidlGuidlOracle.isLoading}
        onclick={fundWallet}
      >
        {#if addressProof.isLoading}
          <div class="loading" />
          Obtaining proof
        {:else}
          Fund my wallet!
        {/if}
      </button>
    </div>
  </div>
</div>
