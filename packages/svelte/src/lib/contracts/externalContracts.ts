import type { GenericContract, GenericContractsDeclaration } from "$lib/utils/scaffold-eth/contract";

const buidlGuidlOracle = {
  address: "0xec3aef6c2b8b394eed0e9d92286e716c6cce5b81",
  // all the functions we need for this app
  abi: [
    {
      inputs: [
        { internalType: "bytes32[]", name: "_proof", type: "bytes32[]" },
        { internalType: "address", name: "_member", type: "address" },
      ],
      name: "isMember",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "root",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
  ],
} satisfies GenericContract;

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const externalContracts = {
  11155111: {
    BuidlGuidlOracle: buidlGuidlOracle,
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
