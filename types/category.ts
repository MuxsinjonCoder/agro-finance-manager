export interface CreateCategory {
  name: string;
  description: string;
  categoryType?: "DON" | "LEASING_COMPANY" | "FRUITS" | "PAXTA";
}

export interface GotCategory {
  id: string;
  description: string;
  name: string;
  createdAt: string;
  categoryType?: string;
}
