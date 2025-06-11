export interface CreateDocTypes {
  entityType: string;
  entityId: number;
  docType?: string;
  uploadedAt?: string;
}

export interface GotDocs {
  id: number;
  entityType: string;
  entityId: number;
  docType: string;
  uploadedAt: string;
  createdAt: string;
  paths: string[]; // Ensure 'paths' is here
}
