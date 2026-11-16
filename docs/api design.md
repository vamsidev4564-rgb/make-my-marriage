# MAKE MY MARRIAGE
## API Design and Specification Document

**Document Version:** 1.0  
**Date:** 8 November 2026  
**Backend:** Python + FastAPI  
**Frontend:** Next.js  
**Database:** MongoDB Atlas  
**API Architecture:** REST  
**API Version:** v1  
**Architecture:** Modular Monolith

---

# 1. Introduction

## 1.1 Purpose

This document defines the REST API architecture for Make My Marriage.

It specifies:

- API endpoint names.
- HTTP methods.
- Request parameters.
- Request bodies.
- Response structures.
- Authentication requirements.
- Authorization requirements.
- Error handling.
- API security.
- Integration with external services.

The document will be used as the implementation reference when developing the FastAPI backend.

## 1.2 API Base URL

Development:

`http://localhost:8000/api/v1`

Production:

`https://api.makemymarriage.com/api/v1`

All API requests and responses use JSON unless the endpoint explicitly handles file uploads or downloads.

## 1.3 HTTP Methods

| Method | Purpose |
|---|---|
| GET | Retrieve information |
| POST | Create a resource or perform an action |
| PUT | Replace a resource |
| PATCH | Update selected fields |
| DELETE | Delete or deactivate a resource |

---

# 2. API Architecture

The API will follow a modular monolithic structure.

```text
Next.js Frontend
       |
       | HTTPS / JSON
       |
       v
FastAPI Application
       |
       +-- Authentication APIs
       +-- User APIs
       +-- Wedding APIs
       +-- Member APIs
       +-- Event APIs
       +-- Task APIs
       +-- Guest APIs
       +-- Invitation APIs
       +-- RSVP APIs
       +-- Expense APIs
       +-- Vendor APIs
       +-- Shopping APIs
       +-- Gallery APIs
       +-- Notification APIs
       +-- Public Website APIs
       +-- Audit APIs
       |
       v
MongoDB Atlas
       |
       +-- users
       +-- weddings
       +-- wedding_members
       +-- events
       +-- tasks
       +-- guests
       +-- expenses
       +-- vendors
       +-- media
       +-- notifications
       +-- audit_logs
```

Each module owns its endpoints, validation schemas and business logic.

---

# 3. Standard API Response Structure

All APIs should follow a consistent response format.

## 3.1 Successful Response

Example:

```json
{
  "success": true,
  "message": "Wedding created successfully",
  "data": {
    "id": "wedding_001",
    "title": "Rahul and Priya Wedding",
    "status": "planning"
  }
}
```

## 3.2 Error Response

Example:

```json
{
  "success": false,
  "message": "You do not have permission to perform this action",
  "error_code": "FORBIDDEN"
}
```

## 3.3 HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 202 | Request accepted for background processing |
| 204 | Successful request with no response body |
| 400 | Invalid request |
| 401 | Authentication required |
| 403 | Permission denied |
| 404 | Resource not found |
| 409 | Resource conflict |
| 422 | Validation error |
| 429 | Too many requests |
| 500 | Internal server error |
| 502 | External provider failure |

Use `401` for unauthenticated requests and `403` for authenticated users who lack permission. For sensitive resources, the application may return `404` to avoid revealing their existence.

---

# 4. Authentication API Module

Purpose: Allow users to register and log in securely.

Supported methods:

- Google Sign-In.
- Email OTP.

Confirmed OTP requirement:

- Six digits.
- Five-minute expiry.

## 4.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/request-otp` | Request email OTP |
| POST | `/auth/verify-otp` | Verify OTP |
| POST | `/auth/google` | Google authentication |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Get current authenticated user |
| POST | `/auth/link-google` | Link Google identity to account |
| POST | `/auth/link-email` | Link verified email identity |

## 4.2 Request OTP

**POST** `/auth/request-otp`

