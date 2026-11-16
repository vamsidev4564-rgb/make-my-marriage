# Make My Marriage
## Product Requirements Document (PRD)

**Version:** 1.0  
**Document status:** Initial product requirements  
**Product category:** Wedding Management Platform  
**Initial target market:** Telugu weddings in India, with potential expansion across India

---

# 1. Product Overview

## 1.1 Product Vision

Make My Marriage is a digital wedding management platform designed to simplify the planning and coordination of Indian weddings.

Indian weddings involve multiple events, family members, relatives, guests, expenses, vendors, invitations and responsibilities. Managing everything through separate WhatsApp groups, phone calls, spreadsheets and notebooks can become confusing.

Make My Marriage provides one shared digital workspace where the bride, groom and their families can coordinate wedding activities.

**Core principle:**

One wedding. One shared workspace. Two equal owners. One collaborative family.

## 1.2 Product Objectives

- Simplify Indian wedding planning.
- Allow bride and groom to manage their wedding together.
- Bring both families into one collaborative workspace.
- Organise multiple wedding events.
- Assign responsibilities and track tasks.
- Keep financial information private.
- Manage guests, invitations and RSVPs.
- Store wedding memories in a shared gallery.
- Maintain vendor information and payment records.
- Provide a public wedding website for guests.

# 2. Target Users

### 2.1 Bride
- Register and create a wedding workspace.
- Invite the groom.
- Manage wedding activities.
- Invite family members.
- Manage private expenses.
- Access wedding reports and settings.

### 2.2 Groom
- Join the wedding workspace.
- Have equal ownership and administrative permissions.
- Manage all shared wedding activities.
- Invite family members.
- Access private expenses.

### 2.3 Family Members
- Join through an invitation from the bride or groom.
- View common wedding tasks.
- Add guests to the wedding guest list.
- Upload photos if permitted.
- Perform assigned responsibilities.

### 2.4 Managers
- Receive responsibilities from the owners.
- Manage authorised wedding activities.
- Send guest invitations and RSVP links when authorised.
- Perform only the actions granted through their permissions.

### 2.5 Wedding Guests
- Visit the public wedding website.
- View permitted wedding information.
- Receive digital invitations.
- Submit and update RSVPs using secure invitation links.
- No account registration is required for RSVP.

### 2.6 Vendors
Vendors are stored as wedding-related records, not platform customers who automatically receive accounts.

Examples:
- Photography
- Catering
- Decoration
- Makeup
- Venue
- Music and entertainment

# 3. Core Product Principles

1. Bride and groom have equal ownership.
2. Both families collaborate in one shared workspace.
3. A user can participate in unlimited weddings.
4. Family relationships do not automatically determine permissions.
5. Expenses are visible only to the bride and groom.
6. Public wedding information must remain separate from private workspace information.
7. The platform should be simple and mobile-friendly.
8. WhatsApp is used for family communication; in-platform chat is not required.

# 4. Functional Requirements and Modules

## 4.1 User Registration and Authentication

Requirements:
- Users can create an account.
- Users can securely log in and log out.
- Users can recover account access.
- Users can create or join multiple weddings.
- Users can access only weddings where they have permission.
- A user account can have different roles in different weddings.

## 4.2 Wedding Registration

Requirements:
- Bride or groom can create a wedding.
- Wedding registration should capture basic couple information.
- The creator can invite the other person to join.
- Both people become equal owners after the invitation is accepted.
- Each wedding has a unique workspace.
- Each wedding has a unique identifier.
- Users can participate in multiple wedding workspaces.

Suggested wedding details:
- Bride name
- Groom name
- Wedding date
- Wedding location
- Wedding description
- Profile photographs
- Wedding status

## 4.3 Wedding Dashboard

The dashboard provides a summary of wedding progress.

Information:
- Couple details
- Wedding countdown
- Upcoming events
- Pending tasks
- Completed tasks
- Guest RSVP summary
- Recent activity
- Budget summary visible only to the bride and groom

## 4.4 Family Member Management

Requirements:
- Only bride and groom can invite family members.
- Family members join through secure invitations.
- The inviter is recorded.
- Each member has a relationship field, such as sister, brother, cousin, friend or relative.
- Owners can assign permissions.
- Managers can receive additional responsibilities.
- Only the inviting owner can remove a member while available.
- If that owner becomes unavailable, removal requires approval from both owners.

