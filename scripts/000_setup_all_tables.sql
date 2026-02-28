-- Complete database setup script
-- Run this script to set up all tables for the humanitarian relief website

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_tr VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_tr TEXT,
  target_amount DECIMAL(10, 2),
  current_amount DECIMAL(10, 2) DEFAULT 0,
  image_url TEXT,
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_tr VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_tr TEXT,
  target_amount DECIMAL(10, 2),
  current_amount DECIMAL(10, 2) DEFAULT 0,
  image_url TEXT,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_tr VARCHAR(255) NOT NULL,
  content_en TEXT,
  content_tr TEXT,
  excerpt_en TEXT,
  excerpt_tr TEXT,
  image_url TEXT,
  category VARCHAR(100),
  author VARCHAR(100),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Impact stories table
CREATE TABLE IF NOT EXISTS impact_stories (
  id SERIAL PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_tr VARCHAR(255) NOT NULL,
  story_en TEXT,
  story_tr TEXT,
  location_en VARCHAR(255),
  location_tr VARCHAR(255),
  image_url TEXT,
  year INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media table
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  category VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Regions table
CREATE TABLE IF NOT EXISTS regions (
  id SERIAL PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_tr VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_tr TEXT,
  active_projects INTEGER DEFAULT 0,
  total_beneficiaries INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  skills TEXT,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_tr VARCHAR(100) NOT NULL,
  type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'subscribed',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SECURITY TABLES
-- =====================================================

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  full_name VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES admin_users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INTEGER,
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DONATIONS TABLES
-- =====================================================

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  donor_email VARCHAR(255) NOT NULL,
  donor_name VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  campaign_id INTEGER REFERENCES campaigns(id),
  payment_provider VARCHAR(50) DEFAULT 'stripe',
  payment_id VARCHAR(255),
  payment_status VARCHAR(50) DEFAULT 'pending',
  is_recurring BOOLEAN DEFAULT false,
  subscription_id VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- EVENTS TABLES
-- =====================================================

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_tr VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_tr TEXT,
  event_type VARCHAR(50),
  location VARCHAR(255),
  event_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  image_url TEXT,
  registration_url TEXT,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BLOG TABLES
-- =====================================================

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_tr VARCHAR(255) NOT NULL,
  content_en TEXT,
  content_tr TEXT,
  excerpt_en TEXT,
  excerpt_tr TEXT,
  featured_image TEXT,
  author VARCHAR(100),
  category VARCHAR(100),
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media gallery table
CREATE TABLE IF NOT EXISTS media_gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  media_type VARCHAR(50),
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(100),
  tags TEXT[],
  location VARCHAR(255),
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DONOR PROFILES TABLES
-- =====================================================

-- Donor profiles table
CREATE TABLE IF NOT EXISTS donor_profiles (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  country VARCHAR(100),
  address TEXT,
  profile_image TEXT,
  total_donated DECIMAL(10, 2) DEFAULT 0,
  donation_count INTEGER DEFAULT 0,
  monthly_donations INTEGER DEFAULT 0,
  certificates_issued INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CREATE INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_campaigns_active ON campaigns(is_active);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON campaigns(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_at);
CREATE INDEX IF NOT EXISTS idx_media_category ON media(category);
CREATE INDEX IF NOT EXISTS idx_volunteers_status ON volunteers(status);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_campaign ON donations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_donor_email ON donor_profiles(email);

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert default admin user (password: Admin123!)
INSERT INTO admin_users (email, password_hash, full_name, role)
VALUES (
  'admin@hoprelief.org',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lQ7fKLvzVHZi',
  'System Administrator',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample campaigns
INSERT INTO campaigns (title_en, title_tr, description_en, description_tr, target_amount, current_amount, category, image_url)
VALUES 
  ('Emergency Relief for Palestine', 'Filistin için Acil Yardım', 'Provide urgent humanitarian aid', 'Acil insani yardım sağlayın', 100000, 75230, 'Emergency Relief', '/palestine-humanitarian-aid.jpg'),
  ('Orphan Sponsorship Program', 'Yetim Sponsorluğu Programı', 'Support orphaned children', 'Yetim çocukları destekleyin', 50000, 38450, 'Child Welfare', '/orphan-child-education.jpg'),
  ('Clean Water Initiative', 'Temiz Su Girişimi', 'Provide clean water access', 'Temiz su erişimi sağlayın', 75000, 52100, 'Water & Sanitation', '/water-well-construction.jpg'),
  ('Medical Aid for Syria', 'Suriye için Tıbbi Yardım', 'Deliver medical supplies', 'Tıbbi malzeme temin edin', 60000, 41800, 'Healthcare', '/medical-aid-supplies.jpg')
ON CONFLICT DO NOTHING;

-- Insert sample news
INSERT INTO news (title_en, title_tr, excerpt_en, excerpt_tr, category, author, published_at, image_url)
VALUES 
  ('1,000 Families Receive Food Aid', '1.000 Aile Gıda Yardımı Aldı', 'Our latest food distribution reached 1,000 families', 'Son gıda dağıtımımız 1.000 aileye ulaştı', 'Relief Work', 'Aid Team', NOW(), '/food-aid-packages.jpg'),
  ('New School Opens in Rural Area', 'Kırsal Alanda Yeni Okul Açıldı', 'Education facility serves 300 students', 'Eğitim tesisi 300 öğrenciye hizmet veriyor', 'Education', 'Education Team', NOW(), '/children-school-education.jpg')
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully! All tables created and sample data inserted.' as status;
