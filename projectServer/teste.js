let test = {
    "scheduledOrder": null,
    "deliveryArea": null,
    "voucher": null,
    "statusReason": "",
    "source": "Web",
    "orderNumber": 29520148,
    "loyaltyprogram": null,
    "customerOrderNumber": 159,
    "isNewCustomer": false,
    "paymentMethod": {
      "cardLastNumbers": null,
      "name": "Ticket Restaurante",
      "paymentsId": 6,
      "cardBrand": null,
      "cardHolderName": null,
      "cardExpiryYear": null,
      "cardExpiryMonth": null,
      "creditcardsId": null
    },
    "items": [
      {
        "name": "Raviole de queijo",
        "description": "Raviole com recheio de queijo, acompanhado de molho ao sugo com grelhado, ou molho a bolonhesa com parmesão",
        "price": {
          "value": 2290,
          "currency": "BRL"
        },
        "ordersItemsId": 58332637,
        "total": {
          "value": 2290,
          "currency": "BRL"
        },
        "amount": 1,
        "id": 637350,
        "sequence": 1,
        "properties": [
          {
            "name": "Escolha o molho:",
            "isFractional": false,
            "description": "",
            "options": [
              {
                "name": "117 - Molho à bolonhesa com parmesão",
                "description": "",
                "price": {
                  "value": 0,
                  "currency": "BRL"
                },
                "amount": 1,
                "id": 1924313,
                "sequence": 1,
                "ordersOptionsId": 75692718,
                "customCode": ""
              }
            ],
            "id": 643363,
            "sequence": 1,
            "priceCalculationType": "HIGHER",
            "ordersPropertiesId": 63791847
          }
        ],
        "customCode": "23",
        "propertiesPrice": {
          "value": 0,
          "currency": "BRL"
        },
        "comments": ""
      }
    ],
    "compositeItems": [],
    "total": {
      "deliveryFee": {
        "value": 1000,
        "currency": "BRL"
      },
      "total": {
        "value": 3290,
        "currency": "BRL"
      },
      "requiredChange": {
        "value": 0,
        "currency": "BRL"
      },
      "subtotal": {
        "value": 2290,
        "currency": "BRL"
      },
      "serviceFee": {
        "value": 0,
        "currency": "BRL"
      },
      "discount": {
        "value": 0,
        "currency": "BRL"
      }
    },
    "operationTime": {
      "editedTime": null,
      "inTransitBy": null,
      "doneBy": null,
      "editedBy": null,
      "cancelledBy": null,
      "approvedBy": null,
      "approvedTime": null,
      "cancelledTime": null,
      "inTransitTime": null,
      "doneTime": null
    },
    "modified": "2022-04-13T12:44:37-03:00",
    "id": 29520148,
    "isRegisteredInvoice": false,
    "registeredDocument": "",
    "status": "WAITING",
    "customer": {
      "email": "jbracale128@gmail.com",
      "document": "366.578.268-69",
      "lastName": "oto",
      "firstName": "Mais",
      "birthDate": "1997-04-28",
      "id": 9767783,
      "telephone": "43999882090"
    },
    "address": {
      "number": "1100",
      "city": "Londrina",
      "zipcode": "86036-370",
      "state": "PR",
      "neighborhood": "Jardim Morumbi",
      "id": null,
      "complement": "Condomínio",
      "street": "Estrada dos Pioneiros",
      "reference_point": ""
    },
    "metadata": {
      "utmCampaign": "-",
      "utmContent": "-",
      "source": "Web",
      "utmSource": "delivery-direto",
      "utmMedium": "delivery-finder",
      "utmTerm": "-"
    },
    "notes": "",
    "type": "DELIVERY",
    "table": null,
    "created": "2022-04-13T12:44:36-03:00",
    "memberGetMember": null
  }


  console.log(test.customer.firstName)