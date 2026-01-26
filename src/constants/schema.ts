export const COLLECTIONS = {
  INTERACTIONS: "interactions",
  GEMS: "gems",
  FIELDS: "fields",
  MEMORY_LOGS: "memory_logs",
} as const;

export const ROLES = {
  STRATEGY_LEADER: "strateji_lideri",
  AGRONOMIST: "bitki_fizyologu",
  REMOTE_SENSING: "uzaktan_algilama",
  SYSTEM_ARCHITECT: "sistem_mimari",
  AGRI_AI: "agri_ai",
} as const;

export const ROLE_COLORS: Record<string, string> = {
  [ROLES.STRATEGY_LEADER]: "text-blue-400 border-blue-400",
  [ROLES.AGRONOMIST]: "text-green-400 border-green-400",
  [ROLES.REMOTE_SENSING]: "text-orange-400 border-orange-400",
  [ROLES.SYSTEM_ARCHITECT]: "text-gray-400 border-gray-400",
  [ROLES.AGRI_AI]: "text-purple-400 border-purple-400",
};

export const ROLE_ICONS: Record<string, string> = {
  [ROLES.STRATEGY_LEADER]: "BrainCircuit",
  [ROLES.AGRONOMIST]: "Sprout",
  [ROLES.REMOTE_SENSING]: "Satellite",
  [ROLES.SYSTEM_ARCHITECT]: "Server",
  [ROLES.AGRI_AI]: "Bot",
};
