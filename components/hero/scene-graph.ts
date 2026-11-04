export type SceneNode = { id: string; label: string; pos: [number, number, number]; primary?: boolean };

export const sceneNodes: SceneNode[] = [
  { id: "browser", label: "Browser", pos: [-4.2, 1.6, 0], primary: true },
  { id: "nginx", label: "Nginx", pos: [-2.2, -0.4, 1.4] },
  { id: "analysis", label: "Analysis", pos: [0, 1.9, -0.4] },
  { id: "ims", label: "IMS", pos: [2, -0.9, 0.8] },
  { id: "queue", label: "Queue", pos: [-0.6, -2.4, 0.2] },
  { id: "worker", label: "AI Worker", pos: [1.4, -3.1, -1.2] },
  { id: "mongo", label: "MongoDB", pos: [3.8, 1.3, -1] },
  { id: "s3", label: "S3", pos: [4.2, -2.1, 0.5] },
];

export const sceneEdges: [string, string][] = [
  ["browser", "nginx"],
  ["nginx", "analysis"],
  ["nginx", "ims"],
  ["analysis", "ims"],
  ["analysis", "queue"],
  ["queue", "worker"],
  ["worker", "mongo"],
  ["analysis", "mongo"],
  ["ims", "s3"],
  ["worker", "s3"],
];