## 4.5 Role and Permission Management

Suggested roles:
- Bride
- Groom
- Family Member
- Manager

Permissions should be assigned individually or by permission groups.

Examples:
- Event management
- Task management
- Guest-list management
- Guest invitation sending
- Photo upload
- Gallery management

Manager status must not automatically provide access to expenses or owner-only settings.

## 4.6 Event Management

Requirements:
- Create multiple events within one wedding.
- Edit event information.
- View event schedules.
- Assign tasks to events.
- Associate guests with individual events.
- Track event completion.

Example events:
- Engagement
- Haldi
- Mehendi
- Sangeet
- Wedding
- Reception

Event information:
- Event name
- Date and time
- Venue
- Description
- Event schedule
- Assigned tasks
- Invited guests

## 4.7 Task Management

Requirements:
- Create wedding tasks.
- Assign tasks to family members.
- Set due dates.
- Track task status.
- View common wedding tasks.
- Only assigned members and authorised users can edit tasks according to permissions.
- Maintain task activity history.

Suggested statuses:
- To Do
- In Progress
- Completed

## 4.8 Private Expense Management

**Access restriction: Bride and groom only.**

Requirements:
- Set wedding budget.
- Record expenses.
- Categorise expenses.
- Track event-wise expenses.
- Record vendor payments.
- Record advances and outstanding amounts.
- Upload receipts.
- View expense summaries and reports.

Privacy rules:
- Family members cannot view the expense module.
- Managers cannot view the expense module.
- Receipts and payment records are private.
- Expense data must not appear on public wedding pages.

## 4.9 Guest Management

Requirements:
- Any family member can add guests.
- Maintain a shared wedding guest list.
- Store guest name and contact information.
- Associate guests with wedding events.
- Track invitation status.
- Track RSVP responses.
- Identify duplicate guest records where possible.

Guest information may include:
- Name
- Phone number
- Email address (optional)
- Relationship or group
- Invited events
- Invitation status
- RSVP status

The exact edit and deletion rights for guests added by another family member remain to be finalised.

## 4.10 Digital Invitations and RSVP

Requirements:
- Bride, groom and authorised managers can send invitations.
- Generate digital invitation links.
- Guests can RSVP without creating accounts.
- RSVP links must identify the correct guest or household.
- Guests can update their RSVP.
- Invitations should be associated with specific wedding events.
- Invitation history should be maintained.

## 4.11 Wedding Photo and Video Gallery

Requirements:
- Family members can upload photos according to permissions.
- Uploaded photos appear directly in the gallery.
- No pre-approval is required for normal uploads.
- Organise media into albums.
- Owners can archive the gallery.
- Permanent deletion requires approval from both owners.

Photo security:
- Validate file types and sizes.
- Restrict unauthorised access.
- Provide a way to report inappropriate uploads.
- Record important upload and deletion activity.

## 4.12 Vendor Information Management

Requirements:
- Store vendor details.
- Maintain contact information.
- Record quotations.
- Track vendor payments.
- Associate vendors with relevant wedding events.

The platform records information only. It does not provide physical vendor services or vendor bookings.

## 4.13 Public Wedding Website

Each wedding can have a public-facing website.

Possible information:
- Couple profiles
- Wedding photographs
- Wedding story
- Event schedule
- Venue details
- Digital invitation
- RSVP link

Privacy requirements:
- Only intentionally public information is displayed.
- Private expenses and family information are never exposed.
- Owners control public-page visibility and content.

## 4.14 Notifications

Notifications may include:
- New task assignments
- Task deadlines
- Event updates
- Invitation status
- RSVP updates
- Important workspace activity

In-platform family chat is not included.

## 4.15 Activity History

The platform should record important actions, including:
- Who created a wedding event.
- Who updated a task.
- Who invited a family member.
- Who added a guest.
- Who changed an RSVP.
- Who uploaded or archived media.
- Who approved sensitive actions.

# 5. Wedding Lifecycle

Each wedding has four statuses:

1. Planning
2. Ongoing
3. Completed
4. Archived

Planning: Wedding preparation and coordination.

Ongoing: Wedding activities are taking place.

