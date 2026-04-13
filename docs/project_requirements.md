# Inventory Management System - Software Requirements Specification

*This document consolidates ideas from the initial problem statement and the detailed SRS sheet.*

## 1. Introduction & Scope
- **Purpose**: Internal inventory management solution for high-volume transactions, supporting sales, purchases, and manufacturing.
- **Platforms**: Desktop app (Windows 10+) and responsive Web interface.
- **Backend Tech**: TypeScript (for robust, type-safe logic).
- **Users**: Max 5 concurrent users via a **Single Shared Login** (no role-based access needed).
- **Hosting**: Cloud-based (AWS, Azure) with real-time syncing between desktop and backend.

## 2. Core Functional Requirements (FRs)

### 2.1 Inventory Management
- **Inventory Updates**:
  - *Sales Dispatch*: Deduct quantity.
  - *Purchase Completion*: Add quantity.
  - *WIP Start*: Deduct raw materials.
  - *WIP Completion*: Add outputs.

### 2.2 Order Processing
- **Sales Orders**:
  - Infinite products allowed (`FR21`).
  - Customer Auto-Fill (via Customer ID).
  - Lifecycle: `Quotation` -> `Packing` -> `Dispatch` -> `History`.
- **Purchase Orders**:
  - Infinite products allowed.
  - Supplier Auto-Fill (via Supplier ID).
  - Lifecycle: `Quotations Received` -> `Paid/Unpaid` -> `Order Completion` -> `History`.

### 2.3 Manufacturing (WIP) Tracking
- **Process**: Map `raw materials` to `outputs` per batch. 
- **Actions**: Edit, remove, mark as completed.

### 2.4 History & Reporting
- **Filters**: Separate views for sales, purchases, and manufacturing (`FR23`).
- **Export**: Optional CSV/PDF exporting.

## 3. User Interface Requirements
- **Reference Aesthetic**: Zoho Inventory (clean, modern, enterprise tools).
- **Key Layout - "List-Detail Interface"**:
  - Left Panel: Scrollable list of items (customers, orders, etc.) with search bar and sortable columns.
  - Right Panel: Detailed view of the selected item (highlighted on left), presenting context-sensitive actions (Edit, Remove, Move to Next Stage).
- **Components**:
  - *Dashboard*: Summary cards (total value, pending orders, WIP) and quick access.
  - *Sidebar Navigation*: Products, Sales, Purchases, Manufacturing, History.
  - *Dynamic Forms*: "+ Add Product" buttons for infinite rows.
- **Styling**:
  - Currency: `₹1,234.56` format (`FR22`).
  - Tags: Color-coded status badges (e.g., green for Dispatched, orange for WIP).
  - Grid-based responsive design.

## 4. Database Schema
*Detailed database tables and open schema ideas are tracked separately.*
Please refer to: [docs/database_schema.md](file:///c:/Users/Lenovo/inventory-ms/docs/database_schema.md)

## 5. Non-Functional & Security Requirements
- **Performance**: Dashboard load `< 2s`, 100+ product orders process `< 3s`.
- **Security**: Data encrypted (HTTPS / AES-256), Daily automated cloud backups.
