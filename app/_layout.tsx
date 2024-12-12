import "../global.js"
import { Stack } from "expo-router";
import "../global.css"
import { Provider } from "mobx-react";
import { stores } from './stores'


export default function RootLayout() {
  return (
    <Provider {...stores}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
