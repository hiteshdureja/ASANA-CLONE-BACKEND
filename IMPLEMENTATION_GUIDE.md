# Implementation Guide

This guide explains how to implement all API services to match Asana's API behavior exactly.

## Architecture

- **Entities**: TypeORM entities in `src/entities/` represent database tables
- **Services**: Business logic services in `src/services/` handle database operations
- **Mappers**: Convert between entities and API models in `src/mappers/`
- **Implementations**: API implementations in `src/implementations/` extend generated abstract classes

## Implementation Pattern

1. **Create Entity** (if needed) - Add TypeORM entity in `src/entities/`
2. **Create Service** - Add business logic service in `src/services/`
3. **Create Mapper** - Add mapper in `src/mappers/` to convert entities ↔ API models
4. **Implement API** - Complete the implementation in `src/implementations/`

## Example: ProjectsApi

See `src/implementations/projects-api.impl.ts` for a complete example.

## Status

- ✅ **ProjectsApi**: Fully implemented with database operations
- ⏳ **Other APIs**: Stub implementations generated, ready for implementation

## Next Steps

1. Implement TasksApi (most critical after Projects)
2. Implement UsersApi, WorkspacesApi, TeamsApi
3. Implement remaining services following the same pattern

