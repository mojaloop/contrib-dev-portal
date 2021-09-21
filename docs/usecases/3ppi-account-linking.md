# G2P - 3PPI Account Linking

## Key Takeaways
- Using the 3rd Party API, 3rd party apps and systems can link accounts on behalf of users without having to hold funds on their user's behalf
- This opens up a new class of participation and innovation for Fintechs who can focus on delivering quality use cases and experiences for their users.

## Actors
- **Fred:** Beneficiary Program Enrolment Officer
  - Fred's role is to ensure that end recipients of government funds are enrolled into a beneficiary program, with the bank account they choose
  - Fred’s own Beneficiary Management Platform provider has given him an app to work with in the field
- **Beneficiary Management Platform provider** 
  - A fintech integrated into the country's instant payment platform
  - Fred enters data into the platform
- **Ayeesha**: 
  - The end user who will receive a government payment to BankOne Account
  - Her SSP ID:  011000
  - Her Phone Number: +25423839138
  - She receives payments to this account via both mechanisms (P2P payments from friends like Alice as well as from government programs)
- **Alice**: the end user who will receive a government payment to an UnoMFI Account:
  - Her SSP ID:  000669
  - Her Phone Number: +25482574654
  - She receives payments to this account via both mechanisms (P2P payments from friends like Ayeesha as well as from government programs)


## Scenario
### 1. List Available DFSPs

1. Before Fred can initiate any social payments, he first needs to link a bank accout with the Beneficiary Management Platform
2. To do this, he logs in to the Beneficiary Management Platform website, and searches for the DFSP that his organization uses to fund the social payments


### 2. List accounts for Fred's organization

1. Fred then enters in an identifier that his organization uses to sign into his organization's DFSP. This could be an account identifier, client id - whatever they use to log in to the DFSP
2. The Beneficiary Management Platform uses the 3PPI linking API to request a list of accounts for that identifier.

### 3. Select Accounts to Link

1. Fred then confirms from the list of accounts which accounts he wishes to link with the Beneficiary Management Platform and with his biometric.
2. The Beneficiary Management Platform forwards the link to the DFSP, and the DFSP contacts Fred with an out-of-band OTP message

### 4. Authentication

1. The Beneficiary Management Platform asks Fred to enter the OTP he received from the DFSP
2. The Beneficiary Management Platform forwards the OTP to the DFSP with the 3PPI linking API as proof that they are indeed acting on Fred's behalf

### 5. Register Credential

1. If the OTP was verified successfully by the DFSP, they will issue a statement of Consent
2. The Beneficiary Management Platform then asks Fred to register a biometric
3. Any future payments made by Fred need to have this same biometric's signature for the payments to be approved
4. If the DFSP approves of the credential, the Beneficiary Management Platform is then informed that the process was successful, and Fred can go ahead and start iniating and approving payments.

## What's Next:
- [Learn about 3rd Party Initiated Payments](/3ppi-transfer)
- [Implement this usecase yourself with our ThirdParty API Guide](/guides/overlay/g2p-3ppi-account-linking)
- [Learn More about the ThirdParty APIs](/apis/sync-thirdparty)