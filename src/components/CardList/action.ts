"use server";

import { api } from "@/app/service/server";
import { cookies } from "next/headers";

export const fetchAliments = async () => {
  const jwt = (await cookies()).get("JWT");
  const response = await api.get(`api/alimentos`, {
    headers: {
      authorization: `Bearer ${jwt!.value}`,
    },
  });
  return response.data;
};