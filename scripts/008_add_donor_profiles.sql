-- Donor profiles table
CREATE TABLE IF NOT EXISTS donor_profiles (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  country VARCHAR(100),
  address TEXT,
  preferred_language VARCHAR(10) DEFAULT 'en',
  is_anonymous BOOLEAN DEFAULT FALSE,
  newsletter_subscribed BOOLEAN DEFAULT TRUE,
  total_donated INTEGER DEFAULT 0, -- in cents
  donation_count INTEGER DEFAULT 0,
  recurring_donations_active INTEGER DEFAULT 0,
  last_donation_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donor certificates table
CREATE TABLE IF NOT EXISTS donor_certificates (
  id SERIAL PRIMARY KEY,
  donor_email VARCHAR(255) NOT NULL,
  donation_id INTEGER REFERENCES donations(id),
  certificate_url TEXT NOT NULL,
  certificate_type VARCHAR(50) NOT NULL, -- tax_receipt, thank_you, impact_report
  issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  amount INTEGER NOT NULL,
  FOREIGN KEY (donor_email) REFERENCES donor_profiles(email)
);

-- Indexes
CREATE INDEX idx_donor_profiles_email ON donor_profiles(email);
CREATE INDEX idx_donor_certificates_email ON donor_certificates(donor_email);
CREATE INDEX idx_donor_certificates_donation ON donor_certificates(donation_id);

-- Function to update donor profile stats
CREATE OR REPLACE FUNCTION update_donor_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') AND NEW.status = 'succeeded' THEN
    INSERT INTO donor_profiles (email, full_name, total_donated, donation_count, last_donation_date)
    VALUES (
      NEW.donor_email,
      NEW.donor_name,
      NEW.amount,
      1,
      NOW()
    )
    ON CONFLICT (email) DO UPDATE SET
      total_donated = donor_profiles.total_donated + NEW.amount,
      donation_count = donor_profiles.donation_count + 1,
      last_donation_date = NOW(),
      updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update donor stats
DROP TRIGGER IF EXISTS trigger_update_donor_stats ON donations;
CREATE TRIGGER trigger_update_donor_stats
AFTER INSERT OR UPDATE ON donations
FOR EACH ROW
EXECUTE FUNCTION update_donor_stats();
