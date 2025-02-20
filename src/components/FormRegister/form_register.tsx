"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { handleSubmit } from "./action"; 

const formSchema = z.object({
  Nome: z.string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  CNPJ: z.string()
    .min(14, { message: "O CNPJ deve ter pelo menos 14 caracteres." }),
  Responsavel: z.string()
    .min(2, { message: "O nome do responsável deve ter pelo menos 2 caracteres." }),
  Email: z.string()
    .min(2, { message: "O e-mail deve ter pelo menos 2 caracteres." })
    .email({ message: "Digite um e-mail válido." }),
  Senha: z.string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  ConfirmarSenha: z.string()
    .min(6, { message: "A confirmação de senha deve ter pelo menos 6 caracteres." })
});

function HandleLogin(){
  redirect("/")
}

export function Form_Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Nome: "",
      CNPJ: "",
      Responsavel: "",
      Email: "",
      Senha: "",
      ConfirmarSenha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("Nome", values.Nome);
    formData.append("CNPJ", values.CNPJ);
    formData.append("Responsavel", values.Responsavel);
    formData.append("Email", values.Email);
    formData.append("Senha", values.Senha);

    await handleSubmit(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-20 rounded-3xl shadow-lg max-w-3xl mx-auto bg-card text-card-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">CADASTRO</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="Nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Digite seu nome" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="CNPJ"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Digite seu CNPJ" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Responsavel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsável</FormLabel>
                <FormControl>
                  <Input className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Digite o nome do responsável" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Digite seu e-mail" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Senha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Digite sua senha" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ConfirmarSenha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input type="password" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Confirme sua senha" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full bg-primary text-primary-foreground py-2 rounded-2xl hover:bg-orange-200" type="submit">Cadastrar</Button>

        <div className="flex justify-center items-center mt-4">
          <p className="mr-2">Já tem conta? Entre </p>
          <button onClick={HandleLogin} className="text-blue-500 hover:underline">aqui</button>
        </div>
      </form>
    </Form>
  );
}
