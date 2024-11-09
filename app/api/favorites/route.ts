import { connectDB } from '@/lib/mongodb';
import { getSession } from '@/lib/session';
import { User } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const favoriteSchema = z.object({
  idMeal: z.string(),
  strMeal: z.string(),
  strMealThumb: z.string().url(),
  category: z.string().optional(),
});

export async function GET() {
  try {
    await connectDB();
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await User.findOne({ username: session.username });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Get favorites error:', error);
    return NextResponse.json(
      { error: 'Failed to get favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await User.findOne({ username: session.username });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const validatedData = favoriteSchema.parse(body);

    const isAlreadyFavorite = user.favorites.some(
      (fav: { idMeal: string }) => fav.idMeal === validatedData.idMeal
    );

    if (!isAlreadyFavorite) {
      user.favorites.push(validatedData);
      await user.save();
    }

    return NextResponse.json({ favorites: user.favorites });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await User.findOne({ username: session.username });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const recipeId = searchParams.get('id');

    if (!recipeId) {
      return NextResponse.json(
        { error: 'Recipe ID is required' },
        { status: 400 }
      );
    }

    user.favorites = user.favorites.filter(
      (fav: { idMeal: string }) => fav.idMeal !== recipeId
    );
    await user.save();

    return NextResponse.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Delete favorite error:', error);
    return NextResponse.json(
      { error: 'Failed to remove favorite' },
      { status: 500 }
    );
  }
}
