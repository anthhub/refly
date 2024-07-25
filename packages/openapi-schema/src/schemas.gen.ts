// This file is auto-generated by @hey-api/openapi-ts

export const $ResourceMeta = {
  type: 'object',
  description: 'Resource metadata',
  properties: {
    url: {
      type: 'string',
      description: 'Weblink URL',
      example: 'https://www.google.com',
    },
    title: {
      type: 'string',
      description: 'Weblink title',
      example: 'Google',
    },
    storageKey: {
      type: 'string',
      description: 'Storage key for the weblink',
      deprecated: true,
    },
  },
} as const;

export const $ResourceType = {
  type: 'string',
  description: 'Resource type',
  enum: ['weblink', 'note'],
} as const;

export const $Resource = {
  type: 'object',
  required: ['resourceId', 'resourceType', 'title', 'isPublic', 'indexStatus', 'createdAt', 'updatedAt'],
  properties: {
    resourceId: {
      type: 'string',
      description: 'Resource ID',
      example: 'r-g30e1b80b5g1itbemc0g5jj3',
    },
    resourceType: {
      description: 'Resource type',
      $ref: '#/components/schemas/ResourceType',
    },
    collectionId: {
      type: 'string',
      description: 'Collection ID',
      deprecated: true,
    },
    title: {
      type: 'string',
      description: 'Resource title',
    },
    data: {
      type: 'object',
      description: 'Resource metadata',
      $ref: '#/components/schemas/ResourceMeta',
    },
    indexStatus: {
      description: 'Resource index status',
      $ref: '#/components/schemas/IndexStatus',
    },
    isPublic: {
      type: 'boolean',
      description: 'Whether this resource is public',
      default: false,
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Collection creation time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Collection update time',
    },
    contentPreview: {
      type: 'string',
      description: 'Preview content for this resource',
    },
    content: {
      type: 'string',
      description: 'Document content for this resource (only returned in getNoteDetail API)',
    },
  },
} as const;

export const $Note = {
  type: 'object',
  required: ['noteId', 'title', 'readOnly', 'isPublic', 'createdAt', 'updatedAt'],
  properties: {
    noteId: {
      type: 'string',
      description: 'Note ID',
      example: 'n-g30e1b80b5g1itbemc0g5jj3',
    },
    title: {
      type: 'string',
      description: 'Note title',
      example: 'My note',
    },
    contentPreview: {
      type: 'string',
      description: 'Note content preview',
    },
    content: {
      type: 'string',
      description: 'Full note content (only returned in detail api)',
    },
    readOnly: {
      type: 'boolean',
      description: 'Whether this note is read-only',
    },
    isPublic: {
      type: 'boolean',
      description: 'Whether this note is public',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Note creation time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Note update time',
    },
  },
} as const;

export const $Collection = {
  type: 'object',
  required: ['collectionId', 'title', 'createdAt', 'updatedAt'],
  properties: {
    collectionId: {
      type: 'string',
      description: 'Collection ID',
      example: 'cl-g30e1b80b5g1itbemc0g5jj3',
    },
    title: {
      type: 'string',
      description: 'Collection title',
      example: 'Default Collection',
    },
    description: {
      type: 'string',
      description: 'Collection description',
      example: 'Collection description',
    },
    isPublic: {
      type: 'boolean',
      description: 'Whether this collection is public',
      default: false,
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Collection creation time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Collection update time',
    },
    resources: {
      type: 'array',
      description: 'Collection resources (only returned in detail API)',
      items: {
        $ref: '#/components/schemas/Resource',
      },
    },
  },
} as const;

export const $SkillTemplate = {
  type: 'object',
  description: 'Skill template',
  properties: {
    name: {
      type: 'string',
      description: 'Skill template name',
    },
    displayName: {
      type: 'object',
      description: 'Skill display name (key is locale and value is display name)',
    },
    description: {
      type: 'string',
      description: 'Skill description',
    },
    configSchema: {
      type: 'object',
      description: 'JSON schema for config',
    },
  },
} as const;

