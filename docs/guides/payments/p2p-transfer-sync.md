# Peer to Peer Transaction


This guide uses the sync Mojaloop SDK API to issue a Peer to Peer (P2P) transaction from one DFSP to another.


## Background

The Sync [Mojaloop SDK API](/apis/sync-p2p.html) requires that a DFSP already be running and configured to talk to the Mojaloop Sandbox, so there's no setup that we need to do here.

</br>

For this guide, we will use an existing DFSP, `JCash`, which is already up and running in the Sandbox, and exposes the [Mojaloop SDK API](/apis/sync-p2p.html). The `baseURL` for `JCash` is `jcash-sdk-scheme-adapter-outbound.sandbox.mojaloop.io` 

</br>

The transfer scenario is as follows:
- You are acting as `JCash`
- Your customer, Paolo Fernandez, who has the identifier `MSISDN/589408120` wants to send 1000 PHP to his friend Daniel Rizal, who lives on the other side of the city.
- Paolo uses the JCash mobile application to make the transfer from his wallet which has plenty of funds available to complete the transfer with.
- Daniel sent Paolo an SMS message saying "Please just send the 1000 PHP to my phone number!", and Paolo knows that Daniel's phone number is `329294234`

## 1. Party Lookup

```
POST /transfers
```

Firstly, Paolo will enter into the JCash app:
- Daniel's phone number, `329294234`
- The amount to be sent, 1000 PHP
- That he wants Daniel to `RECEIVE` 1000 PHP, so any fees to perform the transfer will be added _on top of_ the 1000 PHP.

Paolo then selects "Continue".

</br>

Note: The Mojaloop SDK has a number of internal configuration options which will change the behaviour of the transfer. From the API specification:

> If the configuration variables `AUTO_ACCEPT_PARTIES` is set to `"false"` this method will terminate when the payee party has been resolved and return the payee party details. If the payee wishes to proceed with the transfer, then a subsequent `PUT /transfers/{transferId}` request (accepting the payee party) is required to continue the operation. The scheme adapter will then proceed with quotation stage...
> </br></br>
> If the configuration variable `AUTO_ACCEPT_QUOTES` is set to `"false"` this method will terminate and return the quotation when it has been received from the payee DFSP. If the payee wished to proceed with the transfer, then a subsequent `PUT /transfers/{transferId}` request (accepting the quote) is required to continue the operation. The scheme adapter will then proceed with the transfer state.
> </br></br>
> If the configuration variables `AUTO_ACCEPT_PARTIES` and `AUTO_ACCEPT_QUOTES` are both set to `"true"` this method will block until all three transfer stages are complete. Upon completion it will return the entire set of transfer details received during the operation.
> </br></br>
> Combinations of settings for `AUTO_ACCEPT...` configuration variables allow the scheme adapter user to decide which mode of operation best suits their use cases. i.e. the scheme adapter can be configured to "break" the three stage transfer at these points in order to execute backend logic such as party verification, quoted fees assessments etc.


### Request

The following is the `POST /transfers` request you can make to the `JCash` Mojaloop SDK to start the transfer process. Note that the `homeTransactionId` is a `uuidv4` that you randomly generate, and use to refer to the transaction at a later date.

```bash
curl -X POST jcash-sdk-scheme-adapter-outbound.sandbox.mojaloop.io/transfers\
  -H 'Accept: application/json'\
  -H 'Content-Type: application/json'\
  -d '{
  "homeTransactionId": "c3b2e35c-f3ba-40e2-a13a-7e63b191cb5e",
  "from": {
    "idType": "MSISDN",
    "idValue": "589408120"
  },
  "to": {
    "idType": "MSISDN",
    "idValue": "329294234"
  },
  "amountType": "RECEIVE",
  "currency": "PHP",
  "amount": "1000",
  "transactionType": "TRANSFER",
  "note": "Note sent to Payee."
}'
```

