# Imagem base com Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copie só os arquivos, sem node_modules
COPY package.json package-lock.json ./

# Reinstale no ambiente Linux
RUN npm ci

# Copia os arquivos necessários
COPY package*.json ./
COPY prisma ./prisma/
COPY . .

# Instala dependências
RUN npm install

# Gera o cliente do Prisma
RUN npx prisma generate

# Expõe a porta da aplicação
EXPOSE 3000

# Comando padrão para rodar a aplicação
CMD ["npm", "run", "dev"]
