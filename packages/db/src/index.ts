import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

export const createDbClient = (url: string, key: string) => {
    return createClient<Database>(url, key);
};

export type { Database };
