const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("FactoryModule", (m:any) => {
  const factory = m.contract("EstateFactory", [], {
  });
  return { factory };
});