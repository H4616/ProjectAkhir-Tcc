# Gunakan image Node.js sebagai base image
FROM node:18-alpine

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json dari folder backend terlebih dahulu
COPY backend/package.json backend/package-lock.json /app/

# Install dependencies
RUN npm install

# Salin seluruh aplikasi dari folder backend
COPY backend /app/

# Expose port yang digunakan oleh aplikasi backend
EXPOSE 5000

# Jalankan aplikasi Express.js
CMD ["node", "index.js"]
