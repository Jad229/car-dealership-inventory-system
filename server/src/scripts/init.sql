CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL 
);

CREATE UNIQUE INDEX idx_customers_email_lower ON customers (LOWER(email));

CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    vin TEXT NOT NULL UNIQUE,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INT NOT NULL, 
    mileage INT NOT NULL,
    asking_price NUMERIC(12,2) NOT NULL,
    purchase_cost NUMERIC(12,2) NOT NULL,
    color TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('available', 'sold', 'reserved', 'maintenance'))
);

CREATE TABLE IF NOT EXISTS staff (
    staff_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE  
);

CREATE TABLE IF NOT EXISTS sales (
    sale_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    staff_id INT NOT NULL REFERENCES staff(staff_id),
    vehicle_id INT NOT NULL REFERENCES vehicles(vehicle_id),
    sale_price NUMERIC(12,2) NOT NULL,
    sale_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(vehicle_id)
);

CREATE INDEX idx_sales_customer ON sales(customer_id);
CREATE INDEX idx_sales_staff    ON sales(staff_id);
CREATE INDEX idx_sales_vehicle  ON sales(vehicle_id);

CREATE TABLE IF NOT EXISTS reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    vehicle_id INT NOT NULL REFERENCES vehicles(vehicle_id),
    reservation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days'),
    status TEXT NOT NULL CHECK (status IN ('expired', 'pending', 'completed', 'cancelled', 'confirmed'))
);

CREATE UNIQUE INDEX one_active_reservation_per_vehicle
  ON reservations(vehicle_id)
  WHERE status IN ('pending','confirmed');
CREATE INDEX idx_reservations_customer ON reservations(customer_id);
CREATE INDEX idx_reservations_vehicle  ON reservations(vehicle_id);

CREATE TABLE IF NOT EXISTS inquiries (
    inquiry_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    vehicle_id INT NOT NULL REFERENCES vehicles(vehicle_id),
    inquiry_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'cancelled', 'qualified')),
    notes TEXT
);

CREATE INDEX idx_inquiries_customer ON inquiries(customer_id);
CREATE INDEX idx_inquiries_vehicle  ON inquiries(vehicle_id);