Request:

```json
{
  "email": "rahul@example.com",
  "purpose": "login"
}
```

Response:

```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "expires_in": 300
  }
}
```

Backend responsibilities:

1. Validate email.
2. Generate six-digit OTP.
3. Store secure OTP hash.
4. Set five-minute expiry.
5. Send email.
6. Apply resend and attempt limits.

## 4.3 Verify OTP

**POST** `/auth/verify-otp`

Request:

```json
{
  "email": "rahul@example.com",
  "otp": "123456",
  "purpose": "login"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_001",
      "full_name": "Rahul Kumar",
      "email": "rahul@example.com"
    }
  }
}
```

The backend should establish an authenticated session using a secure browser cookie.

The OTP must be consumed after successful verification.

## 4.4 Google Login

**POST** `/auth/google`

Request:

```json
{
  "id_token": "GOOGLE_ID_TOKEN"
}
```

Backend responsibilities:

- Verify Google ID token.
- Validate issuer, audience and expiry.
- Resolve the user identity.
- Link accounts only through a secure verified process.
- Establish an application session.

Never trust user identity details supplied directly by the frontend without token verification.

---

# 5. User API Module

Purpose: Manage user profile information.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/users/me` | Get user profile |
| PATCH | `/users/me` | Update user profile |
| PATCH | `/users/me/phone` | Update phone number |
| POST | `/users/me/verify-phone` | Verify phone number |
| GET | `/users/me/weddings` | List weddings the user participates in |

## 5.1 Get Current User

**GET** `/users/me`

Response:

```json
{
  "success": true,
  "data": {
    "id": "user_001",
    "full_name": "Rahul Kumar",
    "email": "rahul@example.com",
    "phone": "+919876543210"
  }
}
```

---

# 6. Wedding API Module

Purpose: Create, retrieve and manage weddings.

One user can create multiple weddings or participate in multiple weddings.

Each wedding has two equal owners: bride and groom.

## 6.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/weddings` | Create wedding |
| GET | `/weddings` | List accessible weddings |
| GET | `/weddings/{wedding_id}` | Get wedding details |
| PATCH | `/weddings/{wedding_id}` | Update wedding |
| POST | `/weddings/{wedding_id}/archive` | Archive wedding |
| POST | `/weddings/{wedding_id}/restore` | Restore archived wedding |
| GET | `/weddings/{wedding_id}/dashboard` | Get wedding dashboard |
| GET | `/weddings/{wedding_id}/summary` | Get wedding summary |

## 6.2 Create Wedding

**POST** `/weddings`

Request:

```json
{
  "title": "Rahul and Priya Wedding",
  "bride": {
    "user_id": "user_001",
    "name": "Priya"
  },
  "groom": {
    "user_id": "user_002",
    "name": "Rahul"
  },
  "wedding_date": "2027-02-15",
  "timezone": "Asia/Kolkata",
  "venue": {
    "name": "Convention Hall",
    "address": "Nellore, Andhra Pradesh"
  }
}
```

Response:

```json
{
  "success": true,
  "message": "Wedding created successfully",
  "data": {
    "wedding_id": "wedding_001",
    "title": "Rahul and Priya Wedding",
    "status": "planning"
  }
}
```

Backend responsibilities:

- Validate bride and groom.
- Ensure the two owners are distinct.
- Ensure the creator is authorised to create the wedding.
- Create the wedding document.
- Create two owner membership records.
- Create default wedding settings.
- Record the action in the audit log.

These related records should be created atomically where possible using a MongoDB transaction.

---

# 7. Wedding Member API Module

Purpose: Manage wedding members, family invitations and permissions.

## 7.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/weddings/{id}/members` | List members |
| GET | `/weddings/{id}/members/{member_id}` | Get member |
| PATCH | `/weddings/{id}/members/{member_id}/permissions` | Update permissions |
| DELETE | `/weddings/{id}/members/{member_id}` | Remove member |
| POST | `/weddings/{id}/members/{member_id}/removal-approvals` | Submit removal approval |

