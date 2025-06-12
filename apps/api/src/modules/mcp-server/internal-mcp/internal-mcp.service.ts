import { Injectable, Logger } from '@nestjs/common';
import { McpServerService } from '../mcp-server.service';
import { EncryptionService } from '@/modules/common/encryption.service';

@Injectable()
export class InternalMcpService {
  private readonly logger = new Logger(InternalMcpService.name);

  // List of sensitive fields that will be filtered in responses
  private readonly sensitiveFields = [
    'token',
    'secret',
    'password',
    'apikey',
    'api_key',
    'key',
    'authorization',
    'auth',
    'access_token',
    'refresh_token',
    'jwt',
    'credential',
    'private',
  ];

  constructor(
    private readonly mcpServerService: McpServerService,
    private readonly encryptionService: EncryptionService,
  ) {}

  // This service provides helper methods for MCP tool implementation
  // For example, error handling, response formatting, etc.

  /**
   * Format error response
   */
  formatErrorResponse(error: any): { content: Array<{ type: string; text: string }> } {
    this.logger.error('MCP Tool error:', error);
    return {
      content: [{ type: 'text', text: `Error: ${error.message || 'Unknown error'}` }],
    };
  }

  /**
   * Format success response, filtering sensitive fields
   */
  formatSuccessResponse(data: any): { content: Array<{ type: string; text: string }> } {
    // Filter sensitive fields
    const filteredData = this.filterSensitiveFields(data);

    return {
      content: [
        {
          type: 'application/json',
          text: JSON.stringify(filteredData),
        },
      ],
    };
  }

  /**
   * Filter sensitive fields in an object
   * @param data Data to be filtered
   * @returns Filtered data
   */
  private filterSensitiveFields(data: any): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.filterSensitiveFields(item));
    }

    return Object.keys(data).reduce((acc, key) => {
      const isSensitive = this.sensitiveFields.some((field) => key.toLowerCase().includes(field));

      if (isSensitive) {
        acc[key] = '[REDACTED]';
      } else {
        acc[key] = this.filterSensitiveFields(data[key]);
      }
      return acc;
    }, {});
  }
}
