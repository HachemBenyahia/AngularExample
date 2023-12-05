import { Injectable } from "@angular/core";

// import { BehaviorSubject, Observable, Subject } from "rxjs";
// import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { User } from "@App/Entity/User";

@Injectable({
    providedIn: "root"
})
export class UserService
{
    headers1: HttpHeaders;
    // headers2: HttpHeaders;
    readonly API_URL: String = "http://127.0.0.1:8000/users";

    // usersSubject: BehaviorSubject<User[]>;
    // userSubject: BehaviorSubject<User>;
    // users: Observable<User[]>;
    // user: Observable<User>;

    public constructor(private http: HttpClient)//, private router: Router)
    {
        this.headers1 = new HttpHeaders({
            "Content-Type": "application/json;charset=UTF-8",
            // "Authorization": "Bearer " + localStorage.getItem("token"),
        });
        //
        // this.usersSubject = new BehaviorSubject<User[]>([]);
        // this.userSubject = new BehaviorSubject<User>();
        // this.user = this.userSubject.asObservable();
    }

    public get(id?: number)
    {
        let response: any;

        if (id == undefined) {
            console.log("[GET] endpoint: " + `${this.API_URL}`);
            response = this.http.get<User[]>(`${this.API_URL}`, {headers: this.headers1});
                // // .map(response => response.json());
                // .pipe(map(
                //     response => {
                //         if (response) {
                //             this.usersSubject.next(response);
                //         }
                //     },
                //     // error => {
                //     //     console.log(error);
                //     // }
                // ));
        }
        else if (id > 0) {
            console.log("[GET] endpoint: " + `${this.API_URL}/${id}`);
            response = this.http.get<User>(`${this.API_URL}/${id}`, {headers: this.headers1});
                // .pipe(map(response => {
                //     console.log(response);
                //     // response as User
                // }));
        }
        else {
            throw new Error("UserService.get(id) expects an id as integer > 0");
        }

        return response;
    }

    public post(user: User)
    {
        let response: any;

        console.log("[POST] endpoint: " + `${this.API_URL}`);
        response = this.http.post<User>(`${this.API_URL}`, user.serialize(), {headers: this.headers1});

        return response;
    }
}
