import { type StreamableHTTPConnection } from './client';

export {
  MultiServerMCPClient,
  type Connection,
  type StdioConnection,
  type StreamableHTTPConnection,
} from './client';

/**
 * Type alias for backward compatibility with previous versions of the package.
 */
export type SSEConnection = StreamableHTTPConnection;

export { loadMcpTools } from './tools';
