# E-commerce Frontend

This is a frontend application for an e-commerce website built using modern web technologies such as React, Redux, and Material UI. The app provides a seamless user experience for browsing and purchasing products online.

## Features

- Product Listing => The app provides a list of products in a grid layout, with each product displaying its image, name, price, and rating. The user can sort the products based on price and rating, or search for a specific product by name.

- Product Details => Clicking on a product takes the user to its details page, which displays more information about the product, such as its description, reviews, and similar products. The user can add the product to their cart, view their cart, and proceed to checkout.

- Add to Cart => The app allows the user to add products to their cart from product details page. When the user clicks the "Add to Cart" button, the product is added to the cart and the cart icon in the header is updated with the new quantity of products.

- Cart => The cart displays all the products that the user has added to it, along with their prices and quantities. The user can increase or decrease the quantity of each product or remove it from the cart altogether. The user can also apply a discount code, if available, to their cart.

- Checkout => The user can proceed to checkout once they have added products to their cart. The checkout page displays a form for the user to enter their shipping address and select their preferred shipping method. The user can also choose to pay using a credit/debit card and cash on delivery.

- Filter Products => The user can filter the products by price, rating, and name using the filter controls on the product listing page. For example, the user can choose to view products that are under a certain price range, have a rating above a certain threshold, or contain a specific keyword in their name.

- Online Payment => The app supports online payments using credit/debit cards When the user selects the payment method on the checkout page, they are prompted to enter their payment information. The app then securely processes the payment and displays a confirmation message.

- Shipping Address => The user must enter their shipping address on the checkout page before proceeding with the purchase. The address form includes fields for the user's name, address, city, state/province, ZIP/postal code, and country. The app validates it in the backend to ensure that it is valid and complete.

- Forgot and Change Password => If the user forgets their password, they can reset it by clicking the "Forgot Password" link on the login page. The app prompts the user to enter their email address, and then sends them an email with a link to reset their password. The user can also change their password on the account page by clicking the "Change Password" button.

- Similar Products => The app displays a list of similar products on the product details page, which are products that are similar in category, style, or price to the current product. The user can click on any of these products to view their details page and add them to their cart.

- Authentication with Account Page => The app uses authentication to protect the user's account information and order history. Once the user logs in, they can view their account page, which displays their account information and order history. The user can also update their account information, such as their name, email address, and shipping address.

Overall, this e-commerce frontend application provides a robust set of features for browsing, filtering, and purchasing products online, with a clean and intuitive user interface that makes the shopping experience enjoyable and effortless.

## Screenshots

![App Screenshot](/assets/Screenshot.png?raw=true)

![App Screenshot](/assets/Screenshot1.png?raw=true)

![App Screenshot](/assets/Screenshot8.png?raw=true)

![App Screenshot](/assets/Screenshot7.png?raw=true)

![App Screenshot](/assets/Screenshot6.png?raw=true)

![App Screenshot](/assets/Screenshot5.png?raw=true)

![App Screenshot](/assets/Screenshot4.png?raw=true)

![App Screenshot](/assets/Screenshot3.png?raw=true)

![App Screenshot](/assets/Screenshot2.png?raw=true)

![App Screenshot](/assets/Screenshot19.png?raw=true)

![App Screenshot](assets/Screenshot18.png?raw=true)

![App Screenshot](/assets/Screenshot17.png?raw=true)

![App Screenshot](/assets/Screenshot16.png?raw=true)

![App Screenshot](/assets/Screenshot15.png?raw=true)

![App Screenshot](/assets/Screenshot14.png?raw=true)

![App Screenshot](/assets/Screenshot13.png?raw=true)

![App Screenshot](/assets/Screenshot12.png?raw=true)

![App Screenshot](/assets/Screenshot11.png?raw=true)

![App Screenshot](/assets/Screenshot10.png?raw=true)

## Installation

1. Clone this repository to your local machine using the below command.

```bash
 git clone https://github.com/Hayat4144/Frontend.git
```

2. Navigate to the project directory using the following command.

```bash
cd Frontend
```

3. Install the project dependencies using the command

```bash
npm install
```

4. Start the development server using the command.

```bash
npm install
```

5. Open your browser and navigate to http://localhost:3000 to view the app

## Contributing

Contributions are always welcome! If you find a bug or want to suggest a new feature, please open an issue or submit a pull request.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_BACKEND_URL` for production

`VITE_STRIPE_PUBLISHABLE_KEY`

`VITE_GOOGLE_SITE_KEY`

`VITE_GOOGLE_SECRET_KEY`

`VITE_BACKEND_DEV_URL` for development

## License

This app is licensed under the MIT License. Feel free to use it for your own projects.
