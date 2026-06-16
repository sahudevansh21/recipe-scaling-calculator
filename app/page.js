import Link from 'next/link';

export const metadata = {
  title: 'Home | Recipe Scaling Calculator',
  description: 'Scale your recipes with ease.',
};

export default function Home() {
  return (
    <main className="container home-page">
      <section className="hero-section glass-card">
        <h1 className="hero-title">Scale Your Recipes, Perfectly.</h1>
        <p className="hero-description">
          Say goodbye to kitchen guesswork. Adjust any recipe to your desired serving size with precision and ease. No more wasted ingredients, just delicious results.
        </p>
        <div className="hero-actions">
          <Link href="/new-recipe" className="btn primary-btn">
            Start New Recipe
          </Link>
          <Link href="/saved-recipes" className="btn secondary-btn">
            View Saved Recipes
          </Link>
        </div>
      </section>
    </main>
  );
}
