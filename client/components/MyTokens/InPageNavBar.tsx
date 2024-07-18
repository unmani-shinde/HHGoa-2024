
"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";

export function InPageNavbar() {
    const navigation = [
        {optionContent:"Owned",optionURL:'#'},
        {optionContent:"Listed for Investment",optionURL:'#'},
        {optionContent:"Listed for Auction",optionURL:'#'},
        {optionContent:"Investments",optionURL:'#'},
        {optionContent:"Auctions in Progress",optionURL:'#'},

    ]
  return (
    <Navbar className="py-6 mt-16 bg-transparent" fluid rounded style={{ borderBottom: '1px solid #ccc',borderTop: '1px solid #ccc' }}>
  <Navbar.Brand href="https://flowbite-react.com">
    {/* Your brand content */}
  </Navbar.Brand>
  <div className="flex md:order-2">
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse>
    {navigation.map((navOption, index) => (
      <Navbar.Link className="text-md font-semibold" key={index} href={navOption.optionURL}>
        {navOption.optionContent}
      </Navbar.Link>
    ))}
  </Navbar.Collapse>
</Navbar>

  );
}
