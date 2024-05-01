//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface BuidlGuidlOracle {
	function isMember(
		bytes32[] memory _proof,
		address _member
	) external view returns (bool);
}

contract BuidlGuidlFaucet is Ownable {
	BuidlGuidlOracle public constant BUIDLGUIDL_ORACLE =
		BuidlGuidlOracle(0xEC3aEf6c2b8B394eEd0E9D92286E716C6CCE5B81);
	uint256 public claimAmount = 0.1 ether;
	uint256 public claimPeriod = 1 days;

	mapping(address => uint256) public nextClaimTime;

	event Withdrawal(address indexed to, uint256 amount);
  event Deposit(address indexed from, uint256 amount);

	function withdraw(bytes32[] memory _proof, address _to) external {
		require(
			address(this).balance >= claimAmount,
			"Not enough balance in the faucet!"
		);
		require(
			block.timestamp >= nextClaimTime[_to],
			"Please wait a little bit before withdrawing again!"
		);

		require(BUIDLGUIDL_ORACLE.isMember(_proof, _to), "You have to be a member of the BuidlGuidl!");

		nextClaimTime[_to] = block.timestamp + claimPeriod;

		payable(_to).transfer(claimAmount);
		emit Withdrawal(_to, claimAmount);
	}

  receive() external payable {
    emit Deposit(msg.sender, msg.value);
  }
}