export const $SkillTriggerEvent = {
  type: 'string',
  description: 'Skill trigger event',
  enum: ['resourceAdd', 'resourceUpdate', 'collectionAdd', 'collectionUpdate', 'cron'],
} as const;

export const $SkillTrigger = {
  type: 'object',
  description: 'Skill triggers',
  required: ['skillId', 'triggerId', 'event', 'enabled', 'createdAt', 'updatedAt'],
  properties: {
    skillId: {
      type: 'string',
      description: 'Skill ID',
      example: 'sk-g30e1b80b5g1itbemc0g5jj3',
    },
    triggerId: {
      type: 'string',
      description: 'Trigger ID',
      example: 'tr-g30e1b80b5g1itbemc0g5jj3',
    },
    event: {
      description: 'Trigger event',
      $ref: '#/components/schemas/SkillTriggerEvent',
    },
    crontab: {
      type: 'string',
      description: 'Cron expression',
      example: '0 0 * * * *',
    },
    enabled: {
      type: 'boolean',
      description: 'Trigger enabled',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Trigger creation time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Trigger update time',
    },
  },
} as const;

export const $SkillMeta = {
  type: 'object',
  description: 'Skill metadata',
  required: ['skillName', 'skillDisplayName'],
  properties: {
    skillName: {
      type: 'string',
      description: 'Skill name',
    },
    skillDisplayName: {
      type: 'string',
      description: 'Skill display name',
    },
    skillId: {
      type: 'string',
      description: 'Skill ID',
      example: 'sk-g30e1b80b5g1itbemc0g5jj3',
    },
    config: {
      type: 'string',
      description: 'Skill config',
    },
  },
} as const;

export const $SkillInstance = {
  type: 'object',
  description: 'Skill',
  allOf: [
    {
      $ref: '#/components/schemas/SkillMeta',
    },
    {
      type: 'object',
      required: ['createdAt', 'updatedAt'],
      properties: {
        triggers: {
          type: 'array',
          description: 'Skill triggers',
          items: {
            $ref: '#/components/schemas/SkillTrigger',
          },
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Skill creation time',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Skill update time',
        },
      },
    },
  ],
} as const;

export const $SkillLog = {
  type: 'object',
  description: 'Skill operation log',
  required: ['logId', 'skillId', 'skillName', 'input', 'context', 'createdAt', 'updatedAt'],
  properties: {
    logId: {
      type: 'string',
      description: 'Log ID',
      example: 'lg-g30e1b80b5g1itbemc0g5jj3',
    },
    skillId: {
      type: 'string',
      description: 'Skill ID',
    },
    skillName: {
      type: 'string',
      description: 'Skill name',
    },
    triggerId: {
      type: 'string',
      description: 'Skill trigger ID',
    },
    input: {
      description: 'Skill input',
      $ref: '#/components/schemas/SkillInput',
    },
    context: {
      description: 'Skill context',
      $ref: '#/components/schemas/SkillContext',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Log creation time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Log update time',
    },
  },
} as const;

export const $SourceMeta = {
  type: 'object',
  description: 'Source metadata',
  properties: {
    source: {
      type: 'string',
      description: 'Source URL',
      deprecated: true,
    },
    title: {
      type: 'string',
      description: 'Source title',
      deprecated: true,
    },
    publishedTime: {
      type: 'string',
      format: 'date-time',
      description: 'Source publish time',
    },
    collectionId: {
      type: 'string',
      description: 'Related collection ID',
    },
    collectionName: {
      type: 'string',
      description: 'Related collection name',
    },
    resourceId: {
      type: 'string',
      description: 'Related resource ID',
    },
    resourceName: {
      type: 'string',
      description: 'Related resource name',
    },
  },
} as const;

