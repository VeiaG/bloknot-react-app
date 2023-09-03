import localforage from "localforage";

export default class CacheService {
    books = localforage.createInstance({
        name: 'books'
    })
    notes = localforage.createInstance({
        name: 'notes'
    })
    settings = localforage.createInstance({
        name:'settings'
    })
    book_set =  (key,data)=>  this.books.setItem(key,data);

    book_get = (key) => this.books.getItem(key);

    book_remove = key => {
        this.books.removeItem(key)
        this.notes.removeItem(key)
    };

    books_clear = ()=> this.books.clear();

    books_getAll = async ()=> {
        const result = [];
        await this.books.iterate((value,key,iterationNumber)=>{
            result.push(value);
        })
        return result;
    }

    notes_set =  (key,data)=>  {
        return this.notes.setItem(key,data);
    }
    notes_add =async (key,data) =>{
        return await this.notes.getItem(key).then((result)=>{
            const newList = result===null ? [] : [...result];
            newList.push(data);
            this.notes.setItem(key,newList);
        })
    }
    notes_getAll = async ()=> {
        const result = [];
        await this.notes.iterate((value,key)=>{
            result.push({id:key, notes:value});
        })
        return result;
    }
      

    notes_get = (key) => this.notes.getItem(key);


    //settings 
    set_theme= (value) => {
        this.settings.setItem('theme',value);
    }
    set_list= (value) => {
        this.settings.setItem('list',value);
    }
    set_language= (value) => {
        this.settings.setItem('language',value);
    }

    get_settings = async ()=> {
        let result = {};
        await this.settings.iterate((value,key)=>{
            result[key]=value;
        })
        return result;
    }

}