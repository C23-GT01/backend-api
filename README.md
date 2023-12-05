# TrackMate API Documentation
# List of contents
- Endpoint
- [Product](https://github.com/alfimonth/be-trackmate--documentation#Product)
  - [Get All Product](https://github.com/alfimonth/be-trackmate--documentation#Get-All-Product)
  - [Get Detail Product](https://github.com/alfimonth/be-trackmate--documentation#Get-Detail-Product)
- [UMKM](https://github.com/alfimonth/be-trackmate--documentation#UMKM)
  - [Get All UMKM](https://github.com/alfimonth/be-trackmate--documentation#Get-All-UMKM)
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
    "umk": [
      {
        "id": "umkm-xyz1",
        "image": "https://picsum.photos/200",
        "name": "PT Tracmate",
        "location": {
          "lat": -34.397,
          "lng": 150.644,
          "name": "Wonogiri, Jawa Tengah"
        }
      },
      {
        "id": "umkm-xyz2",
        "image": "https://picsum.photos/200",
        "name": "Sambal Mamo",
        "location": {
          "lat": -34.397,
          "lng": 150.644,
          "name": "Buleleng, Bali"
        }
      },
    ]
  }
}
```

