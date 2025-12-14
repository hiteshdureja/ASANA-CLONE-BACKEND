import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ApiImplementationsType } from './api-implementations'
import { AccessRequestsApi } from './api';
import { AccessRequestsApiController } from './controllers';
import { AllocationsApi } from './api';
import { AllocationsApiController } from './controllers';
import { AttachmentsApi } from './api';
import { AttachmentsApiController } from './controllers';
import { AuditLogAPIApi } from './api';
import { AuditLogAPIApiController } from './controllers';
import { BatchAPIApi } from './api';
import { BatchAPIApiController } from './controllers';
import { BudgetsApi } from './api';
import { BudgetsApiController } from './controllers';
import { CustomFieldSettingsApi } from './api';
import { CustomFieldSettingsApiController } from './controllers';
import { CustomFieldsApi } from './api';
import { CustomFieldsApiController } from './controllers';
import { CustomTypesApi } from './api';
import { CustomTypesApiController } from './controllers';
import { EventsApi } from './api';
import { EventsApiController } from './controllers';
import { ExportsApi } from './api';
import { ExportsApiController } from './controllers';
import { GoalRelationshipsApi } from './api';
import { GoalRelationshipsApiController } from './controllers';
import { GoalsApi } from './api';
import { GoalsApiController } from './controllers';
import { JobsApi } from './api';
import { JobsApiController } from './controllers';
import { MembershipsApi } from './api';
import { MembershipsApiController } from './controllers';
import { OrganizationExportsApi } from './api';
import { OrganizationExportsApiController } from './controllers';
import { PortfolioMembershipsApi } from './api';
import { PortfolioMembershipsApiController } from './controllers';
import { PortfoliosApi } from './api';
import { PortfoliosApiController } from './controllers';
import { ProjectBriefsApi } from './api';
import { ProjectBriefsApiController } from './controllers';
import { ProjectMembershipsApi } from './api';
import { ProjectMembershipsApiController } from './controllers';
import { ProjectStatusesApi } from './api';
import { ProjectStatusesApiController } from './controllers';
import { ProjectTemplatesApi } from './api';
import { ProjectTemplatesApiController } from './controllers';
import { ProjectsApi } from './api';
import { ProjectsApiController } from './controllers';
import { RatesApi } from './api';
import { RatesApiController } from './controllers';
import { ReactionsApi } from './api';
import { ReactionsApiController } from './controllers';
import { RulesApi } from './api';
import { RulesApiController } from './controllers';
import { SectionsApi } from './api';
import { SectionsApiController } from './controllers';
import { StatusUpdatesApi } from './api';
import { StatusUpdatesApiController } from './controllers';
import { StoriesApi } from './api';
import { StoriesApiController } from './controllers';
import { TagsApi } from './api';
import { TagsApiController } from './controllers';
import { TaskTemplatesApi } from './api';
import { TaskTemplatesApiController } from './controllers';
import { TasksApi } from './api';
import { TasksApiController } from './controllers';
import { TeamMembershipsApi } from './api';
import { TeamMembershipsApiController } from './controllers';
import { TeamsApi } from './api';
import { TeamsApiController } from './controllers';
import { TimePeriodsApi } from './api';
import { TimePeriodsApiController } from './controllers';
import { TimeTrackingEntriesApi } from './api';
import { TimeTrackingEntriesApiController } from './controllers';
import { TypeaheadApi } from './api';
import { TypeaheadApiController } from './controllers';
import { UserTaskListsApi } from './api';
import { UserTaskListsApiController } from './controllers';
import { UsersApi } from './api';
import { UsersApiController } from './controllers';
import { WebhooksApi } from './api';
import { WebhooksApiController } from './controllers';
import { WorkspaceMembershipsApi } from './api';
import { WorkspaceMembershipsApiController } from './controllers';
import { WorkspacesApi } from './api';
import { WorkspacesApiController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
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
} from '../entities';
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';

