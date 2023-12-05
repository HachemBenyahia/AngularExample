export class User
{
    public id: Number;
    public firstName: String;
    public lastName: String;
    public birthDate: Date;

    public constructor(id: Number, firstName: String, lastName: String, birthDate: Date)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    public static fromJSONArray(json: any): User[]
    {
        let array: User[] = [];
        json.forEach((user: any) => {
            array.push(new User(user.id, user.firstName, user.lastName, user.birthDate));
        });
        return array;
    }

    public static fromJSON(json: any): User
    {
        return new User(json.id, json.firstName, json.lastName, json.birthDate);
    }

    // public static fromJSONTest(json: any)
    // {
    //     if (json.length !== undefined) {
    //         let array: User[] = [];
    //         json.forEach((user: any) => {
    //             array.push(new User(user.id, user.firstName, user.lastName, user.birthDate));
    //         });
    //         return array as any;
    //     }
    //
    //     return new User(json.id, json.firstName, json.lastName, json.birthDate) as any;
    // }

    // public clone(user: User)
    // {
    //     this.id = user.id;
    //     this.firstName = user.firstName;
    //     this.lastName = user.lastName;
    //     this.birthDate = user.birthDate;
    //
    //     return this;
    //  }

    public serialize()
    {
        return {
            "id": this.id,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "birthDate": this.birthDate,
        };
    }
}
