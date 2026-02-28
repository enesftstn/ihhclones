-- Events table for calendar
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_tr VARCHAR(255) NOT NULL,
  description_en TEXT,
  description_tr TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location VARCHAR(255),
  event_type VARCHAR(50), -- webinar, field_visit, fundraiser, volunteer_day
  image_url TEXT,
  registration_url TEXT,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'upcoming', -- upcoming, ongoing, completed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for events
CREATE INDEX idx_events_date ON events(event_date DESC);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_featured ON events(is_featured);

-- Insert sample events
INSERT INTO events (title_en, title_tr, description_en, description_tr, event_date, event_time, location, event_type, image_url, capacity, is_featured, status) VALUES
('Gaza Emergency Relief Webinar', 'Gazze Acil Yardım Webinarı', 'Join us to learn about our emergency response in Gaza', 'Gazze''deki acil müdahale çalışmalarımız hakkında bilgi edinin', '2025-02-15', '18:00:00', 'Online', 'webinar', '/event-webinar.jpg', 500, true, 'upcoming'),
('Orphan Sponsorship Gala', 'Yetim Sponsorluğu Galası', 'Annual fundraising gala for orphan sponsorship program', 'Yetim sponsorluğu programı için yıllık bağış gecesi', '2025-03-20', '19:00:00', 'Istanbul Convention Center', 'fundraiser', '/event-gala.jpg', 300, true, 'upcoming'),
('Medical Mission to Syria', 'Suriye''ye Tıbbi Misyon', 'Medical professionals volunteer trip to Syrian refugee camps', 'Tıp profesyonellerinin Suriye mülteci kamplarına gönüllü gezisi', '2025-04-10', '09:00:00', 'Turkey-Syria Border', 'field_visit', '/event-medical.jpg', 20, false, 'upcoming'),
('Community Iftar', 'Toplum İftarı', 'Join us for a community iftar during Ramadan', 'Ramazan ayında toplum iftarına katılın', '2025-03-25', '18:30:00', 'Community Center, Ankara', 'volunteer_day', '/event-iftar.jpg', 200, false, 'upcoming');
