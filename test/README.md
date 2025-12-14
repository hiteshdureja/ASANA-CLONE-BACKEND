# Asana API Comparison Tests

This test suite compares responses from the Asana API with the local API implementation to ensure compatibility.

## Prerequisites

1. **ASANA_API_KEY** must be set in your `.env` file
2. The local API server should be running (or tests will start it automatically)
3. Database should be configured and accessible

## Running Tests

```bash
# Run all comparison tests
npm run test:e2e

# Run with coverage
npm run test:cov

# Run in watch mode
npm run test:watch
```

## Test Structure

The tests compare:
- Response status codes
- Response data structures
- Error handling
- Pagination
- Field filtering (opt_fields)

## What Gets Tested

1. **GET /users/me** - User information
2. **GET /workspaces** - Workspace list
3. **POST /projects** - Project creation
4. **GET /projects** - Project list with pagination
5. **GET /projects/:project_gid** - Project details
6. **POST /tasks** - Task creation
7. **GET /tasks** - Task list with pagination
8. **Error Handling** - 404 and 400 responses
9. **Field Filtering** - opt_fields parameter

## Notes

- Tests create test data and clean it up automatically
- Some tests may be skipped if required test data (workspace, user) is not available
- The comparison normalizes responses to ignore fields that may differ (like GIDs, timestamps)

