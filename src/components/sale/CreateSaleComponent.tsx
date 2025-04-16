// import { useGetItemQuery } from "@/redux/features/items/itemApi";
// import { useCreateSellMutation } from "@/redux/features/sell/sellApi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";



import { Package, Cpu, Tag, Layers, Boxes, RefreshCcw, Monitor, DollarSign } from "lucide-react"
import { Button } from "../ui/button";



const CreateSaleComponent = () => {

//    const [createSell] = useCreateSellMutation()

//    const {data} = useGetItemQuery({})
//    console.log(data);







    return (
        <div>
<Card className="w-full max-w-xl mx-auto shadow-xl rounded-2xl border border-muted bg-background/60 backdrop-blur ">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Corsair Vengeance 9
        </CardTitle>
        <CardDescription>Detailed view of the selected computer item.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-6 text-sm ">
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="h-4 w-4" /> Category
          </Label>
          <div className="font-medium">Ram</div>
        </div>
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-4 w-4" /> Brand
          </Label>
          <div className="font-medium">Microsoft</div>
        </div>
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Monitor className="h-4 w-4" /> Compatibility
          </Label>
          <div className="font-medium">Win 10</div>
        </div>
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Layers className="h-4 w-4" /> Interface
          </Label>
          <div className="font-medium">Windows</div>
        </div>
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <RefreshCcw className="h-4 w-4" /> Condition
          </Label>
          <Badge variant="outline">Old</Badge>
        </div>
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Boxes className="h-4 w-4" /> Capacity
          </Label>
          <div className="font-medium">512</div>
        </div>
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" /> Price
          </Label>
          <div className="font-semibold text-green-600">৳10,000</div>
        </div>
        <div className="space-y-1">
          <Label className="flex items-center gap-2 text-muted-foreground">
            <Boxes className="h-4 w-4" /> Available Stock
          </Label>
          <div className="font-medium">100 pcs</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" > Sale</Button>
      </CardFooter>
    </Card>

        </div>
    );
};

export default CreateSaleComponent;