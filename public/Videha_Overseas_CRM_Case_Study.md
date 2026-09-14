# Videha Overseas CRM — Case Study

## Enterprise CRM & Business Operations Platform

**Project Type:** Internal Enterprise CRM  
**Role:** Full-Stack Development  
**Technology:** React, TypeScript, Node.js, Express, MongoDB, Mongoose

---

## Overview

Built a full-stack CRM and business operations platform for managing the complete customer lifecycle — from leads and quotations to orders, billing, finance, suppliers and shipments.

The platform focuses on backend reliability, data integrity, role-based access control, scalable MongoDB usage and real-world business workflows.

## Core Modules

- Lead Management
- Customer Management
- Quotation Management
- Order Management
- Billing & Invoice Management
- Finance & Reporting
- Supplier Management
- Shipment Management
- Documents & Activities
- CSV Import & Export
- Role-Based Access Control (RBAC)

## Business Flow

**Lead → Customer → Quotation → Order → Billing → Payment → Shipment → Delivery**

Order and billing states remain independent. For example, an order can be **Delivered** while billing is **Partially Paid**. Delivery never automatically marks an invoice as paid.

## Backend Architecture

**Frontend → API / Routes → Controllers → Services / Business Logic → Mongoose Models → MongoDB**

Business rules, validation, authorization and entity relationships are handled on the backend rather than relying only on frontend restrictions.

## MongoDB & Backend Reliability

MongoDB features used include:

- **Atomic updates** with `$inc`, `$set`, etc. for safe numeric and field updates.
- **Transactions** where multiple related database operations must succeed or fail together.
- **Indexes** for frequently searched, filtered and unique fields such as email, phone, customer code, supplier code, status and dates.
- **Unique constraints and duplicate-key handling** for additional protection against concurrent duplicate creation.

## Customer & Supplier Deduplication

Implemented priority-based entity resolution for normal creation and CSV imports.

Matching can follow:

1. Existing ID / Code
2. Normalized Email
3. Normalized Phone
4. Company + Name
5. Other available identifying fields

Values are normalized before comparison. For example:

`ABC@TEST.COM` → `abc@test.com`

Name/company variations such as:

`Al-Mansoor General Trading LLC`  
`Al Mansoor General Trading LLC`

can be treated as equivalent after normalization.

Missing CSV fields do not automatically create a new record. If multiple records match, the system can flag the case as **ambiguous** instead of blindly creating a duplicate.

## CSV Import System

**Upload → Column Detection → Field Mapping → Preview & Validation → Existing Record Matching → Import**

Supports:

- Column aliases
- Field mapping
- Missing fields
- Validation
- Duplicate detection
- Existing-record matching
- Ambiguous-match handling
- Bulk import
- CSV export

## Order & Billing

Order status and billing status are separate.

**Order:** Draft, Confirmed, Processing, Shipped, Delivered, Cancelled

**Billing:** Pending, Partially Paid, Paid, Overdue, Void

The system maintains:

- Total
- Amount Paid
- Amount Due

`Amount Due = Total - Amount Paid`

Payment is user-controlled, and invoice PDFs reflect the current payment state while retaining the original transaction currency.

## Multi-Currency Finance

Transactions can use multiple currencies without overwriting the original amount or currency.

The system maintains:

- Original Amount
- Original Currency
- Exchange Rate Snapshot
- Reporting Amount in INR

Finance reporting aggregates INR values only, preventing incorrect mixed-currency calculations.

## Customer 360° View

Customer details provide a centralized view of related:

- Quotations
- Orders
- Bills / Invoices
- Shipments
- Documents
- Activities

Related entities can be opened through their existing detail/view interfaces.

## Role-Based Access Control

Authorization follows:

**User → Role → Permissions → Module / Action**

Permissions can control View, Create, Edit and Delete actions. Visibility rules can additionally restrict records based on ownership, department or team scope.

## Concurrent Editing Protection

Important records can use revision/version-based optimistic concurrency control.

Example:

`Revision 5 → Revision 6`

If two users edit the same record and one saves first, the second user's stale revision can be rejected with a conflict instead of silently overwriting the latest data.

## Search, Sorting & Performance

Backend queries support:

- Searching
- Sorting
- Filtering
- Pagination
- Status filtering
- Customer lookups
- Supplier lookups
- Department-based visibility

Indexes are used to keep common database queries efficient as data grows.

## Result

The final platform combines:

**CRM + Sales Operations + Orders + Billing + Finance + Supplier Management + Shipment Management + Data Import Infrastructure**

The system was built around real business requirements including data integrity, duplicate prevention, RBAC, multi-currency reporting, payment tracking, atomic database operations, transactions, CSV processing and customer relationship management.

## Technical Stack

**Frontend:** React, TypeScript, Responsive UI

**Backend:** Node.js, Express, REST APIs, Service-based architecture, Validation, RBAC

**Database:** MongoDB, Mongoose, Indexes, Atomic Updates, Transactions, Unique Constraints

**Data Management:** CSV Import/Export, Field Mapping, Validation, Entity Resolution, Duplicate Prevention
