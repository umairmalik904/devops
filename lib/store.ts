import { mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { projects as initialProjects, type Project } from "../data/portfolio";

export type Message = { id: string; name: string; email: string; subject: string; message: string; receivedAt: string };
type Database = { version: 1; projects: Project[]; messages: Message[] };
export const storageDirectory = process.env.DATA_DIR || path.join(process.cwd(), "storage");
const file = path.join(storageDirectory, "portfolio.json");
const state = globalThis as typeof globalThis & { portfolioWrite?: Promise<unknown> };

export async function readDatabase(): Promise<Database> {
  try {
    const data: Database = JSON.parse(await readFile(file, "utf8"));
    if (data.version !== 1 || !Array.isArray(data.projects) || !Array.isArray(data.messages)) throw new Error("Invalid portfolio storage");
    return data;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return { version: 1, projects: structuredClone(initialProjects), messages: [] };
    throw error;
  }
}

// Serialize mutations in the single application process and atomically replace the file.
export async function updateDatabase<T>(mutate: (data: Database) => T): Promise<T> {
  const operation = (state.portfolioWrite || Promise.resolve()).catch(() => {}).then(async () => {
    const data = await readDatabase();
    const result = mutate(data);
    await mkdir(storageDirectory, { recursive: true, mode: 0o700 });
    const temporary = path.join(storageDirectory, `${randomUUID()}.tmp`);
    try {
      const handle = await open(temporary, "wx", 0o600);
      try { await handle.writeFile(JSON.stringify(data, null, 2)); await handle.sync(); } finally { await handle.close(); }
      await rename(temporary, file);
    } finally {
      await unlink(temporary).catch((error: NodeJS.ErrnoException) => { if (error.code !== "ENOENT") throw error; });
    }
    return result;
  });
  state.portfolioWrite = operation;
  return operation;
}

export async function publishedProjects() {
  return (await readDatabase()).projects.filter(project => project.published);
}
