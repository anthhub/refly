import { Module } from '@nestjs/common';
import { McpModule, McpTransportType } from '@rekog/mcp-nest';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { PrismaService } from '@/modules/common/prisma.service';
import { EncryptionService } from '@/modules/common/encryption.service';
import { McpServerController } from './mcp-server.controller';
import { McpServerService } from './mcp-server.service';
import { InternalMcpService } from './internal-mcp/internal-mcp.service';
import { McpServerTools } from './internal-mcp/internal-mcp.tools';

@Module({
  imports: [
    McpModule.forRoot({
      name: 'refly-mcp-server',
      version: '1.0.0',
      guards: [JwtAuthGuard], // Use JwtAuthGuard to protect MCP endpoints
      transport: McpTransportType.STREAMABLE_HTTP, // Use Streamable HTTP transport
      // Default endpoint is /mcp
    }),
  ],
  controllers: [McpServerController],
  providers: [
    McpServerService,
    PrismaService,
    EncryptionService,
    InternalMcpService,
    McpServerTools,
    JwtAuthGuard,
  ],
  exports: [McpServerService, InternalMcpService],
})
export class McpServerModule {}
