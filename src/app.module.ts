import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './generated';
import { ApiImplementations } from './generated/api-implementations';
import {
  User,
  Workspace,
  Team,
  Project,
  Task,
  Section,
  Tag,
  ProjectStatus,
  Story,
  StatusUpdate,
  Attachment,
  Webhook,
  CustomField,
  EnumOption,
  Membership,
  ProjectMembership,
  TeamMembership,
  WorkspaceMembership,
  Job,
  ProjectBrief,
  UserTaskList,
  Reaction,
} from './entities';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { TeamsProxyController } from './teams-proxy.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env automatically
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<number>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Workspace, Team, Project, Task, Section, Tag, ProjectStatus, Story, StatusUpdate, Attachment, Webhook, CustomField, EnumOption, Membership, ProjectMembership, TeamMembership, WorkspaceMembership, Job, ProjectBrief, UserTaskList, Reaction],
        autoLoadEntities: true,
        synchronize: config.get<string>('TYPEORM_SYNCHRONIZE') === 'false' ? false : true,
      }),
    }),
    TypeOrmModule.forFeature([User, Workspace, Team, Project, Task, Section, Tag, ProjectStatus, Story, StatusUpdate, Attachment, Webhook, CustomField, EnumOption, Membership, ProjectMembership, TeamMembership, WorkspaceMembership, Job, ProjectBrief, UserTaskList, Reaction]),

    ApiModule.forRoot(ApiImplementations),
  ],
  controllers: [TeamsProxyController],
  providers: [ProjectService, TaskService],
})
export class AppModule { }