export const $SourceSelection = {
  type: 'object',
  description: 'Source selection',
  required: ['content', 'type'],
  properties: {
    xPath: {
      type: 'string',
      description: 'Selected xPath',
      deprecated: true,
    },
    content: {
      type: 'string',
      description: 'Selected content',
    },
    type: {
      type: 'string',
      description: 'Selection type',
      enum: ['text', 'table', 'link', 'image', 'video', 'audio'],
    },
  },
} as const;

export const $Source = {
  type: 'object',
  description: 'Source of the message',
  required: ['pageContent'],
  properties: {
    url: {
      type: 'string',
      description: 'Source URL',
    },
    title: {
      type: 'string',
      description: 'Source title',
    },
    pageContent: {
      type: 'string',
      description: 'Source content',
    },
    score: {
      type: 'number',
      description: 'Relativity score',
    },
    metadata: {
      type: 'object',
      description: 'Source metadata',
      $ref: '#/components/schemas/SourceMeta',
    },
    selections: {
      type: 'array',
      description: 'Source selections',
      items: {
        $ref: '#/components/schemas/SourceSelection',
      },
    },
  },
} as const;

export const $MessageType = {
  type: 'string',
  description: 'Chat message type',
  enum: ['ai', 'human', 'system'],
} as const;

export const $ChatMessage = {
  type: 'object',
  description: 'Chat message',
  required: ['msgId', 'type', 'content'],
  properties: {
    msgId: {
      type: 'string',
      readOnly: true,
      description: 'Message ID',
      example: 'm-g30e1b80b5g1itbemc0g5jj3',
    },
    type: {
      description: 'Message type',
      $ref: '#/components/schemas/MessageType',
    },
    content: {
      type: 'string',
      description: 'Message content',
      example: 'Hello',
    },
    skillMeta: {
      type: 'object',
      description: 'Skill metadata',
      $ref: '#/components/schemas/SkillMeta',
    },
    logs: {
      type: 'array',
      description: 'Message logs',
      items: {
        type: 'string',
      },
    },
    structuredData: {
      type: 'object',
      description: 'Structured data output',
      example: {
        sources: ['Source'],
        relatedQuestions: ['string'],
      },
    },
    relatedQuestions: {
      type: 'array',
      description: 'Related questions',
      items: {
        type: 'string',
      },
      deprecated: true,
    },
    sources: {
      type: 'array',
      description: 'Related sources',
      items: {
        $ref: '#/components/schemas/Source',
      },
      deprecated: true,
    },
    selectedWeblinkConfig: {
      type: 'string',
      description: 'Selected weblink config (JSON)',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Message creation time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Message update time',
    },
  },
} as const;

export const $Conversation = {
  type: 'object',
  description: 'Conversation list item',
  properties: {
    convId: {
      type: 'string',
      description: 'Conversation ID',
      example: 'cv-g30e1b80b5g1itbemc0g5jj3',
    },
    title: {
      type: 'string',
      description: 'Conversation title',
      example: 'Default Conversation',
    },
    lastMessage: {
      type: 'string',
      description: 'Last message content',
      example: 'Hello',
    },
    messageCount: {
      type: 'number',
      description: 'Number of chat messages in this conversation',
      example: 42,
    },
    cid: {
      type: 'string',
      description: 'Related content ID',
      example: 'c-g30e1b80b5g1itbemc0g5jj3',
    },
    locale: {
      description: 'Conversation locale',
      type: 'string',
      example: 'en',
    },
    origin: {
      type: 'string',
      description: 'Origin page host',
      example: 'https://refly.ai',
    },
    originPageTitle: {
      type: 'string',
      description: 'Origin page title',
      example: 'Refly | Where knowledge thrives',
    },
    originPageUrl: {
      type: 'string',
      description: 'Origin page url',
      example: 'https://refly.ai/knowledge-base',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Conversation creation time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Conversation creation time',
    },
    messages: {
      type: 'array',
      description: 'Conversation messages (only returned for getConversationDetail api)',
      items: {
        $ref: '#/components/schemas/ChatMessage',
      },
    },
  },
} as const;

