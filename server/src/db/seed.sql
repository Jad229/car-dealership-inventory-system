-- ============================================================
-- CUSTOMERS (12 rows)
-- ============================================================
INSERT INTO customers (name, email, phone) VALUES
('Alice Johnson',      'alice.johnson@example.com',      '555-0101'),
('Bob Smith',          'bob.smith@example.com',          '555-0102'),
('Carol Martinez',     'carol.martinez@example.com',     '555-0103'),
('David Chen',         'david.chen@example.com',         '555-0104'),
('Emma Wilson',        'emma.wilson@example.com',        '555-0105'),
('Franklin Doodle',    'frank.doodle@example.com',       '555-0106'),
('Grace Hopper',       'grace.hopper@example.com',       '555-0107'),
('Hank Hill',          'hank.hill@example.com',          '555-0108'),
('Ivy League',         'ivy.league@example.com',         '555-0109'),
('Jack Sparrow',       'jack.sparrow@example.com',       '555-0110'),
('Karen Notaro',       'karen.notaro@example.com',       '555-0111'),
('Leonard Nimoy',      'leonard.nimoy@example.com',      '555-0112');

-- ============================================================
-- STAFF (10 rows)
-- ============================================================
INSERT INTO staff (name, email) VALUES
('Sarah Salesperson',  'sarah.sales@dealership.example.com'),
('Mike Manager',       'mike.manager@dealership.example.com'),
('Tina Technician',    'tina.tech@dealership.example.com'),
('Oscar Owner',        'oscar.owner@dealership.example.com'),
('Nina Numbers',       'nina.finance@dealership.example.com'),
('Gary Greeter',       'gary.greeter@dealership.example.com'),
('Wendy Warranty',     'wendy.warranty@dealership.example.com'),
('Carl Closer',        'carl.closer@dealership.example.com'),
('Diana Detailer',     'diana.detail@dealership.example.com'),
('Pete Parts',         'pete.parts@dealership.example.com');

-- ============================================================
-- VEHICLES (15 rows)
-- ============================================================
INSERT INTO vehicles (vin, make, model, year, mileage, asking_price, purchase_cost, color, status) VALUES
('1HGBH41JXMN109001', 'Honda',      'Civic',      2019,  42000, 16500.00, 14000.00, 'Silver',     'available'),
('1HGBH41JXMN109002', 'Honda',      'Accord',     2020,  31000, 21500.00, 18500.00, 'Blue',       'available'),
('1FTFW1ET5DFA00003', 'Ford',       'F-150',      2018,  68000, 28000.00, 24000.00, 'Black',      'sold'),
('1G1ZD5ST5JF000004', 'Chevrolet',  'Malibu',     2017,  55000, 13500.00, 11000.00, 'White',      'available'),
('5YJ3E1EA7KF000005', 'Tesla',      'Model 3',    2021,  22000, 32000.00, 28000.00, 'Red',        'reserved'),
('WBA5A5C50ED000006', 'BMW',        '5 Series',   2016,  72000, 19500.00, 16000.00, 'Gray',       'available'),
('1C4RJFAG5DC000007', 'Jeep',       'Grand Cherokee', 2015, 88000, 17000.00, 13500.00, 'Green',  'maintenance'),
('2T1BURHE0JC000008', 'Toyota',     'Corolla',    2018,  47000, 15500.00, 13000.00, 'Silver',     'available'),
('1N4AL3AP4JC000009', 'Nissan',     'Altima',     2019,  39000, 16000.00, 13500.00, 'Black',      'available'),
('3VW2B7AT5FM000010', 'Volkswagen', 'Jetta',      2015,  91000, 9500.00,  7000.00,  'Blue',       'sold'),
('1FMCU9GD5JK000011', 'Ford',       'Escape',     2020,  28000, 22500.00, 19000.00, 'White',      'available'),
('5NPE24AF5FH000012', 'Hyundai',    'Sonata',     2018,  52000, 14500.00, 11500.00, 'Red',        'available'),
('1HGCM82633A000013', 'Honda',      'Odyssey',    2016,  79000, 18500.00, 15000.00, 'Gold',       'available'),
('1GC4K0C8XBF000014', 'Chevrolet',  'Silverado',  2019,  44000, 31000.00, 27000.00, 'Black',      'reserved'),
('JHMCR6F30HC000015', 'Honda',      'CR-V',       2017,  61000, 19000.00, 15500.00, 'Gray',       'available');

-- ============================================================
-- SALES (12 rows — one per sold vehicle, plus a few repeats allowed since UNIQUE is on vehicle_id)
-- NOTE: vehicle_id must be unique across sales, so only 2 vehicles have status 'sold'.
-- To demonstrate more sales, temporarily allow it or only insert for sold vehicles.
-- Below: we sell the two 'sold' vehicles plus re-use other vehicle_ids is NOT allowed.
-- So instead, let's mark more vehicles sold OR just insert 2 real sales + comment block.
-- ============================================================

-- Realistic: only insert sales for vehicles with status 'sold'.
-- To get more rows, we'll UPDATE a few more vehicles to 'sold' first.
UPDATE vehicles SET status = 'sold' WHERE vehicle_id IN (5, 7, 9, 11, 13);

