"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { CopyPlus, Info, LoaderCircle, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InputOTPController } from "@/components/otpErrorInput/otpInput";
import AutosizeTextareaDemo from "@/components/textarea/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ErroSchema = z.object({
  title: z.string().min(10, { message: "Titulo é obrigatório e deve conter no minímo 10 caracteres." }),
  type: z.string().min(1, { message: "Definir o tipo é obrigatório." }),
  errorCode: z.string().min(6, { message: "Código é obrigatório e deve conter exatamente 6 caracteres." }),
  description: z.string().min(35, { message: "Descrição é obrigatória e deve conter no minímo 35 caracteres." }),
  createdAt: z.date().default(() => new Date()),
});

type ErroSchemaType = z.infer<typeof ErroSchema>;
type FormFields = "title" | "type" | "errorCode" | "description";

export function ErroAddForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formMethods = useForm<ErroSchemaType>({
    resolver: zodResolver(ErroSchema),
    defaultValues: {
      title: "",
      type: "",
      errorCode: "",
      description: "",
      createdAt: new Date(),
    },
  });

  async function onSubmit(data: ErroSchemaType) {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/erro-crud/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha ao submeter");
      }

      toast({
        title: "Cadastrado ✅",
        description: "Salvo em nosso banco...",
      });
      formMethods.reset();
      router.refresh();
    } catch (error) {
      toast({
        title: "Oooopss... ❌",
        description: "Falha ao cadastrar.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function clearField(name: FormFields, resetField: (name: FormFields) => void) {
    resetField(name);
  }

  return (
    <div className="flex justify-center items-center md:mt-5 px-4">
      <Card className="w-full max-w-4xl min-h-auto">
        <CardHeader className="relative">
          <CardTitle className="select-none flex items-center text-lg">
            Adicione aqui a sua sugestão <CopyPlus className="size-5 ml-4" />{" "}
          </CardTitle>
          <CardDescription className="select-none text-base">
            Sugestões adicionadas serão mostradas no modal visualizar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6 w-full">
              <Controller
                name="title"
                control={formMethods.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel className="text-base select-none">Titulo da sugestão</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="select-none ml-2 h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent className="mb-5" side="right">
                            <p className="break-words text-sm">O seu titulo deverá conter</p>
                            <p className="break-words text-sm">no minimo 20 caracteres.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Insira o titulo"
                          className="text-base"
                          {...field}
                        />
                        {field.value && (
                          <X
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer h-4 w-4 text-gray-500 hover:bg-gray-50 hover:opacity-25 rounded-full"
                            onClick={() => clearField('title', formMethods.resetField)}
                          />
                        )}
                      </div>
                    </FormControl>
                    {fieldState.error && <FormMessage className="text-base">{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row md:items-center gap-x-4">
                <Controller
                  name="type"
                  control={formMethods.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel className="select-none text-base">Tipo de erro</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="select-none ml-2 h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p className="break-words text-sm">Neste campo você deve selecionar</p>
                              <p className="break-words text-sm">o tipo do erro que será cadastrado.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="w-full text-base">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel className="text-base">Tipos</SelectLabel>
                              <SelectItem value="SPED">Sped</SelectItem>
                              <SelectItem value="REINF">Reinf</SelectItem>
                              <SelectItem value="ESOCIAL">eSocial</SelectItem>
                              <SelectItem value="OUTROS">Outros</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {fieldState.error && <FormMessage className="text-base">{fieldState.error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
                <Controller
                  name="errorCode"
                  control={formMethods.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center mt-3 md:mt-0">
                        <FormLabel className="select-none text-base ">Error Code</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="select-none ml-2 h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent className="mb-5" side="right">
                              <p className="break-words text-sm">O código do erro deverá conter</p>
                              <p className="break-words text-sm">exatamente 6 caracteres.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <div className="flex items-center">
                          <InputOTPController
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                          {field.value && (
                            <X
                              className="ml-2 cursor-pointer h-4 w-4 text-gray-500 hover:bg-gray-50 hover:opacity-25 rounded-full"
                              onClick={() => clearField('errorCode', formMethods.resetField)}
                            />
                          )}
                        </div>
                      </FormControl>
                      {fieldState.error && <FormMessage className="text-base">{fieldState.error.message}</FormMessage>}
                    </FormItem>
                  )}
                />
              </div>
              <Controller
                name="description"
                control={formMethods.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel className="select-none text-base">Descrição</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="select-none ml-2 h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent className="mb-5" side="right">
                            <p className="break-words text-sm">A descrição deve conter informações</p>
                            <p className="break-words text-sm">sobre a sugestão, deverá possuir</p>
                            <p className="break-words text-sm">no minimo 35 caracteres.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <AutosizeTextareaDemo
                          placeholder="Detalhe sua descrição"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                        {field.value && (
                          <X
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer h-4 w-4 text-gray-500 hover:bg-gray-50 hover:opacity-25 rounded-full"
                            onClick={() => clearField('description', formMethods.resetField)}
                          />
                        )}
                      </div>
                    </FormControl>
                    {fieldState.error && <FormMessage className="text-base">{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <CardFooter className="text-base flex flex-col items-center">
                <div className="w-full flex justify-end space-x-2">
                  <Button variant="destructive" type="button" className="text-base" onClick={() => formMethods.reset()}>Limpar</Button>
                  <Button type="submit" className="text-base" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Adicionando...
                      </>
                    ) : (
                      "Adicionar"
                    )}</Button>
                </div>
                <p className="w-full text-center mt-2 text-muted-foreground select-none text-xs">A sua sugestão poderá aparecer no modal em até 30 segundos após o cadastro</p>
              </CardFooter>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
