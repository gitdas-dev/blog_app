import conf from "../conf/config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDatabaseId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(err){
            console.log('appwrite error', err);
        }
    }
    
    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tite,
                    content,
                    featuredImage,
                    status
                }
            )
        }catch(err){
            console.log("Appwrite update post error: ", err);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true;
        }catch(err){
            console.log("appwrite deletion error : ", err);
            return false;
        }
    }


    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
        }catch(err){
            console.log("Appwrite getpost error", err);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        }catch(err){
            console.log("getposts error", err);
            return false;
        }
    }

    //file uploading service

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(err){
            console.log("Appwrite upload file error", err);
            return false;
        }
    }

    async deletFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        }catch(err){
            console.log("Appwrite deleteFile error", err);
            return false;
        }
    }


    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service();

export default service;


