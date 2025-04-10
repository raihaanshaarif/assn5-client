import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetItemQuery } from "@/redux/features/items/itemApi";

type ItemType = {
  _id: string;
  name: string;
  category: string;
  brand: string;
  compability: string;
  price: number;
  interfacez: string;
  condition: string;
  capacity: string;
  quantity: number;
  status?: string;
  itemStatus?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

const AllItemComponent = () => {
  const { data, isLoading, error } = useGetItemQuery({});

  if (isLoading) {
    return <p>Loading Items...</p>;
  }

  if (error) {
    return <p>Error fetching items: Fetch Error</p>;
  }

  const items: ItemType[] = data?.data;
  console.log(items); // logging outside of JSX

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items?.map((item) => (
        <Card className="w-[350px]" key={item._id}>
          <CardHeader>
            <CardTitle>
              {item.name}
              <Button variant={"outline"} className="h-3.5 ml-2">
                {item.condition}
              </Button>
            </CardTitle>
            <CardDescription>
              <p>
                brand: {item.brand} | category: {item.category}{" "}
                <Button variant={"outline"} className="h-3.5 ml-2">
                  {item.condition}
                </Button>
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Price: ${item.price}</p>
            <p>Capacity: {item.capacity}</p>
            <p>Quantity: {item.quantity}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AllItemComponent;
