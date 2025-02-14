FROM node:18

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

# Remova node_modules se existir
RUN rm -rf node_modules

# Instale as dependências com flag para recompilar
RUN yarn install --force

# Recompile o bcrypt especificamente
RUN npm rebuild bcrypt --build-from-source

# Copia o arquivo de variáveis de ambiente
COPY .env .env

# Copia todo o código do projeto
COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
