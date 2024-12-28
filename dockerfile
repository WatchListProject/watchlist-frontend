# Usar una imagen de Node con Alpine para tener una imagen más ligera
FROM node:16-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias y realizar la instalación solo de producción
COPY package.json package-lock.json ./
RUN npm install --production

# Copiar el código fuente al contenedor
COPY . .

# Si es una aplicación de frontend que necesita ser construida (con Vite)
RUN npm run build

# Usar un servidor estático para servir los archivos construidos
# Si tu app está en la carpeta 'dist' después de construir, usa serve o cualquier otro servidor estático
RUN npm install -g serve

# Exponer el puerto 8080 (ajústalo si tu servidor usa otro puerto)
EXPOSE 8080

# Comando para servir la aplicación (en este caso, la carpeta 'dist' generada por Vite)
CMD ["serve", "-s", "dist", "-l", "8080"]
