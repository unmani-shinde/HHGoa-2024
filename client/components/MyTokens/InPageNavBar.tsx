
"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { GiWallet } from "react-icons/gi";
import { RiAuctionFill,RiStockFill} from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaPeopleRoof } from "react-icons/fa6";
import { ConnectKitButton } from "connectkit";

const navigation = [
    {optionContent:"My Owned Estate Tokens",optionURL:'/my-tokens/my-owned-estate-tokens',optionIcon:<GiWallet/>},
    {optionContent:"My Estate Tokens Listed for Investment",optionURL:'#',optionIcon:<RiStockFill />},
    {optionContent:"My Estate Tokens Listed for Auction",optionURL:'/my-tokens/my-estate-tokens-listed-for-auction',optionIcon:<RiAuctionFill />},
    {optionContent:"Estate Investments in Progress",optionURL:'#',optionIcon:<BsGraphUpArrow />},
    {optionContent:"Estate Auctions in Progress",optionURL:'#',optionIcon:<FaPeopleRoof />},

]

export function InPageNavbar() {
  return (
    <>
<div className="px-1 mt-8 fixed ">
<ConnectKitButton/>

</div>
    

    
<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-32 fixed ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="default-sidebar" className="fixed border-r-2 border-gray-900 top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div  style={{overflowY:'hidden'}}className="h-full px-3 py-4 overflow-y-auto bg-transparent dark:bg-gray-800">
      <ul className="mt-36 space-y-2 font-medium">
        {navigation.map((item,index)=>{
            return(

                <li key={index} className="p-3">
                    <a href={item.optionURL} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-pink-700 hover:font-semibold hover:text-white dark:hover:bg-gray-700 group">
                    <span className="mr-1"style={{transform:"scale(1.5)"}}>{item.optionIcon}</span>
                    <span className="ms-3 text-md ">{item.optionContent}</span>
                    </a>
                </li>   

            )
        })}
            
         
      </ul>
   </div>
</aside>  
    
    </>
    // <Sidebar classNameName="min-h-screen" aria-label="Default sidebar example">
    //   <Sidebar.Items>
    //     <Sidebar.ItemGroup>
    //         {navigation.map((item,index)=>{
    //             return(
    //                 <Sidebar.Item key={index} href={item.optionURL} icon={HiChartPie}>
    //         {item.optionContent}
    //       </Sidebar.Item>
    //             )
    //         })
    //       }
          
    //     </Sidebar.ItemGroup>
    //   </Sidebar.Items>
    // </Sidebar>
  );
}

