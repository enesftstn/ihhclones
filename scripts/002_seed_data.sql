-- Seed initial data for the humanitarian website

-- Insert categories
INSERT INTO categories (name_en, name_tr, slug, description_en, description_tr, icon) VALUES
('Emergency Relief', 'Acil Yardım', 'emergency-relief', 'Immediate aid for disasters and crises', 'Afetler ve krizler için acil yardım', 'heart-pulse'),
('Orphan Sponsorship', 'Yetim Sponsorluğu', 'orphan-sponsorship', 'Support orphaned children', 'Yetim çocuklara destek', 'users'),
('Clean Water', 'Temiz Su', 'clean-water', 'Provide access to clean water', 'Temiz suya erişim sağlama', 'droplet'),
('Medical Aid', 'Sağlık Yardımı', 'medical-aid', 'Healthcare and medical support', 'Sağlık ve tıbbi destek', 'heart'),
('Education', 'Eğitim', 'education', 'Educational programs and schools', 'Eğitim programları ve okullar', 'book'),
('Food Security', 'Gıda Güvenliği', 'food-security', 'Food distribution and nutrition', 'Gıda dağıtımı ve beslenme', 'utensils'),
('Shelter', 'Barınma', 'shelter', 'Housing and shelter programs', 'Konut ve barınma programları', 'home'),
('Livelihood', 'Geçim', 'livelihood', 'Income generation projects', 'Gelir getirici projeler', 'briefcase')
ON CONFLICT (slug) DO NOTHING;

-- Insert featured campaigns
INSERT INTO campaigns (category_id, title_en, title_tr, description_en, description_tr, short_description_en, short_description_tr, image_url, goal_amount, raised_amount, is_featured, is_urgent, slug) VALUES
(1, 'Palestine Emergency Relief', 'Filistin Acil Yardım', 'Urgent humanitarian aid for families affected by the crisis in Palestine. Providing food, medical supplies, and shelter.', 'Filistin''deki krizden etkilenen aileler için acil insani yardım. Gıda, tıbbi malzeme ve barınak sağlanması.', 'Urgent aid for Palestine crisis victims', 'Filistin krizi mağdurları için acil yardım', '/placeholder.svg?height=400&width=600', 500000, 342000, true, true, 'palestine-emergency-relief'),
(3, 'Clean Water Wells in Africa', 'Afrika''da Temiz Su Kuyuları', 'Build sustainable water wells in rural African communities to provide clean drinking water for thousands of families.', 'Kırsal Afrika topluluklarında binlerce aile için temiz içme suyu sağlamak üzere sürdürülebilir su kuyuları inşa etme.', 'Provide clean water access in Africa', 'Afrika''da temiz su erişimi sağlama', '/placeholder.svg?height=400&width=600', 150000, 89000, true, false, 'clean-water-wells-africa'),
(2, 'Orphan Care Program', 'Yetim Bakım Programı', 'Monthly support for orphaned children including education, healthcare, and basic needs.', 'Eğitim, sağlık ve temel ihtiyaçları içeren yetim çocuklar için aylık destek.', 'Support orphaned children monthly', 'Yetim çocuklara aylık destek', '/placeholder.svg?height=400&width=600', 200000, 156000, true, false, 'orphan-care-program'),
(4, 'Mobile Health Clinics', 'Mobil Sağlık Kliniği', 'Bring medical care to remote areas with fully equipped mobile health clinics.', 'Tam donanımlı mobil sağlık klinikleri ile uzak bölgelere tıbbi bakım getirme.', 'Healthcare for remote communities', 'Uzak topluluklar için sağlık hizmeti', '/placeholder.svg?height=400&width=600', 180000, 92000, true, false, 'mobile-health-clinics'),
(5, 'School Building Project', 'Okul İnşaat Projesi', 'Build new schools in underserved areas to provide quality education for children.', 'Çocuklara kaliteli eğitim sağlamak için yetersiz hizmet alan bölgelerde yeni okullar inşa etme.', 'Build schools for children', 'Çocuklar için okul inşaası', '/placeholder.svg?height=400&width=600', 300000, 145000, true, false, 'school-building-project'),
(6, 'Ramadan Food Packs', 'Ramazan Gıda Kolisi', 'Distribute food packages to families in need during Ramadan.', 'Ramazan ayında ihtiyaç sahibi ailelere gıda paketi dağıtımı.', 'Feed families during Ramadan', 'Ramazan''da aileleri doyurma', '/placeholder.svg?height=400&width=600', 100000, 78000, false, true, 'ramadan-food-packs'),
(4, 'Cataract Surgery Campaign', 'Katarakt Ameliyatı Kampanyası', 'Restore sight to those suffering from cataracts with life-changing surgeries.', 'Hayat değiştiren ameliyatlarla katarakt hastalarına görme yetisi kazandırma.', 'Restore sight through surgery', 'Ameliyatla görmeyi geri kazandırma', '/placeholder.svg?height=400&width=600', 80000, 54000, false, false, 'cataract-surgery-campaign'),
(7, 'Winter Shelter Program', 'Kış Barınma Programı', 'Provide warm shelter and heating for displaced families during winter.', 'Kış aylarında yerinden edilmiş ailelere sıcak barınak ve ısınma sağlama.', 'Warm shelter for winter', 'Kış için sıcak barınak', '/placeholder.svg?height=400&width=600', 120000, 67000, false, true, 'winter-shelter-program')
ON CONFLICT (slug) DO NOTHING;

