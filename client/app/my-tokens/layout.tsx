'use client'
import MyTokensPage from "./page";
import { MyTokensPageLayoutProps } from "@/utils/types/Estate";
export default function MyTokensPageLayout({ children }: MyTokensPageLayoutProps) {
    
   
    return (
    <>
      <MyTokensPage/>
      {children}
      </>
    );
  }