export const $ChatTaskType = {
  type: 'string',
  description: 'Chat task type',
  enum: ['chat', 'genTitle', 'quickAction', 'searchEnhanceKeyword', 'searchEnhanceSummarize', 'searchEnhanceAsk'],
} as const;

export const $RetrieveFilter = {
  type: 'object',
  description: 'Content retrieval filter',
  properties: {
    weblinkList: {
      type: 'array',
      description: 'List of web links',
      items: {
        $ref: '#/components/schemas/Source',
      },
      deprecated: true,
    },
    urls: {
      type: 'array',
      description: 'List of URLs to retrieve',
      items: {
        type: 'string',
        example: 'https://refly.ai',
      },
    },
    resourceIds: {
      type: 'array',
      description: 'List of resource IDs to retrieve',
      items: {
        type: 'string',
        example: 'r-g30e1b80b5g1itbemc0g5jj3',
      },
    },
    collectionIds: {
      type: 'array',
      description: 'List of collection IDs to retrieve',
      items: {
        type: 'string',
        example: 'cl-g30e1b80b5g1itbemc0g5jj3',
      },
    },
  },
} as const;

export const $ChatPayload = {
  type: 'object',
  description: 'Chat payload',
  required: ['question'],
  properties: {
    question: {
      type: 'string',
      description: 'Question',
    },
    filter: {
      type: 'object',
      description: 'Content retrieval filter',
      $ref: '#/components/schemas/RetrieveFilter',
    },
  },
} as const;

export const $QuickActionType = {
  type: 'string',
  description: 'Quick action type',
  enum: ['selection', 'summary'],
} as const;

export const $QuickActionTaskPayload = {
  type: 'object',
  description: 'Quick action task payload',
  properties: {
    question: {
      type: 'string',
      description: 'Question',
    },
    actionType: {
      description: 'Quick action type',
      $ref: '#/components/schemas/QuickActionType',
    },
    actionPrompt: {
      type: 'string',
      description: 'Prompt for this action',
    },
    reference: {
      type: 'string',
      description: 'Reference for this action',
    },
    filter: {
      description: 'Content retrieval filter',
      $ref: '#/components/schemas/RetrieveFilter',
    },
  },
} as const;

export const $ChatTask = {
  type: 'object',
  description: 'Chat task',
  required: ['taskType'],
  properties: {
    taskType: {
      description: 'Task type',
      $ref: '#/components/schemas/ChatTaskType',
    },
    dryRun: {
      description: 'Whether to dry run the task',
      type: 'boolean',
      default: false,
    },
    convId: {
      description: 'Conversation ID, a new conversation will be created if empty or non-existent',
      type: 'string',
      example: 'cv-g30e1b80b5g1itbemc0g5jj3',
    },
    createConvParam: {
      description: 'Create conversation parameters',
      $ref: '#/components/schemas/CreateConversationRequest',
    },
    locale: {
      description: 'Chat locale',
      type: 'string',
      example: 'en',
    },
    data: {
      description: 'Chat data',
      oneOf: [
        {
          $ref: '#/components/schemas/ChatPayload',
        },
        {
          $ref: '#/components/schemas/QuickActionTaskPayload',
        },
      ],
    },
  },
} as const;

export const $ChatTaskResponse = {
  type: 'object',
  description: 'Chat task response',
  required: ['sources', 'answer'],
  properties: {
    sources: {
      type: 'array',
      description: 'List of web links',
      items: {
        $ref: '#/components/schemas/Source',
      },
    },
    answer: {
      type: 'string',
      description: 'Chat Answer',
    },
    relatedQuestions: {
      type: 'array',
      description: 'Related questions',
      items: {
        type: 'string',
      },
    },
  },
} as const;

export const $IndexStatus = {
  type: 'string',
  description: 'Resource index status',
  enum: ['init', 'processing', 'finish', 'failed', 'unavailable'],
} as const;

