import db from "../database/queries";

export const runQuery = (query: string, params?: any[]) => {
    return new Promise<number | void>((resolve, reject) => {
        db.run(query, params, function (err: unknown) {
            if (err) {
                reject(err instanceof Error ? err : new Error('Unknown error occurred'));
            } else {
                resolve(this.lastID ?? undefined);
            }
        });
    });
};


export const getAllQuery = (query: string, params?: any[]) => {
    return new Promise<any[]>((resolve, reject) => {
        db.all(query, params, (err: unknown, rows: any[]) => {
            if (err) {
                reject(err instanceof Error ? err : new Error('Unknown error occurred'));
            } else {
                resolve(rows);
            }
        });
    });
};