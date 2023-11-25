export class User
{
    public firstName: String;
    public lastName: String;
    public birthDate: Date;

    public constructor(firstName: String, lastName: String, birthDate: Date)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    // public getFirstName()
    // {
    //     return this.firstName;
    // }
    //
    // public getLastName()
    // {
    //     return this.lastName;
    // }
    //
    // public getBirthDate()
    // {
    //     return this.birthDate;
    // }
}
