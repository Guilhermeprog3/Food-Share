"use server";

import { api } from '@/app/service/server';
import { redirect } from 'next/navigation';

export async function handleSubmit(formdata: FormData) {
  const nome = formdata.get("Nome");
  const cnpj = formdata.get("CNPJ");
  const responsavel = formdata.get("Responsavel");
  const email = formdata.get("Email");
  const senha = formdata.get("Senha");

  await api.post('doadores', {
    nome, cnpj, responsavel, email, senha
  });

  return redirect('/');
}
