# La-Rouine API Specification

## OpenAPI 3.0 Schema

Below is the complete API specification for the La-Rouine platform MVP.

\`\`\`yaml
openapi: 3.0.3
info:
  title: La-Rouine API
  description: |
    REST API for La-Rouine youth social platform. 
    Supports authentication, posts, events, challenges, clubs, and gamification.
  version: 1.0.0
  contact:
    name: La-Rouine Team
    email: dev@larouine.app

servers:
  - url: https://api.larouine.app/v1
    description: Production server
  - url: https://staging-api.larouine.app/v1
    description: Staging server
  - url: http://localhost:3000/api/v1
    description: Local development

tags:
  - name: auth
    description: Authentication operations
  - name: users
    description: User management
  - name: posts
    description: Posts, events, and challenges
  - name: clubs
    description: Club management
  - name: challenges
    description: Challenge submissions
  - name: leaderboard
    description: Points and rankings
  - name: admin
    description: Administrative operations

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        username:
          type: string
          minLength: 3
          maxLength: 30
        displayName:
          type: string
          maxLength: 100
        avatar:
          type: string
          format: uri
        phone:
          type: string
          nullable: true
        bio:
          type: string
          maxLength: 500
        cityZone:
          type: string
        points:
          type: integer
          minimum: 0
        badges:
          type: array
          items:
            type: string
        createdAt:
          type: string
          format: date-time

    Post:
      type: object
      properties:
        id:
          type: string
          format: uuid
        type:
          type: string
          enum: [post, event, challenge]
        authorId:
          type: string
          format: uuid
        author:
          $ref: '#/components/schemas/User'
        clubId:
          type: string
          format: uuid
          nullable: true
        title:
          type: string
          maxLength: 200
        body:
          type: string
          maxLength: 5000
        mediaUrl:
          type: string
          format: uri
          nullable: true
        meta:
          type: object
          additionalProperties: true
        likes:
          type: integer
          minimum: 0
        comments:
          type: integer
          minimum: 0
        createdAt:
          type: string
          format: date-time
        expiresAt:
          type: string
          format: date-time
          nullable: true

    Club:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
          maxLength: 100
        slug:
          type: string
          pattern: '^[a-z0-9-]+$'
        description:
          type: string
          maxLength: 500
        ownerId:
          type: string
          format: uuid
        privacy:
          type: string
          enum: [public, private]
        tags:
          type: array
          items:
            type: string
        avatar:
          type: string
          format: uri
        members:
          type: integer
          minimum: 0
        createdAt:
          type: string
          format: date-time

    Submission:
      type: object
      properties:
        id:
          type: string
          format: uuid
        challengeId:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        user:
          $ref: '#/components/schemas/User'
        mediaUrl:
          type: string
          format: uri
        text:
          type: string
          maxLength: 1000
        status:
          type: string
          enum: [pending, approved, rejected]
        votes:
          type: integer
        createdAt:
          type: string
          format: date-time

    LeaderboardEntry:
      type: object
      properties:
        rank:
          type: integer
        user:
          $ref: '#/components/schemas/User'
        points:
          type: integer
        period:
          type: string
          enum: [daily, weekly, monthly, all-time]

    Error:
      type: object
      properties:
        error:
          type: string
        message:
          type: string
        code:
          type: string

paths:
  /auth/signup:
    post:
      tags: [auth]
      summary: Create new user account
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [username, displayName, cityZone]
              properties:
                username:
                  type: string
                displayName:
                  type: string
                phone:
                  type: string
                cityZone:
                  type: string
                avatar:
                  type: string
                  format: uri
      responses:
        '201':
          description: Account created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                  user:
                    $ref: '#/components/schemas/User'
        '400':
          description: Invalid input
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/login:
    post:
      tags: [auth]
      summary: Login with username
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [username]
              properties:
                username:
                  type: string
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                  user:
                    $ref: '#/components/schemas/User'

  /auth/me:
    get:
      tags: [auth]
      summary: Get current user profile
      security:
        - bearerAuth: []
      responses:
        '200':
          description: User profile
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

  /feed:
    get:
      tags: [posts]
      summary: Get activity feed
      security:
        - bearerAuth: []
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
        - name: type
          in: query
          schema:
            type: string
            enum: [post, event, challenge]
        - name: clubId
          in: query
          schema:
            type: string
            format: uuid
        - name: cityZone
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Feed posts
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Post'
                  total:
                    type: integer
                  page:
                    type: integer
                  hasMore:
                    type: boolean

  /posts:
    post:
      tags: [posts]
      summary: Create new post/event/challenge
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [type, title, body]
              properties:
                type:
                  type: string
                  enum: [post, event, challenge]
                title:
                  type: string
                body:
                  type: string
                mediaUrl:
                  type: string
                clubId:
                  type: string
                  format: uuid
                meta:
                  type: object
      responses:
        '201':
          description: Post created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Post'

  /posts/{id}:
    get:
      tags: [posts]
      summary: Get post by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Post details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Post'

    delete:
      tags: [posts]
      summary: Delete post
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '204':
          description: Post deleted

  /posts/{id}/like:
    post:
      tags: [posts]
      summary: Like a post
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Like added
          content:
            application/json:
              schema:
                type: object
                properties:
                  likes:
                    type: integer

  /challenges/{id}/submissions:
    post:
      tags: [challenges]
      summary: Submit proof for challenge
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                media:
                  type: string
                  format: binary
                text:
                  type: string
      responses:
        '201':
          description: Submission created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Submission'

    get:
      tags: [challenges]
      summary: Get challenge submissions
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: status
          in: query
          schema:
            type: string
            enum: [pending, approved, rejected]
      responses:
        '200':
          description: List of submissions
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Submission'

  /clubs:
    get:
      tags: [clubs]
      summary: List all clubs
      parameters:
        - name: page
          in: query
          schema:
            type: integer
        - name: search
          in: query
          schema:
            type: string
      responses:
        '200':
          description: List of clubs
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Club'

    post:
      tags: [clubs]
      summary: Create new club
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name, slug, description]
              properties:
                name:
                  type: string
                slug:
                  type: string
                description:
                  type: string
                privacy:
                  type: string
                  enum: [public, private]
                tags:
                  type: array
                  items:
                    type: string
      responses:
        '201':
          description: Club created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Club'

  /clubs/{id}/members:
    post:
      tags: [clubs]
      summary: Join club
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Joined club successfully

    delete:
      tags: [clubs]
      summary: Leave club
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '204':
          description: Left club successfully

  /events/{id}/rsvp:
    post:
      tags: [posts]
      summary: RSVP to event
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: RSVP confirmed
          content:
            application/json:
              schema:
                type: object
                properties:
                  attendeesCount:
                    type: integer

  /leaderboard:
    get:
      tags: [leaderboard]
      summary: Get leaderboard rankings
      parameters:
        - name: period
          in: query
          schema:
            type: string
            enum: [daily, weekly, monthly, all-time]
            default: monthly
        - name: cityZone
          in: query
          schema:
            type: string
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
      responses:
        '200':
          description: Leaderboard rankings
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/LeaderboardEntry'

  /admin/submissions/{id}/approve:
    post:
      tags: [admin]
      summary: Approve submission
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Submission approved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Submission'

  /admin/submissions/{id}/reject:
    post:
      tags: [admin]
      summary: Reject submission
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                reason:
                  type: string
      responses:
        '200':
          description: Submission rejected
\`\`\`

## Rate Limiting

- **Anonymous users**: 60 requests/hour
- **Authenticated users**: 600 requests/hour  
- **Upload endpoints**: 20 requests/hour

## Authentication

All protected endpoints require a JWT token in the Authorization header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

Tokens expire after 30 days and should be refreshed using the /auth/refresh endpoint.

## File Uploads

Media uploads use pre-signed URLs:
1. Request upload URL from /uploads/request
2. Upload file directly to storage using returned URL
3. Include final URL in post/submission creation

Maximum file sizes:
- Images: 10MB
- Videos: 100MB
