import Header from "../components/Header";
import Footer from "../components/Footer";


const Disclaimer = () => {

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex-1 pt-20 pb-32">
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
                    <div className="h-24"></div>

          {/* Page Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">DISCLAIMER & NO-LIABILITY STATEMENT</h2>
            <p className="text-lg text-gray-600">Last updated: ________________</p>
          </div>

          {/* Disclaimer Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            
                
                <section className="mb-12">
                  <div className=" mb-8">
                    <p className="text-gray-700">
                      Welcome to <strong>Scopium</strong> and <strong>Scopium Exchange</strong> — a decentralized platform for creating and 
                      trading cryptocurrency tokens, as well as streaming live content and accepting community 
                      donations.
                    </p>
                    <p className="text-gray-700 mt-4">
                      This Disclaimer governs your use of our services, and by using our websites (Scopium.com, 
                      Scopium.io) or any associated products, features, or content (collectively, the "Platform"), you 
                      acknowledge that you have read, understood, and agreed to the terms outlined below. If you do 
                      not agree, do not use the Platform.
                    </p>
                  </div>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">1. No Financial or Investment Advice</h3>
                  
                  <p className="text-gray-700 mb-4">
                    Nothing on this Platform constitutes or should be interpreted as financial, investment, legal, or 
                    tax advice. <strong>Scopium does not act as a financial advisor, broker, fiduciary, exchange, or 
                    custodian.</strong>
                  </p>

                  <p className="text-gray-700 mb-4">
                    Any information provided on the Platform, including token statistics, pricing data, creator tools, 
                    whitepapers, user-generated content, and community insights, is <strong>for general informational 
                    purposes only</strong>. You are solely responsible for conducting your own due diligence and consulting 
                    licensed professionals before making any financial or investment decisions.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">2. Use at Your Own Risk</h3>
                  
                  <p className="text-gray-700 mb-4">
                    The use of the Platform, including but not limited to the creation of tokens, trading of tokens, 
                    participation in livestream donations, and interaction with third-party wallets or content, is 
                    <strong> entirely at your own risk</strong>.
                  </p>

                  <p className="text-gray-700 mb-4">
                    While we have implemented strong security practices and decentralized frameworks, the nature 
                    of blockchain technology and decentralized finance (DeFi) involves inherent risks, including 
                    but not limited to:
                  </p>
                  
                  <div className="mb-6">
                    <ul className="list-disc list-inside text-gray-700 space-y-2 font-bold">
                      <li>Smart contract vulnerabilities</li>
                      <li>Token value volatility (including complete loss of value)</li>
                      <li>Chain forks or protocol changes</li>
                      <li>Phishing attacks, wallet breaches, or key mismanagement</li>
                      <li>Loss of access to your funds due to misplacing your private keys or seed phrases</li>
                      <li>Incompatibility with third-party tools, plugins, or platforms</li>
                      <li>Regulatory actions, bans, or policy shifts in your jurisdiction</li>
                    </ul>
                  </div>

                  <p className="text-gray-700 mb-4">
                    Scopium does not guarantee the integrity, availability, or security of any blockchain, token, or 
                    transaction you engage in through the Platform.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">3. Self-Custody Responsibilities</h3>
                  
                  <p className="text-gray-700 mb-4">
                    All wallet integrations on Scopium are non-custodial. This means:
                  </p>
                  
                  <div className=" mb-6">
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>You control your own private keys.</strong></li>
                      <li><strong>We cannot access, freeze, reverse, or recover your funds.</strong></li>
                      <li>If you lose access to your wallet or private keys,<strong> we cannot help you regain it.</strong></li>
                    </ul>
                  </div>

                  <p className="text-gray-700 mb-4 font-bold">
                    You are solely responsible for securing your digital wallet and understanding how it works.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">4. Token Creation and Listing</h3>
                  
                  <p className="text-gray-700 mb-4">
                    Token creation on Scopium is <strong>fully automated and not subject to manual review or approval</strong>. 
                    We do not endorse, vet, or regulate tokens created using our tools. The existence of a token on 
                    the Platform <strong>does not imply credibility, legality, or financial value</strong>.
                  </p>

                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Your Token Creation Responsibilities</h4>
                  <p className="text-gray-700 mb-4">
                    You are solely responsible for:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                    <li>The legality and regulatory compliance of any token you create</li>
                    <li>The truthfulness and accuracy of any claims made about your project</li>
                    <li>Disclosing risks, usage terms, and obligations to any purchasers or participants</li>
                  </ul>

                  <p className="text-gray-700 mb-4 font-bold">
                    We reserve the right to remove access to tokens or terminate accounts that violate 
                    applicable laws or our terms of service.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">5. Performance and Forward-Looking Statements</h3>
                  
                  <p className="text-gray-700 mb-4">
                    All mentions of token performance, price movements, or future functionality are <strong>speculative in 
                    nature</strong> and provided <strong>without guarantees</strong>. Past performance is <strong>not indicative of future results</strong>.
                  </p>

                  <p className="text-gray-700 mb-4">
                    Any statements regarding our roadmap, features, token launches, or future developments are 
                    <strong>forward-looking</strong> and may change due to technical, legal, or strategic reasons.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">6. Tax Compliance</h3>
                  
                  <p className="text-gray-700 mb-4">
                    You are solely responsible for <strong>reporting, calculating, and paying any applicable taxes</strong> in your 
                    jurisdiction arising from:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                    <li>Token sales or purchases</li>
                    <li>Capital gains or losses</li>
                    <li>Streaming income or donations</li>
                    <li>Value-added tax (VAT), goods and services tax (GST), or equivalent obligations</li>
                  </ul>

                  <p className="text-gray-700 mb-4">
                    <strong>Scopium does not provide tax documentation or reporting tools</strong> and disclaims all liability 
                    related to tax compliance or financial reporting.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">7. No Liability for Third-Party Content or Services</h3>
                  
                  <p className="text-gray-700 mb-4">
                    The Platform may feature third-party content, wallet providers, browser extensions, smart 
                    contracts, or links to external websites and dApps. Scopium <strong>does not control, endorse, or 
                    assume responsibility</strong> for the accuracy, functionality, safety, or reliability of these third-party 
                    offerings.
                  </p>

                  <p className="text-gray-700 mb-4">
                    Your interactions with such services are <strong>entirely at your own discretion and risk</strong>. Scopium 
                    disclaims any liability for losses, fraud, or disputes arising from your use of third-party tools or 
                    content.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">8. Limitation of Liability</h3>
                  
                  <div className="bg-gray-50 mb-6">
                    <p className="text-gray-700 mb-4">
                      To the fullest extent permitted by applicable law:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Scopium and its affiliates shall not be liable for any indirect, incidental, 
                      consequential, special, or exemplary damages,</strong> including but not limited to lost profits, 
                      loss of data, system failure, or unauthorized access to user information.</li>
                      <li><strong>Scopium's maximum aggregate liability shall be zero (0),</strong> regardless of the cause of 
                      action or theory of liability.</li>
                    </ul>
                  </div>

                  <p className="text-gray-700 mb-4">
                    By using this Platform, you waive any claim, known or unknown, against Scopium arising from 
                    your use or inability to use the Platform or any part thereof.
                  </p>
                </section>

                <section className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">9. Regulatory Notice</h3>
                  
                  <p className="text-gray-700 mb-4">
                    Scopium is not currently registered or licensed with any financial or crypto regulatory authority. 
                    Use of the Platform may be restricted or prohibited in certain jurisdictions. It is your 
                    responsibility to determine whether using the Platform is lawful under the laws of your location.
                  </p>

                  <p className="text-gray-700 mb-4">
                    We reserve the right to implement jurisdictional restrictions, comply with lawful government 
                    requests, or modify features without prior notice.
                  </p>
                </section>

                <section className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">10. Contact</h3>
                  
                  <p className="text-gray-700 mb-4">
                    If you have questions about this Disclaimer or your responsibilities, please contact:
                  </p>
                  <div className="bg-gray-50 p-6">
                    <p className="text-gray-700 mb-2"><strong>Ashley Cole</strong></p>
                    <p className="text-gray-700 mb-2"><strong>Email:</strong> info@Scopium.io</p>
                    <p className="text-gray-700 mb-2"><strong>Company:</strong> Scopium / Scopium Exchange</p>
                    <p className="text-gray-700">Registered in London, United Kingdom</p>
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

export default Disclaimer;
