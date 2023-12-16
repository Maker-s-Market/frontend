# Maker's Market Frontend

Maker's Market is an e-commerce platform for buying and selling handmade goods. This repository contains the frontend code for the application.
## Features

- **Product Browsing**: Users can view individual product details, including descriptions, images, and seller information.
- **Shopping Cart**: Users can add products to their shopping cart and proceed to checkout when ready.
- **User Authentication**: The application supports user registration and login functionality. Users can also update their profile information.
- **Product Reviews and Ratings**: Users can leave reviews and ratings for products they have purchased.
- **Seller Tools**: Sellers can manage their products, including adding new products and editing existing ones.
- **Search and Category Filtering**: Users can search for products and filter results by category.
- **Wishlist**: Users can add products to their wishlist for future reference.
- **Order History**: Users can view their past orders.

## Tech Stack

- **Frontend**: React.js
- **State Management**: React Context API
- **Routing**: React Router
- **API Calls**: React Query
- **Notifications**: Custom Hooks
- **Styling**: Tailwind CSS

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository.
2. Install the required npm packages using `npm install`.
3. Start the development server using `npm run dev`.

## Code Structure

The codebase is organized into several directories:

- `src/pages`: Contains the different pages of the application, such as the home page, product details page, and user profile page.
- `src/components`: Contains reusable components used across different pages.
- `src/contexts`: Contains the React Contexts used for state management.
- `src/hooks`: Contains custom hooks used for various functionalities like notifications.
- `src/api`: Contains functions for making API calls.
- `src/utils`: Contains utility functions and components like private routes.