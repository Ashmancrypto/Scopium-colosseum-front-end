import Header from "../components/Header";
import Footer from "../components/Footer";

const TermsOfService = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-24 pb-32">
        <div className="h-24"></div>
        <div className="hidden lg:block absolute left-0 top-40">
            <img 
              src="/legal-docs/left-scopium.png" 
              alt="Info icon" 
              className=" opacity-50"
            />
        </div>

          <div className="hidden lg:block absolute left-0 top-[50rem]">
            <img 
              src="/legal-docs/right-flame.png" 
              alt="Security icon" 
              className="opacity-50"
            />
          </div>

          <div className="hidden lg:block absolute left-2 bottom-[650rem]">
            <img 
              src="/legal-docs/left-flame.png" 
              alt="Check icon" 
              className="opacity-50"
            />
          </div>

          <div className="hidden lg:block absolute left-0 bottom-[550rem]">
            <img 
              src="/legal-docs/left-scopium.png" 
              alt="Layout icon" 
              className="opacity-50"
            />
          </div>

          <div className="hidden lg:block absolute left-0 bottom-[450rem]">
            <img 
              src="/legal-docs/left-flame.png" 
              alt="Document icon" 
              className="opacity-50"
            />
          </div> 

          <div className="hidden lg:block absolute left-0 bottom-[350rem]">
            <img 
              src="/legal-docs/right-scopium.png" 
              alt="Document icon" 
              className="opacity-50"
            />
          </div> 

          <div className="hidden lg:block absolute left-0 bottom-[250rem]">
            <img 
              src="/legal-docs/right-flame.png" 
              alt="Document icon" 
              className="opacity-50"
            />
          </div>    

          <div className="hidden lg:block absolute left-0 bottom-[150rem]">
            <img 
              src="/legal-docs/left-scopium.png" 
              alt="Document icon" 
              className="opacity-50"
            />
          </div>          
          <div className="hidden lg:block absolute left-0 bottom-[100rem]">
            <img 
              src="/legal-docs/left-flame.png" 
              alt="Document icon" 
              className="opacity-50"
            />
          </div>          
          <div className="hidden lg:block absolute left-0 bottom-[40rem]">
            <img 
              src="/legal-docs/right-scopium.png" 
              alt="Document icon" 
              className="opacity-50"
            />
          </div> 
          
             

          {/* Right Side Icons */}
        <div className="hidden lg:block absolute right-0 top-80">
            <img 
              src="/legal-docs/scopium-f-right.png" 
              alt="Info icon" 
              className=" opacity-50"
            />
        </div>


          <div className="hidden lg:block absolute right-2 top-[150rem]">
            <img 
              src="/legal-docs/left-flame.png" 
              alt="Check icon" 
              className="opacity-50"
            />
          </div>

          <div className="hidden lg:block absolute right-0 top-[250rem]">
            <img 
              src="/legal-docs/Scopium-o-right.png" 
              alt="Layout icon" 
              className="opacity-50"
            />
          </div>

          <div className="hidden lg:block absolute right-0 top-[350rem]">
            <img 
              src="/legal-docs/left-flame.png" 
              alt="Document icon" 
              className="opacity-50"
            />
          </div> 

   

          <div className="hidden lg:block absolute right-0 top-[450rem]">
            <img 
              src="/legal-docs/flame-o-right.png" 
              alt="Document icon" 
              className="opacity-50"
            />
          </div>          
          <div className="hidden lg:block absolute right-0 top-[550rem]">
            <img 
              src="/legal-docs/Scopium-o-right.png" 
              alt="Document icon" 
              className="opacity-50"
            />
          </div>          

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Main Content Container */}
          <div className="max-w-4xl mx-auto relative z-10">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">TERMS AND CONDITIONS OF USE</h2>
            <p className="text-lg text-gray-600">Last updated: ________________</p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg prose-gray max-w-none">
                
                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Introduction</h3>
                  
                  <p className="text-gray-700 mb-4">
                    Welcome to <span className="font-bold">Scopium</span> and <span className="font-bold">Scopium Exchange</span> (collectively referred to as "Scopium", "we", 
                    "our", or "us"), a decentralized platform that enables users to create and trade blockchain-based 
                    tokens, as well as to stream content and receive donations from their communities. Scopium 
                    operates through the domains Scopium.com and Scopium.io and is headquartered in London, 
                    United Kingdom.
                  </p>

                  <p className="text-gray-700 mb-4">
                    These Terms and Conditions of Use (the "Terms") govern your access to and use of the Scopium 
                    platform, including but not limited to our websites, smart contracts, digital products, 
                    applications, APIs, token-generation tools, trading interfaces, donation and streaming features, 
                    and any other services provided (collectively, the "Services").
                  </p>

                  <p className="text-gray-700 mb-4">
                    These Terms form a legally binding agreement between you (referred to as "you", "your", or 
                    "User") and Scopium. By accessing or using the Services in any manner, you acknowledge that 
                    you have read, understood, and agree to be bound by these Terms. If you do not agree with any 
                    part of these Terms, you must immediately discontinue use of the Services.
                  </p>

                  <div className= "mb-4">
                    <p className="text-gray-700 font-medium">
                      <strong>NOTICE:</strong> These Terms include important provisions regarding eligibility, account types, trading 
                      mechanisms, content restrictions, donation processing, ownership rights, indemnification, 
                      liability waivers, and dispute resolution. You are encouraged to read them carefully in their 
                      entirety.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Section 1: Eligibility, Account Types & Access Controls</h3>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">1.1 Minimum Age Requirement</h4>
                  <p className="text-gray-700 mb-4">
                    You must be at least <span className="font-bold">18 years old</span> (or the age of majority in your jurisdiction, if higher) to use 
                    the Scopium platform. By accessing or using any part of the Services, you represent and warrant 
                    that you meet this eligibility requirement and that all information you provide is truthful, 
                    accurate, and complete.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">1.2 Jurisdictional Restrictions</h4>
                  <p className="text-gray-700 mb-4">
                    The use of Scopium may be restricted or prohibited in certain jurisdictions. Although we 
                    currently <span className="font-bold">do not restrict access based on location</span>, it is your responsibility to ensure that using 
                    the Services is legal under the laws applicable to you. <span className="font-bold">We do not guarantee availability or 
                    compliance in any specific jurisdiction.</span>
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">1.3 Know Your Customer (KYC) & Anti-Money Laundering (AML) Procedures</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium reserves the right to implement identity verification and AML checks at our sole 
                    discretion and in accordance with applicable law. <span className="font-bold">KYC verification is strictly required for all 
                    users engaging in streaming or receiving donations.</span> Failure to complete KYC when requested 
                    may result in limitations on your account, including suspension or termination of your ability to 
                    create content or receive payments.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">1.4 Account Types and Permissions</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium provides multiple user tiers with varying levels of functionality and access rights:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                    <li><strong>Guest Users:</strong> May browse public content and streams but cannot engage in trading, create tokens, or participate in donations. No account is required.</li>
                    <li><strong>Verified Users:</strong> Users who have completed basic registration (email and wallet connection) can trade tokens and create new tokens. No KYC is required unless the user opts into streaming features.</li>
                    <li><strong>Creators:</strong> Verified users who opt to stream content and receive donations. Must complete full KYC verification. Subject to additional content and conduct rules.</li>
                    <li><strong>Administrators:</strong> Authorized personnel managing platform operations, enforcement, and support. Admins may suspend, restrict, or terminate accounts as necessary.</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">1.5 Account Security</h4>
                  <p className="text-gray-700 mb-4">
                    You are solely responsible for maintaining the security of your account credentials, wallets, and 
                    private keys. <strong>We do not store private keys, seed phrases, or recovery methods</strong>. If you lose 
                    access to your digital wallet or fail to safeguard your login credentials, you may lose access to 
                    your account and any assets held therein. Scopium is not liable for unauthorized access or 
                    transactions made using your credentials.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">1.6 Multiple Accounts and Misrepresentation</h4>
                  <p className="text-gray-700 mb-4">
                    Users are prohibited from creating multiple accounts for manipulative purposes (e.g., spam, 
                    airdrop farming, wash trading) or misrepresenting their identity or location. Violations may 
                    result in immediate suspension and permanent banning.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">1.7 Platform Access and Restrictions</h4>
                  <p className="text-gray-700 mb-4">
                    We reserve the right to deny access to, or remove access from, any user at any time, with or 
                    without cause, including in response to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Violations of these Terms</li>
                    <li>Legal or regulatory obligations</li>
                    <li>Threats to platform integrity or user safety</li>
                    <li>Verified abuse reports from the community</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Scopium's decision to restrict or terminate access is final and not subject to appeal unless 
                    otherwise required by law.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Section 2: Token Trading, Creation & Protocol Mechanics</h3>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">2.1 Overview of Token Capabilities</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium enables users to <strong>create, trade, and interact with blockchain-based tokens</strong> using 
                    decentralized smart contract infrastructure. These tools are offered on a non-custodial basis — 
                    Scopium <strong>does not hold user funds, tokens, or private keys</strong>. All transactions are executed 
                    directly by users through their connected wallets.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">2.2 Blockchain Support and Protocols</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium operates across multiple blockchain ecosystems and leverages the following protocols:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>Solana Blockchain</strong> – supporting rapid token deployment and migration tools</li>
                    <li><strong>Ethereal Blockchain</strong> – for Ethereum-compatible token standards</li>
                    <li><strong>Sui Blockchain</strong> – for fast, scalable, object-based smart contracts</li>
                    <li><strong>Radium Protocol</strong> – used to manage token migration, liquidity, and trading mechanics within Scopium's infrastructure</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Smart contracts deployed through Scopium are immutable and decentralized, meaning that 
                    once deployed, the Company cannot modify, reverse, or access them.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">2.3 Token Creation</h4>
                  <p className="text-gray-700 mb-4">
                    Users can deploy tokens via our automated creation tool. These tokens are:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Created instantly upon user action (no manual approval)</li>
                    <li>Deployed to the selected supported blockchain</li>
                    <li>Subject to a <strong>0.05 token creation fee</strong>, payable in the applicable network currency</li>
                    <li>Fully owned and controlled by the deploying user, including token metadata, supply caps, and distribution logic</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">2.4 Token Trading and Market Mechanics</h4>
                  <p className="text-gray-700 mb-4">
                    Token trading on Scopium occurs through smart contracts built on automated market 
                    mechanisms. Specifically:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong><strong>AMM Pools</strong> (Automated Market Makers)</strong> allow for decentralized liquidity provision and pricing via bonding curves.</li>
                    <li>No order books or centralized custody are used.</li>
                    <li>Pricing, slippage, and liquidity are determined by user-contributed pools and Radium Protocol contracts.</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Scopium charges a <strong>0.01 trading fee</strong> on all token swaps, which is deducted automatically on-chain. This fee is used to support platform development and sustainability.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">2.5 No Guarantee of Listing or Liquidity</h4>
                  <p className="text-gray-700 mb-4">
                    Tokens created on Scopium are <strong>not guaranteed to be listed</strong>, promoted, or supported beyond the 
                    automated smart contract infrastructure. Scopium does not provide liquidity, marketing, or buyer 
                    matching. Tokens may have <strong>no value or utility</strong>, and users trade at their own risk.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">2.6 No Investment Advice or Promises of Returns</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium does not offer investment advice and does not guarantee any token's future 
                    performance, market availability, or resale value. <strong>Token prices may fluctuate wildly or 
                    become worthless</strong>. Any perceived value or performance is speculative and user-driven.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">2.7 Compliance and Prohibited Activity</h4>
                  <p className="text-gray-700 mb-4">
                    Users must not create or trade tokens that:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Represent real-world securities or financial instruments</li>
                    <li>Involve fraud, rug-pulls, or deceptive tokenomics</li>
                    <li>Violate intellectual property laws or impersonate brands</li>
                    <li>Are designed to mislead, scam, or deceive users</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Accounts found engaging in prohibited token activity will be <strong>suspended or banned without 
                    refund</strong>, and may be reported to appropriate legal authorities.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Section 3: Streaming, Donations & Content Guidelines</h3>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">3.1 Streaming Access and Eligibility</h4>
                  <p className="text-gray-700 mb-4">
                    Users may access streaming features through the Scopium platform once they have:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Registered as a verified user</li>
                    <li>Completed full <strong>KYC verification</strong></li>
                    <li>Accepted these Terms and our Community Conduct Policy</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Scopium reserves the right to <strong>approve, suspend, or deny streaming access</strong> at its discretion 
                    based on compliance, safety, and platform integrity considerations.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">3.2 Donation Mechanics and Revenue Split</h4>
                  <p className="text-gray-700 mb-4">
                    Viewers may donate to streamers directly using integrated crypto payment features. Scopium 
                    facilitates these donations through smart contract infrastructure.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>Streamers receive 90% of the donation amount</strong>, automatically transferred to their wallet.</li>
                    <li><strong>Scopium retains a 10% platform</strong> fee for all donations, deducted automatically.</li>
                    <li>Donations are processed in supported cryptocurrencies or tokens.</li>
                    <li><strong>All donations are non-refundable</strong>. Users are solely responsible for verifying streamer content and intention before contributing.</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">3.3 Prohibited Content</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium enforces a <strong>strict zero-tolerance policy</strong> regarding certain categories of content. The 
                    following are <strong>strictly prohibited</strong> from being streamed or uploaded:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Hate speech, including racist, homophobic, or xenophobic content</li>
                    <li>Threats of violence or harassment</li>
                    <li>Adult content, sexually explicit material, or nudity</li>
                    <li>Copyrighted materials without proper authorization</li>
                    <li>Misleading or false information related to securities, tokens, or health</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Violation of these content policies may result in <strong>immediate suspension or permanent 
                    termination</strong> of streaming privileges and user accounts, without refund or prior notice.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">3.4 Acceptable Use and Platform Integrity</h4>
                  <p className="text-gray-700 mb-4">
                    Users may not engage in the following while streaming or interacting with streamers:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>Botting</strong>, spamming, or manipulating viewer metrics</li>
                    <li>Promoting or linking to unlicensed securities, pyramid schemes, or illegal services</li>
                    <li>Encouraging unlawful activity, violence, or abuse</li>
                    <li>Impersonating other users or falsely claiming official affiliations</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Any abuse of the streaming system — including fraudulent donation claims, donation 
                    laundering, or targeted harassment — will result in termination and possible legal action.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">3.5 Content Ownership and Licensing</h4>
                  <p className="text-gray-700 mb-4">
                    Streamers retain ownership over original content they produce and stream. However, by using 
                    Scopium, creators grant the platform a <strong>non-exclusive, worldwide, royalty-free license</strong> to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Display and distribute their content on Scopium.io / Scopium.com</li>
                    <li>Archive, transcode, and redistribute content as part of Scopium's streaming experience</li>
                    <li>Promote featured content in marketing or editorial feeds</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    This license is <strong>revocable</strong> by the user at any time by deleting their content and deactivating their 
                    account, unless otherwise required by law, investigation, or platform audit procedures.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">3.6 Copyright Complaints & Takedowns</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium respects intellectual property rights. We will comply with legitimate takedown requests 
                    under applicable laws such as the <strong>Digital Millennium Copyright Act (DMCA)</strong>.
                  </p>
                  <p className="text-gray-700 mb-4">
                    If you believe your copyrighted content has been used improperly, you may submit a formal 
                    notice via our <strong>Copyright & Infringement Form</strong>. Upon valid notification, Scopium will take 
                    prompt action, which may include content removal and user account investigation.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Section 4: Platform Fees, Refunds & User Wallet Responsibility</h3>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">4.1 Fee Structure Overview</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium charges platform fees on certain services to sustain operations, fund development, and 
                    provide secure infrastructure. All fees are automatically deducted via smart contracts and are 
                    non-negotiable unless otherwise stated in writing. The current standard fees include:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>Token Trading Fee:</strong> 0.01 per trade (deducted automatically at the time of transaction)</li>
                    <li><strong>Token Creation Fee:</strong> 0.05 per token deployment (payable at point of creation)</li>
                    <li><strong>Streaming Donations:</strong> 10% of all donations received is retained by Scopium</li>
                    <li><strong>User Payout:</strong> Streamers receive 90% of the donation instantly to their wallet</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Scopium may adjust its fee structure at any time with advance notice to users via the platform or 
                    by email.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">4.2 No Refund Policy</h4>
                  <p className="text-gray-700 mb-4">
                    All transactions processed through Scopium's decentralized infrastructure — including token 
                    purchases, donations, mints, and smart contract interactions — are <strong>final, irreversible, and non-refundable.</strong>
                  </p>
                  <p className="text-gray-700 mb-4">
                    This is due to the inherent nature of blockchain technology, which does not support transaction 
                    rollbacks or modifications. Users are <strong>solely responsible for ensuring transaction accuracy </strong>
                    before confirming any action.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">4.3 Donation Refunds and Chargebacks</h4>
                  <p className="text-gray-700 mb-4">
                    Donations to streamers are <strong>non-refundable and not eligible for chargebacks</strong>, regardless of the 
                    donor's subsequent opinion of the streamer or content. Streamers do not have the ability to 
                    reverse donations or return funds once transferred.
                  </p>
                  <p className="text-gray-700 mb-4">
                    By donating, you understand and accept that you are making a <strong>voluntary, non-commercial 
                    contribution</strong> with no expectation of return or reward.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">4.4 Wallet Connection and User Control</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium is a <strong>non-custodial platform</strong>. Users are required to connect and use their own self-custody wallets (e.g., Phantom, MetaMask, Sui Wallet) in order to interact with the Platform.
                  </p>
                  <p className="text-gray-700 mb-4">
                    You are solely responsible for:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Safeguarding your private keys, seed phrases, and wallet credentials</li>
                    <li>Verifying correct recipient addresses and token compatibility</li>
                    <li>Managing gas fees, network conditions, and wallet extensions</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Scopium does not <strong>store, access, reset, or recover user wallets </strong>under any circumstances. If you 
                    lose access to your wallet, your funds and account access may be permanently lost.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">4.5 No Control Over Network Fees or Blockchain Availability</h4>
                  <p className="text-gray-700 mb-4">
                    Users understand that all interactions with Scopium depend on external blockchain networks 
                    such as Solana, Sui, or Ethereal. These networks may charge gas fees, experience downtime, 
                    congestion, or reorganization events outside Scopium's control.
                  </p>
                  <p className="text-gray-700 mb-4">
                    We disclaim any liability for delays, failed transactions, or increased costs arising from third-party blockchain issues.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">4.6 Taxes and Regulatory Reporting</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium does not calculate or withhold taxes on behalf of users. You are solely responsible for:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Determining your tax obligations in your jurisdiction</li>
                    <li>Reporting income from token trading or streaming</li>
                    <li>Accounting for value-added tax (VAT), sales tax, or donation-related liabilities</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    We recommend consulting a licensed tax advisor regarding your use of Scopium.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Section 5: User Conduct, Acceptable Use & Enforcement</h3>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">5.1 General Conduct Expectations</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium is committed to maintaining a safe, fair, and decentralized environment for all users. By 
                    accessing the Platform, you agree to behave responsibly and lawfully, and to respect the rights 
                    and experiences of other users.
                  </p>
                  <p className="text-gray-700 mb-4">
                    All users — including guests, creators, and verified members — must refrain from any activity 
                    that interferes with the normal operation of the Platform, threatens user safety, or violates these 
                    Terms.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">5.2 Prohibited Activities</h4>
                  <p className="text-gray-700 mb-4">
                    You may not, under any circumstances, use the Platform to engage in any of the following:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>Automated Abuse:</strong> Use of bots, scripts, or automation tools to manipulate platform features (e.g., views, trades, donations, or account actions)</li>
                    <li><strong>Spam & Exploits:</strong> Flooding smart contracts, creating fraudulent tokens, or abusing system vulnerabilities</li>
                    <li><strong>Unlawful Activity:</strong> Promoting or facilitating illegal goods, services, or behaviors — including narcotics, weapons, or money laundering</li>
                    <li><strong>Securities Violations:</strong> Offering, promoting, or selling unregistered securities or financial instruments disguised as tokens</li>
                    <li><strong>Impersonation:</strong> Pretending to be another individual, entity, or Scopium staff member, or misrepresenting project affiliations</li>
                    <li><strong>Harassment or Abuse:</strong> Stalking, bullying, or otherwise harassing other users through messages, content, or stream interactions</li>
                    <li><strong>Content Violations:</strong> Sharing, streaming, or hosting any prohibited content, as outlined in Section 3</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">5.3 Enforcement Rights</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium reserves the right to investigate and take appropriate action against users who violate 
                    these Terms, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Temporary account restrictions or feature limitations</li>
                    <li>Permanent account suspension or banning</li>
                    <li>Token delisting or project removal</li>
                    <li>Reversal or withholding of unclaimed earnings or donations (where legally permissible)</li>
                    <li>Reporting the user to law enforcement or regulatory authorities</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Actions may be taken with or without prior notice depending on the severity or urgency of the 
                    violation.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">5.4 Community Reporting and Investigation</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium encourages the community to help maintain a safe environment. Users may submit 
                    formal reports regarding suspicious, abusive, or unlawful behavior through our in-app or web-based reporting system.
                  </p>
                  <p className="text-gray-700 mb-4">
                    All reports are reviewed in good faith. Investigations are conducted by Scopium's moderation 
                    team or automated systems. We reserve the right to act on credible reports based on evidence, 
                    regardless of whether legal action is pursued externally.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">5.5 No Guaranteed Restoration</h4>
                  <p className="text-gray-700 mb-4">
                    Users whose accounts are suspended or banned <strong>are not guaranteed reinstatement</strong>. Repeated or 
                    severe violations may result in permanent deactivation and <strong>non-recoverability of any 
                    associated digital assets, access, or privileges</strong>. Scopium will not be liable for any loss or 
                    inconvenience arising from enforcement actions.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">5.6 User Acknowledgement</h4>
                  <p className="text-gray-700 mb-4">
                    By continuing to use the Platform, you acknowledge that:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Your behavior on and off the Platform may impact your access and reputation</li>
                    <li>Scopium has sole discretion in interpreting and enforcing these rules</li>
                    <li>Violations of these Terms may result in <strong>irreversible consequences</strong></li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Section 6: Modifications, Availability & Termination</h3>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">6.1 Right to Modify Terms</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium reserves the right to <strong>amend, update, or revise these Terms of Use at any time</strong>, for 
                    any reason, with or without prior notice. When material changes are made, we will:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Provide a notice through the platform interface or by email (if available)</li>
                    <li>Update the "Last Updated" date at the top of this document</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                   <strong> Continued use of the Platform following notice of any change constitutes your acceptance 
                    of the revised Terms</strong>. If you do not agree to the modifications, you must discontinue use of the 
                    Services immediately.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">6.2 Changes to Features and Services</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium may add, remove, suspend, or alter any aspect of the Platform — including features, 
                    supported blockchains, token tools, or streaming systems — without liability to users. This 
                    includes temporary or permanent discontinuation of certain tools, integrations, or content.
                  </p>
                  <p className="text-gray-700 mb-4">
                    We are not liable for any disruption caused by:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Upgrades, patches, or protocol changes</li>
                    <li>Third-party API outages (wallet providers, price feeds, etc.)</li>
                    <li>Force majeure events (defined below)</li>
                    <li>Regulatory action or unforeseen technical limitations</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">6.3 Service Availability and Performance</h4>
                  <p className="text-gray-700 mb-4">
                    While Scopium strives to maintain a high standard of availability, <strong>we offer no guarantee of 
                    uninterrupted access, error-free operation, or service-level commitments</strong>. The Platform is 
                    provided on an <strong>"as-is" and "as-available" basis</strong>, without warranty of any kind, express or 
                    implied.
                  </p>
                  <p className="text-gray-700 mb-4">
                    We reserve the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Suspend access to the Platform temporarily or permanently for maintenance or upgrades</li>
                    <li>Limit access to certain regions, wallets, or functions</li>
                    <li>Deny access to unverified users or those under investigation</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">6.4 Account Termination by User</h4>
                  <p className="text-gray-700 mb-4">
                    You may terminate your use of the Platform at any time by disconnecting your wallet and 
                    ceasing all access. However, termination does not release you from:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Obligations incurred prior to termination</li>
                    <li>Compliance with any outstanding investigations</li>
                    <li>License grants for previously submitted content (as applicable)</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">6.5 Account Suspension or Termination by Scopium</h4>
                  <p className="text-gray-700 mb-4">
                    We reserve the right to suspend or permanently terminate your account or access if:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>You breach any provision of these Terms</li>
                    <li>You violate laws or regulations applicable to your use</li>
                    <li>You pose a risk to the integrity or reputation of Scopium or its users</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Scopium may, at its sole discretion, retain logs, wallet history, and content for internal review or 
                    legal compliance, even after user deactivation.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">6.6 Retention of Assets and Access During Review</h4>
                  <p className="text-gray-700 mb-4">
                    In the event of a flagged investigation, Scopium reserves the right to <strong>temporarily restrict access 
                    to wallet-linked features</strong>, token tools, or donation withdrawals until the matter is resolved. This 
                    restriction shall not imply ownership over the assets, but may delay access during due process.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">6.7 Force Majeure</h4>
                  <p className="text-gray-700 mb-4">
                    Scopium shall not be liable for any failure or delay in performance resulting from causes beyond 
                    our reasonable control, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Natural disasters, pandemics, or civil unrest</li>
                    <li>Network disruptions, cyberattacks, or zero-day vulnerabilities</li>
                    <li>Actions by governmental or regulatory authorities</li>
                    <li>Major blockchain protocol failures or forks</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Section 7: Legal Provisions, Indemnity & Governing Law</h3>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">7.1 Indemnification</h4>
                  <p className="text-gray-700 mb-4">
                    To the fullest extent permitted by law, you agree to <strong>indemnify, defend, and hold harmless </strong>
                    Scopium, its affiliates, officers, employees, contractors, licensors, and partners from and against 
                    any and all claims, liabilities, damages, losses, expenses, and costs (including reasonable legal 
                    fees) arising out of or related to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Your use or misuse of the Platform or any Services</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of applicable laws, rules, or regulations</li>
                    <li>Your creation, distribution, or trading of tokens through the Platform</li>
                    <li>Your streaming content or donation practices</li>
                    <li>Any third-party claim that your actions infringed their rights or caused harm</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    This obligation survives termination of your account or use of the Services.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">7.2 No Warranty</h4>
                  <p className="text-gray-700 mb-4">
                    The Platform and all content, tools, and Services are provided <strong>"as is" and "as available"</strong> 
                    without any warranty of any kind, express or implied. Scopium specifically disclaims all implied 
                    warranties, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Fitness for a particular purpose</li>
                    <li>Merchantability</li>
                    <li>Non-infringement</li>
                    <li>Accuracy of information</li>
                    <li>Availability, uptime, or performance</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    You assume full responsibility for any and all risks associated with your use of Scopium and all 
                    associated blockchain interactions.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">7.3 Limitation of Liability</h4>
                  <p className="text-gray-700 mb-4">
                    To the maximum extent permitted by applicable law:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Scopium shall <strong>not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages</strong>, including but not limited to loss of profits, data, goodwill, or business opportunities</li>
                    <li>Scopium's total liability to you for any claim related to your use of the Platform shall be <strong>zero (0)</strong>, regardless of the form of action or legal theory</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    This limitation applies even if we have been advised of the possibility of such damages.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">7.4 Export Control & Sanctions Compliance</h4>
                  <p className="text-gray-700 mb-4">
                    You agree to comply with all applicable export control and economic sanctions laws. You may 
                    not use the Platform if:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>You are located in or are a national or resident of any jurisdiction subject to sanctions or embargoes imposed by the United States, United Kingdom, or the European Union</li>
                    <li>You are on any government list of prohibited or restricted persons</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Scopium reserves the right to block access to users or regions if required by law.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">7.5 Governing Law and Jurisdiction</h4>
                  <p className="text-gray-700 mb-4">
                    These Terms shall be governed by the laws of the <strong>United States</strong> or the <strong>United Kingdom</strong>, at 
                    Scopium's election, without regard to its conflict of law rules.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Any disputes arising out of or in connection with these Terms shall be resolved as follows:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>First through <strong>good faith informal negotiation</strong> between the parties</li>
                    <li>If unresolved, through <strong>binding arbitration</strong> under the rules of the <strong>London Court of International Arbitration (LCIA)</strong> or the <strong>American Arbitration Association (AAA)</strong>, as selected by Scopium</li>
                    <li>Arbitration shall be conducted in <strong>English</strong>, in either <strong>London, UK</strong> or <strong>New York, USA,</strong> depending on the Company's election</li>
                  </ul>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">7.6 Severability</h4>
                  <p className="text-gray-700 mb-4">
                    If any provision of these Terms is found to be unlawful or unenforceable, that provision will be 
                    severed, and the remainder of the Terms shall remain in full force and effect.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">7.7 Entire Agreement</h4>
                  <p className="text-gray-700 mb-4">
                    These Terms constitute the <strong>entire agreement</strong> between you and Scopium concerning your use of 
                    the Platform, superseding all prior or contemporaneous communications, understandings, or 
                    agreements.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">7.8 Waiver</h4>
                  <p className="text-gray-700 mb-4">
                    Failure by Scopium to enforce any part of these Terms shall not be deemed a waiver of any right 
                    or provision.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">7.9 Contact Information</h4>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-6">
                    <p className="text-gray-700 mb-2"><strong>Ashley Cole</strong></p>
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> info@Scopium.io</p>
                    <p className="text-gray-700 mb-2"><strong>Company:</strong> Scopium / Scopium Exchange</p>
                    <p className="text-gray-700">Registered in London, UK</p>
                  </div>
                </section>


            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
