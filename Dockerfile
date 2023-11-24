# Seleccionar la imagen base
FROM node:14

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de la aplicación web al contenedor
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación web se ejecutará
EXPOSE 3000

# Iniciar la aplicación web
CMD ["node", "src/index.js"]