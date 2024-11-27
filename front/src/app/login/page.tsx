'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <main className="max-h-screen">
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Entrar na conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Login: caso você seja um colaborador, inserir sua MATRÍCULA.  Caso seja administrador, inserir seu CPF. Se for primeiro acesso, a senha será os dígitos da sua data de nascimento. (DDMMAAAA)
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    placeholder="Matrícula/CPF"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="password">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    placeholder="Senha"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Lembrar-me
                  </label>
                </div>
                <Button disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </form>

          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a
              href="/esqueceu-senha"
              className="underline underline-offset-4 hover:text-primary"
            >
              Esqueceu sua senha?
            </a>
          </p>

        </div>
      </div>
    </div>
    </main>
  )
}