
<CDBCBanner />

# Mojaloop + Global Fintech Hackcelerator 2021

Mojaloop is supporting the Monetary Authority of Singapore (MAS) for the [2021 Global Fintech Hackcelerator.](https://www.fintechfestival.sg/global-fintech-hackcelerator/)

We built this sandbox to help you get up and running with Mojaloop, and to explore how you can get last-mile delivery of payments to real people.

## First Steps

1. Read about the different Mojaloop Use Cases - especially [3PPI Account Linking](/usecases/3ppi-account-linking) and [3PPI Payments](/usecases/3ppi-transfer).
2. [Learn more about the Mojaloop Sandbox](/overview/) "Model Village", the different simulated DFSPs, 3PPIs and Users



## Start Building!
1. Learn about our APIs - expecially the [3PPI Sync API](/apis/sync-3ppi.html), which lets you (a fintech) link user's accout and initiate transfers on their behalf
2. Create a demo DFSP account with one our our DFSP Simulators: [BankOne](http://sandbox.mojaloop.io/bankone) or [UnoMFI](http://sandbox.mojaloop.io/bankone)
3. Follow the [G2P Account Linking Guide](/guides/overlay/g2p-3ppi-account-linking) to link an account you will be sending funds from with your fintech.
4. Use your fintech to send funds from your account with BankOne or UnoMFI by following the [3PPI P2P Transfer Guide](guides/payments/3ppi-p2p.html)


## Make it Real

1. Once you've got a demo working with the example 3PPI fintech, we can spin up resources for your very own fintech on the Mojaloop Sandbox. Just fill in [this form](https://coda.io/form/Request-3PPI-Resources-in-the-Mojaloop-Sandbox_d58trRE738q) to request your own 3PPI resources in the sandbox. We aim to do this within 24 hours - but feel free to ping us on our [Mojaloop Slack](https://mojaloop.io/slack) at `#cdbc-hack` if you think it's taking too long!
2. Once we give you a `baseURL` for your 3PPI Fintech, you can get building
3. Build out your solution with the [3ppi Payments API](/apis/sync-3ppi) using your account link you set up


## Have Any Questions?
- Contact us at the `#cdbc-hack` channel on the [Mojaloop Slack](https://mojaloop.io/slack)


## Other Resources:
- [Global CDBC Challenge](https://hackolosseum.apixplatform.com/hackathon/globalcbdcchallenge) on APIX
- [See the Mojaloop APIs on APIX](https://apixplatform.com/solutions/95)
- [This Demo](/demos/#pisp-account-linking) shows an example account-linking flow on a 3PPI-enabled fintech's application
- Check out demo code that shows P2P Payments with 3PPI:
  - Front-end client: [contrib-pisp-demo-ui](https://github.com/mojaloop/contrib-pisp-demo-ui)
  - Firebase-enabled backend: [contrib-pisp-demo-svc](https://github.com/mojaloop/contrib-pisp-demo-svc)