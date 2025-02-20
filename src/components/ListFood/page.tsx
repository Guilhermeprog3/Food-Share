import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CardDemoList } from "../CardList/page"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { redirect } from "next/navigation"


type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }: CardProps) {

  function handlecreate(){
    redirect('/aliments_create')
   }
   
  return (
    <div className="flex justify-center rounded-3xl">
      <Card className={cn("w-[1000px]", className)} {...props}>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold mb-4">LISTA DE ALIMENTOS</CardTitle>
          <Button className="bg-primary w-44 text-primary-foreground rounded-2xl hover:bg-orange-200" onClick={handlecreate}>Cadastrar</Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md p-4">
              <CardDemoList/>
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  )
}
