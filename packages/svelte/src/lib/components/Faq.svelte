<script lang="ts">
  const questions = [
    {
      question: "What is a Merkle Proof?",
      answer:
        "A Merkle proof is a cryptographic proof that a piece of data is included in a Merkle tree. This way, it is possible to prove that you are a member of the BuidlGuidl <i>on chain</i> without storing all the data (which would be expensive).",
    },
    {
      question: "What if I don't have SepoliaETH to pay the transaction fee?",
      answer:
        "Actually, you don't! You don't submit any transactions; I'm actually the one eating the gas fees for you. To make this completely gasless, when you request ETH, it's <i>my</i> address that sends the transaction to the faucet contract, which then sends the ETH to your address.",
    },
    {
      question: "Why only 0.1 ETH?",
      answer:
        "Sepolia is a lot like the Ethereum mainnet; just like you don't need 100 ETH to send transactions on mainnet, 0.1 ETH per day is more than enough for testing on Sepolia.",
    },
    {
      question: "How can I become a member of the BuidlGuidl?",
      answer: `If you're not yet part of the amazing community that is the BuidlGuidl, you should definitely check it out! You need to complete the first three challenges in <a href="https://speedrunethereum.com" class="link">SpeedRunEthereum</a> to become a member. The BuidlGuidl website itself is at <a href="https://buidlguidl.com" class="link">buidlguidl.com</a>.`,
    },
    {
      question: "Can I use this Merkle tree for my own project?",
      answer: `Yes! The Merkle tree is open source and available on GitHub. You can find it at <a href="https://github.com/ByteAtATime/buidlguidl-oracle" class="link">github.com/ByteAtATime/buidlguidl-oracle</a>. The server hosting the complete merkle tree is at <a href="https://buidlers.byteatatime.dev/docs.html" class="link">buidlers.byteatatime.dev</a>. And lastly, the deployed contract on Sepolia is at <a href="https://sepolia.etherscan.io/address/0xd2c53ff6e7820c51113f177387153982df902306" class="link">address <code>0xd2c53f...902306</code></a>.`,
    },
  ];
</script>

<div class="container mt-6 flex max-w-screen-sm flex-col items-center gap-y-2 rounded-3xl bg-base-100 p-8">
  {#each questions as { question, answer }}
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" />
      <div class="collapse-title text-xl font-medium">{question}</div>
      <div class="collapse-content">{@html answer}</div>
    </div>
  {/each}
</div>
