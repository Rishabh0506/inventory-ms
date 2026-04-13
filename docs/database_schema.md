# Database Schema Design

*This document is dedicated to working on, tracking, and finalizing the database schemas for the Inventory Management System.*

## 1. Core Tables (Migrated & Normalized)

### 1.1 Products
Stores all inventory items.
*   `product_code` (Primary Key)
*   `name` (String)
*   `description` (Text)
*   `weight` (Float)
*   `price` (Decimal)
*   `quantity` (Integer)
*   `last_updated` (Timestamp)

### 1.2 Orders
Unified structure for both Sales and Purchase orders.
*   `order_id` (Primary Key)
*   `type` (Enum/String: 'sale' or 'purchase')
*   `customer_supplier_id` (String)
*   `products` (JSON/JSONB: stores array of all items with qty and price)
*   `status` (String: e.g., 'Quotation', 'Packing', 'Dispatch', 'Completed')
*   `date` (Timestamp)
*   `notes` (Text)

### 1.3 Manufacturing
Tracks manufacturing batches (Work-In-Progress).
*   `batch_number` (Primary Key)
*   `raw_materials` (JSON: stores array of raw materials)
*   `output` (JSON: stores array of finished goods)
*   `status` (String: 'WIP', 'Completed')
*   `start_date` (Timestamp)
*   `end_date` (Timestamp)

### 1.4 Customers
To support the auto-fill requirement on sales orders.
*   `customer_id` (Primary Key)
*   `name` (String)
*   `phone` (String)
*   `email` (String)
*   `address` (Text)

### 1.5 Suppliers
To support the auto-fill requirement on purchase orders.
*   `supplier_id` (Primary Key)
*   `name` (String)
*   `phone` (String)
*   `email` (String)
*   `address` (Text)

### 1.6 System Users (Login)
To satisfy the "Single Shared Login" requirement without hardcoding passwords.
*   `user_id` (Primary Key)
*   `username` (String - e.g., 'admin')
*   `password_hash` (String)

## 2. Constraints & Indexes
*   **Transactions**: Moving `Orders` to 'Dispatch' requires updating both the `Orders.status` and `Products.quantity` (bulk using VALUES list). This MUST be wrapped in a strict SQL transaction.
*   **Indexing**: MIGRATION REQUIREMENTS: Immediately after tables are created, these indexes MUST be added:
    *   `CREATE INDEX idx_orders_status  ON orders(status);`
    *   `CREATE INDEX idx_orders_type    ON orders(type);`
    *   `CREATE INDEX idx_orders_date    ON orders(date);`
    *   `CREATE INDEX idx_mfg_status     ON manufacturing(status);`
*   **Dashboard API**: Must return all summary numbers from ONE single query using subqueries, and cache the result in memory for 30 seconds.
