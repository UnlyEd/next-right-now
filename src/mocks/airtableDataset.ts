export const CUSTOMER1 = {
  id: 'recZEMyznL19CPD5b',
  fields: {
    termsEN: 'Who wanna get bothered with **terms**? Come on!\n',
    termsFR: 'Qui a envie de lire des **CGU** ? -\\_-\n',
    labelEN: 'Customer 2',
    products: [
      'recYXaEyHJCOBWIbd',
    ],
    theme: 'recgo2T34zNZjAlkN',
    ref: 'customer2',
  },
  createdTime: '2020-06-02T14:01:51.000Z',
};

export const CUSTOMER2 = {
  id: 'reci9HYsoqd1xScsi',
  fields: {
    termsEN: 'Who wanna get bothered with **terms**?\n',
    termsFR: 'Qui a envie de lire des **CGU** ?\n',
    labelFR: 'Client 1',
    products: [
      'reck5THYBOd0ryd5Z',
      'recFSrY2znI6Z8Dbj',
    ],
    theme: [
      'recrcZANU6L73OA9v',
    ],
    ref: 'customer1',
  },
  createdTime: '2020-06-02T14:01:51.000Z',
};

export const THEME1 = {
  id: 'recgo2T34zNZjAlkN',
  fields: {
    id: 2,
    customer: [
      'recZEMyznL19CPD5b',
    ],
    primaryColor: 'blue',
    logo: [
      {
        id: 'attPS7KMD2GYafnlr',
        url: 'https://dl.airtable.com/Qj697gmbRLff6kiHcF71_mark.png',
        filename: 'mark.png',
        size: 4904,
        type: 'image/png',
        thumbnails: {
          small: {
            url: 'https://dl.airtable.com/v51rtFINSuuxo3MwXvsG_small_mark.png',
            width: 36,
            height: 36,
          },
          large: {
            url: 'https://dl.airtable.com/oqRnvriRey2urg6KJYlA_large_mark.png',
            width: 191,
            height: 193,
          },
          full: {
            url: 'https://dl.airtable.com/AfwEuXK5TZu7dCIZq3qf_full_mark.png',
            width: 191,
            height: 193,
          },
        },
      },
    ],
  },
  createdTime: '2020-06-02T14:06:19.000Z',
};

export const THEME2 = {
  id: 'recrcZANU6L73OA9v',
  fields: {
    id: 1,
    customer: [
      'reci9HYsoqd1xScsi',
    ],
    primaryColor: 'red',
    logo: [
      {
        id: 'attBoWO7Vh5VM1MY8',
        url: 'https://dl.airtable.com/lA5gmGBQheUvmuX616wU_monochromelogo.png',
        filename: 'monochromelogo.png',
        size: 10233,
        type: 'image/png',
        thumbnails: {
          small: {
            url: 'https://dl.airtable.com/5IYKrfZMROqyympBCTXr_small_monochromelogo.png',
            width: 112,
            height: 36,
          },
          large: {
            url: 'https://dl.airtable.com/j4LDTANRkCe5DDFLTSA3_large_monochromelogo.png',
            width: 512,
            height: 193,
          },
          full: {
            url: 'https://dl.airtable.com/i81bTaoRWGJO6dd9t79m_full_monochromelogo.png',
            width: 600,
            height: 193,
          },
        },
      },
    ],
  },
  createdTime: '2020-06-02T14:06:19.000Z',
};

export const PRODUCT1 = {
  id: 'recFSrY2znI6Z8Dbj',
  fields: {
    titleEN: 'Big City',
    customer: [
      'reci9HYsoqd1xScsi',
    ],
    id: 2,
    price: 17,
    images: [
      {
        id: 'att6JU52f5PlMuiRu',
        url: 'https://dl.airtable.com/Uvg7ldEEQpqKhR3NKTGt_348s.jpg',
        filename: '348s.jpg',
        size: 17866,
        type: 'image/jpeg',
        thumbnails: {
          small: {
            url: 'https://dl.airtable.com/8C4cVNCES89lt6PnFH5W_348s.jpg',
            width: 36,
            height: 36,
          },
          large: {
            url: 'https://dl.airtable.com/TdSPVnVQISc0P0EdiiQw_348s.jpg',
            width: 256,
            height: 256,
          },
        },
      },
    ],
    ref: 'big-city',
  },
  createdTime: '2020-06-02T14:04:46.000Z',
};

export const PRODUCT2 = {
  id: 'recYXaEyHJCOBWIbd',
  fields: {
    titleFR: 'Kiunyu (fr)',
    titleEN: 'Kiunyu',
    descriptionEN: 'Syrupy and heavy\n',
    customer: [
      'recZEMyznL19CPD5b',
    ],
    id: 3,
    price: 21,
    images: [
      {
        id: 'attTawMyWIwP6kUQe',
        url: 'https://dl.airtable.com/n0o4MVQuaU2r6N4h2v5g_c43e3af2268eaac19eb7623add50fcca.jpg',
        filename: 'c43e3af2268eaac19eb7623add50fcca.jpg',
        size: 56296,
        type: 'image/jpeg',
        thumbnails: {
          small: {
            url: 'https://dl.airtable.com/n9ukNiANQJCLheRd9BXi_c43e3af2268eaac19eb7623add50fcca.jpg',
            width: 36,
            height: 36,
          },
          large: {
            url: 'https://dl.airtable.com/gIqsw4ZzTDetiRnQFNVV_c43e3af2268eaac19eb7623add50fcca.jpg',
            width: 256,
            height: 254,
          },
        },
      },
    ],
    ref: 'kiunyu',
  },
  createdTime: '2020-06-02T14:04:46.000Z',
};

export const PRODUCT3 = {
  id: 'reck5THYBOd0ryd5Z',
  fields: {
    titleEN: 'Vista Al Valle Zapote Honey',
    descriptionEN: 'Plummy taste and syrupy texture\n',
    customer: [
      'reci9HYsoqd1xScsi',
    ],
    id: 1,
    price: 19.5,
    images: [
      {
        id: 'attlk6ONaDfaZbQTw',
        url: 'https://dl.airtable.com/OeNybctMTBKLPkbntK8p_jftonpzlxgakoxo9plfq.jpg',
        filename: 'jftonpzlxgakoxo9plfq.jpg',
        size: 34481,
        type: 'image/jpeg',
        thumbnails: {
          small: {
            url: 'https://dl.airtable.com/qVbclResT9magEgEnERA_jftonpzlxgakoxo9plfq.jpg',
            width: 56,
            height: 36,
          },
          large: {
            url: 'https://dl.airtable.com/p8e2P2cTKq817hQdo0yw_jftonpzlxgakoxo9plfq.jpg',
            width: 256,
            height: 163,
          },
        },
      },
    ],
    descriptionFR: 'Café au sirop\n',
    ref: 'vista-al-valle-zapote-honey',
  },
  createdTime: '2020-06-02T14:04:46.000Z',
};

const dataset = {
  Customer: [
    CUSTOMER1,
    CUSTOMER2,
  ],
  Theme: [
    THEME1,
    THEME2,
  ],
  Product: [
    PRODUCT1,
    PRODUCT2,
    PRODUCT3,
  ],
};

export default dataset;
