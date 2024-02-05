export class User{
    constructor(
        // public school_id: number,
        public email: string,
        public _token: string,
        public _expiration_date: Date,
        // public refresh_token: string,

    ){}

    get token(){
        if(!this._expiration_date || new Date > this._expiration_date){
            return null;
        }
        return this._token;
    }
}