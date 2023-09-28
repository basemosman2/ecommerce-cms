 import prismaDB from "@/lib/prismaDB";
import { Store } from "lucide-react";
import React from "react";
 
 interface DashboardPageProps{
  params: { storeId: string }
 }


 const DashboardPage:React.FC<DashboardPageProps> = async ({
  params
 }) => {
  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId
    }
  });
  return (
    <div>
      active Store : {store?.name}
    </div>
  );
};

export default DashboardPage;