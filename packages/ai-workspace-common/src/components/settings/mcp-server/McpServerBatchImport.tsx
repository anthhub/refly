import React, { useState, useEffect } from 'react';
import { Modal, Button, message, Typography, Alert } from 'antd';
import { ImportOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { McpServerJsonEditor } from './McpServerJsonEditor';
import {
  useCreateMcpServer,
  useListMcpServers,
  useValidateMcpServer,
  useUpdateMcpServer,
} from '@refly-packages/ai-workspace-common/queries';
import { McpServerBatchImportProps, McpServerFormData } from './types';
import { mapServerType } from '@refly-packages/ai-workspace-common/components/settings/mcp-server/utils';

export const McpServerBatchImport: React.FC<McpServerBatchImportProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jsonData, setJsonData] = useState<any>({});
  const [isImporting, setIsImporting] = useState(false);
  // Remove tab state

  // Query existing MCP server list
  const { data: mcpServersData, isLoading: isLoadingServers } = useListMcpServers(
    {},
    [isModalVisible],
    {
      enabled: isModalVisible, // Only query when the modal is visible
      refetchOnWindowFocus: false,
    },
  );

  // Create MCP server mutation
  const createMutation = useCreateMcpServer([], {
    onSuccess: (response, _variables, _context) => {
      if (!response?.data?.success) {
        throw new Error(response?.data?.errMsg || 'Server creation reported failure in onSuccess');
      }
      // Do nothing here, we'll handle success after all servers are imported
    },
    onError: (error) => {
      console.error('Failed to create MCP server:', error);
      // Continue with the next server even if one fails
    },
  });

  // Validate MCP server mutation
  const validateMutation = useValidateMcpServer();

  // Update MCP server mutation
  const updateMutation = useUpdateMcpServer();

  // When server list data is fetched, convert to universal format
  useEffect(() => {
    if (mcpServersData?.data && isModalVisible) {
      // If there is data, convert to universal format
      if (mcpServersData.data.length > 0) {
        const universalFormat = convertToUniversalFormat(mcpServersData.data);
        setJsonData(universalFormat);
      } else {
        // If there is no data, initialize with an example template
        setJsonData(getExampleTemplate());
      }
    }
  }, [mcpServersData, isModalVisible]);

  // Convert Refly format to universal format
  const convertToUniversalFormat = (servers: any[]): any => {
    const mcpServers: Record<string, any> = {};

    for (const server of servers) {
      mcpServers[server.name] = {
        type: server.type,
        description: server.config?.description || '',
        url: server.url || '',
        command: server.command || '',
        args: server.args || [],
        env: server.env || {},
      };
    }

    return { mcpServers };
  };

  // Get example template
  const getExampleTemplate = () => {
    return {
      mcpServers: {
        'Example Server 1': {
          type: 'sse',
          description: 'Example SSE server',
          enabled: true,
          url: 'http://localhost:3000',
          env: {},
        },
        'Example Server 2': {
          type: 'streamable',
          description: 'Example Streamable server',
          enabled: true,
          url: 'http://localhost:3001',
          env: {},
        },
        'Example Server 3': {
          type: 'stdio',
          description: 'Example Stdio server',
          enabled: true,
          command: 'npx',
          args: ['-y', '@modelcontextprotocol/server-example'],
          env: {},
        },
      },
    };
  };

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
    // When the modal is shown, it automatically queries the database, and data is processed in useEffect
  };

  // Handle JSON editor changes
  const handleJsonChange = (newData: any) => {
    setJsonData(newData);
  };

  // Convert universal format to Refly format
  const convertToReflyFormat = (data: any): McpServerFormData[] => {
    // If data is already an array of McpServerFormData, return it
    if (Array.isArray(data)) {
      return data as McpServerFormData[];
    }

    // If data has mcpServers property, it's in the universal format
    if (data?.mcpServers && typeof data.mcpServers === 'object') {
      const servers: McpServerFormData[] = [];

      for (const [name, serverConfig] of Object.entries(data.mcpServers) as [string, any][]) {
        // Map universal format fields to Refly format
        const server: McpServerFormData = {
          name: name, // Use the key as the name
          type: mapServerType(serverConfig.type, serverConfig),
          url: serverConfig.url || '',
          command: serverConfig.command || '',
          args: serverConfig.args || [],
          env: serverConfig.env || {},
          headers: serverConfig.headers || {},
          reconnect: { enabled: false },
          config: {},
        };

        // Add description to config if available
        if (serverConfig.description) {
          server.config = { ...server.config, description: serverConfig.description };
        }

        servers.push(server);
      }

      return servers;
    }

    // If it's a single object, wrap it in an array
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return [data as McpServerFormData];
    }

    return [];
  };

  // Import servers
  const handleImport = async () => {
    // Convert universal format to Refly format
    const serversToImport = convertToReflyFormat(jsonData);

    if (serversToImport.length === 0) {
      message.error(t('settings.mcpServer.batchImportEmptyError'));
      return;
    }

    setIsImporting(true);

    const importPromises = serversToImport.map(async (server) => {
      // Prepare data for server creation, ensuring all necessary fields are included.
      const serverCreateData: McpServerFormData = {
        ...server, // Spread all properties from the input server object
        name: server.name,
        type: server.type,
        url: server.url,
        headers: server.headers || {},
        reconnect: server.reconnect || { enabled: false },
        args: server.args || [],
        env: server.env || {},
        config: server.config || {},
        command: server.command, // Include command; will be undefined if not present in server object
      };

      try {
        // Step 1: Create the server using createMutation.
        // Assuming createMutation.mutateAsync resolves without returning the created server object,
        // or if it does, we are proceeding with serverCreateData for subsequent steps
        // as it should contain all necessary information.
        await createMutation.mutateAsync({ body: serverCreateData });

        // Step 2: If the server is marked as 'enabled' in the import data,
        // proceed to validate its configuration and then update its status to enabled.
        if (serverCreateData.enabled) {
          // Prepare the payload for validation and update operations.
          // This structure should align with what validateMutation and updateMutation expect.
          const serverEnablePayload = {
            name: serverCreateData.name,
            type: serverCreateData.type,
            url: serverCreateData.url,
            command: serverCreateData.command,
            args: serverCreateData.args,
            env: serverCreateData.env,
            headers: serverCreateData.headers,
            reconnect: serverCreateData.reconnect,
            config: serverCreateData.config,
            enabled: true, // Explicitly setting enabled to true for this operation
          };

          // a. Validate the server configuration before enabling.
          await validateMutation.mutateAsync({
            body: serverEnablePayload,
          });

          // b. Update the server to set its 'enabled' status to true.
          // Assuming an async version `updateMutation.mutateAsync` is available and preferred for chaining.
          // If only a synchronous `updateMutation.mutate` is available, error handling might differ.
          await updateMutation.mutateAsync({
            // Or use `updateMutation.mutate` if appropriate
            body: serverEnablePayload,
          });
        }
        // If all operations for this server (creation and conditional enabling) are successful.
        return { status: 'fulfilled', serverName: serverCreateData.name };
      } catch (error) {
        // Log the error for the specific server that failed and mark its promise as rejected.
        console.error(`Failed to import or enable server ${serverCreateData.name}:`, error);
        return { status: 'rejected', serverName: serverCreateData.name, errorDetail: error };
      }
    });

    // Wait for all server processing (import and enabling) to complete.
    const results = await Promise.allSettled(importPromises);

    setIsImporting(false); // Mark import process as finished.

    // Calculate success and error counts from the settled promises.
    const successCount = results.filter((r) => r.status === 'fulfilled').length;
    const errorCount = results.filter((r) => r.status === 'rejected').length;
    const totalCount = serversToImport.length;

    // Display appropriate messages to the user based on the outcomes.
    if (successCount > 0) {
      message.success(
        t('settings.mcpServer.batchImportSuccess', {
          count: successCount,
          total: totalCount,
        }),
      );
      // Close the modal and refresh the server list if at least one server was successfully imported.
      setIsModalVisible(false);
      onSuccess(); // Callback to refresh the main server list.
    }

    if (errorCount > 0) {
      message.error(
        t('settings.mcpServer.batchImportPartialError', {
          count: errorCount,
          total: totalCount,
        }),
      );
    }
  };

  return (
    <>
      <Button
        type="default"
        icon={<ImportOutlined />}
        onClick={showModal}
        className="border dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:border-gray-600"
      >
        {t('settings.mcpServer.batchImport')}
      </Button>

      <Modal
        title={t('settings.mcpServer.batchImportTitle')}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            {t('common.cancel')}
          </Button>,
          <Button key="import" type="primary" loading={isImporting} onClick={handleImport}>
            {t('settings.mcpServer.importServers')}
          </Button>,
        ]}
      >
        {/* <Typography.Paragraph className="mb-4">
          {t('settings.mcpServer.batchImportDescription')}
        </Typography.Paragraph> */}

        <Alert
          message={t('settings.mcpServer.jsonModeStdioWarning')}
          type="warning"
          showIcon
          className="my-4"
        />

        <div className="mt-4" style={{ height: '450px' }}>
          {isLoadingServers ? (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
              <div className="text-center">
                <div className="mb-2 w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <Typography.Text>{t('common.loading')}</Typography.Text>
              </div>
            </div>
          ) : (
            <McpServerJsonEditor value={jsonData} onChange={handleJsonChange} readOnly={false} />
          )}
        </div>
      </Modal>
    </>
  );
};
