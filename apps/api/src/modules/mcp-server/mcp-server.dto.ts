import { McpServer } from '@/generated/client';
import { McpServerDTO, McpServerType } from '@refly/openapi-schema';
import { pick } from '@/utils';

/**
 * Convert McpServer PO to DTO
 */
export const mcpServerPO2DTO = (server: McpServer): McpServerDTO | null => {
  if (!server) {
    return null;
  }

  try {
    // Helper function to safely parse JSON with fallback
    const safeJsonParse = (jsonString: string | null, fallback: any = null) => {
      if (!jsonString) {
        return fallback;
      }
      try {
        return JSON.parse(jsonString);
      } catch (error) {
        console.warn('Failed to parse JSON:', jsonString, error);
        return fallback;
      }
    };

    return {
      ...pick(server, ['name', 'url', 'command', 'enabled', 'isGlobal']),
      type: server.type as McpServerType,
      args: safeJsonParse(server.args, []) || [],
      env: safeJsonParse(server.env, {}) || {},
      headers: safeJsonParse(server.headers, {}) || {},
      reconnect: safeJsonParse(server.reconnect, {}) || {},
      config: safeJsonParse(server.config, {}) || {},
      createdAt: server.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: server.updatedAt?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error converting McpServer to DTO:', error);
    return null;
  }
};
