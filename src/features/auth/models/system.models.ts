export type HealthResponse = {
  ok?: boolean;
  message?: string;
  port?: number | string;
  uptime?: number;
  db?:
    | {
        connected?: boolean;
        host?: string;
        name?: string;
      }
    | boolean;
  [k: string]: unknown;
};

export type DbTablesResponse = {
  database?: string;
  tables?: string[];
  count?: number;
  [k: string]: unknown;
};
