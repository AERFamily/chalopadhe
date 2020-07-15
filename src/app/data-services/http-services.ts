import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const url = "https://admin.chalopadhe.com/";
@Injectable({
    providedIn: 'root'
})
export class HttpServiceService {

    constructor(private _httpServices: HttpClient) {
    }
    // public getJSON(str: string) {
    //     return this.http.get("./assets/" + str + ".json");
    // }
    GetCountry(): Observable<any> {

        // var podata = new HttpParams()
        // podata = podata.append("user_id","DK00000001");
        // podata = podata.append("test_id","1");
        // var bodyData = new HttpParams()
        // .set("user_id","DK00000001")
        // .set("stars","4")
        // .set("comments","Testing");
        return this._httpServices.get(url + "content/search/country").pipe(
            catchError(this.handleError)
        )
    }
    GetLanguage()
    {
        return this._httpServices.get(url + "content/search/country").pipe(
            catchError(this.handleError)
        )
    }
    GetBoard() {
        return this._httpServices.get(url + "content/search/country").pipe(
            catchError(this.handleError)
        )
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}