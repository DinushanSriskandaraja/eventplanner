-- Seed Master Data for Services and Event Types
-- This ensures that when providers select categories/events in the UI, they map to valid IDs in the database.

-- 1. Seed Services
INSERT INTO public.services (id, label, icon) VALUES
('photography', 'Photography', 'camera'),
('videography', 'Videography', 'video'),
('makeup-artist', 'Makeup Artist', 'brush'),
('dj-music', 'DJ & Music', 'music'), -- Adjusted to match frontend "DJ & Music"
('decoration', 'Decoration & Stage', 'layout'), -- Adjusted to match frontend "Decoration & Stage"
('event-planner', 'Event Planner', 'calendar'),
('catering', 'Catering', 'coffee'),
('venue', 'Venue', 'home')
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label;

-- 2. Seed Event Types
INSERT INTO public.event_types (id, label) VALUES
('wedding', 'Wedding'),
('birthday', 'Birthday'),
('corporate', 'Corporate Event'),
('engagement', 'Engagement'),
('baby-shower', 'Baby Shower'),
('anniversary', 'Anniversary'),
('custom', 'Custom Event')
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label;
