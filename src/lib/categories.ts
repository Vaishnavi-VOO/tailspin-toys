/**
 * Category lookup helpers for the static game catalog.
 * These queries read the category table and convert Drizzle rows into the
 * lightweight application model used by Astro pages.
 */
import { asc } from 'drizzle-orm';
import type { CategoryRow } from '../../db/schema';
import { categories } from '../../db/schema';
import type { Category } from '../types/game';
import type { Database } from './db';

const categorySelection = {
    id: categories.id,
    name: categories.name,
};

type CategorySelectionRow = Pick<CategoryRow, 'id' | 'name'>;

function mapCategory(row: CategorySelectionRow): Category {
    return {
        id: row.id,
        name: row.name,
    };
}

/**
 * Retrieves all categories sorted alphabetically by name.
 *
 * @param db - Database connection used to query the category table.
 * @returns A list of categories ready to render in the storefront.
 */
export async function getAllCategories(db: Database): Promise<Category[]> {
    const rows = await db
        .select(categorySelection)
        .from(categories)
        .orderBy(asc(categories.name));

    return rows.map(mapCategory);
}
