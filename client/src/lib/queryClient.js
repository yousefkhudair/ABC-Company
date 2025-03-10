import { QueryClient } from "@tanstack/react-query";

// Create a client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      retry: 1,
    },
  },
});

// Helper function for making API requests
export async function apiRequest(method, url, body) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response;
}
