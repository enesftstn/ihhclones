-- Update banners table with real Ahde Vefa images

-- First, clear existing banners
DELETE FROM banners;

-- Insert updated banner data with real Ahde Vefa images
INSERT INTO banners (title_en, title_tr, subtitle_en, subtitle_tr, image_url, link_url, button_text_en, button_text_tr, sort_order, is_active) VALUES
(
    'Help Those in Need',
    'Ihtiyac Sahiplerine Yardim Edin',
    'Your donation can change lives. Join us in providing humanitarian aid to communities in crisis.',
    'Bagisiniz hayatlari degistirebilir. Kriz icindeki topluluklara insani yardim saglamak icin bize katilin.',
    '/ahde-vefa-volunteer-boxes.jpg',
    '/donate',
    'Donate Now',
    'Simdi Bagis Yap',
    1,
    TRUE
),
(
    'Food Aid Distribution',
    'Gida Yardimi Dagitimi',
    'We deliver food packages to families in need across multiple countries including Somalia.',
    'Somali dahil birden fazla ulkede ihtiyac sahibi ailelere gida paketleri ulastiriyoruz.',
    '/ahde-vefa-somalia-distribution.png',
    '/donate?campaign=food-aid',
    'Support Food Aid',
    'Gida Yardimini Destekle',
    2,
    TRUE
),
(
    'Medical Aid for All',
    'Herkes Icin Tibbi Yardim',
    'Providing essential medical care including cataract surgeries in Somalia.',
    'Somali''de katarakt ameliyatlari dahil temel tibbi bakim sagliyoruz.',
    '/ahde-vefa-cataract-surgery.png',
    '/donate?campaign=medical-aid',
    'Support Healthcare',
    'Saglik Hizmetlerini Destekle',
    3,
    TRUE
),
(
    'Qurban Organization',
    'Kurban Organizasyonu',
    'Join our annual Qurban sacrifice program bringing meat to families in need.',
    'Ihtiyac sahibi ailelere et ulastiran yillik Kurban programimiza katilin.',
    '/ahde-vefa-qurban-somalia.png',
    '/donate?campaign=qurban',
    'Donate for Qurban',
    'Kurban Icin Bagis Yap',
    4,
    TRUE
);
