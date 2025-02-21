"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { redirect } from "next/navigation"
import { DayPicker } from "react-day-picker"
import { useState } from "react"

const formSchema = z.object({
  name: z.string()
    .min(1, { message: "O campo não pode estar vazio." }),
  quantity: z.number()
    .min(1, { message: "O campo não pode estar vazio." }),
  expirationtime: z.date()
})

const onSubmit = () => {
  alert("Coma pintos")
  console.log("penis")
}

function onCancel() {
  redirect("/listfood");
}

export function Form_CreateAliments() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 0,
    },
    
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    form.setValue("expirationtime", date);  // Atualizando o valor no form
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-20 rounded-3xl shadow-lg max-w-3xl mx-auto bg-card text-card-foreground">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Cadastrar Alimento</h2>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h2>Nome</h2>
          <input
            {...form.register("name")}
            type="text"
            placeholder="Nome"
            className="w-full p-2 border bg-transparent border-gray-300 rounded-lg placeholder:font-bold"
          />
        </div>

        <div>
          <h2>Quantidade</h2>
          <input
            {...form.register("quantity", { valueAsNumber: true })}
            type="number"
            placeholder="0"
            className="w-full p-2 border bg-transparent border-gray-300 rounded-lg placeholder:font-bold"
          />
        </div>

        <div>
          <h2>Data de Validade</h2>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full p-2 border bg-transparent border-gray-300 rounded-lg placeholder:font-bold flex items-center justify-between"
              >
                {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Selecione a data"}
                <CalendarIcon className="w-5 h-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <DayPicker selected={selectedDate} onDayClick={handleDateChange} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
<div className="flex gap-5">
      <button
        className="w-full bg-destructive text-primary-foreground py-2 rounded-2xl hover:bg-red-900"
        type="button"
        onClick={onCancel}
      >
        Cancelar
      </button>
      <button
        className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200"
        type="submit"
      >
        Entrar
      </button>

</div>
    </form>
  )
}
