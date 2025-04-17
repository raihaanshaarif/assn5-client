import { useGetItemQuery } from "@/redux/features/items/itemApi";
import { useCreateSellMutation } from "@/redux/features/sell/sellApi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

import {
  Package,
  Cpu,
  Tag,
  Layers,
  Boxes,
  RefreshCcw,
  Monitor,
  DollarSign,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Item } from "../item/AllItemListComponent";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { DebounceInput } from "react-debounce-input"; // Install this package if not already installed
// import { Pagination } from "../ui/pagination";

interface LocalPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const LocalPagination: React.FC<LocalPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous Page</span>
      </Button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        <span className="sr-only">Next Page</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const CreateSaleComponent = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 12,
  });
  const [searchTerm, setSearchTerm] = React.useState(""); // State for search term
  const [createSell] = useCreateSellMutation();

  const { data } = useGetItemQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    searchTerm, // Pass search term to the API
  });
  // console.log(data);
  const items = data?.data ?? [];

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [sellItem, setSellItem] = React.useState({
    buyerName: "",
    quantity: 0,
    sellDate: "",
    createdBy: currentUser?.id,
  });

  const handleSubmit = (item: Item) => {
    console.log(item);
    setSelectedItem(item);
    setSellItem((prev) => ({
      ...prev,
      itemId: item._id,
    }));
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    console.log(sellItem);
    if (sellItem) {
      try {
        await createSell(sellItem).unwrap();
        toast.success("Item Sold Successfully");
        setIsModalOpen(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(`Failed to update item. ${errorMessage}`);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page - 1,
    }));
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          className="border border-gray-300 rounded-md p-2 w-full max-w-md"
          placeholder="Search items..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 grid-cols-3">
        {items?.map((item: Item) => (
          <Card
            key={item._id}
            className="w-full max-w-xl mx-auto shadow-xl rounded-2xl border border-muted bg-background/60 backdrop-blur "
          >
            <div className="  ">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 pb-5">
                  <Package className="h-5 w-5 text-primary" />
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6 text-sm px-4">
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Cpu className="h-4 w-4" /> Category
                  </Label>
                  <div className="font-medium">{item.category}</div>
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="h-4 w-4" /> Brand
                  </Label>
                  <div className="font-medium">{item.brand}</div>
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Monitor className="h-4 w-4" /> Compatibility
                  </Label>
                  <div className="font-medium">{item.compability}</div>
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Layers className="h-4 w-4" /> Interface
                  </Label>
                  <div className="font-medium">{item.interfacez}</div>
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <RefreshCcw className="h-4 w-4" /> Condition
                  </Label>
                  <Badge variant="outline">{item.condition}</Badge>
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Boxes className="h-4 w-4" /> Capacity
                  </Label>
                  <div className="font-medium">{item.capacity}</div>
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" /> Price
                  </Label>
                  <div className="font-semibold text-green-600">
                    ৳{item.price}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <Boxes className="h-4 w-4" /> Available Stock
                  </Label>
                  <div className="font-medium">{item.quantity} pcs</div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col ">
                <Separator className="my-4" />
                <Button onClick={() => handleSubmit(item)} className="w-full">
                  {" "}
                  Sale
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <LocalPagination
          currentPage={pagination.pageIndex + 1}
          totalPages={data?.meta?.totalPage ?? 1}
          onPageChange={handlePageChange}
        />
      </div>

      {isModalOpen && selectedItem && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sell Item</DialogTitle>
              <DialogDescription>
                <div className="space-y-4">
                  <div>
                    <strong>Name:</strong> {selectedItem.name}
                  </div>

                  <div>
                    <label htmlFor="buyerName">Name of Buyer</label>
                    <Input
                      id="buyerName"
                      onChange={(e) =>
                        setSellItem((prev) => ({
                          ...prev!,
                          buyerName: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="price">Quantity</label>
                    <Input
                      id="quantity"
                      type="number"
                      onChange={(e) =>
                        setSellItem((prev) => ({
                          ...prev!,
                          quantity: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="saleDate">Sell Date:</label>
                    <Input
                      id="sellDate"
                      type="date"
                      onChange={(e) =>
                        setSellItem((prev) => ({
                          ...prev!,
                          sellDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {/* Add other fields as necessary */}
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)} // Close the modal without saving
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  handleSave();
                  setIsModalOpen(false); // Close the modal after saving
                }}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CreateSaleComponent;
