# TrackMate API Documentation
# List of contents
- Endpoint
- [Product](#Product)
  - [Get All Product](#Get-All-Product)
  - [Get Detail Product](https://github.com/C23-GT01/backend-api#Get-Detail-Product)
- [UMKM](https://github.com/C23-GT01/backend-api#UMKM)
  - [Get All UMKM](https://github.com/C23-GT01/backend-api#Get-All-UMKM)
  - [Get Detail UMKM](https://github.com/C23-GT01/backend-api#Get-Detail-UMKM)
# Endpoint
- Production `coming soon`
- Development
```
http://localhost:5000
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
                    "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
                    "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "batu",
                    "image": "https://picsum.photos/200",
                    "location": {
                        "lat": -34.397,
                        "lng": 150.644,
                        "name": "New York, US",
                    },
                    "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                }
            ],
            "production": [
                {
                    "name": "pengumpulan bahan baku",
                    "image": "https://picsum.photos/200",
                    "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "penumbukan",
                    "image": "https://picsum.photos/200",
                    "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "pengemasan",
                    "image": "https://picsum.photos/200",
                    "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                }
            ],
            "impact": [
                {
                    "name": "Impact 1",
                    "image": "https://picsum.photos/200",
                    "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "Impact 2",
                    "image": "https://picsum.photos/200",
                    "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                },
                {
                    "name": "Impact 3",
                    "image": "https://picsum.photos/200",
                    "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
          "deskripsi": "Meminimalisir potensi jejak karbon baik secara individu/kelompok"
        },
        {
          "name": "Waste Management",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "deskripsi": "Melakukan tracing dalam upaya pengurangan limbah sekitar lingkungan usaha"
        },
        {
          "name": "Water Use",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "deskripsi": "Meniliki upaya efisiensi penggunaan air"
        },
        {
          "name": "Product Lyfecycle",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "deskripsi": "Memiliki daur hidup produk agar membantu meminimalisir kerusakan lingkungan"
        },
        {
          "name": "Health and Safety",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "deskripsi": "Mengukur kadar keamanan produk dalam penggunaan, keberlanjutan bahan baku dan pemanfaatan potensi daur ulang produk"
        },
        {
          "name": "Working Condition",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "deskripsi": "Menilik iklim komunikasi dalam lingkup pekerjaan dan sosial yang berkaitan dengan kesejahteraan dan kenyamanan pekerja"
        },
        {
          "name": "Human Right",
          "image": "https://i.ibb.co/0fr1VCg/image.jpg",
          "deskripsi": "Meninjau pemenuhan hak-hak pekerja dalam berbagai aspek dengan berlandaskan regulasi yang berlaku hingga dimungkinkan adanya standarisasi"
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

