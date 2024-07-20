export type Estate = {
    estateID: number;
    estateOwner: string;
    estateEvaluation: number;
    estateMetadata: string;
    isListedForAuction:boolean,
    isListedForInvestment:boolean
  };
  
export interface EstateProps {
    estate: Estate; // Make the estate prop optional if it might be undefined
    isauctionMarketplace: boolean;
    ismyAuctionTokens:boolean;
    ismyInvestmentTokens:boolean;
    isInvestmentMarketplace:boolean;
  }

export interface EstateActionProps {
  estateID: number; // Make the estate prop optional if it might be undefined
}

export interface EstateBidActionProps {
  estateID: number; // Make the estate prop optional if it might be undefined
  bid:string;
}

export interface MyTokensPageLayoutProps {
    children: React.ReactNode;
  }
  