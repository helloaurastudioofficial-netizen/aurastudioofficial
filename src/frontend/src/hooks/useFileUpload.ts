import { HttpAgent } from "@icp-sdk/core/agent";
import { useCallback, useState } from "react";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(async (file: File): Promise<string> => {
    setUploading(true);
    setProgress(0);
    try {
      const config = await loadConfig();

      // If storage gateway is not configured, fall back gracefully
      if (
        !config.storage_gateway_url ||
        config.storage_gateway_url === "nogateway"
      ) {
        // Return a data URL as fallback
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      const agent = new HttpAgent({ host: config.backend_host });
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );

      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await storageClient.putFile(bytes, (pct) =>
        setProgress(pct),
      );
      const url = await storageClient.getDirectURL(hash);
      return url;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, progress };
}
