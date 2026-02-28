-- Create tables for the humanitarian website backend

-- Categories table for organizing campaigns and projects
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_tr VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_en TEXT,
  description_tr TEXT,
  icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns table for donation campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  title_en VARCHAR(500) NOT NULL,
  title_tr VARCHAR(500) NOT NULL,
  description_en TEXT NOT NULL,
  description_tr TEXT NOT NULL,
  short_description_en TEXT,
  short_description_tr TEXT,
  image_url TEXT NOT NULL,
  goal_amount DECIMAL(12, 2),
  raised_amount DECIMAL(12, 2) DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'USD',
  is_featured BOOLEAN DEFAULT false,
  is_urgent BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'active',
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table for ongoing projects
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  title_en VARCHAR(500) NOT NULL,
  title_tr VARCHAR(500) NOT NULL,
  description_en TEXT NOT NULL,
  description_tr TEXT NOT NULL,
  location_en VARCHAR(255),
  location_tr VARCHAR(255),
  country VARCHAR(100),
  region VARCHAR(100),
  image_url TEXT NOT NULL,
  goal_amount DECIMAL(12, 2),
  funded_amount DECIMAL(12, 2) DEFAULT 0,
  beneficiaries INTEGER,
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News articles table
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(500) NOT NULL,
  title_tr VARCHAR(500) NOT NULL,
  content_en TEXT NOT NULL,
  content_tr TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_tr TEXT,
  image_url TEXT NOT NULL,
  author VARCHAR(255),
  category VARCHAR(100),
  tags TEXT[],
  is_featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  slug VARCHAR(255) UNIQUE NOT NULL,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Impact stories table
CREATE TABLE IF NOT EXISTS impact_stories (
  id SERIAL PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_tr VARCHAR(255) NOT NULL,
  location_en VARCHAR(255),
  location_tr VARCHAR(255),
  story_en TEXT NOT NULL,
  story_tr TEXT NOT NULL,
  quote_en TEXT,
  quote_tr TEXT,
  image_url TEXT NOT NULL,
  campaign_id INTEGER REFERENCES campaigns(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Images/Media library table
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(500) NOT NULL,
  original_filename VARCHAR(500),
  blob_url TEXT NOT NULL,
  blob_pathname TEXT,
  file_type VARCHAR(100),
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  alt_text_en TEXT,
  alt_text_tr TEXT,
  caption_en TEXT,
  caption_tr TEXT,
  uploaded_by VARCHAR(255),
  tags TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Regions/Countries where we work
CREATE TABLE IF NOT EXISTS regions (
  id SERIAL PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_tr VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  continent VARCHAR(100),
  description_en TEXT,
  description_tr TEXT,
  active_projects INTEGER DEFAULT 0,
  beneficiaries INTEGER DEFAULT 0,
  image_url TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  country VARCHAR(100),
  city VARCHAR(100),
  skills TEXT[],
  availability VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_featured ON campaigns(is_featured);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON campaigns(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_country ON projects(country);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_at);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(is_featured);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(file_type);
CREATE INDEX IF NOT EXISTS idx_volunteers_status ON volunteers(status);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
