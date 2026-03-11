import { NextResponse } from "next/server"
import { execute, query } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST() {
  try {
    // Create all tables
    
    // Users table
    await execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'editor', 'donor', 'volunteer') DEFAULT 'donor',
        avatar_url VARCHAR(500),
        phone VARCHAR(50),
        country VARCHAR(100),
        is_active TINYINT(1) DEFAULT 1,
        email_verified_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    
    // Categories table
    await execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_en VARCHAR(100) NOT NULL,
        name_ar VARCHAR(100),
        name_tr VARCHAR(100),
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        icon VARCHAR(50),
        color VARCHAR(20),
        parent_id INT,
        sort_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Campaigns table
    await execute(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title_en VARCHAR(255) NOT NULL,
        title_ar VARCHAR(255),
        title_tr VARCHAR(255),
        slug VARCHAR(255) NOT NULL UNIQUE,
        description_en TEXT,
        description_ar TEXT,
        description_tr TEXT,
        short_description_en VARCHAR(500),
        short_description_ar VARCHAR(500),
        short_description_tr VARCHAR(500),
        featured_image VARCHAR(500),
        gallery JSON,
        goal_amount DECIMAL(15,2) NOT NULL,
        raised_amount DECIMAL(15,2) DEFAULT 0,
        currency VARCHAR(3) DEFAULT 'USD',
        category_id INT,
        start_date DATETIME,
        end_date DATETIME,
        is_featured TINYINT(1) DEFAULT 0,
        is_urgent TINYINT(1) DEFAULT 0,
        status ENUM('draft', 'active', 'completed', 'cancelled') DEFAULT 'draft',
        supporters_count INT DEFAULT 0,
        created_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `)
    
    // Projects table
    await execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title_en VARCHAR(255) NOT NULL,
        title_ar VARCHAR(255),
        title_tr VARCHAR(255),
        slug VARCHAR(255) NOT NULL UNIQUE,
        description_en TEXT,
        description_ar TEXT,
        description_tr TEXT,
        content_en TEXT,
        content_ar TEXT,
        content_tr TEXT,
        featured_image VARCHAR(500),
        gallery JSON,
        location VARCHAR(255),
        country VARCHAR(100),
        goal_amount DECIMAL(15,2),
        raised_amount DECIMAL(15,2) DEFAULT 0,
        currency VARCHAR(3) DEFAULT 'USD',
        beneficiaries_count INT DEFAULT 0,
        supporters_count INT DEFAULT 0,
        category_id INT,
        campaign_id INT,
        status ENUM('planning', 'active', 'completed', 'on_hold') DEFAULT 'planning',
        start_date DATE,
        end_date DATE,
        is_featured TINYINT(1) DEFAULT 0,
        created_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
        FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `)
    
    // News/Articles table
    await execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title_en VARCHAR(255) NOT NULL,
        title_ar VARCHAR(255),
        title_tr VARCHAR(255),
        slug VARCHAR(255) NOT NULL UNIQUE,
        excerpt_en TEXT,
        excerpt_ar TEXT,
        excerpt_tr TEXT,
        content_en TEXT,
        content_ar TEXT,
        content_tr TEXT,
        featured_image VARCHAR(500),
        gallery JSON,
        category_id INT,
        author_id INT,
        tags JSON,
        views_count INT DEFAULT 0,
        is_featured TINYINT(1) DEFAULT 0,
        is_published TINYINT(1) DEFAULT 0,
        published_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `)
    
    // Impact Stories table
    await execute(`
      CREATE TABLE IF NOT EXISTS impact_stories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title_en VARCHAR(255) NOT NULL,
        title_ar VARCHAR(255),
        title_tr VARCHAR(255),
        slug VARCHAR(255) NOT NULL UNIQUE,
        story_en TEXT,
        story_ar TEXT,
        story_tr TEXT,
        beneficiary_name VARCHAR(255),
        beneficiary_location VARCHAR(255),
        beneficiary_image VARCHAR(500),
        featured_image VARCHAR(500),
        video_url VARCHAR(500),
        project_id INT,
        campaign_id INT,
        is_featured TINYINT(1) DEFAULT 0,
        is_published TINYINT(1) DEFAULT 0,
        published_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
        FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL
      )
    `)
    
    // Donations table
    await execute(`
      CREATE TABLE IF NOT EXISTS donations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        donor_id INT,
        campaign_id INT,
        project_id INT,
        amount DECIMAL(15,2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        payment_method ENUM('credit_card', 'paypal', 'bank_transfer', 'crypto', 'other') DEFAULT 'credit_card',
        payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
        transaction_id VARCHAR(255),
        is_anonymous TINYINT(1) DEFAULT 0,
        is_recurring TINYINT(1) DEFAULT 0,
        recurring_frequency ENUM('weekly', 'monthly', 'yearly'),
        donor_name VARCHAR(255),
        donor_email VARCHAR(255),
        donor_phone VARCHAR(50),
        donor_message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
      )
    `)
    
    // Events table
    await execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title_en VARCHAR(255) NOT NULL,
        title_ar VARCHAR(255),
        title_tr VARCHAR(255),
        slug VARCHAR(255) NOT NULL UNIQUE,
        description_en TEXT,
        description_ar TEXT,
        description_tr TEXT,
        featured_image VARCHAR(500),
        event_type ENUM('fundraising', 'volunteer', 'awareness', 'webinar', 'other') DEFAULT 'other',
        location VARCHAR(255),
        venue VARCHAR(255),
        is_online TINYINT(1) DEFAULT 0,
        online_url VARCHAR(500),
        start_datetime DATETIME NOT NULL,
        end_datetime DATETIME,
        registration_deadline DATETIME,
        max_participants INT,
        current_participants INT DEFAULT 0,
        is_free TINYINT(1) DEFAULT 1,
        ticket_price DECIMAL(10,2),
        currency VARCHAR(3) DEFAULT 'USD',
        is_featured TINYINT(1) DEFAULT 0,
        is_published TINYINT(1) DEFAULT 0,
        created_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `)
    
    // Volunteers table
    await execute(`
      CREATE TABLE IF NOT EXISTS volunteers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        country VARCHAR(100),
        city VARCHAR(100),
        skills JSON,
        interests JSON,
        availability ENUM('full_time', 'part_time', 'weekends', 'flexible') DEFAULT 'flexible',
        experience TEXT,
        motivation TEXT,
        status ENUM('pending', 'approved', 'active', 'inactive') DEFAULT 'pending',
        hours_contributed INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `)
    
    // Contact Messages table
    await execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
        replied_at DATETIME,
        replied_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (replied_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `)
    
    // Newsletter Subscribers table
    await execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255),
        is_active TINYINT(1) DEFAULT 1,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at DATETIME
      )
    `)
    
    // Site Settings table
    await execute(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT,
        setting_type ENUM('text', 'number', 'boolean', 'json', 'html') DEFAULT 'text',
        description VARCHAR(255),
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    
    // Media/Files table
    await execute(`
      CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255),
        file_path VARCHAR(500) NOT NULL,
        file_type VARCHAR(50),
        file_size INT,
        mime_type VARCHAR(100),
        alt_text VARCHAR(255),
        uploaded_by INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `)

    // Insert default categories
    await execute(`
      INSERT IGNORE INTO categories (name_en, name_ar, name_tr, slug, icon, color, sort_order) VALUES
      ('Emergency Relief', 'الإغاثة الطارئة', 'Acil Yardım', 'emergency-relief', 'alert-triangle', '#ef4444', 1),
      ('Education', 'التعليم', 'Eğitim', 'education', 'book-open', '#3b82f6', 2),
      ('Healthcare', 'الرعاية الصحية', 'Sağlık', 'healthcare', 'heart-pulse', '#22c55e', 3),
      ('Food Security', 'الأمن الغذائي', 'Gıda Güvenliği', 'food-security', 'utensils', '#f97316', 4),
      ('Water & Sanitation', 'المياه والصرف الصحي', 'Su ve Hijyen', 'water-sanitation', 'droplets', '#06b6d4', 5),
      ('Shelter', 'المأوى', 'Barınak', 'shelter', 'home', '#8b5cf6', 6),
      ('Child Protection', 'حماية الطفل', 'Çocuk Koruma', 'child-protection', 'baby', '#ec4899', 7),
      ('Orphan Care', 'رعاية الأيتام', 'Yetim Bakımı', 'orphan-care', 'users', '#14b8a6', 8)
    `)

    // Hash the default admin password
    const passwordHash = await bcrypt.hash("Admin123!", 12)

    // Insert default admin user if not exists
    await execute(
      `INSERT INTO users (full_name, email, password_hash, role, is_active, email_verified_at)
       VALUES (?, ?, ?, 'admin', 1, NOW())
       ON DUPLICATE KEY UPDATE full_name = VALUES(full_name)`,
      ["System Administrator", "admin@hoprelief.org", passwordHash]
    )

    return NextResponse.json({
      success: true,
      message: "Database setup complete! All tables created. Login with admin@hoprelief.org / Admin123!",
    })
  } catch (error: any) {
    console.error("Database setup error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to setup database",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Check if tables exist
    const tables = await query(`SHOW TABLES`)
    return NextResponse.json({
      success: true,
      tables: tables,
      message: "Database connection successful"
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
