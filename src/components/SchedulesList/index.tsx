"use client";

import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";

const schedules = [
  {
    id: 1,
    name: "Agendamento 1",
    data: "00/00/0000",
    code: "147623tfrg76wqgf1"
  },

  {
    id: 2,
    name: "Agendamento 2",
    data: "00/00/0000",
    code: "19287432rytf8w7sd"
  },

  {
    id: 3,
    name: "Agendamento 3",
    data: "00/00/0000",
    code: "jf7q26g5tr34hf874"
  }
]

export function SchedulesList() {
  return (
    <div className="space-y-6 p-10 rounded-3xl shadow-lg max-w-3xl mx-auto bg-card text-card-foreground">
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Agendamentos</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {schedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardHeader>{schedule.name}</CardHeader>
              <CardContent>00</CardContent>
              <CardFooter>
                <Button className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200">QR code</Button>
                <Button className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200">Editar</Button>
                <Button className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200">Excuir</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
  );
}
