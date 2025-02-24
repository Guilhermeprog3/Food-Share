"use server";

import { api } from "@/app/service/server";
import { cookies } from "next/headers";

const fetchReservations = async () => {
  const jwt = (await cookies()).get("JWT");
  const response = await api.get(`api/reservations`, {
    headers: {
      authorization: `Bearer ${jwt!.value}`,
    },
  });
  return response.data;
};

const deleteReservation = async (id: string) => {
  const jwt = (await cookies()).get("JWT");
  if (!jwt) {
    console.error("JWT não encontrado");
    return null;
  }

  try {
    const response = await api.delete(`/api/reservations/${id}`, {
      headers: { authorization: `Bearer ${jwt.value}` },
    });

    if (response.status === 200) {
      console.log("Reserva deletada com sucesso");
    } else {
      console.error("Erro ao deletar reserva:");
    }

    return response.status;
  } catch (error) {
    console.error("Erro ao deletar reserva:", error);
    return null;
  }
};

export { deleteReservation, fetchReservations };