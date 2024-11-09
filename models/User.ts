import mongoose from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  favorites: Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    category?: string;
  }>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    favorites: [
      {
        idMeal: String,
        strMeal: String,
        strMealThumb: String,
        category: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
