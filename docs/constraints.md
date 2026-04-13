# Architectural Constraints & Performance Decisions

SMEs doing manufacturing + sales deal with high-volume orders. Think of a business that sells hardware components — a single purchase order might have 150 line items (bolts, brackets, fittings, each with quantity and price). If the system chokes on that, the staff sits waiting. That kills adoption. People go back to Excel.
The <2 second dashboard is the first impression every time someone opens the app. If it's slow, confidence in the whole system drops immediately.

## Which parts of the product are affected

**Orders with 100+ products** — this hits:
- **Database** — the orders table stores products as a JSON array per the SRS. Querying, filtering, and calculating totals across 100+ items in that JSON is expensive if done naively. This is where most of the risk lives.
- **Backend API (The Write Path)** — if your order-processing logic loops through products one by one, does individual DB calls per product, or calculates inventory updates sequentially, it will be slow.
- **Inventory auto-update** — when an order with 100 products is dispatched, you need to deduct stock for all 100 products. If you do 100 separate UPDATE queries instead of one bulk operation, you'll blow the 3-second limit easily.
- **Frontend rendering (The UI Path)** — a form with 100+ product rows, if not handled carefully (no virtualization, re-rendering the whole list on every change), will feel sluggish even before the API is called.

**Dashboard loads in <2 seconds** — this hits:
- **Database aggregation (The Read Path)** — the dashboard needs total inventory value, pending order counts, WIP status — all at once. These are aggregate queries across multiple tables. If written poorly, each card triggers a separate slow query.
- **Backend** — if the dashboard endpoint makes 4-5 separate DB calls and combines them in Node.js, that's 4-5 round trips. Should be one or two well-written queries.
- **Frontend** — if the dashboard waits for all data before rendering anything, the user sees a blank screen. Even if the data arrives in 1.8 seconds, it feels slow.

## The parts that are NOT a concern
Product CRUD, single order creation, history filters — these are lightweight. Focus your performance thinking on:
- Bulk inventory updates (the write path)
- Dashboard aggregation queries (the read path)
- Order forms with many line items (the UI path)

## The Transaction Path (Data Integrity)
When a sales order moves from `Packing` → `Dispatch`, two critical actions must happen **atomically**:
1. The `order status` updates to 'Dispatch'.
2. The `stock quantities` are deducted.
If one succeeds and the other fails, the inventory becomes corrupted.
**Rule**: We must wrap these dual operations in strict Database Transactions (`BEGIN` / `COMMIT` / `ROLLBACK`). Both succeed together, or both fail together.

## What this means for you practically
- When you get to **database setup**, be aware that querying inside JSON is slower than normalized tables.
- When we get to **sales orders**, write the inventory deduction as a single bulk query wrapped in a strict transaction, not a loop!
- When we get to **dashboard**, write one aggregation query instead of five separate ones.
