# Decisions Log

Newest first. One entry per decision.
Format: date — title, then Context / Decision / Why / Trade-off.

---

## 2026-09-16 — Staff has no phone field

**Context:** `customers` has a `phone` column; `staff` does not.

**Decision:** Intentionally omit `phone` from `staff`.

**Why:** Email is sufficient for the
app's purposes. Not an oversight.

**Trade-off:** If staff contact info is ever needed, this needs a schema
change. Revisit only if a real requirement appears.

---

## 2026-09-16 — Inquiries use a minimal status set

**Context:** Considered a fuller lead pipeline (`new / contacted /
qualified / converted / lost`) but went simpler.

**Decision:** `inquiries.status IN ('new','contacted','qualified','cancelled')`.

**Why:** No requirement (yet) for lead-conversion reporting. Kept it
small to match actual use.

**Trade-off / known gap:**

- No terminal "won" state — an inquiry that turns into a sale is not
  linked back to the sale. Conversion rate cannot be reported from this
  table as-is.
- `'cancelled'` is used loosely for "went cold / not interested."
- If conversion reporting becomes a need, add `converted`/`lost` plus
  conversion-link columns (see reservations→sales note below).

---

## 2026-09-16 — reservations: one active hold per vehicle

**Context:** Two possible models:

- **A** — a reservation _holds_ the vehicle; only one active at a time.
- **B** — reservations are just expressed interest; many can coexist.

**Decision:** Model A. Enforced with a partial unique index:

```sql
CREATE UNIQUE INDEX one_active_reservation_per_vehicle
  ON reservations(vehicle_id)
  WHERE status IN ('pending','confirmed');
```
