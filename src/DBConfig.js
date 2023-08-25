//DBConfig.js|tsx

export const DBConfig = {
    name: "MyDB",
    version: 1,
    objectStoresMeta: [
      {
        store: "books",
        storeConfig: { keyPath: "id"},
        storeSchema: [
          { name: "color", keypath: "color", options: { unique: false } },
          { name: "iconName", keypath: "iconName", options: { unique: false } },
          { name: "text", keypath: "text", options: { unique: false } },
          { name: "description", keypath: "description", options: { unique: false } },
          { name: "favorite", keypath: "favorite", options: { unique: false } },
          { name: "createDate", keypath: "createDate", options: { unique: false } },
          { name: "lastEditDate", keypath: "lastEditDate", options: { unique: false } },
          { name: "favoriteDate", keypath: "favoriteDate", options: { unique: false } },
        ],
      },
    ],
  };