FROM node:16 as prisma
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate

# copy build of nextjs app
FROM node:16
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY .next ./.next
COPY public ./public
COPY prisma ./prisma
COPY next.config.js ./
# copy prisma client
COPY --from=prisma /app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 3000

CMD ["npm", "start"]