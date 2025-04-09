"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useCreateItemMutation } from "@/redux/features/items/itemApi";
import { useGetSingleAdminQuery } from "@/redux/features/admin/adminApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";

// Use the `as const` assertion to create a tuple type
const conditionEnum = ["New", "Old"] as const;

const categoryEnum = [
  "CPU",
  "Motherboard",
  "Ram",
  "SSD",
  "HDD",
  "Casing",
  "Keyboard",
  "Mouse",
  "Monitor",
  "Graphics Card",
  "Power Supply",
] as const;

// const itemFormSchema = z.object({
//   name: z.string().min(1, "Item name is required"),
//   category: z.enum(categoryEnum, {
//     errorMap: () => ({ message: "Invalid category selected" }),
//   }),
//   brand: z.string().min(1, "Brand is required"),
//   compability: z.string().min(1, "Compatibility is required"),
//   price: z.string().min(0, "Price must be greater than or equal to 0"),
//   interfacez: z.string().optional(),
//   condition: z.enum(conditionEnum, {
//     errorMap: () => ({ message: "Condition must be either 'New' or 'Old'" }),
//   }),
//   capacity: z.string().optional(),
//   quantity: z.string().min(1, "Quantity must be at least 1"),
//   createdBy: z.string().min(1, "Created by field is required"),
// });

export default function CreateItemForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      category: undefined,
      brand: "",
      compability: "",
      price: "",
      interfacez: "",
      condition: undefined,
      capacity: "",
      quantity: "",
    },
  });
  const [createItem] = useCreateItemMutation();
  const currentUser = useSelector(selectCurrentUser);

  const currentUserId = currentUser?.userId;

  const getSingleAdmin = useGetSingleAdminQuery(currentUserId);
  const finalUser = getSingleAdmin.data?.data?.[0]?.user;

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // const toastId = toast.loading('Creating...');

    const createItemData = {
      name: values.name,
      category: values.category,
      brand: values.brand,
      compability: values.compability,
      price: parseInt(values.price),
      interfacez: values.interfacez,
      condition: values.condition,
      capacity: values.capacity,
      quantity: parseInt(values.quantity),
      createdBy: finalUser,
    };

    try {
      const result = await createItem(createItemData);
      console.log(result);
      if ("error" in result) {
        const errorMessage =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (result.error as any)?.data?.message || "Failed to create admin";
        toast.error(errorMessage);
      } else {
        toast.success("Admin created successfully");
        // ✅ Reset the form after successful submission
        form.reset();
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="w-vw">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-4xl mx-auto py-10"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter product name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select {...field}>
                    {categoryEnum.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter brand name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="compability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compability</FormLabel>
                    <FormControl>
                      <Input placeholder="eg win 10" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter item price"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="interfacez"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interface</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter interface"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <select {...field}>
                        {conditionEnum.map((condition) => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter capacity"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter quantity"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
