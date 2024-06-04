FROM node:latest

WORKDIR /usr/src/app


COPY package.json pnpm-lock.yaml ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

ENV PORT=3000

CMD ["node", "src/index.js"]