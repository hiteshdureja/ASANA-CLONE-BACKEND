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
import { WorkspaceMembership, TeamMembership, ProjectMembership } from '../src/entities';
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
  const workspaceMembershipRepo = app.get<Repository<WorkspaceMembership>>(getRepositoryToken(WorkspaceMembership));
  const teamMembershipRepo = app.get<Repository<TeamMembership>>(getRepositoryToken(TeamMembership));
  const projectMembershipRepo = app.get<Repository<ProjectMembership>>(getRepositoryToken(ProjectMembership));

  console.log('🌱 Starting database seeding...\n');

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing data...');
    // Clear in order to respect foreign key constraints
    const taskCount = await taskRepo.count();
    const sectionCount = await sectionRepo.count();
    const projectCount = await projectRepo.count();
    const tagCount = await tagRepo.count();
    const teamCount = await teamRepo.count();
    const userCount = await userRepo.count();
    const workspaceCount = await workspaceRepo.count();
    
    if (taskCount > 0) await taskRepo.query('DELETE FROM tasks');
    if (sectionCount > 0) await sectionRepo.query('DELETE FROM sections');
    if (projectCount > 0) await projectRepo.query('DELETE FROM projects');
    if (tagCount > 0) await tagRepo.query('DELETE FROM tags');
    if (teamCount > 0) await teamRepo.query('DELETE FROM teams');
    if (userCount > 0) await userRepo.query('DELETE FROM users');
    if (workspaceCount > 0) await workspaceRepo.query('DELETE FROM workspaces');
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

    // Create workspace memberships using the WorkspaceMembership entity
    const wsMembership1 = workspaceMembershipRepo.create({
      gid: generateGid('workspace_membership'),
      workspace: savedWorkspace1,
      user: savedUser1,
      isAdmin: true,
      isGuest: false,
      isViewOnly: false,
      isActive: true,
    });
    await workspaceMembershipRepo.save(wsMembership1);

    const wsMembership2 = workspaceMembershipRepo.create({
      gid: generateGid('workspace_membership'),
      workspace: savedWorkspace1,
      user: savedUser2,
      isAdmin: false,
      isGuest: false,
      isViewOnly: false,
      isActive: true,
    });
    await workspaceMembershipRepo.save(wsMembership2);

    const wsMembership3 = workspaceMembershipRepo.create({
      gid: generateGid('workspace_membership'),
      workspace: savedWorkspace1,
      user: savedUser3,
      isAdmin: false,
      isGuest: false,
      isViewOnly: false,
      isActive: true,
    });
    await workspaceMembershipRepo.save(wsMembership3);

    const wsMembership4 = workspaceMembershipRepo.create({
      gid: generateGid('workspace_membership'),
      workspace: savedWorkspace2,
      user: savedUser1,
      isAdmin: true,
      isGuest: false,
      isViewOnly: false,
      isActive: true,
    });
    await workspaceMembershipRepo.save(wsMembership4);

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

    // Create team memberships
    const teamMembership1 = teamMembershipRepo.create({
      gid: generateGid('team_membership'),
      team: savedTeam1,
      user: savedUser1,
      isAdmin: true,
      isGuest: false,
      isLimitedAccess: false,
    });
    await teamMembershipRepo.save(teamMembership1);

    const teamMembership2 = teamMembershipRepo.create({
      gid: generateGid('team_membership'),
      team: savedTeam1,
      user: savedUser2,
      isAdmin: false,
      isGuest: false,
      isLimitedAccess: false,
    });
    await teamMembershipRepo.save(teamMembership2);

    const teamMembership3 = teamMembershipRepo.create({
      gid: generateGid('team_membership'),
      team: savedTeam2,
      user: savedUser2,
      isAdmin: true,
      isGuest: false,
      isLimitedAccess: false,
    });
    await teamMembershipRepo.save(teamMembership3);

    const teamMembership4 = teamMembershipRepo.create({
      gid: generateGid('team_membership'),
      team: savedTeam2,
      user: savedUser3,
      isAdmin: false,
      isGuest: false,
      isLimitedAccess: false,
    });
    await teamMembershipRepo.save(teamMembership4);

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
    
    // Create project memberships
    const projMembership1 = projectMembershipRepo.create({
      gid: generateGid('project_membership'),
      project: savedProject1,
      user: savedUser1,
      writeAccess: true,
    });
    await projectMembershipRepo.save(projMembership1);

    const projMembership2 = projectMembershipRepo.create({
      gid: generateGid('project_membership'),
      project: savedProject1,
      user: savedUser2,
      writeAccess: true,
    });
    await projectMembershipRepo.save(projMembership2);
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
    
    // Create project memberships
    const projMembership3 = projectMembershipRepo.create({
      gid: generateGid('project_membership'),
      project: savedProject2,
      user: savedUser2,
      writeAccess: true,
    });
    await projectMembershipRepo.save(projMembership3);

    const projMembership4 = projectMembershipRepo.create({
      gid: generateGid('project_membership'),
      project: savedProject2,
      user: savedUser3,
      writeAccess: true,
    });
    await projectMembershipRepo.save(projMembership4);
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
    
    // Create project membership
    const projMembership5 = projectMembershipRepo.create({
      gid: generateGid('project_membership'),
      project: savedProject3,
      user: savedUser1,
      writeAccess: true,
    });
    await projectMembershipRepo.save(projMembership5);
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
    task1.projects = [savedProject1];
    task1.tags = [savedTag1, savedTag2];
    task1.followers = [savedUser1, savedUser2];
    task1.sections = [savedSection1];
    const savedTask1 = await taskRepo.save(task1);
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
    task2.projects = [savedProject2];
    task2.tags = [savedTag2];
    task2.followers = [savedUser2];
    const savedTask2 = await taskRepo.save(task2);
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
    task3.projects = [savedProject1];
    task3.tags = [savedTag2];
    task3.followers = [savedUser1, savedUser3];
    task3.sections = [savedSection3];
    const savedTask3 = await taskRepo.save(task3);
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
    task4.projects = [savedProject1, savedProject2];
    task4.tags = [savedTag3];
    task4.followers = [savedUser2];
    task4.sections = [savedSection2];
    const savedTask4 = await taskRepo.save(task4);
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
    subtask1.projects = [savedProject1];
    subtask1.tags = [savedTag2];
    const savedSubtask1 = await taskRepo.save(subtask1);
    console.log(`✅ Created subtask: ${savedSubtask1.name} (${savedSubtask1.gid})`);

    // Set up task dependencies
    task2.dependencies = [savedTask1];
    await taskRepo.save(task2);
    task4.dependencies = [savedTask2];
    await taskRepo.save(task4);

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
    personalTask.projects = [savedProject3];
    const savedPersonalTask = await taskRepo.save(personalTask);
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

