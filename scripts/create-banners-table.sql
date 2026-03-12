-- Create banners table for managing homepage carousel
CREATE TABLE IF NOT EXISTS banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_tr VARCHAR(255) NOT NULL,
    subtitle_en TEXT,
    subtitle_tr TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    button_text_en VARCHAR(100),
    button_text_tr VARCHAR(100),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default banner data
INSERT INTO banners (title_en, title_tr, subtitle_en, subtitle_tr, image_url, link_url, button_text_en, button_text_tr, sort_order, is_active) VALUES
(
    'Gaza Emergency Relief',
    'Gazze Acil Yardım',
    'Provide urgent humanitarian aid to families affected by the ongoing crisis in Gaza',
    'Gazze''deki devam eden krizden etkilenen ailelere acil insani yardım sağlayın',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop',
    '/donate?campaign=gaza',
    'Donate Now',
    'Şimdi Bağış Yap',
    1,
    TRUE
),
(
    'Clean Water Initiative',
    'Temiz Su Girişimi',
    'Help us bring clean water to communities in need across Africa and Asia',
    'Afrika ve Asya''daki ihtiyaç sahibi topluluklara temiz su ulaştırmamıza yardımcı olun',
    'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1920&h=1080&fit=crop',
    '/donate?campaign=water',
    'Learn More',
    'Daha Fazla Bilgi',
    2,
    TRUE
),
(
    'Orphan Sponsorship Program',
    'Yetim Sponsorluk Programı',
    'Change a child''s life through our comprehensive orphan care and education program',
    'Kapsamlı yetim bakım ve eğitim programımız aracılığıyla bir çocuğun hayatını değiştirin',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop',
    '/donate?campaign=orphan',
    'Sponsor Now',
    'Şimdi Sponsor Ol',
    3,
    TRUE
);