export const $UserSettings = {
  type: 'object',
  required: ['uid', 'avatar', 'name', 'email'],
  properties: {
    uid: {
      type: 'string',
      description: 'User ID',
      example: 'u-g30e1b80b5g1itbemc0g5jj3',
    },
    avatar: {
      type: 'string',
      description: 'User avatar',
      example: 'https://www.gstatic.com/webp/gallery/1.jpg',
    },
    name: {
      type: 'string',
      description: 'User name',
      example: 'John Doe',
    },
    email: {
      type: 'string',
      description: 'User email',
      example: '6XJpZ@example.com',
    },
    emailVerified: {
      type: 'boolean',
      description: 'Whether email is verified',
      default: false,
    },
    uiLocale: {
      type: 'string',
      description: 'User UI locale',
      example: 'en',
    },
    outputLocale: {
      type: 'string',
      description: 'User output locale',
      example: 'en',
    },
  },
} as const;

export const $BaseResponse = {
  type: 'object',
  required: ['success'],
  properties: {
    success: {
      type: 'boolean',
      description: 'Whether the operation was successful',
      example: true,
    },
    errMsg: {
      type: 'string',
      description: 'Error message',
      example: 'Operation failed',
    },
  },
} as const;

export const $UpsertResourceRequest = {
  type: 'object',
  required: ['resourceType', 'data'],
  properties: {
    resourceType: {
      description: 'Resource type',
      $ref: '#/components/schemas/ResourceType',
    },
    title: {
      type: 'string',
      description: 'Resource title',
      example: 'My Resource',
    },
    resourceId: {
      type: 'string',
      description: 'Resource ID (only used for update)',
      example: 'r-g30e1b80b5g1itbemc0g5jj3',
    },
    collectionId: {
      type: 'string',
      description: 'Collection ID (will create new collection if empty)',
      example: 'cl-g30e1b80b5g1itbemc0g5jj3',
    },
    collectionName: {
      type: 'string',
      description: 'Collection name',
      example: 'New Collection',
    },
    data: {
      description: 'Resource metadata',
      $ref: '#/components/schemas/ResourceMeta',
    },
    storageKey: {
      type: 'string',
      description: 'Storage key for the resource',
    },
    content: {
      type: 'string',
      description: 'Resource content (this will be ignored if storageKey was set)',
    },
    isPublic: {
      type: 'boolean',
      description: 'Whether this resource is public',
      default: false,
    },
    readOnly: {
      type: 'boolean',
      description: 'Whether this resource is read-only',
      default: false,
    },
  },
} as const;

export const $UpsertResourceResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          $ref: '#/components/schemas/Resource',
        },
      },
    },
  ],
} as const;

export const $DeleteResourceRequest = {
  type: 'object',
  required: ['resourceId'],
  properties: {
    resourceId: {
      type: 'string',
      description: 'Resource ID to delete',
      example: 'r-g30e1b80b5g1itbemc0g5jj3',
    },
  },
} as const;

export const $ListResourceResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Resource list',
          items: {
            $ref: '#/components/schemas/Resource',
          },
        },
      },
    },
  ],
} as const;

export const $GetResourceDetailResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          description: 'Resource data',
          $ref: '#/components/schemas/Resource',
        },
      },
    },
  ],
} as const;

export const $ListNoteResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Note list',
          items: {
            $ref: '#/components/schemas/Note',
          },
        },
      },
    },
  ],
} as const;

export const $GetNoteDetailResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          description: 'Note data',
          $ref: '#/components/schemas/Note',
        },
      },
    },
  ],
} as const;

export const $UpsertNoteRequest = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Note title',
      example: 'My Note',
    },
    noteId: {
      type: 'string',
      description: 'Note ID (only used for update)',
      example: 'n-g30e1b80b5g1itbemc0g5jj3',
    },
    readOnly: {
      type: 'boolean',
      description: 'Whether this note is read-only',
      default: false,
    },
    isPublic: {
      type: 'boolean',
      description: 'Whether this note is public',
      default: false,
    },
  },
} as const;