## 7.2 Invite Family Member

**POST** `/weddings/{id}/family-invitations`

Request:

```json
{
  "full_name": "Anjali",
  "email": "anjali@example.com",
  "phone": "+919876543210",
  "relationship": "sister",
  "role": "family_member",
  "permissions": {
    "manage_events": true,
    "manage_tasks": true,
    "manage_guests": true,
    "send_guest_invitations": false,
    "view_expenses": false,
    "manage_gallery": true
  }
}
```

Response:

```json
{
  "success": true,
  "message": "Family invitation created",
  "data": {
    "invitation_id": "family_invitation_001",
    "status": "pending"
  }
}
```

Only bride and groom can invite family members.

## 7.3 Accept Family Invitation

**POST** `/family-invitations/accept`

Request:

```json
{
  "token": "SECURE_INVITATION_TOKEN"
}
```

Backend responsibilities:

- Validate token.
- Validate expiry and invitation status.
- Verify the accepting user's identity.
- Create wedding membership.
- Mark invitation as accepted.
- Record the action.

## 7.4 Update Member Permissions

**PATCH** `/weddings/{id}/members/{member_id}/permissions`

Request:

```json
{
  "permissions": {
    "manage_events": true,
    "manage_tasks": true,
    "manage_guests": false,
    "send_guest_invitations": false,
    "manage_gallery": true
  }
}
```

Only authorised owners can modify permissions.

Managers cannot grant themselves additional permissions.

---

# 8. Event API Module

Purpose: Manage Haldi, Mehendi, Sangeet, Wedding, Reception and custom events.

## 8.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/weddings/{id}/events` | Create event |
| GET | `/weddings/{id}/events` | List events |
| GET | `/weddings/{id}/events/{event_id}` | Get event |
| PATCH | `/weddings/{id}/events/{event_id}` | Update event |
| DELETE | `/weddings/{id}/events/{event_id}` | Delete event |

## 8.2 Create Event

**POST** `/weddings/{id}/events`

Request:

```json
{
  "title": "Haldi Ceremony",
  "event_type": "haldi",
  "description": "Family Haldi celebration",
  "start_date": "2027-02-13T10:00:00+05:30",
  "end_date": "2027-02-13T13:00:00+05:30",
  "venue": {
    "name": "Wedding Home",
    "address": "Nellore"
  },
  "visibility": "public"
}
```

Response:

```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "event_id": "event_001",
    "title": "Haldi Ceremony"
  }
}
```

---

# 9. Task API Module

Purpose: Assign, manage and track wedding tasks.

## 9.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/weddings/{id}/tasks` | Create task |
| GET | `/weddings/{id}/tasks` | List tasks |
| GET | `/weddings/{id}/tasks/{task_id}` | Get task |
| PATCH | `/weddings/{id}/tasks/{task_id}` | Update task |
| DELETE | `/weddings/{id}/tasks/{task_id}` | Delete task |
| PATCH | `/weddings/{id}/tasks/{task_id}/status` | Update task status |

## 9.2 Create Task

**POST** `/weddings/{id}/tasks`

Request:

```json
{
  "title": "Book wedding photographer",
  "description": "Confirm photographer",
  "event_id": "event_001",
  "assigned_to": "user_003",
  "priority": "high",
  "due_date": "2027-01-10"
}
```

Response:

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task_id": "task_001",
    "status": "todo"
  }
}
```

---

# 10. Guest API Module

Purpose: Manage wedding guests.

Guests do not need platform accounts.

## 10.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/weddings/{id}/guests` | Add guest |
| GET | `/weddings/{id}/guests` | List guests |
| GET | `/weddings/{id}/guests/{guest_id}` | Get guest |
| PATCH | `/weddings/{id}/guests/{guest_id}` | Update guest |
| DELETE | `/weddings/{id}/guests/{guest_id}` | Archive or remove guest |
| GET | `/weddings/{id}/guests/summary` | Guest summary |