-- Insert news articles
INSERT INTO news (title_en, title_tr, content_en, content_tr, excerpt_en, excerpt_tr, image_url, author, category, is_featured, slug, published_at) VALUES
('1000 Families Receive Aid in Gaza', 'Gazze''de 1000 Aile Yardım Aldı', 'Our emergency relief teams successfully distributed food packages and medical supplies to 1000 families in Gaza this week...', 'Acil yardım ekiplerimiz bu hafta Gazze''de 1000 aileye gıda paketi ve tıbbi malzeme dağıttı...', 'Emergency relief reaches Gaza families', 'Gazze ailelerine acil yardım ulaştı', '/placeholder.svg?height=300&width=500', 'Relief Team', 'Emergency', true, '1000-families-receive-aid-gaza', CURRENT_TIMESTAMP - INTERVAL '2 days'),
('New Water Well Opens in Kenya', 'Kenya''da Yeni Su Kuyusu Açıldı', 'A new clean water well was inaugurated in rural Kenya, providing access to clean water for over 500 families...', 'Kırsal Kenya''da yeni bir temiz su kuyusu açıldı ve 500''den fazla aileye temiz suya erişim sağladı...', 'Clean water access for Kenyan community', 'Kenya topluluğu için temiz su erişimi', '/placeholder.svg?height=300&width=500', 'Field Reporter', 'Water', true, 'new-water-well-kenya', CURRENT_TIMESTAMP - INTERVAL '5 days'),
('200 Orphans Graduate This Year', 'Bu Yıl 200 Yetim Mezun Oldu', 'We celebrate the graduation of 200 orphans from our education program who are now ready for university...', 'Şimdi üniversiteye hazır olan eğitim programımızdan 200 yetimin mezuniyetini kutluyoruz...', 'Orphans complete education program', 'Yetimler eğitim programını tamamladı', '/placeholder.svg?height=300&width=500', 'Education Team', 'Education', false, '200-orphans-graduate', CURRENT_TIMESTAMP - INTERVAL '7 days')
ON CONFLICT (slug) DO NOTHING;

-- Insert impact stories
INSERT INTO impact_stories (name_en, name_tr, location_en, location_tr, story_en, story_tr, quote_en, quote_tr, image_url, is_featured) VALUES
('Fatima Hassan', 'Fatima Hassan', 'Gaza, Palestine', 'Gazze, Filistin', 'Fatima lost her home in the conflict but through our program, she received emergency shelter and food supplies for her family of six.', 'Fatima çatışmada evini kaybetti ancak programımız sayesinde altı kişilik ailesi için acil barınak ve gıda tedariki aldı.', 'You gave us hope when we had nothing left', 'Hiçbir şeyimiz kalmamışken bize umut verdiniz', '/placeholder.svg?height=300&width=400', true),
('Ahmed Ibrahim', 'Ahmed İbrahim', 'Yemen', 'Yemen', 'Ahmed was able to receive the medical treatment he needed through our mobile health clinic program. He is now healthy and back at school.', 'Ahmed, mobil sağlık kliniği programımız sayesinde ihtiyaç duyduğu tıbbi tedaviyi alabildi. Artık sağlıklı ve okula geri döndü.', 'The doctors saved my life', 'Doktorlar hayatımı kurtardı', '/placeholder.svg?height=300&width=400', true),
('Sarah Mohamed', 'Sarah Mohamed', 'Kenya', 'Kenya', 'With access to clean water from the new well in her village, Sarah no longer has to walk miles every day to fetch water.', 'Köyündeki yeni kuyudan temiz suya erişimle Sarah artık her gün su almak için kilometrelerce yürümek zorunda değil.', 'Clean water changed everything for our family', 'Temiz su ailemiz için her şeyi değiştirdi', '/placeholder.svg?height=300&width=400', true)
ON CONFLICT DO NOTHING;

-- Insert regions
INSERT INTO regions (name_en, name_tr, country, continent, description_en, description_tr, active_projects, beneficiaries, slug) VALUES
('Gaza Strip', 'Gazze Şeridi', 'Palestine', 'Asia', 'Emergency relief and reconstruction programs', 'Acil yardım ve yeniden inşa programları', 15, 45000, 'gaza-strip'),
('Yemen', 'Yemen', 'Yemen', 'Asia', 'Healthcare, food security, and water programs', 'Sağlık, gıda güvenliği ve su programları', 12, 38000, 'yemen'),
('Syria', 'Suriye', 'Syria', 'Asia', 'Refugee support and education programs', 'Mülteci desteği ve eğitim programları', 18, 52000, 'syria'),
('Kenya', 'Kenya', 'Kenya', 'Africa', 'Water, education, and livelihood projects', 'Su, eğitim ve geçim projeleri', 8, 22000, 'kenya'),
('Somalia', 'Somali', 'Somalia', 'Africa', 'Food security and healthcare programs', 'Gıda güvenliği ve sağlık programları', 10, 28000, 'somalia'),
('Bangladesh', 'Bangladeş', 'Bangladesh', 'Asia', 'Rohingya refugee support programs', 'Rohingya mülteci destek programları', 14, 41000, 'bangladesh')
ON CONFLICT (slug) DO NOTHING;
