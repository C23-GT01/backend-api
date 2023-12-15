# TrackMate API Documentation
# List of contents
- [Endpoint](#Endpoint)
- [Account](#Account)
  - [Register](#Register)
  - [Login](#Login)
  - [User Login Profile](#User-Login-Profile)
  - [Edit Profile](#Edit-Profile)
  - [Update Acces Token](#Update-Acces-Token)
  - [Logout](#Logout)
  - [Delete Account](#Delete-Account)
- [Product](#Product)
  - [Get All Product](#Get-All-Product)
  - [Product Recomendation](#Product-Recomendation)
  - [Search](#Search)
  - [Filter by Category](#Filter-by-Category)
  - [Get Detail Product](#Get-Detail-Product)
  - [Get All Product by ID UMKM](#Get-All-Product-by-id-UMKM)
  - [Add Product](#Add-Product)
  - [Edit Product](#Edit-Product)
  - [Delete Product](#Delete-Product)
- [UMKM](#UMKM)
  - [Get All UMKM](#Get-All-UMKM)
  - [Get Detail UMKM](#Get-Detail-UMKM)
  - [Add UMKM](#Add-UMKM)
  - [Edit UMKM](#Edit-UMKM)
  - [Delete UMKM](#Delete-UMKM)
- [Error Handling](#Error-Handling)
  - [Client Error](#Client-Error)
  - [Server Error](#Server-Error)
- [Status Codes](#Status-Codes)
# Endpoint
- Production
```
https://c23-gt01-01.et.r.appspot.com/
```
- Development
```
http://localhost:5000
```
# Account
## Register
- Path
```http
POST /users
```
- Body Request
```javascript
{
    "username": string,
    "email": string,
    "image": string || null
    "role": string,
    "password": string,
    "fullname": string,
}
```
- Example Body Request
```json
{
    "username": "user1",
    "email": "user1@gmail.com",
    "role": "user",
    "password": "123user",
    "fullname": "User Trackamte"
}
```

- Response
```javascript
{
    "error"  : bool,
    "status" : string,
    "message": string,
    "data"   : {
        "userId": string
    }
}
```
- Example Response
```json
{
    "error": false,
    "status": "success",
    "message": "User berhasil ditambahkan",
    "data": {
        "userId": "user-I4YvO_qdU337HszX"
    }
}
```

## Login
> Login refers to get `access token` and `refresh token`
- Path
```http
POST /authentications
```
- Body Request
```javascript
{
    "username": string,
    "password": string,
}
```
- Example Body Request
```json
{
    "username": "user1",
    "password": "123user",
}
```

- Response
```javascript
{
    "error" : bool
    "status": string,
    "message": string,
    "data": {
        "accessToken": string,
        "refreshToken": string
    }
}
```
- Example Response
```json
{
    "error" : false
    "status": "success",
    "message": "Login berhasil",
    "data": {
        "accessToken": "......PNCc3eAbhRycNDbc",
        "refreshToken": "......_H5GczcpSr2HXk0"
    }
}
```

## User Login Profile
- Path
```http
POST /users/profile
```
- Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

- Response
```javascript
{
    "error": bool,
    "status": string,
    "data": {
        "user": {
            "id": string,
            "username": string,
            "email": string,
            "image": string || null,
            "fullname": string
        }
    }
}
```
- Example Response
```json
{
    "error": false,
    "status": "success",
    "data": {
        "user": {
            "id": "user-a9vOKoZj3lfDar65",
            "username": "user-1701908278",
            "email": "user-1701908278@gmail.com",
            "image": null, //will be null if not yet edited 
            "fullname": "User Trackamte"
        }
    }
}
```
## Edit Profile
- Path
```http
PUT /users
```
- Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```
- Body Request
```javascript
{
    "username": string,
    "email": string,
    "image": string || null,
    "fullname": string
}
```
- Example Body Request
```json
{
    "username": "user1 Edited",
    "email": "user1edited@gmail.com",
    "image": "http://image.com",
    "fullname": "User Trackamte Edited"
}
```

- Response
```javascript
{
    "error": bool,
    "status": string,
    "message": string
}
```
- Example Response
```json
{
    "error": false,
    "status": "success",
    "message": "Profil berhasil diperbarui"
}
```

## Update Acces Token
> for security `access token` will be deleted in a short time, so use update `refresh token` to get it again.
- Path
```http
PUT /authentications
```
- Body Request
```javascript
{
    "refreshToken": string
}
```
- Example Body Request
```json
{
    "refreshToken": "......hjudsmm8_%gsguysk"
}
```

- Response
```javascript
{
    "error": bool,
    "status": string,
    "message": string,
    "data": {
        "accessToken": string
    }
}
```
- Example Response
```json
{
    "error": false,
    "status": "success",
    "message": "Access Token berhasil diperbarui",
    "data": {
        "accessToken": "...............or2exHV-mtoARUYYuNub5YR4AoXA4"
    }
}
```

## Logout
> Logout refers to delete `refreh token`
- Path
```http
DELETE /authentications
```
- Body Request
```javascript
{
    "refreshToken": string
}
```
- Example Body Request
```json
{
    "refreshToken": "......hjudsmm8_%gsguysk"
}
```

- Response
```javascript
{
    "error": bool,
    "status": string,
    "message": string
}
```
- Example Response
```json
{
    "error": false,
    "status": "success",
    "message": "Refresh token berhasil dihapus"
}
```

## Delete Account
> delete acount not delete refresh token, so please send request to [`delete refresh token`](#Logout) also to logout after delete account 
- Path
```http
DELETE /users
```
- Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

- Response
```javascript
{
    "error": bool,
    "status": string,
    "message": string
}
```
- Example Response
```json
{
    "error": false,
    "status": "success",
    "message": "Akun berhasil dihapus"
}
```



  
# Product
## Get All Product

- Path
```http
GET /products
```
- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "message" : string,
  "count"   : int,
  "data"    : object,
}
```



- Example Response
```json
{
    "error"   : false,
    "status"  : "success",
    "message" : "Menampilkan semua produk",
    "count"   : 3,
    "data"    : {
        "products": [
            {
                "id": "product-3_PabLrYn6okMUwr",
                "name": "Product 1",
                "image": "https://picsum.photos/200",
                "price": 10000,
                "category": 1
            },
            {
                "id": "product--4PQjQTklQLDLsB2",
                "name": "Product 2",
                "image": "https://picsum.photos/200",
                "price": 30000,
                "category": 2
            },
            {
                "id": "product-IKqPltKAqIRWSNPw",
                "name": "Product 3",
                "image": "https://picsum.photos/200",
                "price": 50000,
                "category": 3
            }
        ]
    }
}
```

## Product Recomendation
- Path
```http
GET /recomendation
```

- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "message" : string,
  "count"   : int,
  "data"    : object,
}
```

- Example Response
```json
{
    "error"   : false,
    "status"  : "success",
    "message" : "Menampilkan semua produk",
    "count"   : 3,
    "data"    : {
        "recommended_products": [
        {
            "product_id": "B07YR26BJ3",
            "product_name": "KENT 16052 Elegant Electric Glass Kettle 1.8L 2000 W | Blue LED Illumination | Borosilicate Glass Body | Boil Drying Protection | Used as Boiler | Milk | Tea | Water & Soup | 1 Year Warranty",
            "rating_x": 4.0,
            "product_link": "https://www.amazon.in/KENT-Elegant-Electric-Kettle-Silver/dp/B07YR26BJ3/ref=sr_1_29?qid=1672923592&s=kitchen&sr=1-29"
        },
        {
            "product_id": "B09M3F4HGB",
            "product_name": "Borosil Volcano 13 Fin Oil Filled Radiator Room Heater, 2900 W, Black",
            "rating_x": 4.2,
            "product_link": "https://www.amazon.in/Borosil-Volcano-Filled-Radiator-Heater/dp/B09M3F4HGB/ref=sr_1_371?qid=1672923611&s=kitchen&sr=1-371"
        },
        {
            "product_id": "B09MFR93KS",
            "product_name": "Bajaj Rex DLX 750 W 4 Jars Mixer Grinder, White and Blue",
            "rating_x": 4.0,
            "product_link": "https://www.amazon.in/Bajaj-Jars-Mixer-Grinder-White/dp/B09MFR93KS/ref=sr_1_447?qid=1672923614&s=kitchen&sr=1-447"
        },
        {
            "product_id": "B018SJJ0GE",
            "product_name": "Libra Roti Maker Electric Automatic | chapati Maker Electric Automatic | roti Maker Machine with 900 Watts for Making Roti/Chapati/Parathas - Stainless Steel",
            "rating_x": 4.4,
            "product_link": "https://www.amazon.in/Libra-Athena-Roti-Maker-Black/dp/B018SJJ0GE/ref=sr_1_455?qid=1672923614&s=kitchen&sr=1-455"
        },
        {
            "product_id": "B07JGCGNDG",
            "product_name": "Crompton Amica 15-L 5 Star Rated Storage Water Heater (Geyser) with Free Installation (White)",
            "rating_x": 4.1,
            "product_link": "https://www.amazon.in/Crompton-Greaves-ASWH-2015-15-Litre-Storage/dp/B07JGCGNDG/ref=sr_1_294_mod_primary_new?qid=1672923607&s=kitchen&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-294"
        }
    ]
    }
}
```

## Search

- Path
```http
GET /products/search/:keyword
```
- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "message" : string,
  "count"   : int,
  "data"    : object,
}
```

- Example Response
```json
{
    "error"   : false,
    "status"  : "success",
    "message" : "Menampilkan hasil pencarian untuk 'sambal' ",
    "count"   : 3,
    "data"    : {
        "products": [
            {
                "id": "product-3_PabLrYn6okMUwr",
                "name": "Sambal baby cumy",
                "image": "https://picsum.photos/200",
                "price": 10000,
                "category": 1
            },
            {
                "id": "product--4PQjQTklQLDLsB2",
                "name": "Sambal goreng",
                "image": "https://picsum.photos/200",
                "price": 30000,
                "category": 2
            },
            {
                "id": "product-IKqPltKAqIRWSNPw",
                "name": "Samabal teri",
                "image": "https://picsum.photos/200",
                "price": 50000,
                "category": 3
            }
        ]
    }
}
```

## Filter by Category

- Path
```http
GET /products/category/:id
```
- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "message" : string,
  "count"   : int,
  "data"    : object,
}
```

- Example Response
```json
{
    "error"   : false,
    "status"  : "success",
    "message" : "Menampilkan semua produk",
    "count"   : 3,
    "data"    : {
        "products": [
            {
                "id": "product-3_PabLrYn6okMUwr",
                "name": "Product 1",
                "image": "https://picsum.photos/200",
                "price": 10000,
                "category": 1
            },
            {
                "id": "product--4PQjQTklQLDLsB2",
                "name": "Product 2",
                "image": "https://picsum.photos/200",
                "price": 30000,
                "category": 1
            },
        ]
    }
}
```

## Get Detail Product

- Path
```http
GET /products/:id
```

- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "message" : string,
  "data"    : object,
}
```

- Example Response
```json
{
    "error"  : false,
    "status" : "success",
    "data"   : {
        "product": {
            "id": "product-IKqPltKAqIRWSNPw",
            "name": "sambal khas",
            "image": ["https://picsum.photos/200", "https://picsum.photos/200"] ,
            "price": 50000,
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "resources": [
                {
                    "name": "cabai",
                    "umkm": "Sukamaju",
                    "image": "https://picsum.photos/200",
                    "location": {
                        "lat": -34.397,
                        "lng": 150.644,
                        "name": "Wonogiri, Jawa Tengah",
                    },
                    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "batu",
                    "umkm": "Sukamaju",
                    "image": "https://picsum.photos/200",
                    "location": {
                        "lat" : -34.397,
                        "lng" : 150.644,
                        "name": "Wonogiri, Jawa Tengah",
                    },
                    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "batu",
                    "image": "https://picsum.photos/200",
                    "location": {
                        "lat": -34.397,
                        "lng": 150.644,
                        "name": "New York, US",
                    },
                    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                }
            ],
            "production": [
                {
                    "name": "pengumpulan bahan baku",
                    "image": "https://picsum.photos/200",
                    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "penumbukan",
                    "image": "https://picsum.photos/200",
                    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "pengemasan",
                    "image": "https://picsum.photos/200",
                    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                }
            ],
            "impact": [
                {
                    "name": "Impact 1",
                    "image": "https://picsum.photos/200",
                    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "Impact 2",
                    "image": "https://picsum.photos/200",
                    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "Impact 3",
                    "image": "https://picsum.photos/200",
                    "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                }
            ],
            "contribution": [1,2,4],
            "umkm": {
                "id": "Umkm-VKDhH1FD3QbdzH6s",
                "logo": "https://picsum.photos/200",
                "name": "PT Sambal",
                "location": {
                    "lat": -34.397,
                    "lng": 150.644,
                    "name": "Wonogiri, Jawa Tengah"
                },
                "employe": 1000
            },
            "category": 1,
            "createdAt": "2023-11-22T06:58:51.120Z",
            "updatedAt": "2023-11-22T06:58:51.120Z"
        }
    }
}
```

## Get All Product by id UMKM
- Path
```http
GET /products/umkm/:idumkm
```
- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "message" : string,
  "count"   : int,
  "data"    : object,
}
```
- Example Response
```json
{
  "error"   : false,
  "status"  : "success",
  "message" : "Menampilkan semua produk umkm",
  "count"   : 2,
  "data"    : {
      "products": [
          {
              "id": "product-3_PabLrYn6okMUwr",
              "name": "Product 1",
              "image": "https://picsum.photos/200",
              "price": 10000,
              "category": 1
          },
          {
              "id": "product--4PQjQTklQLDLsB2",
              "name": "Product 2",
              "image": "https://picsum.photos/200",
              "price": 30000,
              "category": 2
          },
      ]
  }
}
```

## Add Product
- Path
```http
POST /products
```
- Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```
- Response
```javascript
{
  "status": string,
  "message": string,
  "data": object,
}
```
- Example Response
```json
{
  "status": "success",
  "message": "Produk berhasil ditambahkan",
  "data": {
    "productId": 1
  }
}
```
- Body
```json
{
  "image": "https://picsum.photos/200",
  "price": 50000,
  "description": "sambal enak sekali",
  "name": "sambal khas",
  "umkm": {
    "name": "Sambal Mantu",
    "employe": 1000,
    "location": {
      "name": "Denpasar, Bali",
      "lat ": -34.397,
      "lng  ": 150.644
    }
  },
  "resources": [
    {
      "name": "cabai",
      "image": "https://picsum.photos/200",
      "description": "pedas",
      "location": {
        "name": "Wonogiri, Jawa Tengah",
        "lat ": -34.397,
        "lng  ": 150.644
      },
      "umkm": "Sukamaju"
    },
    {
      "name": "batu",
      "image": "https://picsum.photos/200",
      "description": "lorem100",
      "location": {
        "name": "Wonogiri, Jawa Tengah",
        "lat ": -34.397,
        "lng  ": 150.644
      },
      "umkm": "Sukamaju"
    },
    {
      "name": "batu",
      "image": "https://picsum.photos/200",
      "description": "lorem100",
      "location": {
        "name": "New York, US",
        "lat ": -34.397,
        "lng  ": 150.644
      }
    }
  ],
  "production": [
    {
      "name": "pengumpulan bahan baku",
      "image": "https://picsum.photos/200",
      "description": "lorem100"
    },
    {
      "name": "penumbukan",
      "image": "https://picsum.photos/200",
      "description": "lorem100"
    },
    {
      "name": "pengemasan",
      "image": "https://picsum.photos/200",
      "description": "lorem100"
    }
  ],
  "impact": [
    {
      "name": "batu",
      "icon": 1,
      "description": "lorem100"
    },
    {
      "name": "batu",
      "icon": 2,
      "description": "lorem100"
    },
    {
      "name": "batu",
      "icon": 3,
      "description": "lorem 100"
    }
  ],
  "contribution": [
    {
      "icon": 1,
      "description": "lorem 100"
    },
    {
      "icon": 1,
      "description": "lorem100"
    },
    {
      "icon": "https://picsum.photos/200",
      "description": "lorem100"
    }
  ],
  "category": null
}
```

## Edit Product
- Path
```http
PUT /products
```
- Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```
- Response
```javascript
{
  "status": string,
  "message": string,
}
```
- Example Response
```json
{
  "status": "success",
  "message": "Produk berhasil diperbrui",
}
```
- Body
```json
{
      "id": "xxx",
      "image": "http://a.jpg",
      "price": 13000,
      "description": "lorem100",
      "name": "sambal kuning",
      "umkm": {
        "name": "Sambal Mantu",
        "employe": 1000,
        "location": "koordinat"
      },
      "resources": [
        {
          "name": "cabai",
          "image": "https://image.com/",
          "description": "pedas",
          "location": "koordinat"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem100",
          "location": "koordinat"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem100",
          "location": "koordinat"
        }
      ],
      "production": [
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem100"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem100"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem100"
        }
      ],
      "impact": [
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem100"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem100"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem100"
        }
      ],
      "contribution": [
        {
          "icon": "https://image.com/",
          "description": "lorem100"
        },
        {
          "icon": "https://image.com/",
          "description": "lorem100"
        },
        {
          "icon": "https://image.com/",
          "description": "lorem100"
        }
      ]
    }
```

## Delete Product
- Path
```http
DELETE /products/:id
```
- Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```
- Response
```javascript
{
  "status": string,
  "message": string,
}
```
- Example Response
```json
{
  "status": "success",
  "message": "Produk berhasil dihapus",
}
```

# UMKM
## Get All UMKM

- Path
```http
GET /umkm
```
- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "message" : string,
  "count"   : int,
  "data"    : object,
}
```
- Example Response
```json
{
  "error": false,
  "status": "success",
  "message": "Menampilkan semua umkm",
  "count": 2,
  "data": {
    "umkm": [
      {
        "id": "umkm-xyz1",
        "logo": "https://picsum.photos/200",
        "name": "Trackmate",
        "location": {
          "lat": -34.397,
          "lng": 150.644,
          "name": "Wonogiri, Jawa Tengah"
        }
      },
      {
        "id": "Umkm-VKDhH1FD3QbdzH6s",
        "logo": "https://i.ibb.co/BwNSbMb/logo-mamo.jpg",
        "name": "Sambal Mamo",
        "location": {
          "lat": -8.113750063882303,
          "lng": 115.0913508971701,
          "name": "Jl. Ngurah Rai,  Buleleng, Bali"
        }
      },
    ]
  }
}
```

## Get Detail UMKM

- Path
```http
GET /umkm/:id
```

- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "data"    : object,
}
```

- Example Response
```json
{
  "error": false,
  "status": "success",
  "data": {
    "umkm": {
      "id": "Umkm-VKDhH1FD3QbdzH6s",
      "image": "https://i.ibb.co/0fr1VCg/image.jpg",
      "logo": "https://i.ibb.co/BwNSbMb/logo-mamo.jpg",
      "name": "Sambal Mamo",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "location": {
          "lat": -8.113750063882303,
          "lng": 115.0913508971701,
          "name": "Jl. Ngurah Rai,  Buleleng, Bali"
       },
      "history": {
        "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        "image": "https://i.ibb.co/0fr1VCg/image.jpg"
      },
      "impact": [
        {
          "name": "Carbon Footprint",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "description": "Meminimalisir potensi jejak karbon baik secara individu/kelompok"
        },
        {
          "name": "Waste Management",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "description": "Melakukan tracing dalam upaya pengurangan limbah sekitar lingkungan usaha"
        },
        {
          "name": "Water Use",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "description": "Meniliki upaya efisiensi penggunaan air"
        },
        {
          "name": "Product Lyfecycle",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "description": "Memiliki daur hidup produk agar membantu meminimalisir kerusakan lingkungan"
        },
        {
          "name": "Health and Safety",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "description": "Mengukur kadar keamanan produk dalam penggunaan, keberlanjutan bahan baku dan pemanfaatan potensi daur ulang produk"
        },
        {
          "name": "Working Condition",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "description": "Menilik iklim komunikasi dalam lingkup pekerjaan dan sosial yang berkaitan dengan kesejahteraan dan kenyamanan pekerja"
        },
        {
          "name": "Human Right",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "description": "Meninjau pemenuhan hak-hak pekerja dalam berbagai aspek dengan berlandaskan regulasi yang berlaku hingga dimungkinkan adanya standarisasi"
        }
      ],
      "contact": [
        {
          "email": "08123456789",
          "phone": {
            "isWhatsApp": true,
            "phoneNumber": "0019272138",
            "waNumber": "0019272138"
          }
        }
      ],
      "owner": "user-ck3VlWtOkmMiEoU2",
      "createdAt": "2023-11-28T13:06:42.530Z",
      "updatedAt": "2023-11-28T13:06:42.530Z"
    }
  }
}
```

## Add UMKM
- Path
```http
POST /umkm
```
- Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```
- Request Body
```json
{
  "name": string,
}
```
- Example Request Body
```json
{
  "name": "Sambal mamo",
}
```
- Response
```javascript
{
  "error": bool,
  "status": string,
  "message": string,
  "data": object,
}
```
- Example Response
```json
{
  "error": false,
  "status": "success",
  "message": "UMKM berhasil didaftarkan",
  "data": {
    "umkmId": "umkm-djjhfsjd"
  }
}
```


## Edit UMKM
- Path
```http
PUT /umkm
```
- Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```
- Request Body
```javascript
{
  "image": string,
  "name": string,
  "logo": string,
  "description": string,
  "location": object,
  "history": object,
  "impact": array,
  "contact" : array
}
```
- Example Request Body
```json
{
  "image": "http://a.jpg",
  "logo": "http://a.jpg",
  "name": "PT Sambal 2",
  "description": "lorem100",
  "location": "jshak hdak",
  "history": {
 		"image": "http://a.jpg",
     	 	"text": "sambal kuning"
},
  "impact": [
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem 100"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem 100"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem 100"
        }
      ],
"contact" : [
	{
	"name": "whatsapp",
	"description": "08123456789"
        },
        {
    	"name": "email",
	"description": "sambal@gmail.com"
        }
    ]
  }
```

- Response
```javascript
{
    "error": bool,
    "status": string,
    "message": string
}
```
- Example Response
```json
{
    "error": false,
    "status": "success",
    "message": "Profil UMKM berhasil diupdate"
}

```


## Delete UMKM
- Path
```http
DELETE /umkm/:id
```
- Headers
```http
Authorization: Bearer <access_token>
Content-Type: application/json
```
- Response
```javascript
{
  "status": string,
  "message": string,
}
```
- Example Response
```json
{
  "status": "success",
  "message": "Profil UMKM berhasil diupdate",
}
```
- Body
```json
{
  "image": "http://a.jpg",
  "name": "PT Sambal 2",
  "description": "lorem100",
  "location": "jshak hdak",
  "history": {
 		"image": "http://a.jpg",
     	 	"text": "sambal kuning"
},
  "impact": [
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem 100"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem 100"
        },
        {
          "name": "batu",
          "image": "https://image.com/",
          "description": "lorem 100"
        }
      ],
"contact" : [
	{
	"name": "whatsapp",
	"description": "08123456789"
	},
	{
    	"name": "email",
	"description": "sambal@gmail.com"
        }
    ]
  }
```

# Error Handling
## Client Error
- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "message" : string,
}
```

- Example Response
```json
{
    "error": true,
    "status": "fail",
    "message": "Product tidak ditemukan",
}
```


## Server Error
- Response
```javascript
{
  "error"   : bool,
  "status"  : string,
  "message" : string,
  "stack"   : string,
}
```

- Example Response
```json
{
    "error": true,
    "status": "error",
    "message": "terjadi kegagalan pada server kami",
    "stack": "TypeError: Cannot read ...."
}
```

# Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

Made with ❤ by Tim CC (Cobo Canaeru) Eheek
  

