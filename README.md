# Inventory Management System (IMS)

This is inventory management system application for managing `small shop`. This is a `web application`. The application is able to maange product information, stock, sales, genrate reports. Application build with `python` language based on python popular web framework `Django`. Go through the below section to know the details.

#### Note: *This project under development*

### Functional Requirements of the IMS

Here is the few key requirement's of an Inventory Management System which contains the following functionality.

#### Hold the product information

Alow to do the following
- Add new product
- Update product
- Remove product
- View the product list

#### Hold the product stock information

- Enter new stock
- Lease out stock
- Check available stock

#### Product Sales management

- Add sales of the product
- Auto udpate the stock after sales
- Sales report generate for the customer
- Viewing sales

#### User management of the system

- Create user account
- User can log into the system
- User can log out from the system
- View all the user
- Update the user information
Specify role as per user type

## Software Features

The following are the features which we can perform in this IMS web application

#### System User
<p>
  Create account | Update account | Login to the system | Logout to the system<br/>
  Three types of user
<ul>
  1. Manager
   <ul>
  - view, update, remove product.
  - Update product stock</br>
  - view, update, remove suppliers.</br>
  - Purchase new product</br>
  - Check sales</br>
  - View and Deactivate staff</br>
  - can close customer ledger. </br>
  - can generate available invoice/report.
  </ul> 
</ul>
<ul>
  2. Staff (must of logged in)
   <ul>
  - Entry the sales</br>
  - Print sales report for the customer</br>
  </ul> 
</ul>
<ul>
  2. Customer (must of logged in)
   <ul>
  View what purchased and the payment details.
  </ul> 
</ul>
</p>

#### Suppliers

Conains product suppliers information. Have adding, viewing, removing functionality.

#### Product

Contains product details. And having adding, viewing, removing functionality.

#### Customer Ledger

Contains customer purchase details, payment and due history.</br>
Have update functionality.

#### Inventory

Contains product quantity, buying price, saling price. </r>
Have adding, updation, removing functionality.

#### Transaction

- Purchase Product
- Sales Product
#### Report

- Sales Report 
- Purchase Report
- Stock Report


## Tech Stack

### Backend

- Django
- Django REST Framework

### Frontend

- React.js
- Berry-style React Admin UI
- Material UI
- Recharts
- Tailwind css
- HTML
- CSS

### Database
- sqlite3 (initial)

## Run The App

Open two terminals from `E:\DJANGO\inventory-shop-django-develop\inventory-shop-django-develop`.

### Backend

Recommended clean setup:

```powershell
cd server
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py runserver
```

If you want to use the checked-in `server\venv` and it works on your machine, run:

```powershell
cd server
.\venv\Scripts\python.exe manage.py runserver
```

The API runs at `http://127.0.0.1:8000`.

### Frontend

```powershell
cd client
npm install
npm start
```

The web app runs at `http://localhost:3000`. Open `http://localhost:3000/dashboard` for the management dashboard.

The frontend is now a Berry-style React admin dashboard built with Material UI. It uses the Django REST API as the live data source and Recharts for the dashboard graphs.

## How To Put Input

Use the dashboard sidebar:

- `Products > New Product`: enter product name, brand, unit, and details, then submit.
- `Inventory > Add Stock`: choose a product, enter purchase price, selling price, and quantity.
- `Trading > New Purchase`: select supplier/products and enter purchased quantity, price, total, paid, and due amounts.
- `Overview > Bill Desk`: enter customer sale details and sold products. A successful sale automatically reduces stock.
- `People & Money > New Supplier`: enter supplier contact and company details.

You can also send API input directly. Example product payload:

```json
{
  "name": "Rice 5kg",
  "brand": "Premium",
  "unit": 1,
  "detail": "Bagged grocery item"
}
```

POST it to:

```text
http://127.0.0.1:8000/products/
```

## Responding Output

Successful form/API submissions return JSON and update the dashboard immediately after refresh.

Example product response:

```json
{
  "id": 1,
  "unit_title": "Piece",
  "name": "Rice 5kg",
  "brand": "Premium",
  "detail": "Bagged grocery item",
  "unit": 1,
  "supplier": null
}
```

Dashboard analytics are available at:

```text
http://127.0.0.1:8000/analytics/dashboard/
```

That response includes counts, sales totals, purchase totals, profit, stock valuation, low-stock products, top-stock products, recent sales, recent purchases, and graph data for the professional dashboard.

## Berry Dashboard UI

The dashboard page includes:

- Material UI AppBar and responsive Drawer navigation
- KPI cards for sales, purchases, profit, and stock value
- Area chart for earned, spent, and profit trends
- Bar chart for top stock products
- Donut chart for inventory health
- Low-stock alert panel
- Recent sales and recent purchases tables

Main frontend files:

```text
client/src/App.jsx
client/src/Pages/HomePage/LoggedHome.jsx
client/src/Components/SideMenu.jsx
client/src/Components/Dashboard/Dashboard.jsx
client/src/App.css
```
