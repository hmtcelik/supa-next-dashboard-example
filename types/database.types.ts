export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {};
  };
  auth: {
    Tables: {
      users: {
        id: string;
        email: string;
        role: string;
        created_at: string;
        updated_at: string;
      };
    };
  };
}