export const $UpsertNoteResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          $ref: '#/components/schemas/Note',
        },
      },
    },
  ],
} as const;

export const $DeleteNoteRequest = {
  type: 'object',
  required: ['noteId'],
  properties: {
    noteId: {
      type: 'string',
      description: 'Note ID to delete',
      example: 'n-g30e1b80b5g1itbemc0g5jj3',
    },
  },
} as const;

export const $UpsertCollectionRequest = {
  type: 'object',
  properties: {
    collectionId: {
      type: 'string',
      description: 'Collection ID (only used for update)',
      example: 'cl-g30e1b80b5g1itbemc0g5jj3',
    },
    title: {
      type: 'string',
      description: 'Collection title',
      example: 'My Collection',
    },
    description: {
      type: 'string',
      description: 'Collection description',
      example: 'Collection description',
    },
    isPublic: {
      type: 'boolean',
      description: 'Whether this collection is public',
      default: false,
    },
  },
} as const;

export const $UpsertCollectionResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          $ref: '#/components/schemas/Collection',
        },
      },
    },
  ],
} as const;

export const $DeleteCollectionRequest = {
  type: 'object',
  required: ['collectionId'],
  properties: {
    collectionId: {
      type: 'string',
      description: 'Collection ID to delete',
      example: 'cl-g30e1b80b5g1itbemc0g5jj3',
    },
  },
} as const;

export const $ListCollectionResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Collection list',
          items: {
            $ref: '#/components/schemas/Collection',
          },
        },
      },
    },
  ],
} as const;

export const $GetCollectionDetailResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          description: 'Collection data',
          $ref: '#/components/schemas/Collection',
        },
      },
    },
  ],
} as const;

export const $ListSkillTemplateResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Skill template list',
          items: {
            $ref: '#/components/schemas/SkillTemplate',
          },
        },
      },
    },
  ],
} as const;

export const $ListSkillInstanceResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Skill list',
          items: {
            $ref: '#/components/schemas/SkillInstance',
          },
        },
      },
    },
  ],
} as const;

export const $SkillInstanceUpsertParam = {
  type: 'object',
  required: ['skillName', 'displayName'],
  properties: {
    skillName: {
      type: 'string',
      description: 'Skill name',
      example: 'online-search',
    },
    displayName: {
      type: 'string',
      description: 'Skill display name',
      example: 'My Custom Skill',
    },
    skillId: {
      type: 'string',
      description: 'Skill ID (only used for update)',
      example: 's-g30e1b80b5g1itbemc0g5jj3',
    },
    triggers: {
      type: 'array',
      description: 'Skill triggers',
      items: {
        $ref: '#/components/schemas/UpsertSkillTriggerRequest',
      },
    },
    config: {
      type: 'object',
      description: 'Skill config (should conform to template config schema)',
    },
  },
} as const;

export const $UpsertSkillInstanceRequest = {
  type: 'object',
  required: ['instanceList'],
  properties: {
    instanceList: {
      type: 'array',
      description: 'Skill instances to upsert',
      items: {
        $ref: '#/components/schemas/SkillInstanceUpsertParam',
      },
    },
  },
} as const;

export const $UpsertSkillInstanceResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Skill instance list',
          items: {
            $ref: '#/components/schemas/SkillInstance',
          },
        },
      },
    },
  ],
} as const;

export const $DeleteSkillInstanceRequest = {
  type: 'object',
  required: ['skillId'],
  properties: {
    skillId: {
      type: 'string',
      description: 'Skill ID to delete',
    },
  },
} as const;

export const $SkillInput = {
  type: 'object',
  description: 'Skill input',
  required: ['query'],
  properties: {
    query: {
      type: 'string',
      description: 'User query',
    },
  },
} as const;

