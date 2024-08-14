run project:

npm run dev

kill port ubuntu

sudo kill -9 `sudo lsof -t -i:9001`

create table:

npx ts-node src/migrations/createProductTable.ts
