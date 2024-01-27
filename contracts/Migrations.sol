pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address payable public owner;
  uint256 public last_completed_migration;

   modifier restricted() {
    if (msg.sender == owner) _;
  }

  // constructor() public {
  //   owner = msg.sender;
  // }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }

  // function setter(uint256 new_completed_migration) public {
  //   last_completed_migration = new_completed_migration;
  // }

  // function balanceOfContract() public view returns(uint) {
  //   return address(this).balance;
  // }

  // function getter(uint amount) public view returns(value) {
  //   return address(this).value;
  // }
    event ValueChanged(uint oldValue, uint newValue);

    function changeValue() external payable {
        uint oldValue = msg.value;

        // Change the value (for example, double it)
        uint newValue = oldValue * 2;

        // Emit an event to log the change
        emit ValueChanged(oldValue, newValue);
    }

  function sendEther(address payable _to) public payable{
    bool sent = _to.send(msg.value);
    require(sent, "Fail!");
  }
}
