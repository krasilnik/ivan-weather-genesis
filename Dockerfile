# 1. Базовий імідж
FROM node:18

# 2. Робоча директорія
WORKDIR /app

# 3. Копіюємо package.json і встановлюємо залежності
COPY package*.json ./
RUN npm install

# 4. Копіюємо весь код
COPY . .

# 5. Виставляємо змінну середовища
ENV NODE_ENV=production

# 6. Порт для прослуховування
EXPOSE 3000

# 7. Запуск програми
CMD ["node", "server.js"]

