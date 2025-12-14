#!/bin/bash

# Seed database using API endpoints
# Make sure your server is running: npm run start:dev

BASE_URL="http://localhost:3000"

echo "🌱 Seeding database via API endpoints..."
echo ""

# 1. Create Workspace
echo "1. Creating workspace..."
WORKSPACE_RESPONSE=$(curl -s -X POST "$BASE_URL/workspaces" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Acme Corporation",
      "is_organization": true,
      "email_domains": ["acme.com", "acme-corp.com"]
    }
  }')

WORKSPACE_GID=$(echo $WORKSPACE_RESPONSE | jq -r '.data.gid')
echo "✅ Created workspace: $WORKSPACE_GID"
echo ""

# 2. Create Users (Note: Users API might not have POST endpoint, so we'll skip for now)
echo "2. Note: User creation via API may not be available"
echo "   You may need to create users directly in the database or via seed script"
echo ""

# 3. Create Project
echo "3. Creating project..."
PROJECT_RESPONSE=$(curl -s -X POST "$BASE_URL/projects" \
  -H "Content-Type: application/json" \
  -d "{
    \"data\": {
      \"name\": \"Website Redesign\",
      \"workspace\": \"$WORKSPACE_GID\",
      \"notes\": \"Complete redesign of the company website\",
      \"color\": \"blue\"
    }
  }")

PROJECT_GID=$(echo $PROJECT_RESPONSE | jq -r '.data.gid')
echo "✅ Created project: $PROJECT_GID"
echo ""

# 4. Create Tag
echo "4. Creating tag..."
TAG_RESPONSE=$(curl -s -X POST "$BASE_URL/tags" \
  -H "Content-Type: application/json" \
  -d "{
    \"data\": {
      \"name\": \"urgent\",
      \"workspace\": \"$WORKSPACE_GID\",
      \"color\": \"red\"
    }
  }")

TAG_GID=$(echo $TAG_RESPONSE | jq -r '.data.gid')
echo "✅ Created tag: $TAG_GID"
echo ""

# 5. Create Task
echo "5. Creating task..."
TASK_RESPONSE=$(curl -s -X POST "$BASE_URL/tasks" \
  -H "Content-Type: application/json" \
  -d "{
    \"data\": {
      \"name\": \"Design homepage mockup\",
      \"workspace\": \"$WORKSPACE_GID\",
      \"notes\": \"Create initial design mockup for the homepage\"
    }
  }")

TASK_GID=$(echo $TASK_RESPONSE | jq -r '.data.gid')
echo "✅ Created task: $TASK_GID"
echo ""

# 6. Add task to project
echo "6. Adding task to project..."
curl -s -X POST "$BASE_URL/tasks/$TASK_GID/addProject" \
  -H "Content-Type: application/json" \
  -d "{
    \"data\": {
      \"project\": \"$PROJECT_GID\"
    }
  }" > /dev/null
echo "✅ Added task to project"
echo ""

# 7. Add tag to task
echo "7. Adding tag to task..."
curl -s -X POST "$BASE_URL/tasks/$TASK_GID/addTag" \
  -H "Content-Type: application/json" \
  -d "{
    \"data\": {
      \"tag\": \"$TAG_GID\"
    }
  }" > /dev/null
echo "✅ Added tag to task"
echo ""

echo "✅ Seeding completed!"
echo ""
echo "📊 Created resources:"
echo "   Workspace GID: $WORKSPACE_GID"
echo "   Project GID: $PROJECT_GID"
echo "   Tag GID: $TAG_GID"
echo "   Task GID: $TASK_GID"
echo ""
echo "🧪 Test the APIs:"
echo "   curl $BASE_URL/workspaces"
echo "   curl $BASE_URL/projects"
echo "   curl $BASE_URL/tasks"
echo "   curl $BASE_URL/tags"