@Module({})
export class ApiModule {
  static forRoot(apiImplementations: any): DynamicModule {
    const providers: Provider[] = [
      {
        provide: AccessRequestsApi,
        useClass: apiImplementations.accessRequestsApi
      },
      {
        provide: AllocationsApi,
        useClass: apiImplementations.allocationsApi
      },
      {
        provide: AttachmentsApi,
        useClass: apiImplementations.attachmentsApi
      },
      {
        provide: AuditLogAPIApi,
        useClass: apiImplementations.auditLogAPIApi
      },
      {
        provide: BatchAPIApi,
        useClass: apiImplementations.batchAPIApi
      },
      {
        provide: BudgetsApi,
        useClass: apiImplementations.budgetsApi
      },
      {
        provide: CustomFieldSettingsApi,
        useClass: apiImplementations.customFieldSettingsApi
      },
      {
        provide: CustomFieldsApi,
        useClass: apiImplementations.customFieldsApi
      },
      {
        provide: CustomTypesApi,
        useClass: apiImplementations.customTypesApi
      },
      {
        provide: EventsApi,
        useClass: apiImplementations.eventsApi
      },
      {
        provide: ExportsApi,
        useClass: apiImplementations.exportsApi
      },
      {
        provide: GoalRelationshipsApi,
        useClass: apiImplementations.goalRelationshipsApi
      },
      {
        provide: GoalsApi,
        useClass: apiImplementations.goalsApi
      },
      {
        provide: JobsApi,
        useClass: apiImplementations.jobsApi
      },
      {
        provide: MembershipsApi,
        useClass: apiImplementations.membershipsApi
      },
      {
        provide: OrganizationExportsApi,
        useClass: apiImplementations.organizationExportsApi
      },
      {
        provide: PortfolioMembershipsApi,
        useClass: apiImplementations.portfolioMembershipsApi
      },
      {
        provide: PortfoliosApi,
        useClass: apiImplementations.portfoliosApi
      },
      {
        provide: ProjectBriefsApi,
        useClass: apiImplementations.projectBriefsApi
      },
      {
        provide: ProjectMembershipsApi,
        useClass: apiImplementations.projectMembershipsApi
      },
      {
        provide: ProjectStatusesApi,
        useClass: apiImplementations.projectStatusesApi
      },
      {
        provide: ProjectTemplatesApi,
        useClass: apiImplementations.projectTemplatesApi
      },
      {
        provide: ProjectsApi,
        useClass: apiImplementations.projectsApi
      },
      {
        provide: RatesApi,
        useClass: apiImplementations.ratesApi
      },
      {
        provide: ReactionsApi,
        useClass: apiImplementations.reactionsApi
      },
      {
        provide: RulesApi,
        useClass: apiImplementations.rulesApi
      },
      {
        provide: SectionsApi,
        useClass: apiImplementations.sectionsApi
      },
      {
        provide: StatusUpdatesApi,
        useClass: apiImplementations.statusUpdatesApi
      },
      {
        provide: StoriesApi,
        useClass: apiImplementations.storiesApi
      },
      {
        provide: TagsApi,
        useClass: apiImplementations.tagsApi
      },
      {
        provide: TaskTemplatesApi,
        useClass: apiImplementations.taskTemplatesApi
      },
      {
        provide: TasksApi,
        useClass: apiImplementations.tasksApi
      },
      {
        provide: TeamMembershipsApi,
        useClass: apiImplementations.teamMembershipsApi
      },
      {
        provide: TeamsApi,
        useClass: apiImplementations.teamsApi
      },
      {
        provide: TimePeriodsApi,
        useClass: apiImplementations.timePeriodsApi
      },
      {
        provide: TimeTrackingEntriesApi,
        useClass: apiImplementations.timeTrackingEntriesApi
      },
      {
        provide: TypeaheadApi,
        useClass: apiImplementations.typeaheadApi
      },
      {
        provide: UserTaskListsApi,
        useClass: apiImplementations.userTaskListsApi
      },
      {
        provide: UsersApi,
        useClass: apiImplementations.usersApi
      },
      {
        provide: WebhooksApi,
        useClass: apiImplementations.webhooksApi
      },
      {
        provide: WorkspaceMembershipsApi,
        useClass: apiImplementations.workspaceMembershipsApi
      },
      {
        provide: WorkspacesApi,
        useClass: apiImplementations.workspacesApi
      },
    ];

    return {
      module: ApiModule,
      controllers: [
        AccessRequestsApiController,
        AllocationsApiController,
        AttachmentsApiController,
        AuditLogAPIApiController,
        BatchAPIApiController,
        BudgetsApiController,
        CustomFieldSettingsApiController,
        CustomFieldsApiController,
        CustomTypesApiController,
        EventsApiController,
        ExportsApiController,
        GoalRelationshipsApiController,
        GoalsApiController,
        JobsApiController,
        MembershipsApiController,
        OrganizationExportsApiController,
        PortfolioMembershipsApiController,
        PortfoliosApiController,
        ProjectBriefsApiController,
        ProjectMembershipsApiController,
        ProjectStatusesApiController,
        ProjectTemplatesApiController,
        ProjectsApiController,
        RatesApiController,
        ReactionsApiController,
        RulesApiController,
        SectionsApiController,
        StatusUpdatesApiController,
        StoriesApiController,
        TagsApiController,
        TaskTemplatesApiController,
        TasksApiController,
        TeamMembershipsApiController,
        TeamsApiController,
        TimePeriodsApiController,
        TimeTrackingEntriesApiController,
        TypeaheadApiController,
        UserTaskListsApiController,
        UsersApiController,
        WebhooksApiController,
        WorkspaceMembershipsApiController,
        WorkspacesApiController,
      ],
      providers: [
        ...providers,
        TaskService,
        ProjectService,
      ],
      imports: [
        TypeOrmModule.forFeature([
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
        ]),
      ],
      exports: [...providers]
    }
  }
}