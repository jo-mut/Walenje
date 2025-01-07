import "../global.js"
import { Stack } from "expo-router";
import "../global.css"
import { Provider } from "mobx-react";
import { stores } from './stores'
import {
  useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider,
} from '@tanstack/react-query'


export default function RootLayout() {
  const queryClient = new QueryClient()

  return (
    <Provider {...stores}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </Provider>

  );
}
