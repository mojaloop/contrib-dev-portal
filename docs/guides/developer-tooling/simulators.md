# Simulators

Refer to [mojaloop-simulator](https://github.com/mojaloop/mojaloop-simulator) on GitHub for more information on how the simulators.


This sandbox deploys simulators which allow you to:
1. Browse users registered with a DFSP
2. Send from one Party to another in a simple interface
## 1. Set up the Simulator UI(s)

1. Navigate to the Simulator UI page at [simulator-ui.sandbox.mojaloop.io](http://simulator-ui.sandbox.mojaloop.io)
2. Select "Settings" in the left bar

## 2. Register a DFSP Backend and check the users list

The Simulator UI page talks to a DFSP Simulator Backend behind the scenes. 

Before we go any further, we need to tell the simulator UI to connect to a specific Simulator Backend

![](../assets/register_config.png)

For example, you can register the jcash Simulator Backend

- name: `jcash`
- protocol: `http`
- host: `jcash-backend.sandbox.mojaloop.io`
- port: `80`

And hit "Save"

Once you've created that config, make sure to select it in the "Current Setting" in the dropdown

![](../assets/select_config.png)

Now you can navigate back to the list of users, and reload your browser. You should see a user list similar to the following:

![](../assets/user_list.png)

## 3. Send a Transfer

1. Select "Outbound Send" on the left menu.

2. Leave the editor in "Simple Mode"


3. Change the following fields:

- Currency: set to a currency the sandbox supports, such as `PHP`
- To Id Value: change this to be a MSISDN you can find in [the users list here](/overview/#parties). For this example, let's enter `329294234`.

4. Select "Send Transfer"

## 4. Transfer Response

Behind the scenes, the DFSP Simulator uses the sdk-scheme-adapter to talk to the Async Mojaloop API, and combines the separate Mojaloop Transfer steps (Discovery, Agreement, Transfer) into 1 step. This is a convenience for the Simulator environment, but can be configured depending on your DFSP's requirements (e.g. confirming Payee information with your user).

Here's a screenshot of an example response from the Simulator Backend:


![the transfer response](../assets/transfer_result.png)

> NOTE!
> You may find your transfer gets stuck at the "WAITING_FOR_PARTY_ACCEPTANCE" stage.
> This is because of a quirk with the way we have deployed the mojaloop-simulators
> And to complete the transfer you will need to send your own follow-up http requests
> See the [P2P Transfer Guide](/guides/payments/p2p-transfer-sync.html#_2-agreement)
> for more info on how to progress a transfer

## Handy Snippets:
### Listing all of the users for a given simulator:

```bash
curl http://<dfspid>-backend.sandbox.mojaloop.io/repository/parties | jq
```

Example result:
```bash
curl http://payeefsp-backend.sandbox.mojaloop.io/repository/parties | jq
[
  {
    "displayName": "Alice Alpaca",
    "firstName": "Alice",
    "middleName": "K",
    "lastName": "Alpaca",
    "dateOfBirth": "1970-01-01",
    "idType": "MSISDN",
    "idValue": "123456789"
  }
]

```


<!-- ## Simplified P2P Transfer

todo -->


### Register your own Party with Mojaloop + Simulator

First, tell Mojaloop which DFSP they should ask for this Party with `POST /participants`
```bash
curl -X POST http://sandbox.mojaloop.io/api/fspiop/participants/MSISDN/639563943094 \
  -H "Accept: application/vnd.interoperability.participants+json;version=1" \
  -H "Content-Type: application/vnd.interoperability.participants+json;version=1.0" \
  -H 'Date: Fri, 15 Jan 2021 00:00:00 GMT' \
  -H 'FSPIOP-Source: jcash' \
  -d '{ 
    "fspId": "jcash", 
    "currency": "PHP" 
    }'
```

Next, we can register the party information with the `jcash` DFSP simulator:

```bash
curl -X POST http://jcash-backend.sandbox.mojaloop.io/repository/parties \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "Jose R.",
    "firstName": "Jose",
    "middleName": "R",
    "lastName": "Rizal",
    "dateOfBirth": "1970-01-01",
    "idType": "MSISDN",
    "idValue": "639563943094"
  }'
```

And that's it! You can issue a `GET /parties/MSISDN/639563943094` call to ask Mojaloop to look up this party, and then request more informaton from `jcash`:

Let's issue this request "from" the `figmm` DFSP, and look in the TTK for the callback: [http://figmm.sandbox.mojaloop.io/admin/monitoring](here).

> Note:
> Feel free to change the `FSPIOP-Source` field to get the sandbox talking to your own DFSP!
> Follow the [DFSP Setup Guide](/guides/onboarding/dfsp-setup/) for instructions on how to do that. 

```bash
curl -v sandbox.mojaloop.io/api/fspiop/parties/MSISDN/639563943094 \
  -H 'Accept: application/vnd.interoperability.parties+json;version=1' \
  -H 'Content-Type: application/vnd.interoperability.parties+json;version=1.0' \
  -H 'FSPIOP-Source: figmm' \
  -H 'Date: 2021-01-01'
```

And the callback in the TTK:

![](../assets/simulators_ttk_callback.png)