export const $SkillContext = {
  type: 'object',
  description: 'Skill invocation context',
  properties: {
    locale: {
      type: 'string',
      description: 'User input locale',
    },
    resourceIds: {
      type: 'array',
      description: 'List of resource IDs',
      items: {
        type: 'string',
      },
    },
    collectionIds: {
      type: 'array',
      description: 'List of collection IDs',
      items: {
        type: 'string',
      },
    },
    contentList: {
      type: 'array',
      description: 'List of content',
      items: {
        type: 'string',
      },
    },
  },
} as const;

export const $InvokeSkillRequest = {
  type: 'object',
  required: ['input'],
  properties: {
    input: {
      description: 'Skill input',
      $ref: '#/components/schemas/SkillInput',
    },
    context: {
      description: 'Skill invocation context',
      $ref: '#/components/schemas/SkillContext',
    },
    skillId: {
      type: 'string',
      description: 'Skill instance ID to invoke (if not provided, skill scheduler will be used)',
    },
    event: {
      description: 'Skill trigger event',
      $ref: '#/components/schemas/SkillTriggerEvent',
    },
    config: {
      type: 'object',
      description: 'Skill config (should conform to template config schema)',
    },
    convId: {
      description: 'Conversation ID (will add messages to this conversation if provided)',
      type: 'string',
      example: 'cv-g30e1b80b5g1itbemc0g5jj3',
    },
    createConvParam: {
      description: 'Create conversation parameters',
      $ref: '#/components/schemas/CreateConversationRequest',
    },
  },
} as const;

export const $InvokeSkillResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        logId: {
          type: 'string',
          description: 'Skill log id',
        },
      },
    },
  ],
} as const;

export const $ListSkillTriggerResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Skill trigger list',
          items: {
            $ref: '#/components/schemas/SkillTrigger',
          },
        },
      },
    },
  ],
} as const;

export const $UpsertSkillTriggerRequest = {
  type: 'object',
  required: ['event'],
  properties: {
    skillId: {
      type: 'string',
      description: 'Skill ID (only used for updating triggers or adding triggers to an existing skill)',
      example: 'sk-g30e1b80b5g1itbemc0g5jj3',
    },
    triggerId: {
      type: 'string',
      description: 'Trigger ID (only used for update)',
      example: 'tr-g30e1b80b5g1itbemc0g5jj3',
    },
    event: {
      description: 'Trigger event',
      $ref: '#/components/schemas/SkillTriggerEvent',
    },
    crontab: {
      type: 'string',
      description: 'Trigger crontab (only valid when event is `cron`)',
      example: '0 0 1 * *',
    },
    enabled: {
      type: 'boolean',
      description: 'Whether this trigger is enabled',
    },
  },
} as const;

export const $UpsertSkillTriggerResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          $ref: '#/components/schemas/SkillTrigger',
        },
      },
    },
  ],
} as const;

export const $DeleteSkillTriggerRequest = {
  type: 'object',
  required: ['triggerId'],
  properties: {
    triggerId: {
      type: 'string',
      description: 'Trigger ID to delete',
    },
  },
} as const;

export const $ListSkillLogResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Skill log list',
          items: {
            $ref: '#/components/schemas/SkillLog',
          },
        },
      },
    },
  ],
} as const;

export const $CreateConversationRequest = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Conversation title',
      example: 'My Conversation',
    },
    locale: {
      type: 'string',
      description: 'Conversation locale',
      example: 'en',
    },
    origin: {
      type: 'string',
      description: 'Origin page host',
      example: 'https://refly.ai',
    },
    originPageTitle: {
      type: 'string',
      description: 'Origin page title',
      example: 'Refly | Where knowledge thrives',
    },
    originPageUrl: {
      type: 'string',
      description: 'Origin page url',
      example: 'https://refly.ai/knowledge-base',
    },
  },
} as const;

