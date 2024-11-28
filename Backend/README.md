# Prisma-Postgres-Auth

--------

- `fork` and `git clone` the project

- `npm i`

- create .env to root folder and put `PORT=<YOUR_PORT_NO>`, `DATABASE_URL=<POSTGRES_URL>` and `JWT_SECRET=<YOUR_JWT_SECRET>`

## Testing in postman
--------
### Signup
http://localhost:YOUR_PORT_NO/signup

body:   
{
    "email":"YOUR_EMAIL",
    "password":"YOUR_PW"
}

-----
### Login
http://localhost:YOUR_PORT_NO/login

body:   
{
    "email":"YOUR_EMAIL",
    "password":"YOUR_PW"
}




<!--  -->
<!-- Custom hooks, Auth -->