# Inventory Shop Django - Project Context

## Project Location

`E:\DJANGO\inventory-shop-django-develop\inventory-shop-django-develop`

## Current Shape

This is a small-shop inventory management web app with:

- Django REST backend in `server/`
- React frontend in `client/`
- SQLite database for local development
- React app expected at `http://localhost:3000`
- Django API expected at `http://127.0.0.1:8000`

## Stack

Backend:

- Django `4.1.4`
- Django REST Framework `3.14.0`
- django-cors-headers `3.13.0`
- SQLite

Frontend:

- React `18.2.0`
- React Router `6.6.1`
- React Scripts `5.0.1`
- Tailwind CSS `3.2.4`
- Font Awesome
- react-dropdown-select
- react-toastify

## Important Backend Apps

- `common`: shared timestamp model, unit model, dashboard analytics endpoint
- `supplier`: supplier CRUD
- `product`: product CRUD
- `stock`: stock CRUD
- `purchase`: purchase and purchased item recording
- `sale`: sale and sold item recording
- `account`: scaffold only

## Implemented Backend Endpoints

- `GET/POST /units/`
- `GET /analytics/dashboard/`
- `GET/POST /products/`
- `GET/PUT/DELETE /products/<id>/`
- `GET/POST /suppliers/`
- `GET/PUT/DELETE /suppliers/<id>/`
- `GET/POST /stock/`
- `GET/PUT/DELETE /stock/<id>/`
- `GET/POST /purchase/`
- `GET/DELETE /purchase/<bill_no>/`
- `GET /purchased-products/`
- `GET/POST /sales/`
- `GET/DELETE /sales/<id>/`

## Recently Added Behavior

- Added initial Django migrations for all implemented custom models.
- Added `django-cors-headers` to backend requirements.
- Added dashboard analytics endpoint.
- Added sale models, serializers, views, URLs, and admin registration.
- Added automatic stock updates:
  - Purchase increases existing stock or creates stock for purchased products.
  - Sale decreases stock and prevents selling more than available.
  - Purchase deletion subtracts purchased quantity from stock.
- Added backend search/filtering:
  - Products by name/brand
  - Suppliers by name/company/code/phone
  - Stock by product and quantity range
  - Purchases by supplier/note
  - Sales by customer
- Replaced static frontend dashboard with live analytics.
- Replaced dummy bill page with a sale checkout flow.
- Replaced static sales history page with live API data.
- Converted purchase payment and unit modals from Flowbite-style data attributes to React state.
- Added shared frontend API helper in `client/src/api.js`.

## Verification Already Done

These passed:

- React production build: `npm run build`
- Django system check: `manage.py check`
- Django migrations: `manage.py migrate --noinput`
- Backend smoke test:
  - Created unit, supplier, product
  - Created purchase and verified stock increased
  - Created sale and verified stock decreased
  - Verified dashboard analytics reflected sale total

## Local Run Notes

Backend dependencies were installed locally into:

`server/.python-packages`

Run backend:

```powershell
cd E:\DJANGO\inventory-shop-django-develop\inventory-shop-django-develop\server
$env:PYTHONPATH="E:\DJANGO\inventory-shop-django-develop\inventory-shop-django-develop\server\.python-packages"
C:\Users\Acer\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe manage.py runserver
```

Run frontend:

```powershell
cd E:\DJANGO\inventory-shop-django-develop\inventory-shop-django-develop\client
npm start
```

Open:

`http://localhost:3000/dashboard`

## Remaining Work

- Real authentication and role-based access control.
- Customer ledger and supplier ledger.
- Payment management beyond basic paid/due fields.
- Sale return and purchase return workflows.
- Invoice/receipt printing and exportable reports.
- Stronger frontend polish across older components.
- Automated tests for stock mutation and analytics.
- Production settings cleanup: environment variables, secret key, deployment config.

