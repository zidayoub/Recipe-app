# CookBook - Recipe Explorer

A modern web application for exploring and saving your favorite recipes, built with Next.js 14, TypeScript, and MongoDB.

## Features

- 🔍 Browse recipes by categories
- ❤️ Save favorite recipes
- 👤 User authentication
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure session management

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Authentication:** Custom session-based auth
- **Form Validation:** Zod
- **API Integration:** TheMealDB API

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adhhamdev/recipe-app.git
   cd cookbook
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:

   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## API Routes

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Recipes

- `GET /api/recipes/categories` - Get recipe categories
- `GET /api/recipes/by-category` - Get recipes by category
- `GET /api/recipes/random` - Get random recipes

### Favorites

- `GET /api/favorites` - Get user's favorite recipes
- `POST /api/favorites` - Add recipe to favorites
- `DELETE /api/favorites` - Remove recipe from favorites

## Environment Variables

MONGODB_URI= # MongoDB connection string

## Development

### Development Commands

- **Run development server**

  ```bash
  npm run dev
  ```

- **Build for production**

  ```bash
  npm run build
  ```

- **Start production server**
  ```bash
  npm start
  ```

## Features in Detail

### Authentication

- Secure user registration and login
- Session-based authentication with HTTP-only cookies
- Protected routes and API endpoints
- Automatic redirect to login for unauthenticated users

### Recipe Management

- Browse recipes by different cuisine categories
- View detailed recipe information including:
  - Ingredients and measurements
  - Step-by-step cooking instructions
  - Recipe images
- Save and manage favorite recipes
- Responsive recipe cards and modal views

### User Interface

- Clean and modern design with Tailwind CSS
- Responsive layout for all screen sizes
- Loading states and error handling
- Modal-based recipe detail view
- Smooth animations and transitions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the recipe API
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [MongoDB](https://www.mongodb.com/) for the database
