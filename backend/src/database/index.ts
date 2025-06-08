import redis from '../config/redis';

export const db = {

  ensureDbExists: async () => {
    await redis.connect();
  },

  // Ler o banco de dados
  readAll: async (keyCollection: string): Promise<any[]> => {
    const ids = await redis.sMembers(`${keyCollection}:index`);
    if (!ids) return [];
    
    const items = await Promise.all(
      (ids as string[]).map(async (id) => {
        const raw = await redis.get(`${keyCollection}:${id}`);
        return raw ? JSON.parse(raw) : null;
      })
    );

    return items;
  },

  readDb: async (keyCollection: string, key: string): Promise<any | null> => {
    const result = await redis.get(`${keyCollection}:${key}`);
    
    return !!result? JSON.parse(result) : null;
  },

  // Escrever no banco de dados
  writeDb: async (keyCollection: string, key:string, data: any): Promise<any> => {
    const item = JSON.stringify(data, null, 2);
    await redis.set(`${keyCollection}:${key}`, item);
    await redis.sAdd(`${keyCollection}:index`, key);

    return await db.readDb(keyCollection, key);
  },

  // Remove no banco de dados
  deleteDb: async (keyCollection: string, key: string): Promise<boolean> => {
    const result = await redis.del(`${keyCollection}:${key}`);
    await redis.sRem(`${keyCollection}:index`, key);
    
    return result === 1;
  },
}
