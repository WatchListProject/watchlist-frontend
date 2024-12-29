# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json e instala dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia los archivos del proyecto al contenedor
COPY . .

# Expon el puerto
EXPOSE 8080

# Comando para ejecutar el servidor
CMD ["node", "server.js"]
