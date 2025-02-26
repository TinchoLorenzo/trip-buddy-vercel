import { openai } from '@ai-sdk/openai';
import { fireworks } from '@ai-sdk/fireworks';
import { ollama } from 'ollama-ai-provider';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

export const myProvider = customProvider({
  languageModels: {
    // Type error due to incopatibility of ollama-ai-provider with ai-sdk
    'chat-model-small': ollama('llama3.2', {
      simulateStreaming: true
    }),
    // 'chat-model-large': openai('gpt-4o'),
    'chat-model-reasoning': wrapLanguageModel({
      model: fireworks('accounts/fireworks/models/deepseek-r1'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    // Not sure if this is needed
    'title-model': ollama('llama3.2', {
      simulateStreaming: true
    }),
    'artifact-model': ollama('llama3.2'),
  },
  imageModels: {
    'small-model': ollama('llama3.2-vision'),
    // 'large-model': openai.image('dall-e-3'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model-small',
    name: 'Small model',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'chat-model-large',
    name: 'Large model',
    description: 'Large model for complex, multi-step tasks',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
];
