import { Client, Account } from "appwrite";
import conf from "../conf/conf";

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            userAccount ? this.logIn({ email, password }) : userAccount;
        } catch (error) {
            throw error;
        }
    }

    async logIn({ email, password }) {
        try {
            return await account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
        return null
    }

    async logOut(){
        try {
            return await account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService
