FROM node:latest

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de definición de dependencias
COPY package.json ./
COPY pnpm-lock.yaml ./

# Instalar pnpm
RUN npm install -g pnpm

# Instalar dependencias usando pnpm
RUN pnpm install

# Copiar todo el código fuente
COPY . .

# Exponer el puerto que usará la aplicación
EXPOSE 3000
