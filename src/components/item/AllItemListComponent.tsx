"use client"

import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export type Item = {
  _id: string
  id: string
  name: string
  category: string
  brand: string
  compability: string
  price: number
  interfacez: string
  condition: string
  capacity: string
  quantity: number
  createdBy: string
}

import { ColumnDef } from "@tanstack/react-table"
import { useGetItemQuery, useUpdateItemMutation } from "@/redux/features/items/itemApi"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "sonner"

const AllItemListComponent = () => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch items with pagination params
  const { data, isLoading, error } = useGetItemQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });
  const [updateItem] = useUpdateItemMutation();

  const items = data?.data ?? [];
  const totalPages = data?.meta?.totalPage ?? 1;

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null)

  // Define handleView, handleCloseModal, handleEdit, handleDelete inside the component
  const handleView = (item: Item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const handleEdit = (item: Item) => {
    setSelectedItem(item)
    setIsEditModalOpen(true)
  }

  const handleDelete = (item: Item) => {
    const confirm = window.confirm(`Are you sure you want to delete "${item.name}"?`)
    if (confirm) {
      console.log("Deleting item:", item)
      // Call delete API or dispatch Redux action here
    }
  }

  // Edit item save to send it to api 🌄 
  const handleSave = async () => {
    if (selectedItem) {
      try {
        console.log("Saving edited item:", selectedItem);
        // Pass the id and data to the updateItem mutation
        await updateItem({ id: selectedItem._id, data: selectedItem }).unwrap();
        toast.success("Item updated successfully!")
        // Optionally, you can refetch the item list or update the local state here
        setIsEditModalOpen(false); // Close the modal after saving
       
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(`Failed to update item. ${errorMessage}`);
        
      }
    }
  };

  const columns: ColumnDef<Item>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <div>{row.getValue("brand")}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"))
        return <div>${price.toFixed(2)}</div>
      },
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original

        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleView(item)}>
              View
            </Button>
            <Button size="sm" variant="secondary" onClick={() => handleEdit(item)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleDelete(item)}>
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: items,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true, // Server-side pagination
    pageCount: totalPages,
  })

  if (isLoading) return <p>Loading items...</p>
  if (error) return <p>Failed to load data.</p>

  return (
    <div className="w-full">
      {/* Filter */}
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        {/* Column Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center space-x-2 py-4">
        <span>
          Page {pagination.pageIndex + 1} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPagination((prev) => ({
            ...prev,
            pageIndex: Math.max(prev.pageIndex - 1, 0),
          }))}
          disabled={pagination.pageIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPagination((prev) => ({
            ...prev,
            pageIndex: Math.min(prev.pageIndex + 1, totalPages - 1),
          }))}
          disabled={pagination.pageIndex + 1 >= totalPages}
        >
          Next
        </Button>
      </div>

      {/* View Modal */}
      {isModalOpen && selectedItem && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Item Details</DialogTitle>
              <DialogDescription>
                <div className="space-y-4">
                  <div>
                    <strong>Name:</strong> {selectedItem.name}
                  </div>
                  <div>
                    <strong>Category:</strong> {selectedItem.category}
                  </div>
                  <div>
                    <strong>Brand:</strong> {selectedItem.brand}
                  </div>
                  <div>
                    <strong>Price:</strong> ${selectedItem.price.toFixed(2)}
                  </div>
                  <div>
                    <strong>Quantity:</strong> {selectedItem.quantity}
                  </div>
                  <div>
                    <strong>Created By:</strong> {selectedItem.createdBy}
                  </div>
                  {/* Add more fields as needed */}
                </div>
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedItem && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
              <DialogDescription>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name">Name:</label>
                    <Input
                      id="name"
                      value={selectedItem.name}
                      onChange={(e) =>
                        setSelectedItem((prev) => ({
                          ...prev!,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="category">Category:</label>
                    <Input
                      id="category"
                      value={selectedItem.category}
                      onChange={(e) =>
                        setSelectedItem((prev) => ({
                          ...prev!,
                          category: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="price">Price:</label>
                    <Input
                      id="price"
                      type="number"
                      value={selectedItem.price}
                      onChange={(e) =>
                        setSelectedItem((prev) => ({
                          ...prev!,
                          price: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <Input
                      id="quantity"
                      type="number"
                      value={selectedItem.quantity}
                      onChange={(e) =>
                        setSelectedItem((prev) => ({
                          ...prev!,
                          quantity: parseInt(e.target.value, 10),
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
                onClick={() => setIsEditModalOpen(false)} // Close the modal without saving
              >
                Cancel
              </Button>

              <Button 
                onClick={() => {
                  handleSave()
                    setIsEditModalOpen(false) // Close the modal after saving
                }} >
                Save
              </Button>
              
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default AllItemListComponent
