# BUILD
FROM node:16 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate
COPY next.config.js tsconfig.json postcss.config.js tailwind.config.js next-env.d.ts ./
COPY src ./src
RUN npm run build

# APP
FROM node:16
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY public ./public
COPY next.config.js ./
# copy prisma client
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules/.prisma/client ./node_modules/.prisma/client

# EXPOSE 3000

CMD ["npm", "start"]