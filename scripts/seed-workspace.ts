
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workspace } from '../src/entities/workspace.entity';
import { User } from '../src/entities/user.entity';
import { WorkspaceMembership } from '../src/entities/membership.entity';
import { generateGid } from '../src/utils/gid.util';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const workspaceRepo = app.get(getRepositoryToken(Workspace));

    const targetGid = '1212421894209877';

    let workspace = await workspaceRepo.findOne({ where: { gid: targetGid } });

    if (!workspace) {
        console.log(`Seeding workspace ${targetGid}...`);
        workspace = workspaceRepo.create({
            gid: targetGid,
            name: 'Comparison Workspace',
            isOrganization: false,
            emailDomains: []
        });
        await workspaceRepo.save(workspace);
        console.log('Workspace seeded.');
    } else {
        console.log('Workspace already exists.');
    }

    const userRepo = app.get(getRepositoryToken(User));
    const userGid = '1212421894209865';
    let user = await userRepo.findOne({ where: { gid: userGid } });

    if (!user) {
        console.log(`Seeding user ${userGid}...`);
        user = userRepo.create({
            gid: userGid,
            name: 'Test User',
            email: 'hitesh@example.com',
            photo: null,
            // workspaces: [workspace] // Don't use cascading, use explicit membership
        });
        await userRepo.save(user); // Save user first

        const wmRepo = app.get(getRepositoryToken(WorkspaceMembership));
        const wm = wmRepo.create({
            gid: generateGid('membership'),
            user: user,
            workspace: workspace,
            isActive: true
        });
        await wmRepo.save(wm);

        console.log('User and Membership seeded.');
    } else {
        console.log('User already exists.');
        // Ensure workspace link
        // Simple check: might need to load relation.
    }

    await app.close();
}

seed().catch(console.error);
