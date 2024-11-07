import { NextResponse } from 'next/server';
import { z } from 'zod';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const querySchema = z.object({
  category: z.string().min(1).max(50),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const validated = querySchema.parse({ category });

    const response = await fetch(
      `${API_BASE_URL}/filter.php?c=${validated.category}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch meals');
    }

    const data = await response.json();

    const mealsSchema = z.object({
      meals: z.array(
        z.object({
          idMeal: z.string(),
          strMeal: z.string(),
          strMealThumb: z.string().url(),
        })
      ),
    });

    const validatedData = mealsSchema.parse(data);

    return NextResponse.json(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 }
      );
    }

    console.error('Error fetching meals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meals' },
      { status: 500 }
    );
  }
}