export const $CreateConversationResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          description: 'Created conversation',
          $ref: '#/components/schemas/Conversation',
        },
      },
    },
  ],
} as const;

export const $ListConversationResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Conversation list',
          items: {
            $ref: '#/components/schemas/Conversation',
          },
        },
      },
    },
  ],
} as const;

export const $ChatRequest = {
  type: 'object',
  properties: {
    task: {
      description: 'chat task config',
      $ref: '#/components/schemas/ChatTask',
    },
  },
} as const;

export const $GetConversationDetailResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          description: 'Conversation data',
          $ref: '#/components/schemas/Conversation',
        },
      },
    },
  ],
} as const;

export const $ListDigestRequest = {
  type: 'object',
  properties: {
    page: {
      type: 'number',
      description: 'Page number',
      default: 1,
    },
    pageSize: {
      type: 'number',
      description: 'Page size',
      default: 10,
    },
    filter: {
      type: 'object',
      description: 'Digest query filter',
      properties: {
        date: {
          type: 'object',
          description: 'Date filter',
          properties: {
            year: {
              type: 'number',
              description: 'Year',
            },
            month: {
              type: 'number',
              description: 'Month',
            },
            day: {
              type: 'number',
              description: 'Day',
            },
          },
        },
        topic: {
          type: 'string',
          description: 'Topic filter',
        },
      },
    },
  },
} as const;

export const $UpdateUserSettingsRequest = {
  type: 'object',
  properties: {
    uiLocale: {
      type: 'string',
      description: 'UI locale',
      example: 'en',
    },
    outputLocale: {
      type: 'string',
      description: 'Output locale',
      example: 'en',
    },
  },
} as const;

export const $SearchDomain = {
  type: 'string',
  enum: ['resource', 'note', 'collection', 'conversation', 'skill'],
} as const;

export const $SearchMode = {
  type: 'string',
  enum: ['keyword', 'vector', 'hybrid'],
} as const;

export const $SearchRequest = {
  type: 'object',
  required: ['query'],
  properties: {
    query: {
      type: 'string',
      description: 'Search query (if empty, return last updated data)',
    },
    scope: {
      type: 'string',
      description: 'Search scope',
      enum: ['user', 'public'],
      default: 'user',
    },
    domains: {
      type: 'array',
      description: 'Search domains (if not specified, return all domains)',
      items: {
        $ref: '#/components/schemas/SearchDomain',
      },
    },
    mode: {
      type: 'string',
      description: 'Search mode',
      $ref: '#/components/schemas/SearchMode',
      default: 'keyword',
    },
    limit: {
      type: 'number',
      description: 'Search result limit for each domain',
      default: 5,
    },
  },
} as const;

export const $SearchResultMeta = {
  type: 'object',
  properties: {
    resourceType: {
      type: 'string',
      description: 'Resource type',
      $ref: '#/components/schemas/ResourceType',
    },
    resourceMeta: {
      type: 'object',
      description: 'Resource metadata',
      $ref: '#/components/schemas/ResourceMeta',
    },
    collectionId: {
      type: 'string',
      description: 'Collection ID',
    },
  },
} as const;

export const $SearchResult = {
  type: 'object',
  required: ['id', 'domain', 'title'],
  properties: {
    id: {
      type: 'string',
      description: 'Search result ID to navigate to',
    },
    domain: {
      description: 'Search result domain',
      $ref: '#/components/schemas/SearchDomain',
    },
    title: {
      type: 'string',
      description: 'Search result title',
    },
    content: {
      type: 'array',
      description: 'Search result content list with highlight marks',
      items: {
        type: 'string',
      },
    },
    metadata: {
      description: 'Search result metadata',
      $ref: '#/components/schemas/SearchResultMeta',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Data creation time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Collection creation time',
    },
  },
} as const;

export const $SearchResponse = {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Search result',
          items: {
            $ref: '#/components/schemas/SearchResult',
          },
        },
      },
    },
  ],
} as const;
