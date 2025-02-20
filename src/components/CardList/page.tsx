import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { useEffect, useState } from "react";
import { fetchAliments } from "./action";
import { redirect } from "next/navigation";

type Aliment = {
  id: string;
  name: string;
  expiration_time: string;
  quantity: string;
};

type CardProps = React.ComponentProps<typeof Card>


export function CardDemoList({ className, ...props }: CardProps) {
  const [alimentos, setAlimentos] = useState<Aliment[]>([]);

  function handleedit(id:string){
    redirect(`/editaraliments/${id}`)
   }

  useEffect(() => {
    const getAlimentos = async () => {
      const data = await fetchAliments();
      console.log(data)
      setAlimentos(data);
    };
    getAlimentos();
  }, []);

  return (
    <div>
      {alimentos.map((alimento) => (
        <div key={alimento.id}>
          <Card className={cn("w-[400px] h-[220px]", className)} {...props}>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold mb-4">{alimento.name}</CardTitle>
              <CardDescription className="text-xs">{alimento.quantity}</CardDescription>
              <CardDescription className="text-xs">{alimento.expiration_time}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-center items-center space-x-4 rounded-md p-2">
                <Button onClick={() => handleedit(alimento.id)} className="bg-primary w-40 text-primary-foreground py-2 rounded-2xl hover:bg-orange-200" type="submit">
                  Editar
                </Button>
                <Button className="bg-primary w-40 text-primary-foreground py-2 rounded-2xl hover:bg-orange-200" type="submit">
                  Excluir
                </Button>
              </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
