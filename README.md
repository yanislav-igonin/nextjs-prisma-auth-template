# nextjs-prisma-auth-template

## Tech Stack
- TypeScript
- Next.js
- Prisma
- tRPC
- Tailwind CSS

## Run
Install dependencies
```bash
npm install
```

Change DB adapter in `prisma/schema.prisma` to `sqlite`

Prepare DB
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

Run dev server
```bash
npm run dev
```