-- ============================================================
-- Migration: Rename decaprim_* tables to bridgeline_*
-- Run this SQL directly in your PostgreSQL database
-- ============================================================

-- Rename all tables
ALTER TABLE IF EXISTS decaprim_users RENAME TO bridgeline_users;
ALTER TABLE IF EXISTS decaprim_categories RENAME TO bridgeline_categories;
ALTER TABLE IF EXISTS decaprim_products RENAME TO bridgeline_products;
ALTER TABLE IF EXISTS decaprim_product_images RENAME TO bridgeline_product_images;
ALTER TABLE IF EXISTS decaprim_product_categories RENAME TO bridgeline_product_categories;
ALTER TABLE IF EXISTS decaprim_product_attributes RENAME TO bridgeline_product_attributes;
ALTER TABLE IF EXISTS decaprim_orders RENAME TO bridgeline_orders;
ALTER TABLE IF EXISTS decaprim_order_items RENAME TO bridgeline_order_items;
ALTER TABLE IF EXISTS decaprim_paylater_requests RENAME TO bridgeline_paylater_requests;
ALTER TABLE IF EXISTS decaprim_banners RENAME TO bridgeline_banners;
ALTER TABLE IF EXISTS decaprim_global_settings RENAME TO bridgeline_global_settings;
ALTER TABLE IF EXISTS decaprim_reviews RENAME TO bridgeline_reviews;

-- Rename all indexes
ALTER INDEX IF EXISTS idx_decaprim_products_status RENAME TO idx_bridgeline_products_status;
ALTER INDEX IF EXISTS idx_decaprim_products_stock_status RENAME TO idx_bridgeline_products_stock_status;
ALTER INDEX IF EXISTS idx_decaprim_product_images_product RENAME TO idx_bridgeline_product_images_product;
ALTER INDEX IF EXISTS idx_decaprim_product_cat_product RENAME TO idx_bridgeline_product_cat_product;
ALTER INDEX IF EXISTS idx_decaprim_product_cat_category RENAME TO idx_bridgeline_product_cat_category;
ALTER INDEX IF EXISTS idx_decaprim_orders_customer RENAME TO idx_bridgeline_orders_customer;
ALTER INDEX IF EXISTS idx_decaprim_orders_status RENAME TO idx_bridgeline_orders_status;
ALTER INDEX IF EXISTS idx_decaprim_order_items_order RENAME TO idx_bridgeline_order_items_order;
ALTER INDEX IF EXISTS idx_decaprim_categories_parent RENAME TO idx_bridgeline_categories_parent;
ALTER INDEX IF EXISTS idx_decaprim_categories_slug RENAME TO idx_bridgeline_categories_slug;
ALTER INDEX IF EXISTS idx_decaprim_reviews_product RENAME TO idx_bridgeline_reviews_product;

-- Rename all sequences
ALTER SEQUENCE IF EXISTS decaprim_users_id_seq RENAME TO bridgeline_users_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_categories_id_seq RENAME TO bridgeline_categories_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_products_id_seq RENAME TO bridgeline_products_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_product_images_id_seq RENAME TO bridgeline_product_images_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_product_attributes_id_seq RENAME TO bridgeline_product_attributes_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_orders_id_seq RENAME TO bridgeline_orders_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_order_items_id_seq RENAME TO bridgeline_order_items_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_paylater_requests_id_seq RENAME TO bridgeline_paylater_requests_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_banners_id_seq RENAME TO bridgeline_banners_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_global_settings_id_seq RENAME TO bridgeline_global_settings_id_seq;
ALTER SEQUENCE IF EXISTS decaprim_reviews_id_seq RENAME TO bridgeline_reviews_id_seq;

-- Update global settings values
UPDATE bridgeline_global_settings SET value = 'BRIDGELINE VERTEX INNOVATIONS LTD' WHERE key = 'shop_name';
UPDATE bridgeline_global_settings SET value = 'BRIDGELINE VERTEX INNOVATIONS LTD' WHERE key = 'company_name';
UPDATE bridgeline_global_settings SET value = 'support@bridgelinevertex.com' WHERE key = 'email';
UPDATE bridgeline_global_settings SET value = 'https://bridgelinevertex.com' WHERE key = 'website';

-- Verify the migration
SELECT 'Migration completed successfully!' AS status;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'bridgeline_%' ORDER BY tablename;
