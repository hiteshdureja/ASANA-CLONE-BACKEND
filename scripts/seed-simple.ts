import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from '../src/entities/workspace.entity';
import { User } from '../src/entities/user.entity';
import { Team } from '../src/entities/team.entity';
import { Project } from '../src/entities/project.entity';
import { Task } from '../src/entities/task.entity';
import { Tag } from '../src/entities/tag.entity';
import { Section } from '../src/entities/section.entity';
import { generateGid } from '../src/utils/gid.util';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const workspaceRepo = app.get<Repository<Workspace>>(getRepositoryToken(Workspace));
  const userRepo = app.get<Repository<User>>(getRepositoryToken(User));
  const teamRepo = app.get<Repository<Team>>(getRepositoryToken(Team));
  const projectRepo = app.get<Repository<Project>>(getRepositoryToken(Project));
  const taskRepo = app.get<Repository<Task>>(getRepositoryToken(Task));
  const tagRepo = app.get<Repository<Tag>>(getRepositoryToken(Tag));
  const sectionRepo = app.get<Repository<Section>>(getRepositoryToken(Section));

  console.log('🌱 Starting database seeding...\n');

  try {
    // Clear existing data using raw SQL to handle foreign keys
    console.log('Clearing existing data...');
    await workspaceRepo.query('TRUNCATE TABLE tasks, sections, projects, tags, teams, users, workspaces CASCADE');
    console.log('✅ Cleared existing data\n');

    // 1. Create Workspaces
    console.log('Creating workspaces...');
    const workspace1 = workspaceRepo.create({
      gid: generateGid('workspace'),
      name: 'Acme Corporation',
      isOrganization: true,
      emailDomains: ['acme.com', 'acme-corp.com'],
    });
    const savedWorkspace1 = await workspaceRepo.save(workspace1);
    console.log(`✅ Created workspace: ${savedWorkspace1.name} (${savedWorkspace1.gid})`);

    const workspace2 = workspaceRepo.create({
      gid: generateGid('workspace'),
      name: 'Personal Workspace',
      isOrganization: false,
    });
    const savedWorkspace2 = await workspaceRepo.save(workspace2);
    console.log(`✅ Created workspace: ${savedWorkspace2.name} (${savedWorkspace2.gid})\n`);

    // 2. Create Users
    console.log('Creating users...');
    const user1 = userRepo.create({
      gid: generateGid('user'),
      name: 'John Doe',
      email: 'john.doe@acme.com',
      photo: null,
    });
    const savedUser1 = await userRepo.save(user1);
    console.log(`✅ Created user: ${savedUser1.name} (${savedUser1.gid})`);

    const user2 = userRepo.create({
      gid: generateGid('user'),
      name: 'Jane Smith',
      email: 'jane.smith@acme.com',
      photo: null,
    });
    const savedUser2 = await userRepo.save(user2);
    console.log(`✅ Created user: ${savedUser2.name} (${savedUser2.gid})`);

    const user3 = userRepo.create({
      gid: generateGid('user'),
      name: 'Bob Johnson',
      email: 'bob.johnson@acme.com',
      photo: null,
    });
    const savedUser3 = await userRepo.save(user3);
    console.log(`✅ Created user: ${savedUser3.name} (${savedUser3.gid})\n`);

    // 3. Create Teams
    console.log('Creating teams...');
    const team1 = teamRepo.create({
      gid: generateGid('team'),
      name: 'Engineering',
      workspace: savedWorkspace1,
    });
    const savedTeam1 = await teamRepo.save(team1);
    console.log(`✅ Created team: ${savedTeam1.name} (${savedTeam1.gid})`);

    const team2 = teamRepo.create({
      gid: generateGid('team'),
      name: 'Product',
      workspace: savedWorkspace1,
    });
    const savedTeam2 = await teamRepo.save(team2);
    console.log(`✅ Created team: ${savedTeam2.name} (${savedTeam2.gid})\n`);

    // 4. Create Tags
    console.log('Creating tags...');
    const tag1 = tagRepo.create({
      gid: generateGid('tag'),
      name: 'urgent',
      color: 'red',
      workspace: savedWorkspace1,
    });
    const savedTag1 = await tagRepo.save(tag1);
    console.log(`✅ Created tag: ${savedTag1.name} (${savedTag1.gid})`);

    const tag2 = tagRepo.create({
      gid: generateGid('tag'),
      name: 'backend',
      color: 'blue',
      workspace: savedWorkspace1,
    });
    const savedTag2 = await tagRepo.save(tag2);
    console.log(`✅ Created tag: ${savedTag2.name} (${savedTag2.gid})`);

    const tag3 = tagRepo.create({
      gid: generateGid('tag'),
      name: 'frontend',
      color: 'green',
      workspace: savedWorkspace1,
    });
    const savedTag3 = await tagRepo.save(tag3);
    console.log(`✅ Created tag: ${savedTag3.name} (${savedTag3.gid})\n`);

    // 5. Create Projects
    console.log('Creating projects...');
    const project1 = projectRepo.create({
      gid: generateGid('proj'),
      name: 'Website Redesign',
      notes: 'Complete redesign of the company website',
      htmlNotes: '<p>Complete redesign of the company website</p>',
      archived: false,
      completed: false,
      color: 'blue',
      defaultView: 'board',
      privacySetting: 'public_to_workspace',
      public: true,
      defaultAccessLevel: 'editor',
      workspace: savedWorkspace1,
      team: savedTeam1,
      owner: savedUser1,
    });
    project1.followers = [savedUser1, savedUser2, savedUser3];
    const savedProject1 = await projectRepo.save(project1);
    // Reload to ensure we have the correct ID
    const project1Reloaded = await projectRepo.findOne({ where: { gid: savedProject1.gid } });
    if (!project1Reloaded) throw new Error('Failed to reload project1');
    console.log(`✅ Created project: ${savedProject1.name} (${savedProject1.gid})`);

    const project2 = projectRepo.create({
      gid: generateGid('proj'),
      name: 'Mobile App Development',
      notes: 'Build a new mobile application',
      htmlNotes: '<p>Build a new mobile application</p>',
      archived: false,
      completed: false,
      color: 'green',
      defaultView: 'list',
      privacySetting: 'private_to_team',
      public: false,
      defaultAccessLevel: 'editor',
      workspace: savedWorkspace1,
      team: savedTeam1,
      owner: savedUser2,
    });
    project2.followers = [savedUser2];
    const savedProject2 = await projectRepo.save(project2);
    const project2Reloaded = await projectRepo.findOne({ where: { gid: savedProject2.gid } });
    if (!project2Reloaded) throw new Error('Failed to reload project2');
    console.log(`✅ Created project: ${savedProject2.name} (${savedProject2.gid})`);

    const project3 = projectRepo.create({
      gid: generateGid('proj'),
      name: 'Personal Tasks',
      notes: 'My personal todo list',
      archived: false,
      completed: false,
      color: 'purple',
      defaultView: 'list',
      privacySetting: 'private',
      public: false,
      workspace: savedWorkspace2,
      owner: savedUser1,
    });
    project3.followers = [savedUser1];
    const savedProject3 = await projectRepo.save(project3);
    const project3Reloaded = await projectRepo.findOne({ where: { gid: savedProject3.gid } });
    if (!project3Reloaded) throw new Error('Failed to reload project3');
    console.log(`✅ Created project: ${savedProject3.name} (${savedProject3.gid})\n`);

    // 6. Create Sections
    console.log('Creating sections...');
    const section1 = sectionRepo.create({
      gid: generateGid('section'),
      name: 'To Do',
      project: savedProject1,
    });
    const savedSection1 = await sectionRepo.save(section1);
    console.log(`✅ Created section: ${savedSection1.name} (${savedSection1.gid})`);

    const section2 = sectionRepo.create({
      gid: generateGid('section'),
      name: 'In Progress',
      project: savedProject1,
    });
    const savedSection2 = await sectionRepo.save(section2);
    console.log(`✅ Created section: ${savedSection2.name} (${savedSection2.gid})`);

    const section3 = sectionRepo.create({
      gid: generateGid('section'),
      name: 'Done',
      project: savedProject1,
    });
    const savedSection3 = await sectionRepo.save(section3);
    console.log(`✅ Created section: ${savedSection3.name} (${savedSection3.gid})\n`);

    // 7. Create Tasks
    console.log('Creating tasks...');
    const task1 = taskRepo.create({
      gid: generateGid('task'),
      name: 'Design homepage mockup',
      notes: 'Create initial design mockup for the homepage',
      htmlNotes: '<p>Create initial design mockup for the homepage</p>',
      completed: false,
      dueOn: new Date('2024-12-31'),
      workspace: savedWorkspace1,
      assignee: savedUser1,
      createdBy: savedUser1,
    });
    task1.tags = [savedTag1, savedTag2];
    task1.followers = [savedUser1, savedUser2];
    task1.sections = [savedSection1];
    const savedTask1 = await taskRepo.save(task1);
    // Add project relationship after saving using raw SQL
    await taskRepo.query(
      'INSERT INTO project_tasks ("projectsId", "tasksId") VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [project1Reloaded.id, savedTask1.id]
    );
    console.log(`✅ Created task: ${savedTask1.name} (${savedTask1.gid})`);

    const task2 = taskRepo.create({
      gid: generateGid('task'),
      name: 'Implement user authentication',
      notes: 'Build login and registration functionality',
      htmlNotes: '<p>Build login and registration functionality</p>',
      completed: false,
      workspace: savedWorkspace1,
      assignee: savedUser2,
      createdBy: savedUser1,
    });
    task2.tags = [savedTag2];
    task2.followers = [savedUser2];
    const savedTask2 = await taskRepo.save(task2);
    await taskRepo.query(
      'INSERT INTO project_tasks ("projectsId", "tasksId") VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [project2Reloaded.id, savedTask2.id]
    );
    console.log(`✅ Created task: ${savedTask2.name} (${savedTask2.gid})`);

    const task3 = taskRepo.create({
      gid: generateGid('task'),
      name: 'Create API documentation',
      notes: 'Document all API endpoints',
      htmlNotes: '<p>Document all API endpoints</p>',
      completed: true,
      completedAt: new Date(),
      workspace: savedWorkspace1,
      assignee: savedUser3,
      createdBy: savedUser1,
      completedBy: savedUser3,
    });
    task3.tags = [savedTag2];
    task3.followers = [savedUser1, savedUser3];
    task3.sections = [savedSection3];
    const savedTask3 = await taskRepo.save(task3);
    await taskRepo.query(
      'INSERT INTO project_tasks ("projectsId", "tasksId") VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [project1Reloaded.id, savedTask3.id]
    );
    console.log(`✅ Created task: ${savedTask3.name} (${savedTask3.gid})`);

    const task4 = taskRepo.create({
      gid: generateGid('task'),
      name: 'Build responsive UI components',
      notes: 'Create reusable UI components',
      htmlNotes: '<p>Create reusable UI components</p>',
      completed: false,
      workspace: savedWorkspace1,
      assignee: savedUser2,
      createdBy: savedUser2,
    });
    task4.tags = [savedTag3];
    task4.followers = [savedUser2];
    task4.sections = [savedSection2];
    const savedTask4 = await taskRepo.save(task4);
    await taskRepo.query(
      'INSERT INTO project_tasks ("projectsId", "tasksId") VALUES ($1, $2), ($3, $4) ON CONFLICT DO NOTHING',
      [project1Reloaded.id, savedTask4.id, project2Reloaded.id, savedTask4.id]
    );
    console.log(`✅ Created task: ${savedTask4.name} (${savedTask4.gid})`);

    // Create subtask
    const subtask1 = taskRepo.create({
      gid: generateGid('task'),
      name: 'Design color palette',
      notes: 'Select color scheme for the design',
      completed: false,
      workspace: savedWorkspace1,
      parent: savedTask1,
      assignee: savedUser1,
      createdBy: savedUser1,
    });
    subtask1.tags = [savedTag2];
    const savedSubtask1 = await taskRepo.save(subtask1);
    await taskRepo.query(
      'INSERT INTO project_tasks ("projectsId", "tasksId") VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [project1Reloaded.id, savedSubtask1.id]
    );
    console.log(`✅ Created subtask: ${savedSubtask1.name} (${savedSubtask1.gid})`);

    // Set up task dependencies
    await taskRepo
      .createQueryBuilder()
      .relation(Task, 'dependencies')
      .of(savedTask2.id)
      .add(savedTask1.id);
    await taskRepo
      .createQueryBuilder()
      .relation(Task, 'dependencies')
      .of(savedTask4.id)
      .add(savedTask2.id);

    // Personal task
    const personalTask = taskRepo.create({
      gid: generateGid('task'),
      name: 'Buy groceries',
      notes: 'Weekly grocery shopping',
      completed: false,
      workspace: savedWorkspace2,
      assignee: savedUser1,
      createdBy: savedUser1,
    });
    const savedPersonalTask = await taskRepo.save(personalTask);
    await taskRepo.query(
      'INSERT INTO project_tasks ("projectsId", "tasksId") VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [project3Reloaded.id, savedPersonalTask.id]
    );
    console.log(`✅ Created task: ${savedPersonalTask.name} (${savedPersonalTask.gid})\n`);

    console.log('✅ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Workspaces: 2`);
    console.log(`   - Users: 3`);
    console.log(`   - Teams: 2`);
    console.log(`   - Projects: 3`);
    console.log(`   - Tags: 3`);
    console.log(`   - Sections: 3`);
    console.log(`   - Tasks: 6 (including 1 subtask)`);
    console.log('\n🎯 You can now test the APIs with this sample data!');
    console.log('\nExample GIDs to use in API calls:');
    console.log(`   Workspace 1: ${savedWorkspace1.gid}`);
    console.log(`   User 1: ${savedUser1.gid}`);
    console.log(`   Project 1: ${savedProject1.gid}`);
    console.log(`   Task 1: ${savedTask1.gid}`);
    console.log(`   Tag 1: ${savedTag1.gid}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await app.close();
  }
}

bootstrap();

