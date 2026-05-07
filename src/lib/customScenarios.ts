import { BiomedQuestion } from "./biomed-data";

export const STORAGE_KEY = "bioverif_custom_scenarios";

export function loadCustomScenarios(): BiomedQuestion[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to load custom scenarios:", error);
    return [];
  }
}

export function saveCustomScenarios(scenarios: BiomedQuestion[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
  } catch (error) {
    console.error("Failed to save custom scenarios:", error);
  }
}

export function addCustomScenario(scenario: BiomedQuestion): BiomedQuestion[] {
  const existing = loadCustomScenarios();
  const updated = [...existing, scenario];
  saveCustomScenarios(updated);
  return updated;
}

export function deleteCustomScenario(id: string): BiomedQuestion[] {
  const existing = loadCustomScenarios();
  const updated = existing.filter((s) => s.id !== id);
  saveCustomScenarios(updated);
  return updated;
}
