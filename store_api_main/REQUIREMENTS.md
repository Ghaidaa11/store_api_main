# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

# Routes
GET /
    Description: Retrieves a list of all products.
    Route: /
    Method: GET
    Protected:❌ No

POST /
    Description: Creates a new product.
    Route: /
    Method: POST
    Protected: ✅ Yes – Requires a valid JWT token in req.body.token

GET /:id
    Description: Retrieves a product by its ID.
    Route: /:id
    Method: GET
    Protected: ❌ No

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

# Routes
POST /users
    Description: Create a new user and return a JWT token.
    Protected: ❌ No

GET /users
    Description: Fetch all users.
    Protected: ✅ Yes – Requires a valid JWT token in req.body.token

GET /users/:id
    Description: Fetch a user by ID.
    Protected: ✅ Yes – Requires a valid JWT token in req.body.token

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

# Routes
POST /orders
    Description: Create a new order.
    Protected: ✅ Yes – Requires a JWT token in req.body.token

GET /orders/:user_id
    Description: Fetch all orders for a specific user.
    Protected: ✅ Yes – Requires a JWT token in req.body.token

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

                                                                Table "public.products"
  Column  |          Type          | Collation | Nullable |               Default                | Storage  | Compression | Stats target | Description
----------+------------------------+-----------+----------+--------------------------------------+----------+-------------+--------------+-------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass) | plain    |             |              |
 name     | character varying(255) |           | not null |                                      | extended |             |              |
 price    | numeric(10,2)          |           | not null |                                      | main     |             |              |
 category | character varying(255) |           |          |                                      | extended |             |              |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "fk_product" FOREIGN KEY (product_id) REFERENCES products(id)


#### User
- id
- firstName
- lastName
- password


                                                                 Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default              | Storage  | Compression | Stats target | Description
------------+------------------------+-----------+----------+-----------------------------------+----------+-------------+--------------+-------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass) | plain    |             |              |
 first_name | character varying(100) |           | not null |                                   | extended |             |              |
 last_name  | character varying(100) |           | not null |                                   | extended |             |              |
 password   | text                   |           | not null |                                   | extended |             |              |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "fk_user" FOREIGN KEY (user_id) REFERENCES users(id)


#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

                                                               Table "public.orders"
 Column  |         Type          | Collation | Nullable |              Default               | Storage  | Compression | Stats target | Description
---------+-----------------------+-----------+----------+------------------------------------+----------+-------------+--------------+-------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass) | plain    |             |              |
 user_id | integer               |           | not null |                                    | plain    |             |              |
 status  | character varying(20) |           | not null |                                    | extended |             |              |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "fk_user" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE

                                                         Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default                   | Storage | Compression | Stats target | Description
------------+---------+-----------+----------+--------------------------------------------+---------+-------------+--------------+-------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass) | plain   |             |              |
 order_id   | integer |           | not null |                                            | plain   |             |              |
 product_id | integer |           | not null |                                            | plain   |             |              |
 quantity   | integer |           | not null |                                            | plain   |             |              |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "fk_product" FOREIGN KEY (product_id) REFERENCES products(id)
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
