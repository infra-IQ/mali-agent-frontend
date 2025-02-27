export type MessageChunk = {
  id: string;
  object: string;
  created: number;
  model: string;
  service_tier: string;
  system_fingerprint: string | null;
  choices: MessageChunkChoice[];
};

export type MessageChunkChoice = {
  index: number;
  delta: { content: string };
  logprobs: string | null;
  finish_reason: string | null;
};
