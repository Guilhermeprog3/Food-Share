"use server"
import { api } from "@/app/service/server";
import { cookies } from "next/headers";


const Get_UserById = async () => {
    const jwtCookie = (await cookies()).get("JWT");
  
    if (!jwtCookie) {
      console.error("Token não encontrado.");
      return null;
    }
  
    try {

        const userId = "5198b95f-0807-4cad-ad7e-d6973f016088";
  
      if (!userId) {
        console.error("ID do usuário não encontrado no token.");
        return null;
      }
  
      const response = await api.get(`api/doadores/${userId}`, {
        headers: { authorization: `Bearer ${jwtCookie.value}` },
      });
  
      return response.data;
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      return null;
    }
  };

  export default Get_UserById;