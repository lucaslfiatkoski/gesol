# Gesol Energia Solar - Deploy no Vercel

## Configuração para Deploy no Vercel

Este projeto foi configurado para deploy automático no Vercel. Siga os passos abaixo:

### 1. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. O Vercel detectará automaticamente as configurações através do `vercel.json`
5. Clique em "Deploy"

### 2. Configurações Automáticas

O projeto inclui:
- **vercel.json**: Configuração de build e roteamento
- **Build otimizado**: Apenas o frontend é buildado para static hosting
- **Variáveis de ambiente**: Configuradas automaticamente para produção
- **Assets estáticos**: Servidos diretamente pelo Vercel

### 3. Variáveis de Ambiente (se necessário)

Se você precisar configurar variáveis de ambiente específicas no Vercel:

1. Vá para o dashboard do seu projeto no Vercel
2. Acesse "Settings" > "Environment Variables"
3. Adicione as variáveis necessárias:
   - `DATABASE_URL` (se usar banco de dados)
   - `JWT_SECRET` (para autenticação)
   - Outras variáveis específicas do seu projeto

### 4. Estrutura do Projeto

```
gesol-codigo-completo/
├── client/                 # Frontend React + Vite
│   ├── src/
│   └── public/
├── dist/public/           # Build output (gerado automaticamente)
├── vercel.json           # Configuração do Vercel
├── vite.config.ts        # Configuração do Vite com env vars
└── package.json          # Scripts de build
```

### 5. Scripts Disponíveis

- `npm run build`: Builda o projeto para produção
- `npm run dev`: Executa em modo desenvolvimento
- `npm run check`: Verifica erros de TypeScript

### 6. Troubleshooting

**Se o deploy mostrar código fonte em vez da aplicação:**
- Verifique se o `vercel.json` está correto
- Confirme que o comando `pnpm build` funciona localmente
- Verifique se a pasta `dist/public` é gerada corretamente

**Se houver erro de lockfile do pnpm:**
```bash
pnpm install --no-frozen-lockfile
```

**Se aparecer warning sobre builds configuration:**
- Isso é normal, as configurações do projeto sobrescrevem as do Vercel
- O deploy funcionará normalmente

O projeto está configurado para ser um **frontend estático** otimizado para o Vercel!