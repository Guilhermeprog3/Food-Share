"use server";

import { api } from '@/app/service/server';
import { promises } from 'dns';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Alimentos={
  name:string;
  quantity:number;
  expiration_time:Date
}

type Props={
  Alimentos:FormData;
}

export async function handleSubmit(formdata: FormData):Promise<Alimentos> {
  const token = (await cookies()).get("JWT")?.value;

  console.log(token);

  const name = formdata.get("Nome");
  const quantity = formdata.get("Quantidade");
  const expiration_time = formdata.get("Data-Validade");

  
  console.log(name)
  console.log(quantity)
  console.log(expiration_time)


  const response=await api.post('api/alimentos', {
    name, 
    quantity, 
    expiration_time
  }, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
console.log(response)
  return redirect('/');
}
