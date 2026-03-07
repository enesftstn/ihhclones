-- MySQL seed data script
-- Run after mysql_setup.sql to populate with sample data

-- =====================================================
-- INSERT CATEGORIES
-- =====================================================

INSERT INTO categories (name_en, name_tr, slug, type) VALUES
('Emergency Relief', 'Acil Yardım', 'emergency-relief', 'project'),
('Education', 'Eğitim', 'education', 'project'),
('Healthcare', 'Sağlık', 'healthcare', 'project'),
('Water & Sanitation', 'Su ve Hijyen', 'water-sanitation', 'project'),
('Child Welfare', 'Çocuk Refahı', 'child-welfare', 'project'),
('Food Security', 'Gıda Güvenliği', 'food-security', 'project');

-- =====================================================
-- INSERT ADMIN USER (password: Admin123!)
-- =====================================================

INSERT INTO users (email, password_hash, full_name, role, is_active, email_verified_at) VALUES
('admin@hoprelief.org', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lQ7fKLvzVHZi', 'System Administrator', 'admin', 1, NOW())
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- =====================================================
-- INSERT SAMPLE CAMPAIGNS
-- =====================================================

INSERT INTO campaigns (title, slug, subtitle, description, image_url, goal_amount, current_amount, is_featured, is_active, sort_order) VALUES
('Emergency Relief for Palestine', 'emergency-relief-palestine', 'Provide urgent humanitarian aid to families in need', 'Support our emergency relief efforts providing food, medical supplies, and shelter to families affected by the ongoing crisis.', '/palestine-humanitarian-aid.jpg', 100000, 75230, 1, 1, 1),
('Orphan Sponsorship Program', 'orphan-sponsorship', 'Support orphaned children with education and care', 'Your sponsorship provides education, healthcare, and a loving environment for children who have lost their parents.', '/orphan-child-education.jpg', 50000, 38450, 1, 1, 2),
('Clean Water Initiative', 'clean-water', 'Bring clean water to communities in need', 'Help us build wells and water purification systems in areas where clean water is scarce.', '/water-well-construction.jpg', 75000, 52100, 1, 1, 3),
('Medical Aid for Syria', 'medical-aid-syria', 'Deliver medical supplies and healthcare', 'Support our medical teams providing essential healthcare services and supplies to those in need.', '/medical-aid-supplies.jpg', 60000, 41800, 0, 1, 4);

-- =====================================================
-- INSERT SAMPLE PROJECTS
-- =====================================================

INSERT INTO projects (title, slug, description, image_url, country, location, category_id, goal_amount, raised_amount, currency, status, is_featured, progress_percent) VALUES
('Gaza Emergency Food Distribution', 'gaza-food-distribution', 'Distributing emergency food packages to 5,000 families in Gaza', '/food-aid-packages.jpg', 'Palestine', 'Gaza City', 1, 50000, 42549.10, 'USD', 'active', 1, 85),
('School Reconstruction Project', 'school-reconstruction', 'Rebuilding schools damaged by conflict to provide education', '/children-school-education.jpg', 'Syria', 'Aleppo', 2, 80000, 56000, 'USD', 'active', 1, 70),
('Mobile Medical Clinic', 'mobile-medical-clinic', 'Operating mobile clinics to reach remote communities', '/medical-aid-supplies.jpg', 'Yemen', 'Sana''a', 3, 35000, 28000, 'USD', 'active', 0, 80),
('Water Well Construction', 'water-well-construction', 'Building sustainable water wells in drought-affected areas', '/water-well-construction.jpg', 'Somalia', 'Mogadishu', 4, 25000, 18750, 'USD', 'active', 1, 75);

-- =====================================================
-- INSERT SAMPLE NEWS
-- =====================================================

INSERT INTO news (title, slug, excerpt, content, image_url, category_id, author, is_published, published_at) VALUES
('1,000 Families Receive Food Aid This Month', '1000-families-food-aid', 'Our latest food distribution campaign successfully reached 1,000 families in need across multiple regions.', 'Our dedicated team of volunteers worked tirelessly this month to distribute food packages to families struggling with food insecurity. Each package contained essential items including rice, flour, oil, and canned goods, enough to sustain a family for two weeks.', '/food-aid-packages.jpg', 1, 'Relief Team', 1, NOW()),
('New School Opens in Rural Syria', 'new-school-rural-syria', 'A new educational facility opens its doors, serving 300 students who previously had no access to schooling.', 'After months of construction and preparation, our new school in rural Syria officially opened its doors to students. The school features six classrooms, a library, and a playground, providing a safe learning environment for children in the area.', '/children-school-education.jpg', 2, 'Education Team', 1, NOW()),
('Water Well Project Completed in Somalia', 'water-well-somalia', 'Our latest water well project brings clean water access to over 2,000 community members.', 'The completion of our water well project in Somalia marks a significant milestone in our mission to provide clean water access to underserved communities. This well will serve over 2,000 people in the surrounding villages.', '/water-well-construction.jpg', 4, 'Water Team', 1, NOW());

-- =====================================================
-- INSERT SAMPLE IMPACT STORIES
-- =====================================================

INSERT INTO stories (title, name, location, story, image_url, is_featured, is_published, published_at) VALUES
('A New Beginning for Ahmed', 'Ahmed', 'Gaza, Palestine', 'After losing his home, Ahmed and his family received emergency shelter and food supplies that helped them rebuild their lives. Today, his children are back in school thanks to your support.', '/impact-story-1.jpg', 1, 1, NOW()),
('Clean Water Changes Everything', 'Fatima', 'Rural Somalia', 'Before the well was built, Fatima had to walk 3 hours each day to fetch water. Now, clean water is just minutes away, giving her time to focus on her education and helping her family.', '/impact-story-2.jpg', 1, 1, NOW()),
('Hope Through Education', 'Omar', 'Aleppo, Syria', 'Despite the challenges, Omar never gave up on his dream of learning. With support from our education program, he is now excelling in school and hopes to become a doctor one day.', '/impact-story-3.jpg', 0, 1, NOW());

-- =====================================================
-- INSERT SAMPLE EVENTS
-- =====================================================

INSERT INTO events (title, description, event_type, location, event_date, end_date, image_url, is_active) VALUES
('Annual Charity Gala', 'Join us for our annual fundraising gala featuring dinner, entertainment, and inspiring stories from the field.', 'fundraiser', 'Istanbul, Turkey', DATE_ADD(NOW(), INTERVAL 30 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY), '/event-gala.jpg', 1),
('Volunteer Orientation', 'Learn about volunteer opportunities and how you can make a difference in your community.', 'workshop', 'Online', DATE_ADD(NOW(), INTERVAL 14 DAY), DATE_ADD(NOW(), INTERVAL 14 DAY), '/event-volunteer.jpg', 1),
('Humanitarian Aid Workshop', 'A workshop for professionals interested in humanitarian aid work and disaster response.', 'workshop', 'Ankara, Turkey', DATE_ADD(NOW(), INTERVAL 45 DAY), DATE_ADD(NOW(), INTERVAL 46 DAY), '/event-workshop.jpg', 1);

-- =====================================================
-- INSERT SAMPLE BLOG POSTS
-- =====================================================

INSERT INTO blog_posts (slug, title, content, excerpt, featured_image, author, category, is_published, published_at) VALUES
('impact-of-humanitarian-aid', 'The Impact of Humanitarian Aid in Crisis Zones', 'Humanitarian aid plays a crucial role in saving lives and rebuilding communities affected by conflict and natural disasters...', 'Explore how humanitarian aid transforms lives in crisis zones around the world.', '/blog-humanitarian.jpg', 'Dr. Sarah Ahmed', 'Impact', 1, NOW()),
('volunteer-stories-from-field', 'Volunteer Stories: Making a Difference on the Ground', 'Our volunteers share their experiences working in the field, bringing hope and support to communities in need...', 'Read inspiring stories from our dedicated volunteers working around the world.', '/blog-volunteer.jpg', 'Relief Team', 'Stories', 1, NOW());
