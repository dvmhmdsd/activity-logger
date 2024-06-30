# Activity logger

A `Next.js` app that logs events and view the details of these events, lets you filter, search, get live updates and export data to *CSV* file.

## Installation

To run the app, do these steps first:

1. **Install Dependencies**:

```sh
npm i
```

2. **Ensure that you have *Postgresql* installed on your machine**.

3. **Create a database on *Postgresql* with any name**.

4. **Create `.env` file like the `.env.sample` file**.

5. **Update the `DATABASE_URL` variable inside the `.env` file you generated**

```
DATABASE_URL=
```

6. **Generate prisma client**:

```sh
npx prisma generate
```

7. **Run the app**:

```sh
npm run dev
```

**OR**

If you have docker installed on your machine just run: `docker-compose up --build` and you'll get the app running on `localhost:3000`. Start to add events and interact with it.