Completed: Wedding events have finished.

Archived: Workspace becomes read-only, with bride and groom retaining access.

Recommended archive behaviour:
- Family member access is withdrawn or restricted.
- Owners retain read-only access.
- Records and media are retained.
- Permanent deletion remains a separate, approval-controlled action.

# 6. Security and Privacy Requirements

- Secure user authentication.
- Wedding-specific membership and permissions.
- Access checks for every protected operation.
- Separation of public and private information.
- Secure invitation tokens.
- Revocable invitations.
- Private financial records.
- Controlled media access.
- Audit history for sensitive actions.
- Approval workflows for sensitive deletion and removal operations.
- Account recovery procedures.

# 7. Important Business Rules

1. A user can create or participate in unlimited weddings.
2. Each wedding has one shared workspace.
3. Bride and groom are equal owners.
4. Only bride and groom invite family members.
5. Any family member can add guests.
6. Only authorised users can send guest invitations.
7. Only bride and groom can view complete expenses.
8. The original inviting owner can remove their invited member while available.
9. If the inviting owner is unavailable, both owners must approve removal.
10. Both owners must approve permanent photo deletion.
11. Guests can RSVP without registering.
12. Family communication happens through WhatsApp.
13. Archived weddings become read-only for owners.
14. Accommodation and transport services are excluded.

# 8. Non-Functional Requirements

## Usability
- Simple and intuitive user interface.
- Mobile-friendly experience.
- Clear navigation.
- Suitable for users with limited technical knowledge.

## Security
- Strong access control.
- Secure data handling.
- Private financial information.
- Secure file uploads.

## Performance
- Fast dashboard loading.
- Efficient guest-list and task loading.
- Smooth photo-gallery experience.

## Reliability
- Prevent accidental data loss.
- Maintain activity history.
- Provide recovery procedures for important operations.

## Scalability
- Support multiple weddings.
- Support many members and guests.
- Support multiple events per wedding.
- Allow future expansion across different Indian wedding traditions.

# 9. Out of Scope

The following are not part of the current product:

- Accommodation services.
- Transport services.
- Physical wedding planning services.
- Vendor booking marketplace.
- In-platform chat or messaging.
- AI wedding assistant in the initial release.

# 10. Future Enhancements

Possible future capabilities:
- AI-powered wedding planning assistant.
- Automatic wedding task checklist generation.
- Budget recommendations.
- Smart invitation drafting.
- Wedding schedule recommendations.
- Additional Indian regional languages.
- Live wedding streaming.
- Advanced photo and video memories.
- Wedding analytics and reports.

# 11. Suggested Product Release Phases

## Phase 1 – Core Foundation
- User registration and authentication.
- Wedding creation.
- Bride and groom ownership.
- Family invitations.
- Member and permission management.
- Wedding dashboard.

## Phase 2 – Wedding Coordination
- Event management.
- Task management.
- Guest management.
- Digital invitations.
- RSVP management.

## Phase 3 – Wedding Records and Memories
- Private expense management.
- Vendor information management.
- Photo and video gallery.
- Public wedding website.
- Notifications and activity history.

## Phase 4 – Future Enhancements
- AI wedding assistant.
- Advanced reports.
- Regional language support.
- Live streaming.

# 12. Success Metrics

The product can be evaluated using:
- Number of weddings registered.
- Percentage of weddings with both owners connected.
- Average family members per wedding.
- Number of tasks created and completed.
- Number of guests managed.
- RSVP completion rate.
- Number of events managed.
- User retention and satisfaction.
- Successful completion of wedding workflows.

# 13. Open Decisions Before Development

The following details still require final confirmation:

1. Whether any family member can edit or delete guest records added by another member.
2. The exact approval process and recovery mechanism when an owner becomes unavailable.
3. Whether both owners must approve all permanent photo deletions individually or can approve a batch.
4. Whether archived weddings can be restored and under what conditions.
5. Exact public website content and visibility controls.

These decisions should be documented before implementation.

---

# Final Product Principle

Make My Marriage is not simply a wedding invitation website or a task management application.

It is a shared wedding coordination platform that brings the bride, groom and both families together in one organised digital workspace, while protecting personal and financial information.

**One wedding. One workspace. Two equal owners. One family working together.**