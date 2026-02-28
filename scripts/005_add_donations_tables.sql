-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255),
  product_id VARCHAR(100) NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency VARCHAR(3) DEFAULT 'usd',
  status VARCHAR(50) NOT NULL, -- succeeded, pending, failed
  is_recurring BOOLEAN DEFAULT FALSE,
  stripe_subscription_id VARCHAR(255),
  donor_name VARCHAR(255),
  donor_email VARCHAR(255) NOT NULL,
  donor_phone VARCHAR(50),
  message TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for donations
CREATE INDEX idx_donations_email ON donations(donor_email);
CREATE INDEX idx_donations_stripe_customer ON donations(stripe_customer_id);
CREATE INDEX idx_donations_product ON donations(product_id);
CREATE INDEX idx_donations_created ON donations(created_at DESC);
CREATE INDEX idx_donations_status ON donations(status);

-- Recurring donations view
CREATE OR REPLACE VIEW active_recurring_donations AS
SELECT 
  d.*,
  COUNT(*) OVER (PARTITION BY stripe_subscription_id) as payment_count
FROM donations d
WHERE is_recurring = TRUE 
  AND status = 'succeeded'
  AND stripe_subscription_id IS NOT NULL
ORDER BY created_at DESC;

-- Donation statistics view
CREATE OR REPLACE VIEW donation_stats AS
SELECT
  product_id,
  COUNT(*) as total_count,
  SUM(amount) as total_amount,
  AVG(amount) as avg_amount,
  COUNT(CASE WHEN is_recurring THEN 1 END) as recurring_count,
  SUM(CASE WHEN is_recurring THEN amount ELSE 0 END) as recurring_amount
FROM donations
WHERE status = 'succeeded'
GROUP BY product_id;