### Response:

```json
{
  "homeTransactionId":"c3b2e35c-f3ba-40e2-a13a-7e63b191cb5e",
  "transferId":"a560be24-cab6-4436-a804-0348199225ae",
  "from":{
    "idType":"MSISDN",
    "idValue":"589408120"
  },
  "to":{
    "idType":"MSISDN",
    "idValue":"329294234",
    "fspId":"skybank",
    "firstName":"Daniel",
    "middleName":"B",
    "lastName":"Rizal",
    "dateOfBirth":"1970-01-01"
  },
  "amountType":"RECEIVE",
  "currency":"PHP",
  "amount":"1000",
  "transactionType":"TRANSFER",
  "note":"Note sent to Payee.",
  "currentState":"WAITING_FOR_PARTY_ACCEPTANCE",
  "initiatedTimestamp":"2021-09-21T05:10:12.188Z"
}
```

You can see that the `to` details have been filled in by the API, with more information about the party at `MSISDN/329294234`. Additionally, the state of the transaction is now `WAITING_FOR_PARTY_ACCEPTANCE`. Make sure you save the `transferId`, since we will need it in the subsequent requests.


</br>
You can now show Paolo the looked-up details, and ask him to confirm that this is indeed the Daniel that he knows about and wants to proceed with the transfer.


## 2. Agreement

```
PUT /transfers/{ID}
```

Once Paolo has confirmed that it is indeed Daniel he wishes to send funds to, you can continue with the transaction using the API call `PUT /transfers/{ID}`. The `{ID}` here is the `transferId` from the previous response.

### Request:
```bash
curl -X PUT jcash-sdk-scheme-adapter-outbound.sandbox.mojaloop.io/transfers/a560be24-cab6-4436-a804-0348199225ae\
  -H 'Accept: application/json'\
  -H 'Content-Type: application/json'\
  -d '{
    "acceptParty": true
  }'
```

### Response:

