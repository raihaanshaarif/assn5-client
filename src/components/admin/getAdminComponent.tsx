/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAdminQuery } from "@/redux/features/admin/adminApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { TUser } from "@/types/global";

const GetAdminComponent = () => {
  // Passing an empty object as argument
  const { data: admins, error, isLoading } = useGetAdminQuery({});

  if (isLoading) {
    return <p>Loading admins...</p>;
  }

  if (error) {
    return <p>Error fetching admins: Fetch Error</p>;
  }
  const { data } = admins;
  console.log(data);

  return (
    <Table>
      <TableCaption>A list of your Admin list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-right">Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((admin: any) => (
          <TableRow key={admin._id}>
            <TableCell className="font-medium">{admin.fullName}</TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>{admin.contactNo}</TableCell>
            <TableCell className="text-right">{admin.gender}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default GetAdminComponent;
