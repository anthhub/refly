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
    const errorMessage = error?.message || error?.toString() || 'Unknown error';

    return {
      content: [{ type: 'text', text: `Error: ${errorMessage}` }],
    };
  }

  /**
   * Format success response, filtering sensitive fields
   */
  formatSuccessResponse(data: any): { content: Array<{ type: string; text: string }> } {
    try {
      // Filter sensitive fields
      const filteredData = this.filterSensitiveFields(data);

      // Ensure data is serializable and valid
      const validatedData = this.validateAndCleanData(filteredData);

      // Return structured response that's easier for AI models to parse
      return {
        content: [
          {
            type: 'text',
            text: `Operation completed successfully. Result: ${JSON.stringify(validatedData, null, 2)}`,
          },
        ],
      };
    } catch (error) {
      this.logger.error('Error formatting success response:', error);
      return this.formatErrorResponse(error);
    }
  }

  /**
   * Validate and clean data to ensure it's properly serializable
   */
  private validateAndCleanData(data: any): any {
    if (data === null || data === undefined) {
      return null;
    }

    if (typeof data !== 'object') {
      return data;
    }

    if (Array.isArray(data)) {
      return data
        .filter((item) => item !== null && item !== undefined)
        .map((item) => this.validateAndCleanData(item));
    }

    return Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      if (value !== null && value !== undefined) {
        acc[key] = this.validateAndCleanData(value);
      }
      return acc;
    }, {});
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
