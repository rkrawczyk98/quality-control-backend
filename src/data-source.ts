//to jest config bezpośrednio do używania z typeorm w aplikacji
require('dotenv').config();
import { DataSource } from 'typeorm';
import * as userEntities from './modules/user/entities';
import * as componentEntities from './modules/component/entities';
import * as customerEntities from './modules/customer/entities';
import * as deliveryEntities from './modules/delivery/entities';
import * as warehouseEntities from './modules/warehouse/entities';
import * as refreshTokenEntities from './modules/auth/entities';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        // Tutaj zaimportować encje
        ...Object.values(refreshTokenEntities),
        ...Object.values(userEntities),
        ...Object.values(componentEntities),
        ...Object.values(customerEntities),
        ...Object.values(deliveryEntities),
        ...Object.values(warehouseEntities),
    ],
    migrations: [
        __dirname + '/migrations/*{.ts,.js}',
    ],
    synchronize: false,
    logging: true,
});


// npx ts-node ./node_modules/typeorm/cli.js migration:revert --dataSource src/data-source.ts -- to jest do reverta migracji
// npx ts-node ./node_modules/typeorm/cli.js migration:generate --dataSource src/data-source.ts src/migrations/{nazwaMigracji} -- to jest do generowania nowej migracji
// npx ts-node ./node_modules/typeorm/cli.js migration:run --dataSource src/data-source.ts -- to jest do uruchomienia/zastosowania na bazie nowej migracji