import { Injectable, Logger } from '@nestjs/common';
import { Tool, Context } from '@rekog/mcp-nest';
import { z } from 'zod';
import { Request } from 'express';
import { McpServerService } from '../mcp-server.service';
import { InternalMcpService } from './internal-mcp.service';
import { User as UserModel } from '@/generated/client';
import { mcpServerPO2DTO } from '../mcp-server.dto';
import { UpsertMcpServerRequest, DeleteMcpServerRequest } from '@refly/openapi-schema';

@Injectable()
export class McpServerTools {
  private readonly logger = new Logger(McpServerTools.name);

  constructor(
    private readonly mcpServerService: McpServerService,
    private readonly internalMcpService: InternalMcpService,
  ) {}

  /**
   * List MCP server configurations
   */
  @Tool({
    name: 'list_mcp_servers',
    description: 'List MCP servers configured by the user',
    parameters: z.object({
      type: z.string().optional().describe('Filter by server type'),
      enabled: z.boolean().optional().describe('Filter by enabled status'),
    }),
  })
  async listMcpServers(
    params: { type?: string; enabled?: boolean },
    _context: Context,
    request: Request,
  ) {
    try {
      // Get user information from the request (added by JwtAuthGuard)
      const user = request.user as UserModel;

      if (!user || !user.uid) {
        this.logger.error('User not found in request, MCP tool authentication may have failed');
        return {
          content: [{ type: 'text', text: 'Error: User authentication failed' }],
        };
      }

      this.logger.log(
        `Tool 'list_mcp_servers' called by user ${user.uid}, params: ${JSON.stringify(params)}`,
      );

      // Call the original service method
      // Convert parameter types to match McpServerService expectations
      const queryParams = {
        type: params.type as any,
        enabled: params.enabled,
      };

      const servers = await this.mcpServerService.listMcpServers(user, queryParams);

      // Convert servers to DTOs and filter out null values
      const serverDTOs = servers
        .map(mcpServerPO2DTO)
        .filter((dto): dto is NonNullable<typeof dto> => dto !== null && dto !== undefined);

      // Log the result for debugging
      this.logger.log(
        `Successfully retrieved ${serverDTOs.length} MCP servers for user ${user.uid}`,
      );

      return this.internalMcpService.formatSuccessResponse(serverDTOs);
    } catch (error) {
      this.logger.error(`Error listing MCP servers: ${error?.message || error}`, error);
      return this.internalMcpService.formatErrorResponse(error);
    }
  }

  /**
   * Create MCP server configuration
   */
  @Tool({
    name: 'create_mcp_server',
    description: 'Create a new MCP server configuration',
    parameters: z.object({
      name: z.string().describe('Server name'),
      type: z.string().describe('Server type'),
      url: z.string().optional().describe('Server URL (required for SSE and Streamable types)'),
      command: z.string().optional().describe('Command (required for stdio type)'),
      args: z.array(z.string()).optional().describe('Command arguments'),
      env: z.record(z.string()).optional().describe('Environment variables'),
      headers: z.record(z.string()).optional().describe('HTTP headers'),
      reconnect: z.record(z.any()).optional().describe('Reconnection configuration'),
      config: z.record(z.any()).optional().describe('Additional configuration'),
      enabled: z.boolean().optional().describe('Whether the server is enabled'),
    }),
  })
  async createMcpServer(params: UpsertMcpServerRequest, _context: Context, request: Request) {
    try {
      const user = request.user as UserModel;

      if (!user || !user.uid) {
        return {
          content: [{ type: 'text', text: 'Error: User authentication failed' }],
        };
      }

      this.logger.log(
        `Tool 'create_mcp_server' called by user ${user.uid}, params: ${JSON.stringify(params)}`,
      );

      const server = await this.mcpServerService.createMcpServer(user, params);
      const serverDTO = mcpServerPO2DTO(server);

      if (!serverDTO) {
        throw new Error('Failed to convert created server to DTO format');
      }

      this.logger.log(`Successfully created MCP server: ${serverDTO.name} for user ${user.uid}`);
      return this.internalMcpService.formatSuccessResponse(serverDTO);
    } catch (error) {
      this.logger.error(`Error creating MCP server: ${error?.message || error}`, error);
      return this.internalMcpService.formatErrorResponse(error);
    }
  }

