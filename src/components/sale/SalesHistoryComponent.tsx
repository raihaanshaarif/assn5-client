import React from "react";
import { useGetSellQuery } from "@/redux/features/sell/sellApi";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Sale {
  _id: string;
  buyerName: string;
  itemName: string;
  quantity: number;
  sellDate: string;
  price: number;
}

const SalesHistoryComponent = () => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [timeframe, setTimeframe] = React.useState("monthly");

  const { data } = useGetSellQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    timeframe,
  });

  const sales = data?.data ?? [];
  const totalPages = data?.meta?.totalPage ?? 1;

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page - 1,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales History</h1>
        <Select
          value={timeframe}
          onValueChange={(value) => {
            setTimeframe(value);
            setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Buyer Name</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Sell Date</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.length > 0 ? (
            sales.map((sale: Sale) => (
              <TableRow key={sale._id}>
                <TableCell>{sale.buyerName}</TableCell>
                <TableCell>{sale.itemName}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>
                  {new Date(sale.sellDate).toLocaleDateString()}
                </TableCell>
                <TableCell>৳{sale.price}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No sales found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.pageIndex)}
          disabled={pagination.pageIndex <= 0}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>
        <span className="text-sm font-medium">
          Page {pagination.pageIndex + 1} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.pageIndex + 2)}
          disabled={pagination.pageIndex + 1 >= totalPages}
        >
          <span className="sr-only">Next Page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SalesHistoryComponent;
