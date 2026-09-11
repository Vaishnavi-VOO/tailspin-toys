/**
 * Publisher lookup helpers for the static game catalog.
 * These queries read the publisher table and convert Drizzle rows into the
 * lightweight application model used by Astro pages.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { PublisherRow } from '../../db/schema';
import type { Publisher } from '../types/game';

const publisherSelection = {
    id: publishers.id,
    name: publishers.name,
};

type PublisherSelectionRow = Pick<PublisherRow, 'id' | 'name'>;

function mapPublisher(row: PublisherSelectionRow): Publisher {
    return {
        id: row.id,
        name: row.name,
    };
}

/**
 * Retrieves all publishers sorted alphabetically by name.
 *
 * @param db - Database connection used to query the publisher table.
 * @returns A list of publishers ready to render in the storefront.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select(publisherSelection)
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map(mapPublisher);
}
