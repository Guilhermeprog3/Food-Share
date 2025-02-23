import { notFound } from "next/navigation";
import { api } from "@/app/service/server";
import { cookies } from "next/headers";
import { FormEdit } from "./form_edit";

type Alimento = {
  name: string;
  expiration_time: Date;
  quantity: number;
};

const fetchAlimentById_edit = async (id: string): Promise<Alimento | null> => {
  const jwt = (await cookies()).get("JWT");
  try {
    const response = await api.get(`/api/alimentos/${id}`, {
      headers: { authorization: `Bearer ${jwt!.value}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Alimento:", error);
    return null;
  }
};

async function AlimentServer_edit({ params }: { params: { id: string } }) {
  const Alimento = await fetchAlimentById_edit(params.id);
  if (!Alimento) return notFound();
  return <FormEdit Alimento={Alimento} />;
}

export default AlimentServer_edit;
