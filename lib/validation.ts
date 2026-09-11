import { Project } from "../data/portfolio";
import { HttpError, textField } from "./http";

function lines(value: unknown, label: string, maximum: number, itemLength: number) {
  if (!Array.isArray(value) || !value.length || value.length > maximum) throw new HttpError(400, `${label} must contain between 1 and ${maximum} entries.`);
  return value.map(item => textField(item, label, 1, itemLength));
}

export function projectInput(data: Record<string, unknown>, id: string): Project {
  if (typeof data.published !== "boolean") throw new HttpError(400, "Choose a publication status.");
  return {
    id,
    title: textField(data.title, "Title", 3, 120),
    category: textField(data.category, "Category", 2, 70),
    summary: textField(data.summary, "Summary", 10, 500),
    problem: textField(data.problem, "Problem", 10, 5000),
    architecture: lines(data.architecture, "Architecture", 10, 120),
    implementation: lines(data.implementation, "Implementation", 20, 1000),
    troubleshooting: textField(data.troubleshooting, "Troubleshooting", 10, 5000),
    result: textField(data.result, "Result", 10, 5000),
    technologies: lines(data.technologies, "Technologies", 30, 80),
    published: data.published,
  };
}
