import redis from '../config/redis';

export const db = {

  ensureDbExists: async () => {
    await redis.connect();
  },

  // Nova função para buscar múltiplos itens de uma vez
  readMultiple: async (keyCollection: string, keys: string[]): Promise<any[]> => {
    if (keys.length === 0) return [];
    
    const redisKeys = keys.map(key => `${keyCollection}:${key}`);
    const results = await redis.mGet(redisKeys);
    
    return results.map(result => result ? JSON.parse(result) : null);
  },

  // Otimizar readAll com pipeline
  readAll: async (keyCollection: string): Promise<any[]> => {
    const ids = await redis.sMembers(`${keyCollection}:index`);
    if (!ids || ids.length === 0) return [];
    
    // Usar mGet para buscar todos de uma vez
    const redisKeys = ids.map(id => `${keyCollection}:${id}`);
    const results = await redis.mGet(redisKeys);
    
    return results
      .map(result => result ? JSON.parse(result) : null)
      .filter(item => item !== null);
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
