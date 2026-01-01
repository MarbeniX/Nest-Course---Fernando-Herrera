<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Execute on developer mode

1. Clone the repository
2. Execute

```
npm install
```

3. You have to have Nest CLI installed

```
npm i -g @nestjs/cli
```

4. Rise the DB

```
docker-compose up -d
```

5. Clone the `.env.template` and rename it to **.env**

6. Fill the **.env** defined environment variables

7. Start the project on developer mode

```
npm run dev
```

8. Reconstruct the database with **seed**

```
http://localhost:3000/api/seed/
```
