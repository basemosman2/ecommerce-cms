import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";




import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

// store model for let user create new store 

export const StoreModal = () => {
  const [loading, setLoading] = useState(false)
  const storeModal = useStoreModal();

  // form validation using zod 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // submit the form data to backend route to create new store in database 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      setLoading(true);
      const { data } = await axios.post('/api/stores', values);
      window.location.assign(`/${data.id}`);
    }catch(error){
      toast.error("something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to mange products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className=" space-y-4 py-2 pb-4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="E-Commerce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
