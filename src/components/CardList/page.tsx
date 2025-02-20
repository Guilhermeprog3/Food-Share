import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { fetchAliments } from "./action";
import { redirect } from "next/navigation";

type Aliment = {
  id: string;
  name: string;
  expiration_time: string;
  quantity: string;
};

type CardProps = React.ComponentProps<typeof Card>;

export function CardDemoList({ className, ...props }: CardProps) {
  const [alimentos, setAlimentos] = useState<Aliment[]>([]);

  function handleedit(id: string) {
    redirect(`/editaraliments/${id}`);
  }

  useEffect(() => {
    const getAlimentos = async () => {
      const data = await fetchAliments();
      console.log(data);
      setAlimentos(data);
    };
    getAlimentos();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-8">
      {alimentos.map((alimento) => (
        <Card key={alimento.id} className={cn("w-[400px] h-auto p-6 rounded-lg shadow-xl border border-gray-200", className)} {...props}>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold mb-2">{alimento.name}</CardTitle>
            <CardDescription className="text-center text-sm text-gray-600">
              Quantidade: {alimento.quantity}
            </CardDescription>
            <CardDescription className="text-center text-sm text-gray-600">
              Validade: {alimento.expiration_time}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center mt-4">
            <Button onClick={() => handleedit(alimento.id)} className="bg-primary text-primary-foreground py-2 px-6 rounded-lg mr-4 hover:bg-orange-200" type="button">
              Editar
            </Button>
            <Button className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-500" type="button">
              Excluir
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center mt-4">
            <p className="text-xs text-gray-500">ID: {alimento.id}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
