import { getSupabaseServer } from "./supabase-server";
import { getEmpresaIdFromSession } from "./auth-server";

export type AppSlug = "pos" | "finanzas" | "equipo" | "productos";

export async function getAppsActivasEmpresa(): Promise<AppSlug[]> {
  const result = await getEmpresaIdFromSession();
  if (result.error) return [];

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("empresa_apps")
    .select("app_slug")
    .eq("empresa_id", result.empresaId)
    .eq("activa", true);

  if (error || !data) return [];
  return data.map((row) => row.app_slug as AppSlug);
}

/**
 * Verifica si una app específica está activa.
 * Fail-open: retorna true si hay error de BD para no bloquear accesos legítimos.
 */
export async function isAppActiva(slug: AppSlug): Promise<boolean> {
  const result = await getEmpresaIdFromSession();
  if (result.error) return true;

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("empresa_apps")
    .select("app_slug")
    .eq("empresa_id", result.empresaId)
    .eq("app_slug", slug)
    .eq("activa", true)
    .maybeSingle();

  if (error) return true;
  return data !== null;
}
