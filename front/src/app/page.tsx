import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ClipboardPlus, FolderKanban } from "lucide-react";
import  CardErrorTable  from "./_components/cardErrorData";
import { Separator } from "@/components/ui/separator";
import { ErroAddForm } from "./_components/addErrorForm";

export default function Landing() {
  return (
    <div className="p-1">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all"><FolderKanban className="size-4 mr-1" /> Visualizar Todas</TabsTrigger>
            <TabsTrigger value="add"><ClipboardPlus className="size-4 mr-1" />  Adicionar</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <Separator className="mt-5" />
          < div className="max-h-[700px] overflow-y-auto pt-5" >
            <CardErrorTable />
          </div>
        </TabsContent>
        <TabsContent value="add">
            <ErroAddForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
