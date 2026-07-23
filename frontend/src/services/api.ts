import type {
  PredictionHistoryResponse,
  PredictionInput,
  PredictionResponse,
} from "../types/prediction";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

async function request<TResponse>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      errorBody?.detail ??
      errorBody?.message ??
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return response.json() as Promise<TResponse>;
}

export function createPrediction(
  input: PredictionInput,
  token: string,
): Promise<PredictionResponse> {
  return request<PredictionResponse>("/predictions", token, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getPredictionHistory(
  token: string,
): Promise<PredictionHistoryResponse> {
  return request<PredictionHistoryResponse>("/predictions", token);
}
