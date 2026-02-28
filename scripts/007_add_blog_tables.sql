-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_tr VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt_en TEXT,
  excerpt_tr TEXT,
  content_en TEXT NOT NULL,
  content_tr TEXT NOT NULL,
  author_name VARCHAR(255),
  author_avatar TEXT,
  featured_image TEXT,
  category VARCHAR(100),
  tags TEXT[], -- Array of tags
  view_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media gallery table
CREATE TABLE IF NOT EXISTS media_gallery (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_tr VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_tr TEXT,
  media_type VARCHAR(50) NOT NULL, -- image, video, pdf
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(100),
  tags TEXT[],
  file_size INTEGER,
  duration INTEGER, -- for videos in seconds
  width INTEGER, -- for images
  height INTEGER, -- for images
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX idx_media_gallery_type ON media_gallery(media_type);
CREATE INDEX idx_media_gallery_category ON media_gallery(category);

-- Insert sample blog posts
INSERT INTO blog_posts (
  title_en, title_tr, slug, excerpt_en, excerpt_tr, content_en, content_tr,
  author_name, author_avatar, featured_image, category, tags, is_published, is_featured, published_at
) VALUES
(
  'Our Impact in Gaza: 2024 Year in Review',
  'Gazze''deki Etkimiz: 2024 Yıl İncelemesi',
  'gaza-impact-2024-review',
  'A comprehensive look at how your donations transformed lives in Gaza throughout 2024',
  '2024 yılı boyunca bağışlarınızın Gazze''de hayatları nasıl dönüştürdüğüne kapsamlı bir bakış',
  'Throughout 2024, thanks to your generous support, we were able to reach over 50,000 families in Gaza with emergency relief supplies, medical aid, and educational support. Our teams worked tirelessly on the ground to ensure every donation made a real difference...',
  '2024 yılı boyunca, cömert desteğiniz sayesinde Gazze''de 50.000''den fazla aileye acil yardım malzemeleri, tıbbi yardım ve eğitim desteği ulaştırabildik. Ekiplerimiz, her bağışın gerçek bir fark yarattığından emin olmak için sahada yorulmadan çalıştı...',
  'Ahmed Hassan',
  '/author-ahmed.jpg',
  '/blog-gaza-impact.jpg',
  'impact',
  ARRAY['gaza', 'emergency', 'annual-report'],
  true,
  true,
  '2024-12-15 10:00:00'
),
(
  'Clean Water Projects Reach 100 Villages',
  'Temiz Su Projeleri 100 Köye Ulaştı',
  'clean-water-100-villages',
  'Milestone achievement as our water well projects bring clean water to remote communities',
  'Su kuyusu projelerimiz uzak topluluklara temiz su getirirken dönüm noktası başarı',
  'We are thrilled to announce that our clean water initiative has now reached its 100th village. Each well provides clean, safe drinking water to approximately 200-300 families, transforming health outcomes and reducing water-borne diseases...',
  'Temiz su girişimimizin artık 100. köyüne ulaştığını duyurmaktan heyecan duyuyoruz. Her kuyu, yaklaşık 200-300 aileye temiz, güvenli içme suyu sağlayarak sağlık sonuçlarını dönüştürüyor ve su kaynaklı hastalıkları azaltıyor...',
  'Fatima Ali',
  '/author-fatima.jpg',
  '/blog-water-project.jpg',
  'projects',
  ARRAY['water', 'health', 'milestone'],
  true,
  true,
  '2025-01-05 14:30:00'
),
(
  'Orphan Sponsorship: Stories of Hope',
  'Yetim Sponsorluğu: Umut Hikayeleri',
  'orphan-sponsorship-stories',
  'Meet the children whose lives have been transformed through our orphan sponsorship program',
  'Yetim sponsorluk programımız aracılığıyla hayatları değişen çocuklarla tanışın',
  'Behind every statistic is a child with dreams and potential. Our orphan sponsorship program connects generous donors with children in need, providing education, healthcare, and a path to a brighter future...',
  'Her istatistiğin arkasında hayalleri ve potansiyeli olan bir çocuk var. Yetim sponsorluk programımız, cömert bağışçıları ihtiyaç sahibi çocuklarla buluşturarak eğitim, sağlık hizmetleri ve daha parlak bir geleceğe giden yol sağlıyor...',
  'Sarah Johnson',
  '/author-sarah.jpg',
  '/blog-orphan-stories.jpg',
  'stories',
  ARRAY['orphans', 'education', 'sponsorship'],
  true,
  false,
  '2024-12-28 09:15:00'
);

-- Insert sample media gallery items
INSERT INTO media_gallery (
  title_en, title_tr, description_en, description_tr, media_type, media_url,
  thumbnail_url, category, tags, is_featured
) VALUES
(
  'Emergency Relief Distribution in Gaza',
  'Gazze''de Acil Yardım Dağıtımı',
  'Our team distributing food packages and medical supplies to families in need',
  'Ekibimiz ihtiyaç sahibi ailelere gıda paketleri ve tıbbi malzemeler dağıtıyor',
  'image',
  '/gallery-gaza-relief.jpg',
  '/gallery-gaza-relief-thumb.jpg',
  'emergency',
  ARRAY['gaza', 'food-aid', 'medical'],
  true
),
(
  'Water Well Opening Ceremony',
  'Su Kuyusu Açılış Töreni',
  'Community celebrates the opening of a new water well',
  'Topluluk yeni bir su kuyusunun açılışını kutluyor',
  'video',
  '/gallery-water-well-video.mp4',
  '/gallery-water-well-thumb.jpg',
  'water',
  ARRAY['water', 'celebration', 'community'],
  true
),
(
  '2024 Annual Impact Report',
  '2024 Yıllık Etki Raporu',
  'Download our comprehensive 2024 impact report',
  'Kapsamlı 2024 etki raporumuzu indirin',
  'pdf',
  '/reports/2024-annual-report.pdf',
  '/report-cover-2024.jpg',
  'reports',
  ARRAY['annual-report', 'transparency'],
  false
);
