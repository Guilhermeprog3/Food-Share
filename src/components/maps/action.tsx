"use server";

import { api } from "@/app/service/server";
import { cookies } from "next/headers";

type UserUpdate = {
  latitude: number;
  longitude: number;
};

const Update_User = async (data: UserUpdate) => {
  const jwtCookie = (await cookies()).get("JWT");

  if (!jwtCookie) {
    console.error("Token não encontrado.");
    return null;
  }

  try {
    const userId = "5198b95f-0807-4cad-ad7e-d6973f016088";

    const response = await api.patch(`api/doadores/${userId}`, data, {
      headers: { authorization: `Bearer ${jwtCookie.value}` },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return null;
  }
};

export default Update_User;
