// This will mock `next/dynamic`, so make sure to import it before any of your
// components.
import preloadAll from "jest-next-dynamic";
// This component can have dynamic imports anywhere in its rendered tree,
// including nested dynamic imports.

beforeAll(async () => {
    await preloadAll();
});