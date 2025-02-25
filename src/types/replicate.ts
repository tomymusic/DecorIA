export interface ReplicateResponse {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed";
  output?: string;
  error?: string;
  detail?: string;
}
