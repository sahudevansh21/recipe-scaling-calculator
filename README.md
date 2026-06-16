# Recipe Scaling Calculator

Welcome to the Recipe Scaling Calculator! This application helps home cooks easily adjust ingredient quantities for any recipe to match their desired number of servings. 

## Problem Solved
Home cooks frequently struggle with adapting recipes designed for a different number of servings. Manually adjusting ingredients can be tedious and prone to errors, leading to incorrect proportions, wasted food, or disappointing results. This application eliminates that hassle.

## Solution
This website provides a straightforward interface to:
- Input a recipe's name, original serving size, and a list of ingredients with their original quantities and units.
- Automatically recalculate all ingredient amounts when you specify a new desired serving count.
- Save and load your custom recipes locally for future use, ensuring your favorite adjustments are always at hand.

## Features
- **Effortless Scaling:** Dynamically adjust ingredient quantities based on new serving sizes.
- **Ingredient Management:** Easily add and remove ingredient entries.
- **Local Storage:** Save your recipes directly in your browser for quick access.
- **Intuitive Interface:** A clean, modern design with glassmorphic elements and vibrant accents.
- **Responsive Design:** Works seamlessly across various devices.

## Getting Started
To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd recipe-scaling-calculator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4.  **Build for production:**
    ```bash
    npm run build
    # or yarn build
    ```

5.  **Start the production server:**
    ```bash
    npm run start
    # or yarn start
    ```

## Technologies Used
-   Next.js 14 (App Router)
-   React 18
-   Client-side Local Storage for data persistence
-   Pure CSS (globals.css) for stunning, responsive design (no Tailwind, no CSS modules)

## Project Structure
-   `app/`: Contains all Next.js App Router pages and layout.
    -   `page.js`: Home page.
    -   `new-recipe/page.js`: Page for creating or loading a recipe and initiating scaling.
    -   `scaled-recipe-view/page.js`: Displays the scaled recipe.
    -   `saved-recipes/page.js`: Lists and manages saved recipes.
    -   `layout.js`: Root layout for the application (navbar, footer).
    -   `globals.css`: Global styles, including design system and responsiveness.
-   `public/`: Static assets (not used in this version, but standard).

## Design Principles
-   **Dark Theme:** Deep dark background (`#0a0a0f`).
-   **Vibrant Accents:** Purple, blue, and cyan gradients for highlights and interactive elements.
-   **Glassmorphism:** Semi-transparent cards with `backdrop-filter: blur()` for a modern, ethereal look.
-   **Smooth Interactions:** Subtle `transition` effects on hover and focus states.
-   **Responsive:** Layouts adapt to various screen sizes using Flexbox and CSS Grid.

## License
This project is open source and available under the MIT License.
