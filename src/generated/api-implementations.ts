// src/generated/api-implementations.ts
import { Type } from '@nestjs/common';
import { AccessRequestsApi } from './api';
import { AllocationsApi } from './api';
import { AttachmentsApi } from './api';
import { AuditLogAPIApi } from './api';
import { BatchAPIApi } from './api';
import { BudgetsApi } from './api';
import { CustomFieldSettingsApi } from './api';
import { CustomFieldsApi } from './api';
import { CustomTypesApi } from './api';
import { EventsApi } from './api';
import { ExportsApi } from './api';
import { GoalRelationshipsApi } from './api';
import { GoalsApi } from './api';
import { JobsApi } from './api';
import { MembershipsApi } from './api';
import { OrganizationExportsApi } from './api';
import { PortfolioMembershipsApi } from './api';
import { PortfoliosApi } from './api';
import { ProjectBriefsApi } from './api';
import { ProjectMembershipsApi } from './api';
import { ProjectStatusesApi } from './api';
import { ProjectTemplatesApi } from './api';
import { ProjectsApi } from './api';
import { ProjectsApiImpl } from '../implementations/projects-api.impl';
import { TasksApiImpl } from '../implementations/tasks-api.impl';
import { UsersApiImpl } from '../implementations/users-api.impl';
import { WorkspacesApiImpl } from '../implementations/workspaces-api.impl';
import { TeamsApiImpl } from '../implementations/teams-api.impl';
import { TagsApiImpl } from '../implementations/tags-api.impl';
import { SectionsApiImpl } from '../implementations/sections-api.impl';
import { StoriesApiImpl } from '../implementations/stories-api.impl';
import { ProjectStatusesApiImpl } from '../implementations/projectstatuses-api.impl';
import { StatusUpdatesApiImpl } from '../implementations/statusupdates-api.impl';
import { AttachmentsApiImpl } from '../implementations/attachments-api.impl';
import { EventsApiImpl } from '../implementations/events-api.impl';
import { BatchAPIApiImpl } from '../implementations/batch-apiapi.impl';
import { WebhooksApiImpl } from '../implementations/webhooks-api.impl';
import { CustomFieldsApiImpl } from '../implementations/customfields-api.impl';
import { JobsApiImpl } from '../implementations/jobs-api.impl';
import { ProjectMembershipsApiImpl } from '../implementations/projectmemberships-api.impl';
import { TeamMembershipsApiImpl } from '../implementations/teammemberships-api.impl';
import { WorkspaceMembershipsApiImpl } from '../implementations/workspacememberships-api.impl';
import { MembershipsApiImpl } from '../implementations/memberships-api.impl';
import { ReactionsApiImpl } from '../implementations/reactions-api.impl';
import { UserTaskListsApiImpl } from '../implementations/usertasklists-api.impl';
import { ProjectBriefsApiImpl } from '../implementations/projectbriefs-api.impl';
import { TypeaheadApiImpl } from '../implementations/typeahead-api.impl';
import { RatesApi } from './api';
import { ReactionsApi } from './api';
import { RulesApi } from './api';
import { SectionsApi } from './api';
import { StatusUpdatesApi } from './api';
import { StoriesApi } from './api';
import { TagsApi } from './api';
import { TaskTemplatesApi } from './api';
import { TasksApi } from './api';
import { TeamMembershipsApi } from './api';
import { TeamsApi } from './api';
import { TimePeriodsApi } from './api';
import { TimeTrackingEntriesApi } from './api';
import { TypeaheadApi } from './api';
import { UserTaskListsApi } from './api';
import { UsersApi } from './api';
import { WebhooksApi } from './api';
import { WorkspaceMembershipsApi } from './api';
import { WorkspacesApi } from './api';

