"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Calendar } from "@/components/ui/calendar";
import { fetchReserva, CancelReserva, updateReserva } from "./action";

interface Schedule {
  id: string;
  title:string;
  pickup_date: string;
  token: string;
  food: {
    name: string;
  };
  food_quantity: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeValue: string;
}

function Modal({ isOpen, onClose, qrCodeValue }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-6 text-center">Confirmar Retirada</h2>
        <div className="flex justify-center mb-6">
          <QRCodeSVG value={qrCodeValue} size={200} />
        </div>
        <Button
          onClick={onClose}
          className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-primary-dark transition-all duration-200"
        >
          Fechar
        </Button>
      </div>
    </div>
  );
}

interface PostponeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  initialDate?: Date;
}

function PostponeModal({ isOpen, onClose, onSelectDate, initialDate }: PostponeModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedDate) {
      onSelectDate(selectedDate);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-6 text-center">Selecionar Nova Data</h2>
        <div className="flex justify-center mb-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex gap-4">
          <Button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 rounded-2xl hover:bg-gray-600 transition-all duration-200"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-primary-dark transition-all duration-200"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SchedulesList() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPostponeModalOpen, setIsPostponeModalOpen] = useState<boolean>(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState<Date | null>(null);

  useEffect(() => {
    const loadReservations = async () => {
      const data = await fetchReserva();
      setSchedules(data);
    };

    loadReservations();
  }, []);

  const handleOpenModal = (id: string) => {
    setSelectedScheduleId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScheduleId(null);
  };

  const handleOpenPostponeModal = (id: string, pickup_date: string) => {
    setSelectedScheduleId(id);
    setSelectedScheduleDate(new Date(pickup_date));
    setIsPostponeModalOpen(true);
  };

  const handleClosePostponeModal = () => {
    setIsPostponeModalOpen(false);
    setSelectedScheduleId(null);
    setSelectedScheduleDate(null);
  };

  const handleSelectDate = async (date: Date) => {
    if (selectedScheduleId) {
      await updateReserva(selectedScheduleId, date);
      const updatedSchedules = schedules.map((schedule) =>
        schedule.id === selectedScheduleId
          ? { ...schedule, pickup_date: date.toISOString() }
          : schedule
      );
      setSchedules(updatedSchedules);
    }
  };

  const handleCancelReservation = async (id: string) => {
    await CancelReserva(id);
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <div className="space-y-8 p-10 rounded-3xl shadow-lg max-w-4xl mx-auto bg-card text-gray-800">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Reservas</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {schedules.map((schedule) => (
          <Card
            key={schedule.id}
            className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="p-4 bg-gray-200 text-gray-800 rounded-t-xl">
            <h3 className="text-lg font-semibold">{schedule.title}</h3>
              <p className="text-sm mt-2">Data de retirada: {new Date(schedule.pickup_date).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{schedule.food.name}</h3>
                <p className="text-sm text-gray-600 mb-4">Quantidade: {schedule.food_quantity}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 space-x-4">
              <Button
                onClick={() => handleOpenModal(schedule.id)}
                className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200"
              >
                QR code
              </Button>
              <Button
                onClick={() => handleOpenPostponeModal(schedule.id, schedule.pickup_date)}
                className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200"
              >
                Adiar
              </Button>
              <Button
                onClick={() => handleCancelReservation(schedule.id)}
                className="w-full bg-primary text-primary-foreground py-2 rounded-2xl"
              >
                Cancelar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <p className="text-xs text-gray-500">Reservas Agendadas</p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        qrCodeValue={
          selectedScheduleId
            ? schedules.find((schedule) => schedule.id === selectedScheduleId)?.token || ""
            : ""
        }
      />

      <PostponeModal
        isOpen={isPostponeModalOpen}
        onClose={handleClosePostponeModal}
        onSelectDate={handleSelectDate}
        initialDate={selectedScheduleDate || undefined}
      />
    </div>
  );
}
