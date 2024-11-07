import { NextResponse } from 'next/server';
import { z } from 'zod';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php`);

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();

    // Validate response data
    const categorySchema = z.object({
      categories: z.array(
        z.object({
          strCategory: z.string(),
          strCategoryThumb: z.string().url(),
          strCategoryDescription: z.string(),
        })
      ),
    });

    const validatedData = categorySchema.parse(data);

    return NextResponse.json({
      categories: validatedData.categories.slice(0, 5),
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