Any family member can add guests, subject to active wedding membership.

## 10.2 Add Guest

**POST** `/weddings/{id}/guests`

Request:

```json
{
  "full_name": "Suresh Kumar",
  "email": "suresh@example.com",
  "phone": "+919876543210",
  "guest_group": "family"
}
```

Response:

```json
{
  "success": true,
  "message": "Guest added successfully",
  "data": {
    "guest_id": "guest_001"
  }
}
```

Guest editing and deletion permissions must be validated against the final guest management policy.

---

# 11. Guest Invitation API Module

Purpose: Generate guest-specific invitation links and send invitations.

Bride, groom and authorised managers can send guest invitations.

## 11.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/weddings/{id}/guest-invitations` | Create and send invitation |
| GET | `/weddings/{id}/guest-invitations` | List invitations |
| GET | `/weddings/{id}/guest-invitations/{invitation_id}` | Get invitation |
| POST | `/weddings/{id}/guest-invitations/{invitation_id}/resend` | Resend invitation |
| POST | `/weddings/{id}/guest-invitations/{invitation_id}/revoke` | Revoke invitation |
| GET | `/guest-invitations/{token}` | View guest invitation |

## 11.2 Send Invitation

**POST** `/weddings/{id}/guest-invitations`

Request:

```json
{
  "guest_id": "guest_001",
  "event_ids": [
    "event_001",
    "event_002"
  ],
  "channels": [
    "email",
    "whatsapp",
    "sms"
  ]
}
```

Response:

```json
{
  "success": true,
  "message": "Invitation processing started",
  "data": {
    "invitation_id": "guest_invitation_001",
    "delivery_status": "processing"
  }
}
```

All three channels are selected automatically for the initial product.

The backend should process delivery asynchronously and track each channel independently.

---

# 12. RSVP API Module

Purpose: Allow guests to respond without creating an account.

## 12.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/guest-invitations/{token}` | View invitation |
| POST | `/guest-invitations/{token}/rsvps` | Submit RSVP |
| GET | `/guest-invitations/{token}/rsvps` | View own responses |
| PATCH | `/guest-invitations/{token}/rsvps/{rsvp_id}` | Update RSVP |

## 12.2 Submit RSVP

**POST** `/guest-invitations/{token}/rsvps`

Request:

```json
{
  "event_id": "event_001",
  "response": "attending",
  "guest_count": 2,
  "dietary_notes": "Vegetarian"
}
```

Response:

```json
{
  "success": true,
  "message": "RSVP submitted successfully",
  "data": {
    "rsvp_id": "rsvp_001",
    "response": "attending"
  }
}
```

The guest token must only allow access to the relevant guest's invitation and RSVP records.

---

# 13. Expense API Module

Purpose: Track wedding expenses privately.

Only bride and groom can access complete expense information.

## 13.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/weddings/{id}/expenses` | Add expense |
| GET | `/weddings/{id}/expenses` | List expenses |
| GET | `/weddings/{id}/expenses/{expense_id}` | Get expense |
| PATCH | `/weddings/{id}/expenses/{expense_id}` | Update expense |
| DELETE | `/weddings/{id}/expenses/{expense_id}` | Delete expense |
| GET | `/weddings/{id}/expenses/summary` | Expense summary |
| GET | `/weddings/{id}/expense-categories` | List categories |
| POST | `/weddings/{id}/expense-categories` | Create category |

## 13.2 Add Expense

**POST** `/weddings/{id}/expenses`

Request:

```json
{
  "title": "Wedding Photography",
  "category_id": "category_001",
  "amount": "25000.00",
  "currency": "INR",
  "paid_to": "ABC Photography",
  "payment_status": "partial"
}
```

