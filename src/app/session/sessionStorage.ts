import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class localSessionManager {
    private tokenKey: string = 'chalopadhe';
    private sessionKey = "session_token";
    private saveSession(content: Object) {
        sessionStorage.setItem(this.sessionKey, "true");
        sessionStorage.setItem(this.tokenKey, JSON.stringify(content));
    }
    private fetchSession() {
        let isSessionActive: string = sessionStorage.getItem(this.sessionKey);
        if (isSessionActive == "true") {
            let storedToken: string = localStorage.getItem(this.tokenKey);
            if (!storedToken) {
                return (JSON.stringify({ isvalid: false }));
            }
            else {
                return storedToken;
            }

        }
        else {
            return (JSON.stringify({ isvalid: false }));;
        }

    }
    public storeSession(content: object) {
        this.saveSession(content);
    }
    public cleareToken() {
        sessionStorage.clear();
    }
    public retrieveToken() {
        try {
            //storedToken = JSON.parse(this.retrieve());
        }
        catch (err) {
            console.error(err);
        }
        return null;

    }
}