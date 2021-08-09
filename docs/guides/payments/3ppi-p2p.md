# 3PPI Payments

Learn how to use the [3PPI Sync API](/apis/sync-3ppi.html) to initiate a Peer to Peer (P2P) transaction from a 3rd Party Payment Initiator.

## Background

This guide assumes you are already familiar with 3PPI Payments, and have read the [3PPI Transfer Use Case Document](/usecases/3ppi-transfer.html)


In this guide we make the following assumptions:
- You are a PISP and have 
- Ayeesha is your user and she has linked the account she holds with dfspa in her application
- Ayeesha has registered a FIDO credential on her device, which you have an identifier for, and can ask her to 'sign' transactions using the FIDO credential

<!-- TODO: left to right sequence overview -->

## 1. Party Lookup

<!-- TODO: sequence highlight -->


```
POST /thirdpartyTransaction/partyLookup
```

The Party Lookup phase is where Ayeesha enters in the details of the person 
she wishes to send funds to from her PISP application. 

In this instance, she wants to send to the phone number `16135551212`.

Your application must generate a unique `transactionRequestId`, which takes 
the form of a UUID v4 string.

Then, using the Sync 3PPI, your app can perform the party lookup.

### Request:
```bash
curl -X POST "http://sandbox.mojaloop.io/switch-ttk-backend/thirdpartyTransaction/partyLookup" \
  -H  "accept: application/json" \
  -H  "Content-Type: application/json" 
  -d '{ 
    "transactionRequestId": "b51ec534-ee48-4575-b6a9-ead2955b8069",
    "payee": {
      "partyIdType": "MSISDN",
      "partyIdentifier":"16135551212"
    }
  }'
```

### Response:

And we get the following response:

```bash
{
  "currentState": "partyLookupSuccess",
  "party": {
    "partyIdInfo": {
      "partyIdType": "MSISDN",
      "partyIdentifier": "16135551212",
      "fspId": "dfspb"
    },
    "name": "Bob bobbington"
  }
}
```

You can now show Ayeesha the name "Bob bobbington", and ask her to confirm that 
this is who she indeed wishes to send funds to

<!-- TODO: ui snippet showing what an app might show it's user -->


## 2. Initiate 

Once Ayeesha confirms that this is the intended receipient of the funds, 
you can ask her how much she wants to send, and whether she wants Bob to
receive that amount, or she wants to send that amount (this affects the
fee calculations).


You can then use this data to form the following request:
### Request:

```bash
curl -X POST "http://sandbox.mojaloop.io/switch-ttk-backend/thirdpartyTransaction/b51ec534-ee48-4575-b6a9-ead2955b8069/initiate" -H  "accept: application/json"\
  -H  "Content-Type: application/json" 
  -d '{
    "payee":{
      "name":"Bob bobbington",
      "partyIdInfo":{
        "fspId":"dfspb",
        "partyIdType":"MSISDN",
        "partyIdentifier":"16135551212"
      }
    },
    "payer":{
      "partyIdType":"THIRD_PARTY_LINK",
      "partyIdentifier":"16135551212",
      "fspId":"dfspa"
    },
    "amountType":"RECEIVE",
    "amount":{
      "currency":"USD",
      "amount":"123.47"
    },
    "transactionType":{
      "scenario":"DEPOSIT",
      "initiator":"PAYER",
      "initiatorType":"CONSUMER"
    },
    "expiration":"2021-05-24T08:38:08.699-04:00"
  }'
```


Let's examine each of these fields so we can see what's going on:

- `payee` - The intended recipient of the transfer. This section can be copied from the `partyLookup` response
- `payer` - The details of the `THIRD_PARTY_LINK` that were established between your app and Ayeesha's DFSP when performing the account link. [Read more about the linking process.](todo)
- `amountType` - `RECIEVE` if Ayeesha intended Bob to receive `$123.47` exactly, and pay any fees in addition to that amount, or `SEND` if Ayeesha wanted Bob to recieve `$123.47` minus any fees.
- `amount` - The amount of funds to be sent, and their currency
- `transactionType` - A series of fields that describe the characteristics of the transaction. [Read more here](todo)
- `expiration` - How long the Transaction Request is valid for. Requests after this time period should be rejected by the DFSP


### Response:

And this is the response we recieve back from the above request:

```json
{
  "currentState": "authorizationReceived",
  "authorization": {
    "authenticationType": "U2F",
    "retriesLeft": "1",
    "amount": {
      "currency": "USD",
      "amount": "10.00"
    },
    "transactionId": "1234-1234-1234-1234",
    "transactionRequestId": "1234-1234-1234-1234",
    "quote": {
      "transferAmount": {
        "currency": "USD",
        "amount": "10.00"
      },
      "expiration": "2022-01-01T08:38:08.699-04:00",
      "ilpPacket": "AYIBgQAAAAAAAASwNGxldmVsb25lLmRmc3AxLm1lci45T2RTOF81MDdqUUZERmZlakgyOVc4bXFmNEpLMHlGTFGCAUBQU0svMS4wCk5vbmNlOiB1SXlweUYzY3pYSXBFdzVVc05TYWh3CkVuY3J5cHRpb246IG5vbmUKUGF5bWVudC1JZDogMTMyMzZhM2ItOGZhOC00MTYzLTg0NDctNGMzZWQzZGE5OGE3CgpDb250ZW50LUxlbmd0aDogMTM1CkNvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvbgpTZW5kZXItSWRlbnRpZmllcjogOTI4MDYzOTEKCiJ7XCJmZWVcIjowLFwidHJhbnNmZXJDb2RlXCI6XCJpbnZvaWNlXCIsXCJkZWJpdE5hbWVcIjpcImFsaWNlIGNvb3BlclwiLFwiY3JlZGl0TmFtZVwiOlwibWVyIGNoYW50XCIsXCJkZWJpdElkZW50aWZpZXJcIjpcIjkyODA2MzkxXCJ9IgA",
      "condition": "f5sqb7tBTWPd5Y8BDFdMm9BJR_MNI4isf8p8n4D5pH"
    }
  }
}
```