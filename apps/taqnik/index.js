import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// ExpoRouter uses a file‑based routing system, so we delegate the app entry here.
registerRootComponent(ExpoRoot);
