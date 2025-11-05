import type { Block, KnownBlock } from '@slack/web-api';

export interface BlockMessageOptions {
  title: string;
  message: string;
  fields?: Array<{ title: string; value: string }>;
  actionUrl?: string;
  actionText?: string;
  color?: 'good' | 'warning' | 'danger' | string;
  footer?: string;
  timestamp?: number;
}

export const formatSlackMessage = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const createBlockMessage = (
  options: BlockMessageOptions
): (Block | KnownBlock)[] => {
  const blocks: (Block | KnownBlock)[] = [];

  // Header section
  blocks.push({
    type: 'header',
    text: {
      type: 'plain_text',
      text: options.title,
      emoji: true,
    },
  });

  // Divider
  blocks.push({
    type: 'divider',
  });

  // Main message section
  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: options.message,
    },
  });

  // Fields section (if provided)
  if (options.fields && options.fields.length > 0) {
    const fields = options.fields.map((field) => ({
      type: 'mrkdwn' as const,
      text: `*${field.title}:*\n${field.value}`,
    }));

    blocks.push({
      type: 'section',
      fields,
    });
  }

  // Action button (if provided)
  if (options.actionUrl && options.actionText) {
    blocks.push({
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: options.actionText,
            emoji: true,
          },
          url: options.actionUrl,
          style: options.color === 'danger' ? 'danger' : 'primary',
        },
      ],
    });
  }

  // Context/footer section
  const contextElements: any[] = [];
  
  if (options.footer) {
    contextElements.push({
      type: 'mrkdwn',
      text: options.footer,
    });
  }

  if (options.timestamp) {
    contextElements.push({
      type: 'mrkdwn',
      text: `<!date^${options.timestamp}^{date_short_pretty} at {time}|${new Date(options.timestamp * 1000).toLocaleString()}>`,
    });
  } else {
    contextElements.push({
      type: 'mrkdwn',
      text: `_${new Date().toLocaleString()}_`,
    });
  }

  if (contextElements.length > 0) {
    blocks.push({
      type: 'context',
      elements: contextElements,
    });
  }

  return blocks;
};

export const createSimpleMessage = (text: string): (Block | KnownBlock)[] => {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    },
  ];
};

export const createErrorMessage = (
  errorTitle: string,
  errorMessage: string,
  stackTrace?: string
): (Block | KnownBlock)[] => {
  const blocks: (Block | KnownBlock)[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `🚨 ${errorTitle}`,
        emoji: true,
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Error:*\n\`\`\`${errorMessage}\`\`\``,
      },
    },
  ];

  if (stackTrace) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Stack Trace:*\n\`\`\`${stackTrace.substring(0, 2000)}\`\`\``,
      },
    });
  }

  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `_${new Date().toLocaleString()}_`,
      },
    ],
  });

  return blocks;
};

export const createListMessage = (
  title: string,
  items: string[]
): (Block | KnownBlock)[] => {
  const itemsList = items.map((item, index) => `${index + 1}. ${item}`).join('\n');

  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: title,
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: itemsList,
      },
    },
  ];
};

export const addEmoji = (text: string, emoji: string): string => {
  return `${emoji} ${text}`;
};

export const formatUserMention = (userId: string): string => {
  return `<@${userId}>`;
};

export const formatChannelMention = (channelId: string): string => {
  return `<#${channelId}>`;
};

export const formatLink = (url: string, text?: string): string => {
  return text ? `<${url}|${text}>` : `<${url}>`;
};

export const escapeSlackText = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const truncateText = (text: string, maxLength: number = 3000): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};
