"use server";

import { api } from "@/app/service/server";
import { cookies } from "next/headers";

const fetchDoações = async () => {
  const jwt = (await cookies()).get("JWT");
  const response = await api.get(`api/reservas/entregues`, {
    headers: {
      authorization: `Bearer ${jwt!.value}`,
    },
  });
  console.log(response.data);
  return response.data;
};

const getalimentforid = async (id: string) => {
  console.log("Chamando getalimentforid");
  const jwt = (await cookies()).get("JWT");
  const response = await api.get(`api/alimentos/${id}`, {
    headers: {
      authorization: `Bearer ${jwt!.value}`,
    },
  });
  console.log("Resposta recebida para getalimentforid");
  console.log(response.data);
  return response.data.name;
};

export { fetchDoações, getalimentforid };
