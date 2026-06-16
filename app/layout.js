import './globals.css';

export const metadata = {
  title: 'Recipe Scaling Calculator',
  description: 'Easily scale recipes for any number of servings.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="container nav-container">
            <Link href="/" className="nav-brand">RecipeScaler</Link>
            <div className="nav-links">
              <Link href="/new-recipe" className="nav-link">New Recipe</Link>
              <Link href="/saved-recipes" className="nav-link">Saved Recipes</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="container">
            <p>&copy; 2023 Recipe Scaling Calculator. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
