"use client";

import { Card, CardHeader, CardTitle, CardFooter, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { deleteReservation, fetchReservations } from "./action";
import { useEffect, useState } from "react";


type reservations = {
  id: string;
  vulnerable_id: string;
  food_id: string;
  token_id: string;
  status: string;
  pickup_date: string;
};

export function SchedulesList() {
  const [reservations, setReservations] = useState<reservations[]>([]);

  const loadData = async () => {
    const data = await fetchReservations();
    setReservations(data);
  };
  const handleQrcode = async (id: string) => {
    redirect(`/qrcode/${id}`);
  };
  const handleEdit = async (id: string) => {
    redirect(`/editreservation/${id}`);
  };
  const handleDelete = async (id: string) => {
    await deleteReservation(id);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6 p-10 rounded-3xl shadow-lg max-w-3xl mx-auto bg-card text-card-foreground">
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Agendamentos</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {reservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">Agendamentos {reservation.id}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">Data: {reservation.pickup_date}</CardContent>
              <CardFooter>
                <Button className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200" onClick={() => handleQrcode(reservation.id)}>QR code</Button>
                <Button className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200" onClick={() => handleEdit(reservation.id)}>Editar</Button>
                <Button className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200" onClick={() => handleDelete(reservation.id)}>Excluir</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
  );
}
