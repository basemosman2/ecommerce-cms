"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { DataTable } from "./ui/data-table";
import { Heading } from "./ui/heading";
import { Separator } from "./ui/separator";
import { ApiAlert } from "./ui/api-alert";

import { columns, columnTypes  } from "./columns";
import { ApiList } from "./ui/api-list";

interface ClientProps {
  data: columnTypes[];
}

export const Client: React.FC<ClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};