import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // 1. Products Table
  await knex.schema.createTable("products", (table) => {
    table.string("product_code").primary();
    table.string("name").notNullable();
    table.text("description");
    table.float("weight");
    table.decimal("price", 14, 2);
    table.integer("quantity").defaultTo(0);
    table.timestamp("last_updated").defaultTo(knex.fn.now());
  });

  // 2. Customers Table
  await knex.schema.createTable("customers", (table) => {
    table.string("customer_id").primary();
    table.string("name").notNullable();
    table.string("phone");
    table.string("email");
    table.text("address");
  });

  // 3. Suppliers Table
  await knex.schema.createTable("suppliers", (table) => {
    table.string("supplier_id").primary();
    table.string("name").notNullable();
    table.string("phone");
    table.string("email");
    table.text("address");
  });

  // 4. System Users Table
  await knex.schema.createTable("system_users", (table) => {
    table.string("user_id").primary();
    table.string("username").notNullable().unique();
    table.string("password_hash").notNullable();
  });

  // 5. Orders Table (With JSONB for products)
  await knex.schema.createTable("orders", (table) => {
    table.string("order_id").primary();
    table.string("type").notNullable(); // 'sale' or 'purchase'
    table.string("customer_supplier_id"); 
    table.jsonb("products").notNullable(); // stores array of items with qty and price
    table.string("status").notNullable(); // 'Quotation', 'Packing', 'Dispatch', 'Completed'
    table.timestamp("date").defaultTo(knex.fn.now());
    table.text("notes");
  });

  // 6. Manufacturing Table (With JSONB for raw_materials and output)
  await knex.schema.createTable("manufacturing", (table) => {
    table.string("batch_number").primary();
    table.jsonb("raw_materials").notNullable(); // stores array of input items
    table.jsonb("output").notNullable(); // stores array of output items
    table.string("status").notNullable(); // 'WIP', 'Completed'
    table.timestamp("start_date").defaultTo(knex.fn.now());
    table.timestamp("end_date");
  });

  // === RULE 4: PERFORMANCE INDEXES ===
  // Must execute immediately after table creation
  await knex.raw(`CREATE INDEX idx_orders_status ON orders(status);`);
  await knex.raw(`CREATE INDEX idx_orders_type ON orders(type);`);
  await knex.raw(`CREATE INDEX idx_orders_date ON orders(date);`);
  await knex.raw(`CREATE INDEX idx_mfg_status ON manufacturing(status);`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("manufacturing");
  await knex.schema.dropTableIfExists("orders");
  await knex.schema.dropTableIfExists("system_users");
  await knex.schema.dropTableIfExists("suppliers");
  await knex.schema.dropTableIfExists("customers");
  await knex.schema.dropTableIfExists("products");
}
