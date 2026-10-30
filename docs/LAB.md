# WAiFF Lab — setup and operation

Decided 30 Oct 2026: free workshops, open to anyone, booked through a new Fillout form, placeholder workshops until real ones are entered.

## What exists

| Piece | Where | Status |
|---|---|---|
| Workshops | Airtable `workshops` + Team Center **Lab · Workshops** | 2 placeholders, both `active` = off |
| Bookings | Airtable `workshop_bookings` + Team Center **Lab · Bookings** (tabs: Confirmed, Waitlist, Needs a look, Cancelled) | empty |
| Lab settings | `lab_config` + Team Center **Setup · Lab** | module enabled; public, booking, payments off |
| Edition switches | `festival_editions` WAIFF-SEL-2027 | lab_module_enabled on; public_visible, booking_open, payments off |
| Seat logic | `seats_taken` (confirmed only), `seats_left`, `booking_label` on workshops; `workshop_seats_left` on bookings | live |
| Automation | **A-LAB-01 · New Lab booking → confirm or waitlist** (wflK5V6kmS7JubnfY) | built, OFF until switched on in Airtable |
| Website | `/lab` page + nav item; booking area shows "Bookings open soon" until a form ID is set | in build v4 |

New fields: workshops `description`, `venue`, `language`, `duration_minutes`, `seats_taken`, `seats_left`, `booking_label`; bookings `participant_country`, `age_19_or_over`, `consent_data_processing`, `staff_notes`, `is_test_record`, `workshop_seats_left`.

## Steps for Save

### 1. Airtable (5 minutes)
1. Open the base → **workshops** table → right-click the **booking_label** column → **Set as primary field**. The booking form's picker shows the primary field, so people then see "Title · 12 Apr, 14:00 KST · 8 seats left".
2. Automations → **A-LAB-01** → review → switch **On**.
3. In the interface editor, check the Lab pages allow editing (page settings → *Allow editing records*), then **Publish**.

### 2. Create the Fillout booking form (15 minutes)
A new, separate form. Never copy or edit the film intake form.
1. Fillout → **Create form** → **Start from Airtable** → base *WAIFF-SEL-2027 [SANDBOX]* → table **workshop_bookings**. Name: *WAiFF Lab booking*.
2. Questions, each mapped to its field:

| Question | Type | Field | Required |
|---|---|---|---|
| Which session would you like to join? | Record picker | `workshop_id` → workshops. Filter: `active` is checked | yes |
| Your name | Short answer | `participant_name` | yes |
| Your email | Email | `participant_email` | yes |
| Confirm your email | Email, must match (same validation as the intake fix) | — (not saved) | yes |
| Country of residence | Short answer / dropdown | `participant_country` | yes |
| I am 19 or older | Checkbox | `age_19_or_over` | yes, pending counsel |
| I agree to the Privacy Policy (link to www.aironi.com/privacy/) | Checkbox | `consent_data_processing` | yes |

3. Leave `booking_status` unmapped. A-LAB-01 fills it (confirmed or waitlisted).
4. Ending page: "Thanks — you'll get an email confirming your place or your waitlist position."
5. **Publish**, then **Share** → copy the form ID (the part after `/t/` in the link).
6. Built 30 Oct 2026 as a Zite app instead (workspace "Workshop Booking", app r7n3my3uio), writing to Airtable `workshop_bookings`: https://r7n3my3uio.zite.so. Set in `NEXT_PUBLIC_LAB_BOOKING_URL`; the /lab page links to it with a "Book a Lab session" button that opens a new tab (an iframe showed blank, v5). The build accepts only zite.so / zite.com / fillout.com hosts and refuses the intake form. Leftover empty Zite table `workshops` in that workspace is unused.

### 3. Real workshops
Team Center → **Lab · Workshops**: replace or delete the two `[PLACEHOLDER]` rows; fill title, date and time (Seoul), duration, facilitator, venue, language, capacity, description; tick **active** to make it bookable.

### 4. Open bookings
When at least one real workshop is active and the form is on the site: tick `lab_public_visible` and `lab_booking_open` in **Setup · Lab** (staff reference flags; the site itself is switched by redeploying).

## Not built yet
- Booking emails (confirmation, waitlist, reminder): queue through `email_queue` once the Resend sender exists.
- Waitlist promotion when someone cancels: manual for now (change a waitlisted booking to confirmed).
- Lab counts on the Overview dashboard.
- Payments (Stripe): blocked; `payment_status` set to not_applicable.

## Counsel
- Age rule for Lab participants (form currently asks for 19+).
- Privacy notice: Lab bookings section (outline added on /privacy), Fillout and Airtable as processors.
- Session terms (photography/recording consent, no-show and cancellation wording).