```json
{
  "homeTransactionId": "c3b2e35c-f3ba-40e2-a13a-7e63b191cb5e",
  "transferId": "a560be24-cab6-4436-a804-0348199225ae",
  "from": {
    "idType": "MSISDN",
    "idValue": "589408120"
  },
  "to": {
    "idType": "MSISDN",
    "idValue": "329294234",
    "fspId": "skybank",
    "firstName": "Daniel",
    "middleName": "B",
    "lastName": "Rizal",
    "dateOfBirth": "1970-01-01"
  },
  "amountType": "RECEIVE",
  "currency": "PHP",
  "amount": "1000",
  "transactionType": "TRANSFER",
  "note": "Note sent to Payee.",
  "currentState": "WAITING_FOR_QUOTE_ACCEPTANCE",
  "initiatedTimestamp": "2021-09-21T05:10:12.188Z",
  "quoteId": "2eb77c18-1a8a-4048-8721-a26059f6abc8",
  "quoteResponse": {
    "transferAmount": {
      "amount": "1000",
      "currency": "PHP"
    },
    "expiration": "2021-09-21T06:12:41.408Z",
    "ilpPacket": "AYIDAQAAAAAAAYagGmcuc2t5YmFuay5tc2lzZG4uMzI5Mjk0MjM0ggLaZXlKMGNtRnVjMkZqZEdsdmJrbGtJam9pWVRVMk1HSmxNalF0WTJGaU5pMDBORE0yTFdFNE1EUXRNRE0wT0RFNU9USXlOV0ZsSWl3aWNYVnZkR1ZKWkNJNklqSmxZamMzWXpFNExURmhPR0V0TkRBME9DMDROekl4TFdFeU5qQTFPV1kyWVdKak9DSXNJbkJoZVdWbElqcDdJbkJoY25SNVNXUkpibVp2SWpwN0luQmhjblI1U1dSVWVYQmxJam9pVFZOSlUwUk9JaXdpY0dGeWRIbEpaR1Z1ZEdsbWFXVnlJam9pTXpJNU1qazBNak0wSWl3aVpuTndTV1FpT2lKemEzbGlZVzVySW4wc0luQmxjbk52Ym1Gc1NXNW1ieUk2ZXlKamIyMXdiR1Y0VG1GdFpTSTZleUptYVhKemRFNWhiV1VpT2lKRVlXNXBaV3dpTENKdGFXUmtiR1ZPWVcxbElqb2lRaUlzSW14aGMzUk9ZVzFsSWpvaVVtbDZZV3dpZlN3aVpHRjBaVTltUW1seWRHZ2lPaUl4T1Rjd0xUQXhMVEF4SW4xOUxDSndZWGxsY2lJNmV5SndZWEowZVVsa1NXNW1ieUk2ZXlKd1lYSjBlVWxrVkhsd1pTSTZJazFUU1ZORVRpSXNJbkJoY25SNVNXUmxiblJwWm1sbGNpSTZJalU0T1RRd09ERXlNQ0lzSW1aemNFbGtJam9pYW1OaGMyZ2lmWDBzSW1GdGIzVnVkQ0k2ZXlKaGJXOTFiblFpT2lJeE1EQXdJaXdpWTNWeWNtVnVZM2tpT2lKUVNGQWlmU3dpZEhKaGJuTmhZM1JwYjI1VWVYQmxJanA3SW5OalpXNWhjbWx2SWpvaVZGSkJUbE5HUlZJaUxDSnBibWwwYVdGMGIzSWlPaUpRUVZsRlVpSXNJbWx1YVhScFlYUnZjbFI1Y0dVaU9pSkRUMDVUVlUxRlVpSjlmUQA",
    "condition": "wtgqWUh4hLpv46F4_Mk7JWdKb5Ctssu7BY4uQnDWC6I",
    "payeeFspFee": {
      "amount": "50",
      "currency": "PHP"
    },
    "payeeFspCommission": {
      "amount": "50",
      "currency": "PHP"
    }
  },
  "quoteResponseSource": "skybank"
}
```

