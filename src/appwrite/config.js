import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";
class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, content, featuredImage, status, userId }) {
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log("Appwrite error || createPost || ", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.log("Appwrite error || updatePost || ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite error || deletePost || ", error);
            return false;
        }
    }

    async getPostById(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite error || getPostById || ", error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "true")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite error || getPostById || ", error);
            return false;
        }
    }

    //* File service

    async uploadFile(file) {
        try {
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return true;
        } catch (error) {
            console.log("Appwrite error || uploadFile || ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite error || deleteFile || ", error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            await this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite error || getFilePreview || ", error);
            return false;
        }
    }
}

const service = new Service();

export default service;
