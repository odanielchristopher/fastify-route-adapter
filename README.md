# Projeto Fastify + TypeScript com Injeção de Dependência e Validação Decorada

## Visão Geral

Este projeto é uma API moderna criada com **Fastify** e **TypeScript**, utilizando um sistema de **injeção de dependência próprio** com decorators, além de **validação automática** via `zod`, tudo de forma altamente tipada.

O principal objetivo é desacoplar as camadas da aplicação e centralizar a lógica de validação e registro de controllers, facilitando a escalabilidade e manutenção do sistema.

---

## Estrutura do Projeto

```
src/
├── application/
│   ├── contracts/      # Interfaces e types do domínio
│   ├── controllers/    # Controllers organizados por módulo
│   ├── erros/          # Erros customizados
│   └── usecases/       # Casos de uso da aplicação
│
├── infra/
│   ├── clients/        # Adapters de libs externas (Prisma, etc.)
│   └── database/       # Repositórios, migrators, seeds, etc.
│
├── kernel/
│   └── di/             # Registry e decorators (@Injectable, @Schema)
│
├── server/
│   ├── adapters/       # Adaptações de abstrações para Fastify
│   ├── middlewares/    # Middlewares Fastify
│   ├── routes/         # Registro de rotas usando `routeAdapter`
│   └── types/          # Tipagens exclusivas do Fastify
│
└── shared/             # Utilitários e arquivos globais
```

---

## Decorators e Registry

### @Injectable

Registra a classe no container de injeção para resolução automática via `Registry`.

### @Schema(schema: ZodSchema)

Associa um schema de validação ao controller, que será aplicado automaticamente no registro da rota.

---

## Exemplo de Controller

```ts
@Injectable()
@Schema(signInSchema)
export class SignInController
  implements IController<"public", SignInController.Response>
{
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async execute(params: Controller.Request<"public", SignInSchema>) {
    const { email, password } = params.body;
    const { accessToken } = await this.signInUseCase.execute({
      email,
      password,
    });

    return {
      statusCode: 200,
      body: { accessToken },
    };
  }
}
```

---

## Registro de Rotas Simplificado

```ts
fastify.routeAdapter(fastify, {
  url: "/sign-in",
  method: "POST",
  impl: SignInController,
});
```

- `impl` é o controller anotado com `@Injectable` e `@Schema`
- O `routeAdapter` resolve a instância do controller
- Aplica o schema no ciclo de validação do Fastify
- Executa o controller com tipagem preservada

---

## Esquema Visual

```
                                Fastify
                                   │
                        calls routeAdapter
                                   │
                        ┌─── resolve Controller ───┐
                        │                            │
            @Injectable  →  Registry  ←  @Schema(zodSchema)
                        │                            │
                        └─── executes Controller ───┌
                                   │
                          Applies validation
```

---

## Benefícios

- ✅ Injeção de dependência automática e organizada
- ✅ Validação declarativa com Zod
- ✅ Tipagem consistente entre usecases e HTTP
- ✅ Baixo acoplamento com o Fastify
- ✅ Fácil escalabilidade e extensão de funcionalidades

---

## Autor

Desenvolvido por Daniel Rodrigues — Projeto pessoal para exploração de boas práticas de arquitetura com Fastify, TypeScript e Zod.

---

Para sugestões de melhoria ou colaboração, fique à vontade para abrir uma issue ou PR.