Response:

```json
{
  "success": true,
  "message": "Expense added successfully",
  "data": {
    "expense_id": "expense_001",
    "amount": "25000.00"
  }
}
```

Use decimal arithmetic for financial calculations.

Every expense endpoint must enforce owner-only access.

---

# 14. Vendor API Module

Purpose: Manage vendor details and quotations.

## 14.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/weddings/{id}/vendors` | Add vendor |
| GET | `/weddings/{id}/vendors` | List vendors |
| GET | `/weddings/{id}/vendors/{vendor_id}` | Get vendor |
| PATCH | `/weddings/{id}/vendors/{vendor_id}` | Update vendor |
| DELETE | `/weddings/{id}/vendors/{vendor_id}` | Archive vendor |
| POST | `/weddings/{id}/vendors/{vendor_id}/quotes` | Add quotation |
| GET | `/weddings/{id}/vendors/{vendor_id}/quotes` | List quotations |
| PATCH | `/weddings/{id}/vendors/{vendor_id}/quotes/{quote_id}` | Update quotation |

## 14.2 Add Vendor

**POST** `/weddings/{id}/vendors`

Request:

```json
{
  "name": "ABC Photography",
  "category": "photography",
  "phone": "+919876543210",
  "email": "abc@example.com",
  "address": {
    "city": "Nellore",
    "state": "Andhra Pradesh"
  }
}
```

---

# 15. Shopping API Module

Purpose: Manage wedding shopping tasks.

## 15.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/weddings/{id}/shopping-items` | Add item |
| GET | `/weddings/{id}/shopping-items` | List items |
| PATCH | `/weddings/{id}/shopping-items/{item_id}` | Update item |
| PATCH | `/weddings/{id}/shopping-items/{item_id}/status` | Mark purchased |
| DELETE | `/weddings/{id}/shopping-items/{item_id}` | Remove item |

## 15.2 Add Shopping Item

**POST** `/weddings/{id}/shopping-items`

Request:

```json
{
  "title": "Wedding decoration items",
  "category": "decoration",
  "estimated_price": "5000.00",
  "assigned_to": "user_003"
}
```

---

# 16. Gallery API Module

Purpose: Upload and manage photos, videos and documents.

Files are stored in Amazon S3. MongoDB stores metadata.

## 16.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/weddings/{id}/albums` | Create album |
| GET | `/weddings/{id}/albums` | List albums |
| PATCH | `/weddings/{id}/albums/{album_id}` | Update album |
| DELETE | `/weddings/{id}/albums/{album_id}` | Archive album |
| POST | `/weddings/{id}/media/upload-url` | Generate upload URL |
| POST | `/weddings/{id}/media/complete-upload` | Confirm upload |
| GET | `/weddings/{id}/media` | List media |
| GET | `/weddings/{id}/media/{media_id}/view-url` | Generate authorised viewing URL |
| POST | `/weddings/{id}/media/{media_id}/deletion-requests` | Request permanent deletion |
| POST | `/weddings/{id}/media-deletion-requests/{request_id}/approve` | Approve deletion |
| POST | `/weddings/{id}/media-deletion-requests/{request_id}/reject` | Reject deletion |

## 16.2 Generate Upload URL

**POST** `/weddings/{id}/media/upload-url`

Request:

```json
{
  "file_name": "haldi_photo.jpg",
  "mime_type": "image/jpeg",
  "file_size": 2500000,
  "album_id": "album_001"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "media_id": "media_001",
    "upload_url": "PRESIGNED_S3_URL",
    "expires_in": 300
  }
}
```

The browser uploads the file directly to S3.

The backend must verify the uploaded object before marking the media record active.

## 16.3 Approve Permanent Deletion

**POST** `/weddings/{id}/media-deletion-requests/{request_id}/approve`

Request:

```json
{
  "decision": "approved"
}
```

