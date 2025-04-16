import { handleSafeParseZod } from 'src/shared/handleSafeParseZod';
import { z } from 'zod';

export interface GameProps {
  id?: string;
  title: string;
  description: string;
  platforms: string[];
  releaseDate: Date;
  rating: number;
  coverImage: string;
}

export class Game {
  private _id: string;
  private _title: string;
  private _description: string;
  private _platforms: string[];
  private _releaseDate: Date;
  private _rating: number;
  private _coverImage: string;

  constructor(props: GameProps, id?: string) {
    this.validate(props);
    this._id = props.id;
    this._title = props.title;
    this._description = props.description;
    this._platforms = props.platforms;
    this._releaseDate = props.releaseDate;
    this._rating = props.rating;
    this._coverImage = props.coverImage;
  }

  private validate(props: GameProps): void {
    const schema = z.object({
      title: z.string().min(1, 'Title is required'),
      description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description must be a maximum of 1000 characters'),
      platforms: z
        .array(z.string())
        .min(1, 'At least one platform is required'),
      releaseDate: z.date(),
      rating: z
        .number()
        .min(0, 'Rating must be at least 0')
        .max(5, 'Rating must be at most 5'),
      coverImage: z.string().url('Cover image must be a valid URL'),
    });

    const result = schema.safeParse(props);

    if (result.success === false) {
      throw handleSafeParseZod(result);
    }
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public set title(value: string) {
    if (value.length < 1) throw new Error('Title is required');
    this._title = value;
  }

  public get description() {
    return this._description;
  }

  public set description(value: string) {
    if (value.length < 10 || value.length > 1000) {
      throw new Error(
        'Description must be between 10 and 1000 characters long',
      );
    }
    this._description = value;
  }

  public get platforms() {
    return this._platforms;
  }

  public set platforms(value: string[]) {
    if (!Array.isArray(value) || value.length === 0) {
      throw new Error('At least one platform is required');
    }
    this._platforms = value;
  }

  public get releaseDate() {
    return this._releaseDate;
  }

  public set releaseDate(value: Date) {
    if (isNaN(value.getTime())) {
      throw new Error('Invalid release date');
    }
    this._releaseDate = value;
  }

  public get rating() {
    return this._rating;
  }

  public set rating(value: number) {
    if (value < 0 || value > 5) {
      throw new Error('Rating must be between 0 and 5');
    }
    this._rating = value;
  }

  public get coverImage() {
    return this._coverImage;
  }

  public set coverImage(value: string) {
    if (!/^https?:\/\/.+\..+/.test(value)) {
      throw new Error('Cover image must be a valid URL');
    }
    this._coverImage = value;
  }

  static create(props: GameProps): [Game | null, Error | null] {
    try {
      return [new Game(props), null];
    } catch (error) {
      return [null, error as Error];
    }
  }

  static instance(props: GameProps): [Game | null, Error | null] {
    return [new Game(props), null];
  }
}
