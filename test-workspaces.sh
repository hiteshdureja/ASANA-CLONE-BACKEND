#!/bin/bash

# Test Workspaces API - Local
echo "=== Testing Local Workspaces API ==="
echo ""

# Get all workspaces
echo "1. GET /workspaces (List all workspaces)"
curl -X GET "http://localhost:3000/workspaces" \
  -H "Content-Type: application/json" \
  -w "\n\nStatus: %{http_code}\n" \
  | jq '.' 2>/dev/null || cat

echo ""
echo "---"
echo ""

# Get workspace with opt_fields
echo "2. GET /workspaces?opt_fields=name,is_organization"
curl -X GET "http://localhost:3000/workspaces?opt_fields=name,is_organization" \
  -H "Content-Type: application/json" \
  -w "\n\nStatus: %{http_code}\n" \
  | jq '.' 2>/dev/null || cat

echo ""
echo "---"
echo ""

# Get specific workspace (replace WORKSPACE_GID with actual GID)
echo "3. GET /workspaces/:workspace_gid (Get specific workspace)"
echo "Replace WORKSPACE_GID with an actual workspace GID from step 1"
curl -X GET "http://localhost:3000/workspaces/WORKSPACE_GID" \
  -H "Content-Type: application/json" \
  -w "\n\nStatus: %{http_code}\n" \
  | jq '.' 2>/dev/null || cat

echo ""
echo "=========================================="
echo ""

# Test Asana API (requires ASANA_API_KEY in environment)
if [ -z "$ASANA_API_KEY" ]; then
  echo "⚠️  ASANA_API_KEY not set. Skipping Asana API tests."
  echo "   Set it with: export ASANA_API_KEY=your_key"
else
  echo "=== Testing Asana Workspaces API (for comparison) ==="
  echo ""
  
  echo "1. GET /workspaces (List all workspaces)"
  curl -X GET "https://app.asana.com/api/1.0/workspaces" \
    -H "Authorization: Bearer $ASANA_API_KEY" \
    -H "Content-Type: application/json" \
    -w "\n\nStatus: %{http_code}\n" \
    | jq '.' 2>/dev/null || cat
  
  echo ""
  echo "---"
  echo ""
  
  echo "2. GET /workspaces?opt_fields=name,is_organization"
  curl -X GET "https://app.asana.com/api/1.0/workspaces?opt_fields=name,is_organization" \
    -H "Authorization: Bearer $ASANA_API_KEY" \
    -H "Content-Type: application/json" \
    -w "\n\nStatus: %{http_code}\n" \
    | jq '.' 2>/dev/null || cat
fi

