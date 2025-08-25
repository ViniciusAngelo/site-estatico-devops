# Site Profissional - Vinicius Angelo

Site profissional desenvolvido em React para Vinicius Angelo, Engenheiro da Computação especializado em consultoria e serviços de tecnologia.

## Características

- **Design**: Minimalista preto e branco
- **Tecnologias**: React, Tailwind CSS, Shadcn/UI, Lucide Icons
- **Responsivo**: Compatível com desktop e mobile
- **Seções**: Hero, Sobre, Serviços, Contato
- **Animações**: Transições suaves e efeitos hover
- **Navegação**: Scroll suave entre seções

## Estrutura do Site

### Seções Principais

1. **Hero Section**
   - Logo VA personalizada
   - Nome e título profissional
   - Descrição dos serviços
   - Botões de call-to-action

2. **Sobre Mim**
   - Experiência e expertise
   - Tecnologias dominadas
   - Cards com especialidades

3. **Serviços**
   - 6 serviços principais:
     - Desenvolvimento de Software
     - Arquitetura de Sistemas
     - Cloud Computing
     - Consultoria Técnica
     - Desenvolvimento Web
     - Aplicações Mobile

4. **Contato**
   - Informações de contato
   - Links para redes sociais
   - Instagram, LinkedIn, GitHub

## Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou pnpm

### Instalação e Execução

1. Instalar dependências:
```bash
npm install
# ou
pnpm install
```

2. Executar em modo desenvolvimento:
```bash
npm run dev
# ou
pnpm run dev
```

3. Acessar no navegador:
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
# ou
pnpm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## Personalização

### Cores
O site utiliza um sistema de cores preto e branco configurado no arquivo `src/App.css`. As cores podem ser personalizadas alterando as variáveis CSS.

### Conteúdo
Para alterar o conteúdo, edite o arquivo `src/App.jsx`:
- Textos e descrições
- Informações de contato
- Links das redes sociais
- Lista de tecnologias
- Serviços oferecidos

### Logo
A logo está localizada em `src/assets/logo.jpeg`. Para substituir, basta trocar o arquivo mantendo o mesmo nome.

## Tecnologias Utilizadas

- **React 18**: Framework JavaScript
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework CSS utilitário
- **Shadcn/UI**: Componentes de UI
- **Lucide React**: Ícones
- **Framer Motion**: Animações (pré-configurado)

## Deploy

O site pode ser facilmente deployado em plataformas como:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Basta fazer o build (`npm run build`) e fazer upload da pasta `dist/`.

## Suporte

Para dúvidas ou modificações, entre em contato com o desenvolvedor.

---

**Desenvolvido com ❤️ para Vinicius Angelo**