You can see that the details of the proposed transfer have been filled in with a `quoteResponse` from the Payee DFSP. You can read more about the Quote Response and how to interpret it from the [Mojaloop FSPIOP API](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/API-Definition_v1.1.md#51-quoting)

The `quoteResponse.condition` is the interledeger condition, which will be attached to the transfer request by the SDK, and is part of the a cryptographic lock on the transfer. [Read more here](https://github.com/mojaloop/mojaloop-specification/blob/master/fspiop-api/documents/API-Definition_v1.1.md#6728-interledger-payment-request)

The `currentState` is now `WAITING_FOR_QUOTE_ACCEPTANCE`

You can now present Paolo with the quote details for the transaction, and ask him if he wants to proceed.


## 3. Transfer

```
PUT /transfers/{ID}
```

If Paolo is happy to proceed with the transfer, you can now proceed with the transfer, using the same resource as the previous request, but with a slightly different request body:

### Request:
```bash
curl -X PUT jcash-sdk-scheme-adapter-outbound.sandbox.mojaloop.io/transfers/a560be24-cab6-4436-a804-0348199225ae\
  -H 'Accept: application/json'\
  -H 'Content-Type: application/json'\
  -d '{
    "acceptQuote": true
  }'
```

### Response:
```json
{
  "homeTransactionId": "c3b2e35c-f3ba-40e2-a13a-7e63b191cb5e",
  "from": {
    "idType": "MSISDN",
    "idValue": "589408120"
  },
  "to": {
    "idType": "MSISDN",
    "idValue": "329294234",
    "fspId": "skybank",
    "firstName": "Daniel",
    "middleName": "B",
    "lastName": "Rizal",
    "dateOfBirth": "1970-01-01"
  },
  "amountType": "RECEIVE",
  "currency": "PHP",
  "amount": "1000",
  "transactionType": "TRANSFER",
  "note": "Note sent to Payee.",
  "transferId": "a560be24-cab6-4436-a804-0348199225ae",
  "currentState": "COMPLETED",
  "initiatedTimestamp": "2021-09-21T05:10:12.188Z",
  "quoteId": "2eb77c18-1a8a-4048-8721-a26059f6abc8",
  "quoteResponse": {
    "transferAmount": {
      "amount": "1000",
      "currency": "PHP"
    },
    "expiration": "2021-09-21T06:12:41.408Z",
    "ilpPacket": "AYIDAQAAAAAAAYagGmcuc2t5YmFuay5tc2lzZG4uMzI5Mjk0MjM0ggLaZXlKMGNtRnVjMkZqZEdsdmJrbGtJam9pWVRVMk1HSmxNalF0WTJGaU5pMDBORE0yTFdFNE1EUXRNRE0wT0RFNU9USXlOV0ZsSWl3aWNYVnZkR1ZKWkNJNklqSmxZamMzWXpFNExURmhPR0V0TkRBME9DMDROekl4TFdFeU5qQTFPV1kyWVdKak9DSXNJbkJoZVdWbElqcDdJbkJoY25SNVNXUkpibVp2SWpwN0luQmhjblI1U1dSVWVYQmxJam9pVFZOSlUwUk9JaXdpY0dGeWRIbEpaR1Z1ZEdsbWFXVnlJam9pTXpJNU1qazBNak0wSWl3aVpuTndTV1FpT2lKemEzbGlZVzVySW4wc0luQmxjbk52Ym1Gc1NXNW1ieUk2ZXlKamIyMXdiR1Y0VG1GdFpTSTZleUptYVhKemRFNWhiV1VpT2lKRVlXNXBaV3dpTENKdGFXUmtiR1ZPWVcxbElqb2lRaUlzSW14aGMzUk9ZVzFsSWpvaVVtbDZZV3dpZlN3aVpHRjBaVTltUW1seWRHZ2lPaUl4T1Rjd0xUQXhMVEF4SW4xOUxDSndZWGxsY2lJNmV5SndZWEowZVVsa1NXNW1ieUk2ZXlKd1lYSjBlVWxrVkhsd1pTSTZJazFUU1ZORVRpSXNJbkJoY25SNVNXUmxiblJwWm1sbGNpSTZJalU0T1RRd09ERXlNQ0lzSW1aemNFbGtJam9pYW1OaGMyZ2lmWDBzSW1GdGIzVnVkQ0k2ZXlKaGJXOTFiblFpT2lJeE1EQXdJaXdpWTNWeWNtVnVZM2tpT2lKUVNGQWlmU3dpZEhKaGJuTmhZM1JwYjI1VWVYQmxJanA3SW5OalpXNWhjbWx2SWpvaVZGSkJUbE5HUlZJaUxDSnBibWwwYVdGMGIzSWlPaUpRUVZsRlVpSXNJbWx1YVhScFlYUnZjbFI1Y0dVaU9pSkRUMDVUVlUxRlVpSjlmUQA",
    "condition": "wtgqWUh4hLpv46F4_Mk7JWdKb5Ctssu7BY4uQnDWC6I",
    "payeeFspFee": {
      "amount": "50",
      "currency": "PHP"
    },
    "payeeFspCommission": {
      "amount": "50",
      "currency": "PHP"
    }
  },
  "quoteResponseSource": "skybank",
  "fulfil": {
    "completedTimestamp": "2021-09-21T06:24:49.901Z",
    "transferState": "COMMITTED",
    "fulfilment": "yeUzeLpaJKj7a5PySnJfa6ytg5mh8wF1GhFoL3tMDWU"
  }
}
```

In the response, see that the `fulfil` field has been added with details about the completed transfer.

You can now inform Paolo that the transfer completed successfully, and Daniel has received the funds.