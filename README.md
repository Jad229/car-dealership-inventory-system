# Car dealership inventory system

A dealership dashboard for vehicles, customers, reservations, inquiries, and sales. The React client talks to an Express API, and the API stores data in PostgreSQL.

## Setup

Requirements: Docker, Node.js, and npm.

1. Copy the environment file and fill in the values.

```bash
cp .env.example .env
```

`PORT` must be `3000`. The API container listens on that port, and Compose publishes it as `3000`. The client calls `http://localhost:3000`.

```
PORT=3000
POSTGRES_USER=cdis_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=cdis
```

2. Start Postgres and the API.

```bash
docker compose up --build
```

Postgres is published on host port `5433`. The schema in `server/src/db/init.sql` is applied only when the database volume is created for the first time. To rerun it, remove the volume with `docker compose down -v` and start again.

3. Load the sample data from the repo root, using the same user and database name as `.env`.

```bash
docker compose exec -T db psql -U cdis_user -d cdis < server/src/db/seed.sql
```

4. Start the client.

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## Architecture

```
client (React, Vite, Tailwind)  -->  API (Express, port 3000)  -->  PostgreSQL
```

The client is not in Compose. It runs locally and calls the API with `fetch`. Routes live in `client/src/App.jsx`, and the sidebar highlights the active path.

| Path | Page | API |
| --- | --- | --- |
| `/` | Dashboard metrics | `GET /api/dashboard` |
| `/inventory` | Vehicle list, search, filters, add form | `GET` and `POST /api/vehicles` |
| `/reservations` | Reservation list | `GET /api/reservations` |
| `/inquiries` | Inquiry list | `GET /api/inquiries` |
| `/customers` | Customer list | `GET /api/customers` |
| `/sales` | Sales list | `GET /api/sales` |

On the server, `server/src/index.js` starts Express. `server/src/app.js` mounts the routes. `server/src/db/index.js` runs SQL through a `pg` pool using `DATABASE_URL`. Inside Compose that URL points at the `db` service on port `5432`.

List pages share `RecordRow` for the card layout. Inventory keeps one query object for search, filters, and sort, and refetches when it changes. Creating a vehicle increments a refresh key so the list loads again.

## Schema

`server/src/db/init.sql` creates six tables.

`customers` has a name, email, and phone. Email is unique regardless of case.

`vehicles` has a unique VIN, make, model, year, mileage, asking price, purchase cost, color, and status. Status is one of `available`, `reserved`, `sold`, or `maintenance`.

`staff` has a name and a unique email. A sale requires a staff member.

`sales` links a customer, a staff member, and a vehicle. `vehicle_id` is unique, so a vehicle can be sold once. `sale_price` and `sale_date` are stored on the sale.

`reservations` link a customer and a vehicle. Status is one of `pending`, `confirmed`, `completed`, `cancelled`, or `expired`. `expires_at` defaults to seven days after the row is created. Only one `pending` or `confirmed` reservation is allowed per vehicle.

`inquiries` link a customer and a vehicle. Status is one of `new`, `contacted`, `qualified`, or `cancelled`. `notes` is optional.

Creating a sale sets that vehicle to `sold`. Creating a reservation sets it to `reserved`. Cancelling a reservation sets it back to `available`.

## API integration

The API accepts and returns JSON. List endpoints return an array of rows. Create endpoints return the inserted row in a one-element array and use status `201`.

### Vehicles

`GET /api/vehicles` accepts these query parameters:

| Parameter | Behavior |
| --- | --- |
| `search` | Partial match on make, model, or VIN |
| `make`, `model`, `color` | Partial, case-insensitive match |
| `year` | Exact match |
| `sort` | Column name. The client sends `year`, `make`, `model`, `color`, `mileage`, or `asking_price` |
| `order` | `ASC` or `DESC`. Defaults are `year` and `DESC` |

Empty filters are omitted. The rest are combined with `AND`.

`POST /api/vehicles` body:

```json
{
  "vin": "1ADDVEHICLE000099",
  "make": "Mazda",
  "model": "CX-5",
  "year": 2022,
  "mileage": 12000,
  "asking_price": 28000,
  "purchase_cost": 24000,
  "color": "Blue",
  "status": "available"
}
```

`status` defaults to `available` when it is omitted.

`GET /api/vehicles/:vehicleId` returns one vehicle. `PATCH /api/vehicles/:vehicleId` updates the fields present in the body. `DELETE /api/vehicles/:vehicleId` removes it. `GET /api/vehicle-lookup/:vin` returns make, model, year, mileage, asking price, color, and status.

### Dashboard

`GET /api/dashboard` runs SQL aggregations and returns:

```json
{
  "inventoryByStatus": [{ "status": "available", "count": 10 }],
  "inventoryValue": "172000.00",
  "salesRevenue": "241800.00",
  "averageSalePrice": "18600.00",
  "mostInquiredVehicles": [
    {
      "vehicle_id": 1,
      "year": 2019,
      "make": "Honda",
      "model": "Civic",
      "inquiry_count": 2
    }
  ]
}
```

Inventory value is the sum of asking prices for vehicles that are not `sold`. Sales revenue is the sum of `sale_price`. Average sale price is the average of `sale_price`. The inquiry list is the five vehicles with the most inquiries.

### Customers, staff, inquiries, reservations, sales

`GET /api/customers` and `POST /api/customers` with `{ "name", "email", "phone" }`.

`POST /api/staff` with `{ "name", "email" }`.

`GET /api/inquiries` and `POST /api/inquiries` with `{ "customer_id", "vehicle_id", "inquiry_date", "status", "notes" }`.

`GET /api/reservations` returns the customer name, vehicle id, reservation date, and status. `POST /api/reservations` takes `{ "customer_id", "vehicle_id", "reservation_date", "status" }`. The vehicle must be `available`, and it must not already have a reservation row. `PUT /api/reservations/:reservation_id` marks that reservation `cancelled` and sets the vehicle back to `available`.

`GET /api/sales` returns the customer name, vehicle id, sale date, and sale price. `POST /api/sales` takes `{ "customer_id", "staff_id", "vehicle_id", "sale_date", "sale_price" }`. The vehicle must be `available` and must not already have a sale.
