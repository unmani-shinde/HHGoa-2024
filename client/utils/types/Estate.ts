export type Estate = {
    estateID: number;
    estateOwner: string;
    estateEvaluation: number;
    estateMetadata: string;
  };
  
export interface EstateProps {
    estate: Estate; // Make the estate prop optional if it might be undefined
  }

export interface MyTokensPageLayoutProps {
    children: React.ReactNode;
  }
  