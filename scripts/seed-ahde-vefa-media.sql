-- Seed media gallery with real Ahde Vefa images

-- Clear existing media
DELETE FROM media_gallery;

-- Insert Ahde Vefa media items
INSERT INTO media_gallery (title_en, title_tr, description_en, description_tr, media_type, media_url, thumbnail_url, category, tags, is_featured) VALUES
(
    'Volunteers Preparing Aid Boxes',
    'Gonulluler Yardim Kutulari Hazirliyorlar',
    'Our dedicated volunteers prepare food aid packages for distribution to families in need.',
    'Adanmis gonullulerimiz ihtiyac sahibi ailelere dagitilmak uzere gida yardim paketleri hazirliyor.',
    'image',
    '/ahde-vefa-volunteer-boxes.jpg',
    '/ahde-vefa-volunteer-boxes.jpg',
    'volunteers',
    '["volunteer", "aid", "food"]',
    TRUE
),
(
    'Aid Box Preparation',
    'Yardim Kutusu Hazirligi',
    'Volunteers organizing and stacking aid boxes with Ahde Vefa branding.',
    'Gonulluler Ahde Vefa markalı yardım kutularini düzenliyor ve istifliyorlar.',
    'image',
    '/ahde-vefa-volunteer-back.jpg',
    '/ahde-vefa-volunteer-back.jpg',
    'volunteers',
    '["volunteer", "aid", "preparation"]',
    TRUE
),
(
    'Team Meeting',
    'Ekip Toplantisi',
    'Ahde Vefa team members gather for coordination and planning meeting.',
    'Ahde Vefa ekip uyeleri koordinasyon ve planlama toplantisi icin bir araya geliyor.',
    'image',
    '/ahde-vefa-team-meeting.jpg',
    '/ahde-vefa-team-meeting.jpg',
    'team',
    '["team", "meeting", "planning"]',
    TRUE
),
(
    'Food Distribution in Somalia',
    'Somali''de Gida Dagitimi',
    'Large-scale food distribution program reaching hundreds of families in Somalia.',
    'Somali''de yuzlerce aileye ulasan buyuk olcekli gida dagitim programi.',
    'image',
    '/ahde-vefa-somalia-distribution.png',
    '/ahde-vefa-somalia-distribution.png',
    'international',
    '["somalia", "food", "distribution", "international"]',
    TRUE
),
(
    'Cataract Surgery Program - Somalia',
    'Katarakt Ameliyati Programi - Somali',
    'Free cataract surgeries provided to restore sight for those in need in Somalia.',
    'Somali''deki ihtiyac sahiplerine gorme yeteneklerini geri kazandirmak icin ucretsiz katarakt ameliyatlari.',
    'image',
    '/ahde-vefa-cataract-surgery.png',
    '/ahde-vefa-cataract-surgery.png',
    'medical',
    '["medical", "cataract", "somalia", "healthcare"]',
    TRUE
),
(
    'Cataract Surgery Patient',
    'Katarakt Ameliyati Hastasi',
    'Patient recovering after successful cataract surgery through our medical program.',
    'Tibbi programimiz araciligiyla basarili katarakt ameliyati sonrasi iyilesen hasta.',
    'image',
    '/ahde-vefa-cataract-patient.png',
    '/ahde-vefa-cataract-patient.png',
    'medical',
    '["medical", "cataract", "patient", "recovery"]',
    FALSE
),
(
    'Qurban Organization in Somalia',
    'Somali''de Kurban Organizasyonu',
    'Annual Qurban sacrifice program providing meat to families in Somalia.',
    'Somali''deki ailelere et saglayan yillik Kurban kesim programi.',
    'image',
    '/ahde-vefa-qurban-somalia.png',
    '/ahde-vefa-qurban-somalia.png',
    'international',
    '["qurban", "somalia", "sacrifice", "international"]',
    TRUE
),
(
    'Aid Boxes Ready for Distribution',
    'Dagitima Hazir Yardim Kutulari',
    'Stacked aid boxes ready to be delivered to families in need.',
    'Ihtiyac sahibi ailelere teslim edilmek uzere istiflenmis yardim kutulari.',
    'image',
    '/ahde-vefa-stacked-boxes.jpg',
    '/ahde-vefa-stacked-boxes.jpg',
    'aid',
    '["aid", "boxes", "distribution"]',
    FALSE
),
(
    'Aid Boxes Stack',
    'Yardim Kutusu Yigini',
    'Large stock of aid boxes prepared at our distribution center.',
    'Dagitim merkezimizde hazirlanan buyuk yardim kutusu stoku.',
    'image',
    '/ahde-vefa-aid-boxes-stack.jpg',
    '/ahde-vefa-aid-boxes-stack.jpg',
    'aid',
    '["aid", "boxes", "stock"]',
    FALSE
),
(
    'Green Label Aid Packages',
    'Yesil Etiketli Yardim Paketleri',
    'Aid packages with our green branding ready for home delivery.',
    'Eve teslimat icin hazir yesil markalamamizla yardim paketleri.',
    'image',
    '/ahde-vefa-green-boxes.jpg',
    '/ahde-vefa-green-boxes.jpg',
    'aid',
    '["aid", "packages", "delivery"]',
    FALSE
),
(
    'Home Delivery of Aid',
    'Eve Yardim Teslimati',
    'Direct delivery of aid packages to families at their homes.',
    'Ailelere evlerinde dogrudan yardim paketi teslimati.',
    'image',
    '/ahde-vefa-home-delivery.jpg',
    '/ahde-vefa-home-delivery.jpg',
    'aid',
    '["delivery", "home", "families"]',
    FALSE
),
(
    'Aid Packages at Home',
    'Evde Yardim Paketleri',
    'Aid packages delivered to a family home.',
    'Bir aile evine teslim edilen yardim paketleri.',
    'image',
    '/ahde-vefa-delivery-boxes.jpg',
    '/ahde-vefa-delivery-boxes.jpg',
    'aid',
    '["delivery", "home", "packages"]',
    FALSE
),
(
    'Volunteer in Action',
    'Gorevde Gonullu',
    'Ahde Vefa volunteer wearing our official vest during aid distribution.',
    'Yardim dagitimi sirasinda resmi yelegimizi giyen Ahde Vefa gonullusu.',
    'image',
    '/ahde-vefa-volunteer-vest.jpg',
    '/ahde-vefa-volunteer-vest.jpg',
    'volunteers',
    '["volunteer", "vest", "action"]',
    FALSE
),
(
    'Aid Boxes Delivered',
    'Teslim Edilen Yardim Kutulari',
    'Aid boxes with green labels delivered to families.',
    'Ailelere teslim edilen yesil etiketli yardim kutulari.',
    'image',
    '/ahde-vefa-boxes-home.jpg',
    '/ahde-vefa-boxes-home.jpg',
    'aid',
    '["boxes", "delivery", "families"]',
    FALSE
);