export const ApiImplementations = {
  accessRequestsApi: AccessRequestsApi,
  allocationsApi: AllocationsApi,
  attachmentsApi: AttachmentsApiImpl,
  auditLogAPIApi: AuditLogAPIApi,
  batchAPIApi: BatchAPIApiImpl,
  budgetsApi: BudgetsApi,
  customFieldSettingsApi: CustomFieldSettingsApi,
  customFieldsApi: CustomFieldsApiImpl,
  customTypesApi: CustomTypesApi,
  eventsApi: EventsApiImpl,
  exportsApi: ExportsApi,
  goalRelationshipsApi: GoalRelationshipsApi,
  goalsApi: GoalsApi,
  jobsApi: JobsApiImpl,
  membershipsApi: MembershipsApiImpl,
  organizationExportsApi: OrganizationExportsApi,
  portfolioMembershipsApi: PortfolioMembershipsApi,
  portfoliosApi: PortfoliosApi,
  projectBriefsApi: ProjectBriefsApiImpl,
  projectMembershipsApi: ProjectMembershipsApiImpl,
  projectStatusesApi: ProjectStatusesApiImpl,
  projectTemplatesApi: ProjectTemplatesApi,
  projectsApi: ProjectsApiImpl,
  ratesApi: RatesApi,
  reactionsApi: ReactionsApiImpl,
  rulesApi: RulesApi,
  sectionsApi: SectionsApiImpl,
  statusUpdatesApi: StatusUpdatesApiImpl,
  storiesApi: StoriesApiImpl,
  tagsApi: TagsApiImpl,
  taskTemplatesApi: TaskTemplatesApi,
  tasksApi: TasksApiImpl,
  teamMembershipsApi: TeamMembershipsApiImpl,
  teamsApi: TeamsApiImpl,
  timePeriodsApi: TimePeriodsApi,
  timeTrackingEntriesApi: TimeTrackingEntriesApi,
  typeaheadApi: TypeaheadApiImpl,
  userTaskListsApi: UserTaskListsApiImpl,
  usersApi: UsersApiImpl,
  webhooksApi: WebhooksApiImpl,
  workspaceMembershipsApi: WorkspaceMembershipsApiImpl,
  workspacesApi: WorkspacesApiImpl,
};

export type ApiImplementationsType = { accessRequestsApi: Type<AccessRequestsApi>, allocationsApi: Type<AllocationsApi>, attachmentsApi: Type<AttachmentsApi>, auditLogAPIApi: Type<AuditLogAPIApi>, batchAPIApi: Type<BatchAPIApi>, budgetsApi: Type<BudgetsApi>, customFieldSettingsApi: Type<CustomFieldSettingsApi>, customFieldsApi: Type<CustomFieldsApi>, customTypesApi: Type<CustomTypesApi>, eventsApi: Type<EventsApi>, exportsApi: Type<ExportsApi>, goalRelationshipsApi: Type<GoalRelationshipsApi>, goalsApi: Type<GoalsApi>, jobsApi: Type<JobsApi>, membershipsApi: Type<MembershipsApi>, organizationExportsApi: Type<OrganizationExportsApi>, portfolioMembershipsApi: Type<PortfolioMembershipsApi>, portfoliosApi: Type<PortfoliosApi>, projectBriefsApi: Type<ProjectBriefsApi>, projectMembershipsApi: Type<ProjectMembershipsApi>, projectStatusesApi: Type<ProjectStatusesApi>, projectTemplatesApi: Type<ProjectTemplatesApi>, projectsApi: Type<ProjectsApi>, ratesApi: Type<RatesApi>, reactionsApi: Type<ReactionsApi>, rulesApi: Type<RulesApi>, sectionsApi: Type<SectionsApi>, statusUpdatesApi: Type<StatusUpdatesApi>, storiesApi: Type<StoriesApi>, tagsApi: Type<TagsApi>, taskTemplatesApi: Type<TaskTemplatesApi>, tasksApi: Type<TasksApi>, teamMembershipsApi: Type<TeamMembershipsApi>, teamsApi: Type<TeamsApi>, timePeriodsApi: Type<TimePeriodsApi>, timeTrackingEntriesApi: Type<TimeTrackingEntriesApi>, typeaheadApi: Type<TypeaheadApi>, userTaskListsApi: Type<UserTaskListsApi>, usersApi: Type<UsersApi>, webhooksApi: Type<WebhooksApi>, workspaceMembershipsApi: Type<WorkspaceMembershipsApi>, workspacesApi: Type<WorkspacesApi> };
