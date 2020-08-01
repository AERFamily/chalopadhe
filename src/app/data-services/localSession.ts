import { ElementAst } from '@angular/compiler';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })
export class localSessionStorage
{
    private sessionkey = 'aer';
    private tokenKey = 'chalopadhe'
    public storeSession(content:object)
    {
        sessionStorage.setItem(this.sessionkey,"true");
        sessionStorage.setItem(this.tokenKey,JSON.stringify(content));
    }
    public retrieveSession()
    {
        let sessionVal:string = sessionStorage.getItem(this.sessionkey);
        console.log(sessionVal);
        if(sessionVal &&  sessionVal === "true")
        {
            return JSON.parse(sessionStorage.getItem(this.tokenKey));
        }
        else
        {
            return null;
        }
    }
    public clearSession()
    {
        sessionStorage.clear();
    }
}