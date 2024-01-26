pragma solidity >=0.4.22 <0.7.0;

contract Migrations {
  address public owner;
  uint256 public last_completed_migration;

   modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }

  function getter() public view returns(uint256) {
    return last_completed_migration;
  }

  function setter(uint256 new_completed_migration) public {
    last_completed_migration = new_completed_migration;
  }

  function balanceOfContract() public view returns(uint) {
    return address(this).balance;
  }
}
