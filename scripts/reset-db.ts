
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

async function reset() {
    console.log("Initializing app context for DB reset...");
    const app = await NestFactory.createApplicationContext(AppModule);

    try {
        const dataSource = app.get(DataSource);
        console.log("Synchronizing schema (dropping tables)...");
        await dataSource.synchronize(true);
        console.log("Database reset complete.");
    } catch (e) {
        console.error("Failed to reset DB:", e);
    } finally {
        await app.close();
    }
}

reset().catch(console.error);