The backend must verify that the current user is one of the two owners and that the other distinct owner has also approved.

The first approval must not trigger permanent deletion.

---

# 17. Notification API Module

Purpose: Track email, WhatsApp and SMS delivery.

## 17.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/weddings/{id}/notifications` | List notifications |
| GET | `/weddings/{id}/notifications/{notification_id}` | Get notification |
| POST | `/weddings/{id}/notifications/{notification_id}/retry` | Retry permitted failure |
| POST | `/webhooks/notifications/{provider}` | Receive provider status updates |

Provider webhook endpoints require provider signature verification and idempotent processing.

## 17.2 Notification Status

Possible statuses:

- Pending
- Processing
- Sent
- Delivered
- Failed
- Retry scheduled

Delivery records must be maintained independently for each channel.

---

# 18. Public Wedding Website API Module

Purpose: Display public wedding information.

No account is required to view a public wedding page.

## 18.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/public/weddings/{slug}` | Get public wedding details |
| GET | `/public/weddings/{slug}/events` | Get public events |
| GET | `/public/weddings/{slug}/gallery` | Get public gallery |
| GET | `/public/weddings/{slug}/rsvp-info` | Get public RSVP information |

Only approved public fields should be returned.

The API must never expose expenses, private family details, internal tasks or private guest records.

---

# 19. Wedding Audit API Module

Purpose: Track important wedding activities.

## 19.1 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/weddings/{id}/audit-logs` | List audit records |
| GET | `/weddings/{id}/audit-logs/{log_id}` | View audit record |

Audit records should be append-only for normal application users.

Only authorised owners or specifically authorised administrators should access the audit history.

---

# 20. API Pagination and Filtering

List endpoints must support pagination.

Example:

`GET /weddings/{id}/tasks?page=1&limit=20&status=todo`

Suggested response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

Suggested filters:

| Module | Filters |
|---|---|
| Weddings | status |
| Events | event_type, date |
| Tasks | status, assigned_to, priority |
| Guests | guest_group, search |
| RSVPs | event_id, response |
| Expenses | category_id, payment_status |
| Vendors | category |
| Shopping | status, category |
| Gallery | album_id, media_type |

Validate limits and use a maximum page size. For large collections, cursor-based pagination can be introduced.

---

# 21. Authentication and Authorization Rules

All private APIs must require an authenticated user session.

The backend must check:

1. User identity.
2. Wedding membership.
3. Resource ownership.
4. Required permissions.
5. Special approval conditions.

## Permission Matrix

| Operation | Bride | Groom | Family | Manager |
|---|---|---|---|---|
| Create wedding | Yes | Yes | No | No |
| Invite family | Yes | Yes | No | No |
| Manage events | Yes | Yes | If allowed | If allowed |
| Manage tasks | Yes | Yes | If allowed | If allowed |
| Add guests | Yes | Yes | Yes | If allowed |
| Send guest invitations | Yes | Yes | No by default | If allowed |
| View complete expenses | Yes | Yes | No | No |
| Manage vendors | Yes | Yes | If allowed | If allowed |
| Upload media | Yes | Yes | If allowed | If allowed |
| Permanently delete media | Both owners must approve | Both owners must approve | No | No |

---

# 22. API Security Requirements

- Use HTTPS in production.
- Validate all request bodies.
- Apply rate limiting.
- Use secure session cookies.
- Verify Google ID tokens.
- Hash OTPs and invitation tokens.
- Verify wedding membership for every private operation.
- Prevent cross-wedding data access.
- Validate S3 file type and size.
- Verify external webhook signatures.
- Keep API secrets outside source code.
- Log important actions without logging sensitive tokens.
- Use idempotency for payment-like or retry-sensitive operations where appropriate.
- Apply CORS restrictions.

---

# 23. FastAPI Project Structure

