-->Initialize Express Server. (done)
    i. Install nodemon, dotenv, express, etc.
-->Initialize Prisma ORM 

    i. https://www.prisma.io/docs/getting-started/quickstart
    
-->Model DB based on user requirements (done)
    ii. https://www.prisma.io/docs/orm/prisma-schema/data-model

--> Migrate schema using ``npx prisma migrate dev --name init (done)
    N.B. For every change made to the schema, run the command above.

-->Build out views and router based on user requirements
    i. User Register and Login (Done)
        a. Bcrypt
        b. Passport.js (JWT Auth) --> install Passport and Passport-jwt
        c. jsonwebtoken

    ii. Products
        a. CRUD endpoints (Create, Retrieve, Update, Delete) [DONE]

            Create -- POST
            [Validate request body with Yup]
            Retrive -- GET
            Update -- PATCH/PUT
            Delete -- DELETE

    iii. Cart
    iv. Checkout.
-->Handle CORS
-->Deploy


# Things to Read Up
--> Read up on software design patterns (https://en.wikipedia.org/wiki/Software_design_pattern)
--> Data Validation
--> Error handling
--> Cookies and localStorage
--> Authentication methods (Session, Token, JWT [jsonwebtokens])
--> Request Headers.
--> Debugging.
--> Basic command line usage.
--> Git and Github


# JavaScript concepts to know
--> Promises
--> Async/Await
--> Closures
--> TypeScript
--> Spread Operator
--> Fetch
--> Try/Catch

# Express Concepts
--> File Uploads with Multer.js
--> Static and Media File Storage



1. Users should be able to register with name, email, password.
2. Users should be able to log in with email and password.
3. Homepage should have a list of featured products.
4. Products should be grouped into categories.
5. Users should be able to purchase products
    - Add to cart
    - Checkout page
    - Payment Gateway


# Required Models
1. User
    id, email, password, name, cart[Relation to Cart Model], createdAt, updatedAt

2. Product
    id, brand, size, color, price, noInStock, createdAt, updatedAt

3. Cart
    id, products[], userId, createdAt, updatedAt

4. Transactions
    id, amount, status, userId, ref, createdAt, updatedAt