INSERT INTO sales (customer_id, staff_id, vehicle_id, sale_price, sale_date) VALUES
(1,  1, 3,  27500.00, CURRENT_TIMESTAMP - INTERVAL '45 days'),
(2,  8, 10, 9200.00,  CURRENT_TIMESTAMP - INTERVAL '38 days'),
(3,  1, 5,  31500.00, CURRENT_TIMESTAMP - INTERVAL '30 days'),
(4,  2, 7,  16500.00, CURRENT_TIMESTAMP - INTERVAL '25 days'),
(5,  8, 9,  15800.00, CURRENT_TIMESTAMP - INTERVAL '20 days'),
(6,  1, 11, 22000.00, CURRENT_TIMESTAMP - INTERVAL '15 days'),
(7,  2, 13, 18200.00, CURRENT_TIMESTAMP - INTERVAL '12 days'),
(8,  8, 2,  21000.00, CURRENT_TIMESTAMP - INTERVAL '10 days'),
(9,  1, 4,  13200.00, CURRENT_TIMESTAMP - INTERVAL '8 days'),
(10, 2, 6,  19000.00, CURRENT_TIMESTAMP - INTERVAL '6 days'),
(11, 8, 8,  15200.00, CURRENT_TIMESTAMP - INTERVAL '4 days'),
(12, 1, 12, 14200.00, CURRENT_TIMESTAMP - INTERVAL '2 days');

-- ============================================================
-- RESERVATIONS (12 rows)
-- NOTE: unique partial index allows only ONE active (pending/confirmed) reservation per vehicle.
-- So we spread across different vehicles and mix statuses.
-- ============================================================
INSERT INTO reservations (customer_id, vehicle_id, reservation_date, expires_at, status) VALUES
(1,  1,  CURRENT_TIMESTAMP - INTERVAL '2 days',  CURRENT_TIMESTAMP + INTERVAL '5 days',  'pending'),
(2,  2,  CURRENT_TIMESTAMP - INTERVAL '3 days',  CURRENT_TIMESTAMP + INTERVAL '4 days',  'confirmed'),
(3,  4,  CURRENT_TIMESTAMP - INTERVAL '1 day',   CURRENT_TIMESTAMP + INTERVAL '6 days',  'pending'),
(4,  6,  CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '3 days',  'expired'),
(5,  8,  CURRENT_TIMESTAMP - INTERVAL '5 days',  CURRENT_TIMESTAMP + INTERVAL '2 days',  'confirmed'),
(6,  9,  CURRENT_TIMESTAMP - INTERVAL '7 days',  CURRENT_TIMESTAMP,                      'cancelled'),
(7,  11, CURRENT_TIMESTAMP - INTERVAL '2 days',  CURRENT_TIMESTAMP + INTERVAL '5 days',  'pending'),
(8,  12, CURRENT_TIMESTAMP - INTERVAL '4 days',  CURRENT_TIMESTAMP + INTERVAL '3 days',  'confirmed'),
(9,  13, CURRENT_TIMESTAMP - INTERVAL '6 days',  CURRENT_TIMESTAMP + INTERVAL '1 day',   'pending'),
(10, 14, CURRENT_TIMESTAMP - INTERVAL '1 day',   CURRENT_TIMESTAMP + INTERVAL '6 days',  'confirmed'),
(11, 15, CURRENT_TIMESTAMP - INTERVAL '8 days',  CURRENT_TIMESTAMP - INTERVAL '1 day',   'expired'),
(12, 3,  CURRENT_TIMESTAMP - INTERVAL '3 days',  CURRENT_TIMESTAMP + INTERVAL '4 days',  'completed');

-- ============================================================
-- INQUIRIES (15 rows)
-- ============================================================
INSERT INTO inquiries (customer_id, vehicle_id, inquiry_date, status, notes) VALUES
(1,  1,  CURRENT_TIMESTAMP - INTERVAL '1 day',   'new',       'Asked about financing options.'),
(2,  2,  CURRENT_TIMESTAMP - INTERVAL '2 days',  'contacted', 'Left voicemail, awaiting callback.'),
(3,  3,  CURRENT_TIMESTAMP - INTERVAL '3 days',  'qualified', 'Pre-approved for loan, ready to buy.'),
(4,  4,  CURRENT_TIMESTAMP - INTERVAL '4 days',  'new',       'Wants to schedule test drive.'),
(5,  5,  CURRENT_TIMESTAMP - INTERVAL '5 days',  'contacted', 'Emailed brochure, no response yet.'),
(6,  6,  CURRENT_TIMESTAMP - INTERVAL '6 days',  'cancelled', 'Found a better deal elsewhere.'),
(7,  7,  CURRENT_TIMESTAMP - INTERVAL '7 days',  'qualified', 'Interested in trade-in appraisal.'),
(8,  8,  CURRENT_TIMESTAMP - INTERVAL '8 days',  'new',       'Walk-in, asked about warranty.'),
(9,  9,  CURRENT_TIMESTAMP - INTERVAL '9 days',  'contacted', 'Scheduled test drive for weekend.'),
(10, 10, CURRENT_TIMESTAMP - INTERVAL '10 days', 'qualified', 'Cash buyer, negotiating price.'),
(11, 11, CURRENT_TIMESTAMP - INTERVAL '11 days', 'new',       'Online lead from website form.'),
(12, 12, CURRENT_TIMESTAMP - INTERVAL '12 days', 'contacted', 'Requested CARFAX report.'),
(1,  13, CURRENT_TIMESTAMP - INTERVAL '13 days', 'qualified', 'Repeat customer, loyal since 2015.'),
(2,  14, CURRENT_TIMESTAMP - INTERVAL '14 days', 'cancelled', 'Decided to lease instead.'),
(3,  15, CURRENT_TIMESTAMP - INTERVAL '15 days', 'new',       'Asked about delivery options.');