```text
backend/
│
├── app/
│   ├── main.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── security.py
│   │   ├── dependencies.py
│   │   └── permissions.py
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── router.py
│   │   │   ├── schemas.py
│   │   │   └── service.py
│   │   │
│   │   ├── users/
│   │   ├── weddings/
│   │   ├── members/
│   │   ├── events/
│   │   ├── tasks/
│   │   ├── guests/
│   │   ├── invitations/
│   │   ├── rsvp/
│   │   ├── expenses/
│   │   ├── vendors/
│   │   ├── shopping/
│   │   ├── gallery/
│   │   ├── notifications/
│   │   ├── public_website/
│   │   └── audit/
│   │
│   ├── integrations/
│   │   ├── email/
│   │   ├── whatsapp/
│   │   ├── sms/
│   │   └── storage/
│   │
│   └── tests/
│
├── requirements.txt
└── Dockerfile
```

Each module can later add its own repository and test files as needed.

---

# 24. API Development Phases

We should implement APIs in the following order.

## Phase 1 – Authentication and Foundation

- Database connection.
- User registration.
- Email OTP.
- Google login.
- User profile.
- Session management.

## Phase 2 – Wedding Management

- Create wedding.
- List weddings.
- Get wedding.
- Update wedding.
- Create owner memberships.
- Wedding dashboard.

## Phase 3 – Family Collaboration

- Invite family.
- Accept invitation.
- List members.
- Update permissions.
- Remove members.
- Owner recovery and removal approval rules.

## Phase 4 – Wedding Planning

- Event APIs.
- Task APIs.
- Shopping APIs.
- Vendor APIs.

## Phase 5 – Guests and Invitations

- Guest APIs.
- Invitation generation.
- Email integration.
- WhatsApp integration.
- SMS integration.
- RSVP APIs.

## Phase 6 – Expenses and Gallery

- Expense APIs.
- Category APIs.
- Album APIs.
- Media upload.
- Media viewing.
- Joint deletion approval.

## Phase 7 – Public Website and Operations

- Public website APIs.
- Notification status.
- Audit history.
- Monitoring.
- Security and performance testing.

---

# 25. API Testing Strategy

Every API must be tested for:

- Valid request.
- Invalid request.
- Missing authentication.
- Insufficient permissions.
- Wrong wedding ID.
- Non-existent record.
- Duplicate record.
- Expired invitation.
- Expired OTP.
- Failed external provider.
- Repeated requests.
- Concurrent approval requests.

Important integration scenarios:

1. User creates multiple weddings.
2. Bride and groom access the same wedding.
3. A family member has different permissions in two weddings.
4. An unauthorised user cannot read expenses.
5. A guest can only submit their own RSVP.
6. Email failure does not stop WhatsApp or SMS delivery.
7. A single owner cannot permanently delete media.
8. An archived wedding cannot be edited by family members.
9. Public pages return only approved public data.

---

# 26. Final API Architecture Decisions

| Decision | Final |
|---|---|
| API style | REST |
| Framework | FastAPI |
| API version | v1 |
| Request format | JSON |
| Authentication | Google + Email OTP |
| OTP expiry | 5 minutes |
| Invitation delivery | Email + WhatsApp + SMS |
| Database | MongoDB Atlas |
| File storage | Amazon S3 |
| Permissions | Wedding-scoped access control |
| Expense access | Bride and groom only |
| Guest authentication | Secure guest invitation token |
| Public website | Public allowlisted APIs |
| Background processing | Persistent notification jobs |
| Documentation | OpenAPI / Swagger |

---

# 27. Conclusion

This API design establishes how the Make My Marriage frontend, backend, database and external providers communicate.

The API architecture follows the approved Modular Monolith approach and supports multiple weddings, shared ownership, family collaboration, guest invitations, expense privacy and secure media management.

The next development milestone is to implement the Phase 1 APIs using FastAPI.

We will begin with the database connection, authentication, email OTP and user APIs before developing wedding management APIs.