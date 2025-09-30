import { api } from "../../../services/http";
import type { HealthResponse, DbTablesResponse } from "../models/system.models";

const ENDPOINTS = {
  health: "/",
  dbTables: "/db/tables",
} as const;

export async function getHealth() {
  return api<HealthResponse>(ENDPOINTS.health);
}

export async function getDbTables() {
  return api<DbTablesResponse>(ENDPOINTS.dbTables);
}
