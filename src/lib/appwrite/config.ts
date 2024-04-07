import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: '66116552eaefd974a84a',
  url: 'https://cloud.appwrite.io/v1',
  databaseId: '66128922b9ebe2e85f4f',
  storageId: '661288e6409e6dadfa0e',
  userCollectionId: '6612899c06c8d26b9c38',
  postCollectionId: '661289610a3b840c56b1',
  savesCollectionId: '661289b2c99b9d83ff08'
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);