import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
    lng:"en",
    // we init with resources
    resources: {
      en: {
        translation:{
            error: "Something went wrong...",
            errorDesc:"Try to reload page",
            settings: "Settings",
            create: "Create",
            home: "Home",
            search: "Search",
            byAlph: "Alphabetically",
            az: "From A to Z",
            za: "From Z to A",
            byDate: "By date",
            dNew: "From new",
            dOld: "From old",

            theme:"Theme :",
            dark: "Dark",
            light: "Light",
            import: "Import notes",
            export: "Export notes",
            newNote: "New note...",
            delete: "Delete",
            deleteConfirm: "Are you sure ?",
            pin: "Pin",
            unpin: "Unpin",
            favorite: "Add to favorite",
            unfavorite: "Remove from favorite",
            info: "Information",
            edit: "Edit",

            addBook: "Add new book",
            editBook: "Edit book",

            confirm: "Confirm",
            next: "Next",
            back: "Back",

            name: "Title",
            desc: "Description",
            cancel: "Cancel",
            id: "ID",
            noteCount: "Number of records",
            createDate: "Date of creation",
            lastEditDate: "Last change",

            language: "Language",
            en: "English",
            ua: "Ukrainian",
        }
      },
      ua: {
        translation:{
            error: "Виникла помилка...",
            errorDesc: "Спробуйте перезавантажити сторінку",
            settings: "Налаштування",
            create: "Створити",
            home: "Додому",
            search: "Пошук",
            byAlph: "За алфавітом",
            az: "Від А до Я",
            za: "Від Я до А",
            byDate: "За датою",
            dNew: "Від нового",
            dOld: "Від старого",

            theme:"Тема :",
            dark: "Темна",
            light: "Світла",
            import: "Імпортувати нотатки",
            export: "Експортувати нотатки",
            newNote: "Новий запис...",
            delete: "Видалити",
            deleteConfirm: "Дійсно видалити ?",
            pin: "Прикріпити",
            unpin: "Відкріпити",

            favorite: "Додати в улюблене ",
            unfavorite: "Видалити з улюбленого",
            info: "Інформація",
            edit: "Редагувати",

            addBook: "Додати книгу",
            editBook: "Редагувати книгу",

            confirm: "Прийняти",
            next: "Далі",
            back: "Назад",

            name: "Назва",
            desc: "Опис",
            cancel: "Відміна",
            id: "Ідентифікатор",
            noteCount: "Кількість записів",
            createDate: "Дата створення",
            lastEditDate: "Остання зміна",

            language: "Мова",
            en: "Англійська",
            ua: "Українська",
        }
      },
    },
    fallbackLng: "en",
  
  
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  
    react: {
      wait: true
    }
  });
  
  export default i18n;