  /**
   * Update MCP server configuration
   */
  @Tool({
    name: 'update_mcp_server',
    description: 'Update an existing MCP server configuration',
    parameters: z.object({
      name: z.string().describe('Server name'),
      type: z.string().describe('Server type'),
      url: z.string().optional().describe('Server URL'),
      command: z.string().optional().describe('Command'),
      args: z.array(z.string()).optional().describe('Command arguments'),
      env: z.record(z.string()).optional().describe('Environment variables'),
      headers: z.record(z.string()).optional().describe('HTTP headers'),
      reconnect: z.record(z.any()).optional().describe('Reconnection configuration'),
      config: z.record(z.any()).optional().describe('Additional configuration'),
      enabled: z.boolean().optional().describe('Whether the server is enabled'),
    }),
  })
  async updateMcpServer(params: UpsertMcpServerRequest, _context: Context, request: Request) {
    try {
      const user = request.user as UserModel;

      if (!user || !user.uid) {
        return {
          content: [{ type: 'text', text: 'Error: User authentication failed' }],
        };
      }

      this.logger.log(
        `Tool 'update_mcp_server' called by user ${user.uid}, params: ${JSON.stringify(params)}`,
      );

      const server = await this.mcpServerService.updateMcpServer(user, params);
      const serverDTO = mcpServerPO2DTO(server);

      if (!serverDTO) {
        throw new Error('Failed to convert updated server to DTO format');
      }

      this.logger.log(`Successfully updated MCP server: ${serverDTO.name} for user ${user.uid}`);
      return this.internalMcpService.formatSuccessResponse(serverDTO);
    } catch (error) {
      this.logger.error(`Error updating MCP server: ${error?.message || error}`, error);
      return this.internalMcpService.formatErrorResponse(error);
    }
  }

  /**
   * Delete MCP server configuration
   */
  @Tool({
    name: 'delete_mcp_server',
    description: 'Delete MCP server configuration',
    parameters: z.object({
      name: z.string().describe('Server name to delete'),
    }),
  })
  async deleteMcpServer(params: DeleteMcpServerRequest, _context: Context, request: Request) {
    try {
      const user = request.user as UserModel;

      if (!user || !user.uid) {
        return {
          content: [{ type: 'text', text: 'Error: User authentication failed' }],
        };
      }

      this.logger.log(
        `Tool 'delete_mcp_server' called by user ${user.uid}, params: ${JSON.stringify(params)}`,
      );

      await this.mcpServerService.deleteMcpServer(user, params);

      this.logger.log(`Successfully deleted MCP server: ${params.name} for user ${user.uid}`);
      return this.internalMcpService.formatSuccessResponse({
        success: true,
        message: 'MCP server deleted successfully',
        deletedServerName: params.name,
      });
    } catch (error) {
      this.logger.error(`Error deleting MCP server: ${error?.message || error}`, error);
      return this.internalMcpService.formatErrorResponse(error);
    }
  }

  /**
   * Validate MCP server configuration
   */
  @Tool({
    name: 'validate_mcp_server',
    description: 'Validate if MCP server configuration is valid',
    parameters: z.object({
      name: z.string().describe('Server name'),
      type: z.string().describe('Server type'),
      url: z.string().optional().describe('Server URL'),
      command: z.string().optional().describe('Command'),
      args: z.array(z.string()).optional().describe('Command arguments'),
      env: z.record(z.string()).optional().describe('Environment variables'),
      headers: z.record(z.string()).optional().describe('HTTP headers'),
      reconnect: z.record(z.any()).optional().describe('Reconnection configuration'),
      config: z.record(z.any()).optional().describe('Additional configuration'),
      enabled: z.boolean().optional().describe('Whether the server is enabled'),
    }),
  })
  async validateMcpServer(params: UpsertMcpServerRequest, context: Context, request: Request) {
    try {
      const user = request.user as UserModel;

      if (!user || !user.uid) {
        return {
          content: [{ type: 'text', text: 'Error: User authentication failed' }],
        };
      }

      this.logger.log(
        `Tool 'validate_mcp_server' called by user ${user.uid}, params: ${JSON.stringify(params)}`,
      );

      // Report progress
      await context.reportProgress({
        progress: 10,
        total: 100,
      });

      const result = await this.mcpServerService.validateMcpServer(user, params);

      // Complete progress
      await context.reportProgress({
        progress: 100,
        total: 100,
      });

      // Ensure result is properly formatted
      const validationResult = {
        success: true,
        message: 'MCP server validation completed successfully',
        tools: result || [],
        toolCount: Array.isArray(result) ? result.length : 0,
      };

      this.logger.log(
        `Successfully validated MCP server: ${params.name} for user ${user.uid}, found ${validationResult.toolCount} tools`,
      );
      return this.internalMcpService.formatSuccessResponse(validationResult);
    } catch (error) {
      this.logger.error(`Error validating MCP server: ${error?.message || error}`, error);
      return this.internalMcpService.formatErrorResponse(error);
    }
  }
}
