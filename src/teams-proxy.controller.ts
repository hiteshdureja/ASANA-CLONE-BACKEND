import { Controller, Get, Query, Req, BadRequestException } from '@nestjs/common';
import { TeamsApi } from './generated/api';
import { GetTeamsForWorkspace200Response } from './generated/models';
import { Request } from 'express';

@Controller('teams')
export class TeamsProxyController {
    constructor(private readonly teamsApi: TeamsApi) { }

    @Get()
    async getTeams(
        @Query('workspace') workspace: string,
        @Query('organization') organization: string,
        @Query('user') user: string,
        @Query('optPretty') optPretty: boolean,
        @Query('limit') limit: number,
        @Query('offset') offset: string,
        @Query('optFields') optFields: any[],
        @Req() request: any,
    ): Promise<any> {

        // Prioritize workspace/organization
        const workspaceGid = workspace || organization;
        if (workspaceGid) {
            return await this.teamsApi.getTeamsForWorkspace(workspaceGid, optPretty, limit, offset, optFields, request);
        }

        // Then user
        if (user) {
            return await this.teamsApi.getTeamsForUser(user, organization, optPretty, limit, offset, optFields, request);
        }

        // Currently, typical Asana behavior requires workspace or organization for listing 'public' teams.
        // However, if no filters, we might throw or return empty.
        // Asana API usually returns 400 if no workspace specified for getting teams?
        // Let's assume we REQUIRE workspace or user.
        throw new BadRequestException('Workspace or User filter is required to list teams.');
    }
}
