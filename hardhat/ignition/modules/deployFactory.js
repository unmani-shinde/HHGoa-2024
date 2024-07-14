const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("FactoryModule", (m) => {
  const initialOwner = "0x6c03F36B57Ad95aeAC06ad1dD100da00d4936aF5";
  const factory = m.contract("EstateFactory", [initialOwner], {
  });
  return { factory };
});
