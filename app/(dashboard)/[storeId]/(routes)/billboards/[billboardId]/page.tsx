import prismaDB from "@/lib/prismaDB";

import { BillboardForm } from "./components/billboards-from";

const BillboardPage = async ({
  params
}: {
  params: { billboardId: string }
}) => {
  const billboard = await prismaDB.billboard.findUnique({
    where: {
      id: params.billboardId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}

export default BillboardPage;